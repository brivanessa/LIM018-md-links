//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
// En consola : npm install  marked 
const marked = require('marked');
const cheerio = require('cheerio');
const axios = require('axios');

// MD LINKS LISTA DE LINKS
const mdLinks = (document) => {
fs.readFile(document,'utf-8',(error,data)=>{
if (!error){
    let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
    mdToHtml('a').each(function(indice, elemento){
        console.log(`${indice}  ${elemento.children[0].nodeValue} ${elemento.attributes[0].value}`)
    })
} else {
    console.log(`Error: ${error}`)
}
})
}
mdLinks('readmeExample.md');

// MD LINKS STATUS CODE
const mdLinks2 = (document) => {
    fs.readFile(document,'utf-8',(error,data)=>{
    if (!error){
        let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
        mdToHtml('a').each(function(indice, elemento){
            axios.get(`${elemento.attributes[0].value}`)
            .then((response)=>{
                console.log(`${indice}  ${elemento.children[0].nodeValue} ${elemento.attributes[0].value}
                ${response.status} ${response.statusText}`)
            })
            .catch((error)=>{
                let errorName=`'${error}'`;
                if (error==`AxiosError: Request failed with status code 404`){
                console.log(`${indice}  ${elemento.children[0].nodeValue} ${elemento.attributes[0].value}
                404 FAIL`) 
                } else if (errorName.includes('ENOTFOUND')== true){
                    console.log(`${indice}  ${elemento.children[0].nodeValue} ${elemento.attributes[0].value}
                not found page FAIL`) 
                } else {console.log(`${indice}  ${elemento.children[0].nodeValue} ${elemento.attributes[0].value}
                ${error}`)}    
            })
        })
    } else {
        console.log(`Error: ${error}`)
    }
    })
    }
mdLinks2('readmeExample.md');


module.exports = () => {
    mdLinks
  };
  