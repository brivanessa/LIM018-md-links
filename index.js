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
const docEjem = "/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/HOLIS/";
const docEjem2= "readmeExample.md";
// console.log(path.normalize(docEjem));
// console.log(path.dirname(docEjem));
// console.log(path.basename(docEjem));
// console.log(path.extname(docEjem));

// //PARA LEER ARCHIVOS DE UN DIRECTORIO
// let docsList =[];
// function pathRead (ruta) { 
//     let rutaAbsoluta = path.normalize(ruta);
//     fs.readdir(ruta,(error,docs)=>{
//         if(!error){
//             docs.forEach(doc => {
//              ((path.extname(doc)==='.md')?(docsList.push(path.join(rutaAbsoluta,doc))):'doc is not .md');
//              let newFolder = path.join(rutaAbsoluta,doc);
//                 //    ((path.basename(doc).includes('.md'))===false?(docsList.push(pathRead(newFolder))):'doc is not .md');
//              (pathRead(newFolder)!=undefined)&&((!!path.extname(doc))==false)?(docsList.push(pathRead(newFolder))):'doc is not .md';
//             })           
//         }
//         return docsList
//     })
// }
// pathRead(docEjem);
// setTimeout(()=>{
//     console.log(docsList);
// },3000)

// //PARA LEER ARCHIVOS DE UN DIRECTORIO
// const pathListGlobal =(ruta)=> {
//     let docsList =[];
//     return new Promise((resolve, reject)=>{

//     })
// }
// let docsList =[];
function pathRead (ruta) { 
    let rutaAbsoluta = path.normalize(ruta);
    fs.readdir(ruta,(error,docs)=>{
        console.log(docs)
        if(!error){
            let gg = docs.map(doc => {
             return (path.extname(doc)==='.md')?((path.join(rutaAbsoluta,doc))):'doc is not .md';
            }) 
            let gg2 = docs.map(doc => {
                let newFolder = path.join(rutaAbsoluta,doc);
                return (pathRead(newFolder)!=undefined)&&((!!path.extname(doc))==false)?((pathRead(newFolder))):'doc is not .md';
            })
            return (gg.push(gg2))           
        }
    })
    // console.log(gg.push(gg2))  
    // console.log(paths)
}
pathRead(docEjem);



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
  