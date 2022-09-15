//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
const { promises } =require ('fs');
const path = require('path');
// En consola : npm install  marked 
const marked = require('marked'); //HTML
const cheerio = require('cheerio'); //ELEMENT
const axios = require('axios'); //BREAK
//      format
const colors = require('colors');

// PATH

// LA RUTA EXISTE           *************************************************************
const existRoute =(route) => fs.existsSync(route)

// RUTA ABSOLUTA Y NORMALIZADA **********************************************************
function pathGlobal(routaInput){
    return path.normalize(path.isAbsolute(routaInput)?routaInput:path.resolve(routaInput));
}

// PARA LEER ARCHIVOS DE UN DIRECTORIO: ARCHIVOS MD *************************************
let docslist=[];
let error1 = 'no hay archivos en la carpeta'
let error2 = 'la carpeta no existe'
let error3 = 'no hay archivos .md en la carpeta'
let error4 = 'no hay folders en la carpeta'
function readFolder(ruta){
    let rutaAbsoluta =  pathGlobal(ruta);
    if (existRoute(rutaAbsoluta)==true){
        return (fs.readdirSync(ruta).length === 0)?(error1): fs.readdirSync(ruta).map(doc=>{return path.join(rutaAbsoluta,doc)});
    } else {return (error2)}
}

function pathReadMd(carpetaArray){ 
    let mdFiles = carpetaArray.filter(doc => {return(path.extname(doc)==='.md')});
        if (mdFiles.length === 0){ 
            return(error3)
        } else {
            mdFiles.map(doc=>{return docslist.push(doc)})
            return mdFiles
        }
}

function pathReadFolders(carpetaArray){ 
    let folders = carpetaArray.filter(doc => {return(!!path.extname(doc)==false)});
        if (folders.length === 0){ 
            return(error4);
        } else {return folders}
}

const  pathRead = (ruta) => { 
    return new Promise((res,rej) => {
        if (readFolder(ruta)==error1){
            res(`${error1}`);
        } else if (readFolder(ruta)==error2){
            res(`${error2}`);
        // } else if (pathReadMd(readFolder(ruta))==error3){
        //     res(`${error3}`);
        }else if ((readFolder(ruta)!=error1)||(readFolder(ruta)!=error2)){
            let archivos = readFolder(ruta);
                pathReadMd(archivos);
            let folders = pathReadFolders(archivos);
            if  (folders!=error4){
                folders.map(doc=>{ return (pathRead(doc))})
            }
            res(docslist);
        } else {rej('Se presento algun error...')}
        
    })}

//console.log(pathRead('carpeta'))
//console.log(pathRead('folderFiles0'))
//console.log(pathRead('folderFilesNoMd'))
//console.log(pathRead('folderTestOneFileMd'))
//const archivoMd = pathRead(archivos)
//console.log(archivos)


// function pathRead(ruta){ 
//     let rutaAbsoluta =  pathGlobal(ruta);
//     const routesMd = fs.readdir(ruta,(error,docs)=>{
//         if(!error){
//             let docs3=docs.map(doc=>{return path.join(rutaAbsoluta,doc)});
//             console.log('maria')
//             docs3.filter(doc => {
//                 if(path.extname(doc)==='.md'){
//                     docslist.push(doc);
//                     return doc
//                 }});
//             let docs5=docs3.filter(doc => {return !!path.extname(doc)==false});
//             docs5.map(doc=>{ return (pathRead(doc))})
//         }
//     })
//     return routesMd
// }
// pathRead('readmeExample.md');
// setTimeout(()=>{ console.log(docslist)},3000)

const pathReadFile = (ruta)=> { 
    if(path.extname(ruta)==='.md'){
        docslist.push(pathGlobal(ruta))
        return pathGlobal(ruta)
    }
};
// pathReadFile('readmeExample.md');
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
            (path.extname(route)=='.md')?pathReadFile(route):pathRead(route);
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
            (path.extname(route)=='.md')?pathReadFile(route):pathRead(route);
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
            (path.extname(route)=='.md')?pathReadFile(route):pathRead(route);
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
    mdLinks,
    existRoute,
    pathGlobal,
    pathReadFile,
    pathRead,
    mdLinks1,
    mdLinks2
  };
  