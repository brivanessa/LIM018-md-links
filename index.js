//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
const path = require('path');
// En consola : npm install  marked 
const marked = require('marked'); //HTML
const cheerio = require('cheerio'); //ELEMENT
const axios = require('axios'); //BREAK
//format
const colors = require('colors');


const principal =()=>{
    console.log(`***************************************************************`.yellow)
    console.log(`                              mdLinks :)                       `)
    console.log(`***************************************************************`.yellow)
}
// PATH
const docEjem ='HOLIS';
const docEjem2= "readmeExample.md";

//RUTA ABSOLUTA
function pathGlobal(routaInput){
return path.normalize(path.isAbsolute(routaInput)?routaInput:path.resolve(routaInput));
}

//PARA LEER ARCHIVOS DE UN DIRECTORIO
let docslist=[];
const pathRead = (ruta)=> { 
    let rutaAbsoluta =  pathGlobal(ruta);
    fs.readdir(ruta,(error,docs)=>{
        if(!error){
            let docs3=docs.map(doc=>{return path.join(rutaAbsoluta,doc)});
            docs3.filter(doc => {
                if(path.extname(doc)==='.md'){
                    return docslist.push(doc)
                }});
            let docs5=docs3.filter(doc => {return !!path.extname(doc)==false});
            docs5.map(doc=>{ return (pathRead(doc))})
      
        }
    })
}
pathRead(docEjem);
setTimeout(()=>{
    console.log(docslist);
},3000)

// MD LINKS LISTA DE LINKS
const mdLinks = (document) => {
console.log(`LINKS FOUND`.yellow)
fs.readFile(document,'utf-8',(error,data)=>{
if (!error){
    let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
    mdToHtml('a').each(function(indice, elemento){
        const numberLink =`${indice}`.yellow;
        console.log(` LINK Nº ${numberLink}: ${elemento.children[0].nodeValue} ${elemento.attributes[0].value}`)
    })
} else {
    console.log(`Error: ${error}`)
}
})
}
// mdLinks(docEjem); 
// mdLinks('readmeExample.md');

/*
// MD LINKS STATUS CODE
const mdLinks2 = (document) => {

    fs.readFile(document,'utf-8',(error,data)=>{
    console.log(`LINKS STATE`.yellow)   
    if (!error){
        let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
        mdToHtml('a').each(function(indice, elemento){
            axios.get(`${elemento.attributes[0].value}`)
            .then((response)=>{
                const oks = `${response.statusText}`.green;
                console.log(` ${indice} ${oks} (${response.status}): ${elemento.children[0].nodeValue} -> ${elemento.attributes[0].value}`)
            })
            .catch((error)=>{
                let errorName=`'${error}'`;
                if (error==`AxiosError: Request failed with status code 404`){
                const fail = `FAIL`.bgYellow;    
                console.log(` ${indice} ${fail} (404): ${elemento.children[0].nodeValue} -> ${elemento.attributes[0].value}`) 
                } else if (errorName.includes('ENOTFOUND')== true){
                const fail = `FAIL`.bgYellow;     
                console.log(` ${indice} ${fail} (not found page): ${elemento.children[0].nodeValue} -> ${elemento.attributes[0].value} `)
                } else {console.log(`${indice}  ${elemento.children[0].nodeValue} ${elemento.attributes[0].value}
                ${error}`)}    
            })
        })
    } else {
        console.log(`Error: ${error}`)
    }
    })
    }

principal();
mdLinks('readmeExample.md');   
mdLinks2('readmeExample.md');
*/

module.exports = () => {
    mdLinks
  };
  