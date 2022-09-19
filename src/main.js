//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
const path = require('path');
//....
const marked = require('marked'); //HTML // En consola : npm install  marked 
const cheerio = require('cheerio'); //ELEMENT
const axios = require('axios'); //BREAK
const colors = require('colors');
// LA RUTA EXISTE          YES TEST *****************************************
const existRoute =(route) => fs.existsSync((route))
//console.log(existRoute('../carpeta'))
// RUTA ABSOLUTA Y NORMALIZADA    YES TEST **********************************
function pathGlobal(routaInput){
    return path.normalize(path.isAbsolute(routaInput)?routaInput:path.resolve(routaInput));
}
// LEER ARCHIVOS DE UN DIRECTORIO: ARCHIVOS MD *******************************
let docslist=[];
let error1 = 'no hay archivos en la carpeta'
let error2 = 'la carpeta o ruta no existen'
let error3 = 'no hay archivos .md en la carpeta'
let error4 = 'no hay folders en la carpeta'

//          PASO 1: LISTA DE ARCHIVOS DE UN DIRECTORIO ************************
function readFolder(ruta){
    let rutaAbsoluta = pathGlobal(ruta);
    if (existRoute(rutaAbsoluta)==true){
        return (fs.readdirSync(ruta).length === 0)?(error1): fs.readdirSync(ruta).map(doc=>{return path.join(rutaAbsoluta,doc)});
    } else {return (error2)}
}
//          PASO 2: LISTA DE ARCHIVOS MD DE UN DIRECTORIO  YES TEST ***********
function pathReadMd(carpetaArray){ 
    let mdFiles = carpetaArray.filter(doc => {return(path.extname(doc)==='.md')});
        if (mdFiles.length === 0){ 
            return(error3)
        } else {
            mdFiles.map(doc=>{return docslist.push(doc)})
            return mdFiles
        }
}
//          PASO 3: LISTA DE CARPETAS DE UN DIRECTORIO  YES TEST **************
function pathReadFolders(carpetaArray){ 
    let folders = carpetaArray.filter(doc => {return(!!path.extname(doc)==false)});
        if (folders.length === 0){ 
            return(error4);
        } else {return folders}
}
//          PASO 4:  ARCHIVOS CON RECURSIVIDAD  YES TEST ***********************
const  pathRead = (ruta) => { 
        if (readFolder(ruta)==error1){
            return(`${error1}`);
        } else if (readFolder(ruta)==error2){
            return(`${error2}`);
        // } else if (pathReadMd(readFolder(ruta))==error3){
        //     return(`${error3}`);
        }else if ((readFolder(ruta)!=error1)||(readFolder(ruta)!=error2)){
            let archivos = readFolder(ruta);
                pathReadMd(archivos);
            let folders = pathReadFolders(archivos);
            if  (folders!=error4){
                folders.map(doc=>{ return (pathRead(doc))})
            }
            return(docslist);
        } 
    }
//console.log(pathRead('../carpeta'))
//console.log(pathRead('../folderFiles0'))
//console.log(pathRead('../folderFilesNoMd'))
//console.log(pathRead('../folderTestOneFileMd'))

// LEER ARCHIVOS ARCHIVOS MD           YES TEST*******************************
const pathReadFile = (ruta)=> { 
 //   return new Promise((res,rej) => {
        if(path.extname(ruta)==='.md'){
            docslist.push(pathGlobal(ruta))
            return(pathGlobal(ruta))
        } else {return('no es un archivo .md...')}  
   // })
}
//console.log(pathReadFile('../readmeExample.md'))
//console.log(pathReadFile('../thumb.png'))

// MD LINKS LISTA DE LINKS ***YES TEST (CAMBIAR fs.Sync)***********************
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

// MD LINKS STATS LISTA DE LINKS CON PROMESAS *******************************
let linksGlobal=[];
/*                  PASO 1: convertir Md a HTML       YES TEST **************/
const converMdToHtml = (documentHtml) => {
    //return new Promise((res,rej)=> {
        if(documentHtml!=''){
            let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${documentHtml}**.`));
            mdToHtml('a').each( function(indice,elemento){
                return linksGlobal.push(elemento.attributes[0].value)   
            })
            //console.log(linksGlobal)
            return(linksGlobal)
        } else {return('no hay links...')}
    //})
}
//console.log(converMdToHtml(`[Node.js](http://nodejs.og/)`))
/*                  PASO 2: LEER .MD               YES TEST **************/
const readDocuments = (document) => { 
    // return new Promise((res,rej)=>{
        return fs.promises.readFile(document,'utf-8')
        .then(data => { 
            return(data)
            //return((data))
        }) 
        .catch(error=>{
            return((`${error.code}`=='ENOENT')?(`${error.code}: el archivo no existe`):`${error.code}`)
            //return(((error.code)=='ENOENT')?(`${error.code}: el archivo no existe`):`${error.code}`)
        })
    // })  
}
/*                  PASO3: STATS DE LINKS              YES TEST **************/
let statLinks;
const statsArrayGlobal= (arrayLinks) => {
    if(typeof(arrayLinks)=='object'){
        statLinks= 
            { 'Total': `${arrayLinks.length}`,
            'Unique': `${[...new Set(arrayLinks)].length}`}
        return(statLinks)    
    }
    else{return('...no se puede analizar')}
}

/******** GLOBAL
//readDocuments('../readmeAllOkLinks.md')
//readDocuments('../readmeVaciodd.txt')
readDocuments('')
//readDocuments('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md')
        .then(data => { 
            let linksDelMd=converMdToHtml(data)
            console.log(statsArrayGlobal(linksDelMd))
            return (statsArrayGlobal(linksDelMd))
        }) 
        .catch(error=>{ return error })    

*/
// MD LINKS STATUS CODE     *************************************************************
//          Status *************************+

let docsLinkStatusOk;
let docsLinkStatusFail; 
let linksExamples= [
    'https://es.wikipedia.org/wiki/Markdown',
    'https://es.wikipedia.org/wiki/Markdown',
    'https://www.kualo.co.uk/404',
    'https://www.kualo.co.uk/404',
    'http://nodejs.org/',
    'https://blueg.co.uk/404'
    ]
const readmdLinkdeMd = (document) => {
    return readDocuments(document)
        .then(data => { 
            //console.log(data)
            return(converMdToHtml(data))   
        })
        .catch(error=>{ return error }) 
        .then(data => { 
            //return(readmdLinkStatus(data))   
            return Promise.all(data.map((link)=>{
                return axios.get(link)
                .then( (response)=>{
                    docsLinkStatusOk=({
                        
                        'href': `${link}`,
                        'status': `${response.status}`,
                        'result':  `${response.statusText}`,  
                    })
                    return (docsLinkStatusOk)
                })
                .catch((error) => {
                   if (error.response) {
                       docsLinkStatusFail=({
                            'href': `${link}`,
                            'status': `${error.response.status}`,
                            'result':  `FAIL`,
                        })
                        return (docsLinkStatusFail)
                    } else if (error.request) {
                        docsLinkStatusFail=({
                            'href': `${link}`,
                            'status': `${error.request.status}: no se recibió respuesta`,
                            'result':  `FAIL`,
                        })
                        return(docsLinkStatusFail)
                    } else {
                        docsLinkStatusFail=({
                            'href': `${link}`,
                            'status': `${error.message}`,
                            'result':  `FAIL`,
                        })
                        return(docsLinkStatusFail)
                    } 
                }); 
            }))
        })
        .catch(error=>{ return error }) 
    }
/*
const readmdLinkStatus = (links) => {
        return Promise.all(links.map((link)=>{
            return axios.get(link)
            .then( (response)=>{
                docsLinkStatusOk=({
                    'href': `${link}`,
                    'status': `${response.status}`,
                    'result':  `${response.statusText}`,  
                })
                return (docsLinkStatusOk)
            })
            .catch((error) => {
               if (error.response) {
                   docsLinkStatusFail=({
                        'href': `${link}`,
                        'status': `${error.response.status}`,
                        'result':  `FAIL`,
                    })
                    return (docsLinkStatusFail)
                } else if (error.request) {
                    docsLinkStatusFail=({
                        'href': `${link}`,
                        'status': `${error.request.status}: no se recibió respuesta`,
                        'result':  `FAIL`,
                    })
                    return(docsLinkStatusFail)
                } else {
                    docsLinkStatusFail=({
                        'href': `${link}`,
                        'status': `${error.message}`,
                        'result':  `FAIL`,
                    })
                    return(docsLinkStatusFail)
                } 
            }); 
        }))
} 
*/

//readmdLinkStatus('../readmeAllOkLinks.md')
//readmdLinkStatus('../readmeVaciodd.txt')
//readmdLinkStatus('')
//console.log(readmdLinkdeMd('../readmeExample.md'))

//console.log(readmdLinkStatus('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md'))
readmdLinkdeMd('../readmeExample.md')
    .then(data=>{
        console.log(data)
       //console.log(docsLinkStatusOk)
        ////return(data)   
    })
    .catch(error=>{
       console.log(error)
       //console.log(docsLinkStatusFail)
       //// return(error)
    })

// const readmdLinkStatus = (link) => {
//     //return new Promise ((res,rej)=> {
//             return axios.get(link)
//             .then( (response)=>{
//                 docsLinkStatusOk=({
//                     'href': `${link}`,
//                     'status': `${response.status}`,
//                     'result':  `${response.statusText}`,  
//                 })
//                 //console.log(docsLinkStatusOk)
//                 return (docsLinkStatusOk)
//             })
//             .catch((error) => {
//                if (error.response) {
//                    docsLinkStatusFail=({
//                         'href': `${link}`,
//                         'status': `${error.response.status}`,
//                         'result':  `FAIL`,
//                     })
//                     // console.log(docsLinkStatusFail)
//                     return (docsLinkStatusFail)
//                 } else if (error.request) {
//                     docsLinkStatusFail=({
//                         'href': `${link}`,
//                         'status': `${error.request.status}: no se recibió respuesta`,
//                         'result':  `FAIL`,
//                     })
//                     // console.log(docsLinkStatusFail)
//                     return(docsLinkStatusFail)
//                 } else {
//                     docsLinkStatusFail=({
//                         'href': `${link}`,
//                         'status': `${error.message}`,
//                         'result':  `FAIL`,
//                     })
//                     //console.log(docsLinkStatusFail)
//                     return(docsLinkStatusFail)
//                 } 
//                     //console.log(docsLinkStatusFail)

//             }); 
//      //})
// }    



//let linksExamples=['https://es.wikipedia.org/wiki/Markdown'];
// let linksExamples= [
//   'https://es.wikipedia.org/wiki/Markdown',
//   'https://es.wikipedia.org/wiki/Markdown',
//   'https://www.kualo.co.uk/404',
//   'https://www.kualo.co.uk/404',
//   'http://nodejs.org/',
//   'https://blueg.co.uk/404'
//   ]

/* LINKS UNO POR UNO *******************************************
readmdLinkStatus(linksExamples)
    .then(data=>{
        console.log(data)
       //console.log(docsLinkStatusOk)
        ////return(data)   
    })
    .catch(error=>{
       console.log(error)
       //console.log(docsLinkStatusFail)
       //// return(error)
    })
//*/

//********MDLINKS

/* ////USANDO PRIMISE ALL
const allLinks =(links)=>{
    return Promise.all(
     links.map((link)=>{
         console.log(link)
         return readmdLinkStatus(link)})
    ) 
 } 
allLinks(linksExamples)
.then(data=>{
    console.log(data)
   //console.log(docsLinkStatusOk)
   //// return(data)   
})
.catch(error=>{
    console.log(error)
   //console.log(docsLinkStatusFail)
   //// return(error)
})
*/



module.exports = {
    //mdLinks,
    existRoute,
    pathGlobal,
    pathReadFile,
    pathReadFolders,
    pathRead,
    converMdToHtml,
    pathReadMd,
    readmdLinks,
    //readmdLinkStatus,
    statsArrayGlobal,
    readDocuments,
    doclistLinks,
    statLinks,
    //functionGlobalStats,
  };
  