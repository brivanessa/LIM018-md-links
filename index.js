//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
// const { promises } =require ('fs');
const path = require('path');
// En consola : npm install  marked 
const marked = require('marked'); //HTML
const cheerio = require('cheerio'); //ELEMENT
const axios = require('axios'); //BREAK
//      format
const colors = require('colors');
const { doesNotMatch } = require('assert');

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
let error2 = 'la carpeta o ruta no existen'
let error3 = 'no hay archivos .md en la carpeta'
let error4 = 'no hay folders en la carpeta'

//          PASO 1: LISTA DE ARCHIVOS DE UN DIRECTORIO *************************************
function readFolder(ruta){
    let rutaAbsoluta =  pathGlobal(ruta);
    if (existRoute(rutaAbsoluta)==true){
        return (fs.readdirSync(ruta).length === 0)?(error1): fs.readdirSync(ruta).map(doc=>{return path.join(rutaAbsoluta,doc)});
    } else {return (error2)}
}
//          PASO 2: LISTA DE ARCHIVOS MD DE UN DIRECTORIO *************************************
function pathReadMd(carpetaArray){ 
    let mdFiles = carpetaArray.filter(doc => {return(path.extname(doc)==='.md')});
        if (mdFiles.length === 0){ 
            return(error3)
        } else {
            mdFiles.map(doc=>{return docslist.push(doc)})
            return mdFiles
        }
}
//          PASO 3: LISTA DE CARPETAS DE UN DIRECTORIO *************************************
function pathReadFolders(carpetaArray){ 
    let folders = carpetaArray.filter(doc => {return(!!path.extname(doc)==false)});
        if (folders.length === 0){ 
            return(error4);
        } else {return folders}
}
//          PASO 4: LISTA DE ARCHIVOS DE UN DIRECTORIO CON RECURSIVIDAD *************************************
const  pathRead = (ruta) => { 
    return new Promise((res,rej) => {
        if (readFolder(ruta)==error1){
            rej(`${error1}`);
        } else if (readFolder(ruta)==error2){
            rej(`${error2}`);
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
        } 
    })}

//console.log(pathRead('carpeta'))
//console.log(pathRead('folderFiles0'))
//console.log(pathRead('folderFilesNoMd'))
//console.log(pathRead('folderTestOneFileMd'))

const pathReadFile = (ruta)=> { 
    return new Promise((res,rej) => {
        if(path.extname(ruta)==='.md'){
            docslist.push(pathGlobal(ruta))
            res(pathGlobal(ruta))
        } else {rej('no es un archivo .md...')}  
    })}

//console.log(pathReadFile('readmeExample.md'))

// MD LINKS LISTA DE LINKS ************************************************************
let doclistLinks=[];
const readmdLinks=(document) => {
    return new Promise ((res,rej)=>{
        if (fs.readFileSync(document,'utf-8')===''){
            rej('el archivo esta vacio')
        } else {
            let data = fs.readFileSync(document,'utf-8')
            let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
            mdToHtml('a').each(function(indice, elemento){
                doclistLinks.push({
                  'link': `${indice+1}/${mdToHtml('a').length}`,
                  'href': `${elemento.attributes[0].value}`,
                  'text': `${elemento.children[0].nodeValue}`,
                  'file': `${path.basename(document)}`,
                  'route': `${pathGlobal(document)}`,
                })
                res(doclistLinks)
             })
        }
    })
}
//console.log(readmdLinks('readmeExample.md'));

// MD LINKS STATUS CODE     *************************************************************
//          Links *************************+
let docsLinkStatus=[];
let linksGlobal=[];
const readmdLinksGlobal= (document) => {
    return new Promise ((res,rej)=>{
        if (fs.readFileSync(document,'utf-8')===''){
            rej('el archivo esta vacio')
        } else {
            let data = fs.readFileSync(document,'utf-8')
            let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
         mdToHtml('a').each( function(indice,elemento){
            linksGlobal.push(elemento.attributes[0].value) 
            res((linksGlobal))
             })
        }
    })
}
//console.log(readmdLinksGlobal('readmeExample.md'));


// MD LINKS STATS     *************************************************************
//           *************************+
let statLinks=[];
// function statsOption (arrayLinks){
//     statLinks.push(
//         { 'Total': `${arrayLinks.length}`,
//         'Unique': `${[...new Set(arrayLinks)].length}`})
//     return statLinks   
//     }
//     console.log(statsOption([
//       'https://es.wikipedia.org/wiki/Markdown',
//       'https://es.wikipedia.org/wiki/Markdown',
//       'http://nodejs.og/',
//       'https://www.lego.com/en-us/notfound',
//       'https://blueg.co.uk/404'
//     ]));

const statslinksGlobal= async(document) => {
    let arrayLinks = await (readmdLinksGlobal(document))
    //console.log(arrayLinks)
    statLinks.push(
        { 'Total': `${arrayLinks.length}`,
        'Unique': `${[...new Set(arrayLinks)].length}`})
    return statLinks   
}
const functionGlobal = async()=>{
console.log('hola', await statslinksGlobal('readmeExample.md'));
}
//await statslinksGlobal('readmeExample.md')
console.log(functionGlobal());
//setTimeout(()=>{console.log(statLinks)},3000)

/*
// const  statsOption = (arrayLinks)=>{
//     return new Promise((res,rej)=>{
//         if(arrayLinks.length >0) {
//             statLinks.push(
//                 { 'Total': `${arrayLinks.length}`,
//                 'Unique': `${[...new Set(arrayLinks)].length}`})
//             res(statLinks)
//         } else{
//             rej('no hay links para analizar')
//         }
//     })
  
//     }
//     console.log(statsOption([
//       'https://es.wikipedia.org/wiki/Markdown',
//       'https://es.wikipedia.org/wiki/Markdown',
//       'http://nodejs.og/',
//       'https://www.lego.com/en-us/notfound',
//       'https://blueg.co.uk/404'
//     ]));

//console.log(statsOptionGlobal('readmeExample.md'));
*/
//          Status *************************+
const readmdLinkStatus= async(document) => {
    let linksArray = await (readmdLinksGlobal(document))
    //console.log(linksArray)
    linksArray.map((link)=> {
       axios.get(`${link}`)
        .then( (response)=>{
            return (docsLinkStatus.push({
                'href': `${link}`,
               // 'text': `${elemento.children[0].nodeValue}`,
                'file': `${path.basename(document)}`,
                'route': `${pathGlobal(document)}`,
                'status': `${ response.status}`,
                'result':  `${response.statusText}`,
            }))
         })
        .catch((error)=>{
            return (docsLinkStatus.push({
                'href': `${link}`,
               // 'text': `${elemento.children[0].nodeValue}`,
                'file': `${path.basename(document)}`,
                'route': `${pathGlobal(document)}`,
                'status': `${error}`,
                'result':  `FAIL`,
            })) 
        })
        return (docsLinkStatus) 
         })
}

//readmdLinkStatus('readmeExample.md');
//console.log(readmdLinkStatus('readmeExample.md'))
//setTimeout(()=>{console.log(docsLinkStatus)},1000)



/*
const readmdLinkStatus= (document) => {
  return new Promise ((res,rej)=>{
    (readmdLinksGlobal(document))
    .then(data =>{return readmdLinks(data)})
    .catch(error => console.log(error))
    docsLinkStatusLink.map((link)=> {
            axios.get(`${link}`)
            .then( (response)=>{
                return (docsLinkStatus.push({
                    'href': `${link}`,
                // 'text': `${elemento.children[0].nodeValue}`,
                    //'file': `${path.basename(document)}`,
                    'route': `${pathGlobal(document)}`,
                    'status': `${ response.status}`,
                    'result':  `${response.statusText}`,
                }))
            })
            .catch((error)=>{
                return (docsLinkStatus.push({
                    'href': `${link}`,
                // 'text': `${elemento.children[0].nodeValue}`,
                   // 'file': `${path.basename(document)}`,
                    'route': `${pathGlobal(document)}`,
                    'status': `${error}`,
                    'result':  `FAIL`,
                })) 
            })
            return (docsLinkStatus) 
        })
        res(docsLinkStatus) 
    })
}
readmdLinkStatus('readmeExample.md');
///console.log(readmdLinkStatus('readmeExample.md'))
setTimeout(()=>{console.log(docsLinkStatus)},3000)
*/
// CREANDO PROMESAS => MDLINKS *************************************************************
const mdLinks = (route,elements) => {
    return new Promise((res,rej) => {
        if (!!elements==false) {
         console.log(`***************************************************************`.yellow)
         console.log(`   mdLinks ---------- mdLinks(${route.bgGreen}) ----------- mdLinks ` )
         console.log(`***************************************************************`.yellow)
            if(path.extname(route)=='.md'&& existRoute(route)){
                pathReadFile(route)
                .then(data =>{return readmdLinks(data)})
                .catch(error => console.log(error))
                res(doclistLinks)
            }    
            else{
                pathRead(route)
                .then(data => data.map((item)=>{return readmdLinks(item)}))
                .catch(data=>console.log(data))
                res(doclistLinks)
            } 
        } else if (elements.validate==false) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:false}'.bgRed}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md'&& existRoute(route)){
                pathReadFile(route)
                .then(data =>{
                    
                    return readmdLinks(data)})
                .catch(error => console.log(error))
                res(doclistLinks)
            }    
            else{
                pathRead(route)
                .then(data => data.map((item)=>{return readmdLinks(item)}))
                .catch(data=>console.log(data))
                res(doclistLinks)
            } 
        
        } else if (elements.stats==true) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{stats}'.bgYellow}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md'&& existRoute(route)){
                pathReadFile(route)
                .then(data =>{ return statsOption(readmdLinksGlobal(data))})
                .catch(error => console.log(error))
                res()

            }    
            else{
                pathRead(route)
                .then(data =>{ return statsOption(readmdLinksGlobal(data))})
                .catch(error => console.log(error))
                res()
            } 
            
        } else if  (elements.validate==true) {

            if(path.extname(route)=='.md'&& existRoute(route)){
                pathReadFile(route)
                .then(data =>{return readmdLinkStatus(data)})
                .catch(error => console.log(error))
            }    
            else{
                pathRead(route)
                .then(data => data.map((item)=>{return readmdLinkStatus(item)}))
                .catch(data=>console.log(data))
            } 
            //res(docsLinkStatus)
 
            setTimeout(()=>{  
                console.log(`*******************************************************************`.yellow)
                console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:true}'.bgBlue}) ----- mdLinks ` )
                console.log(`*******************************************************************`.yellow)
                 res(docsLinkStatus);
            },20000)
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
    pathReadFolders,
    pathRead,
    readmdLinksGlobal,
    pathReadMd,
    readmdLinks,
    readmdLinkStatus,
    statslinksGlobal,
  };
  