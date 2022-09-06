//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
// En consola : npm install  marked 
const marked = require('marked');
const cheerio = require('cheerio');

const mdLinks = () => {
console.log('hola mundo')
fs.readFile('readmeExample.md','utf-8',(error,data)=>{
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

mdLinks();

module.exports = () => {
    mdLinks
  };
  