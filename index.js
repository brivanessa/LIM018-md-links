//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
const path = require('path');
// En consola : npm install  marked 
const marked = require('marked'); //HTML
const cheerio = require('cheerio'); //ELEMENT
const axios = require('axios'); //BREAK
//      format
const colors = require('colors');

// PATH
const docEjem ='HOLIS';
const docEjem2= "readmeExample.md";

// LA RUTA EXISTE           *************************************************************
const existRoute =(route) => fs.existsSync(route)

// RUTA ABSOLUTA Y NORMALIZADA **********************************************************
function pathGlobal(routaInput){
    return path.normalize(path.isAbsolute(routaInput)?routaInput:path.resolve(routaInput));
}

// PARA LEER ARCHIVOS DE UN DIRECTORIO: ARCHIVOS MD *************************************
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
    // pathRead(docEjem);
    // setTimeout(()=>{ console.log(docslist)},3000)

// MD LINKS LISTA DE LINKS ************************************************************
let docslistLinks=[];
const mdLinks1 = (document) => {
    fs.readFile(document,'utf-8',(error,data)=>{
        if (!error){
            let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
            mdToHtml('a').each(function(indice, elemento){
               return(docslistLinks.push({
                 'link': `${indice+1}/${mdToHtml('a').length}`,
                 'href': `${elemento.attributes[0].value}`,
                 'text': `${elemento.children[0].nodeValue}`,
                 'file': `${path.basename(document)}`,
                 'route': `${pathGlobal(document)}`,
               }))
            })
        } 
    })
} 
// mdLinks1('readmeExample.md');
// setTimeout(()=>{console.log(docslistLinks)},3000)

// MD LINKS STATUS CODE     *************************************************************
let docslistLinks2=[];
const mdLinks2 = (document) => {
    fs.readFile(document,'utf-8',(error,data)=>{
    if (!error){
        let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
        mdToHtml('a').each(function(indice, elemento){
            axios.get(`${elemento.attributes[0].value}`)
            .then((response)=>{
                return(docslistLinks2.push({
                    'link': `${indice+1}/${mdToHtml('a').length}`,
                    'href': `${elemento.attributes[0].value}`,
                    'text': `${elemento.children[0].nodeValue}`,
                    'file': `${path.basename(document)}`,
                    'route': `${pathGlobal(document)}`,
                    'status': `${response.status}`,
                    'result':  `${response.statusText}`,
                  }))
            })
            .catch((error)=>{
                return(docslistLinks2.push({
                    'link': `${indice+1}/${mdToHtml('a').length}`,
                    'href': `${elemento.attributes[0].value}`,
                    'text': `${elemento.children[0].nodeValue}`,
                    'file': `${path.basename(document)}`,
                    'route': `${pathGlobal(document)}`,
                    'status': `${error}`,
                    'result':  `FAIL`,
                })) 
            })
        })
    } 
    })
    }
// mdLinks2('readmeExample.md');
// setTimeout(()=>{console.log(docslistLinks2)},3000)

// CREANDO PROMESAS => MDLINKS *************************************************************
const mdLinks = (route,elements) => {
    return new Promise((res,rej) => {
        if ( (!!elements==false) && existRoute(route)) {
            pathRead(route);
            setTimeout(()=>{
                docslist.map((item)=>{return mdLinks1(item)})
            },1000)
            setTimeout(()=>{  
                console.log(`***************************************************************`.yellow)
                console.log(`   mdLinks ---------- mdLinks(${route.bgGreen}) ----------- mdLinks ` )
                console.log(`***************************************************************`.yellow)
                res(docslistLinks);
            },2000)
        } else if ( (elements.validate==false) && existRoute(route)) {
            pathRead(route);
            setTimeout(()=>{
                docslist.map((item)=>{return mdLinks1(item)})
            },1000)
            setTimeout(()=>{  
                console.log(`*******************************************************************`.yellow)
                console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:false}'.bgRed}) ----- mdLinks ` )
                console.log(`*******************************************************************`.yellow)
                res(docslistLinks);
            },2000)
        } else if ( (elements.validate==true) && existRoute(route)) {
            pathRead(route);
            setTimeout(()=>{
                docslist.map((item)=>{return mdLinks2(item)})
            },1000)
            setTimeout(()=>{  
                console.log(`*******************************************************************`.yellow)
                console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:true}'.bgBlue}) ----- mdLinks ` )
                console.log(`*******************************************************************`.yellow)
                res(docslistLinks2);
            },5000)
        } else {
            rej('La ruta no existe..')
        }
    })
}








module.exports = {
    mdLinks
  };
  