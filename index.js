//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
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
// mdLinks('readmeExample.md');

// MD LINKS STATUS CODE
const mdLinks2 = (document) => {

    fs.readFile(document,'utf-8',(error,data)=>{
    if (!error){
        console.log(`LINKS STATE`.yellow)
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
mdLinks('readmeExample2.md');   
mdLinks2('readmeExample2.md');


module.exports = () => {
    mdLinks
  };
  