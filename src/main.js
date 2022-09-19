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

// LEER ARCHIVOS ARCHIVOS MD           YES TEST*******************************
const pathReadFile = (ruta)=> { 
    return new Promise((res,rej) => {
        if(path.extname(ruta)==='.md'){
            docslist.push(pathGlobal(ruta))
            res(pathGlobal(ruta))
        } else {rej('no es un archivo .md...')}  
    })}
//console.log(pathReadFile('readmeExample.md'))

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
    return new Promise((res,rej)=>{
        fs.promises.readFile(document,'utf-8')
        .then(data => { 
            res(data)
            //return((data))
        }) 
        .catch(error=>{
            rej((`${error.code}`=='ENOENT')?(`${error.code}: el archivo no existe`):`${error.code}`)
            //return(((error.code)=='ENOENT')?(`${error.code}: el archivo no existe`):`${error.code}`)
        })
    })  
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

//******** GLOBAL
// const readmdLinksGlobal = (document) => {   
//     return readDocuments(document)
//         .then(data => { return  converMdToHtml(data) }) 
//         .catch(error=>{ return error })    
//         .then(data => { 
//             //console.log(data)
//             //console.log(statslinksGlobal(data))
//             return (statsArrayGlobal(data))
//         }) 
//         .catch(error => { 
//             //console.log(error)
//             //return (error)
//             return (error)
//         })           
// }

// //readmdLinksGlobal('readmeVacio.md')
// readmdLinksGlobal('readmeExample.md')
// .then(data=>{
//     console.log(data)
//     return(data)}    
// )
// .catch(error=>{
//     console.log(error)
//     return(error)}
// )

// MD LINKS STATUS CODE     *************************************************************
//          Status *************************+

let docsLinkStatusOk=[];
let docsLinkStatusFail=[];

const readmdLinkStatus = (link) => {
    console.log(link)
    return new Promise ((res,rej)=> {
            return axios.get(link)
            .then( (response)=>{
                docsLinkStatusOk.push({
                    'href': `${link}`,
                    'status': `${response.status}`,
                    'result':  `${response.statusText}`,  
                })
                //console.log(docsLinkStatusOk)
                res(docsLinkStatusOk)
            })
            .catch((error) => {
               if (error.response) {
                   docsLinkStatusFail.push({
                        'href': `${link}`,
                        'status': `${error.response.status}`,
                        'result':  `FAIL`,
                    })
                    // console.log(docsLinkStatusFail)
                    rej (docsLinkStatusFail)
                } else if (error.request) {
                    docsLinkStatusFail.push({
                        'href': `${link}`,
                        'status': `${error.request.status}: no se recibió respuesta`,
                        'result':  `FAIL`,
                    })
                    // console.log(docsLinkStatusFail)
                    rej(docsLinkStatusFail)
                } else {
                    docsLinkStatusFail.push({
                        'href': `${link}`,
                        'status': `${error.message}`,
                        'result':  `FAIL`,
                    })
                    //console.log(docsLinkStatusFail)
                    rej(docsLinkStatusFail)
                } 
                    //console.log(docsLinkStatusFail)

            }); 
     })
}    



//let linksExamples=['https://es.wikipedia.org/wiki/Markdown'];
let linksExamples= [
  //'https://es.wikipedia.org/wiki/Markdown',
  //'https://es.wikipedia.org/wiki/Markdown',
  //'https://www.kualo.co.uk/404',
  'https://www.kualo.co.uk/404',
  //'http://nodejs.og/',
  //'https://blueg.co.uk/404'
  ]

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
        /////return(error)
    })
*/

///* STATUS ARRAY DE LINKS ***********************************
readDocuments('../readmeAllOkLinks.md')
//readDocuments('../readmeExample.md')
    .then(data=>{
       //console.log(data)
        const linksArray=(converMdToHtml(data))  
        console.log(linksArray) 
    })
    .catch(error=>{
        //console.log(error)
        return(error)
    })
    // .then(data=>{
    //     //console.log(data)
    //      return data.map((link)=>{
    //          console.log('aqui',readmdLinkStatus(link))
    //          return readmdLinkStatus(link)})
    //  })
    //  .catch(error=>{
    //     //console.log(error)
    //     return(error)
    // })
    // .then(data=>{
    //     //console.log(data)
    //     //console.log(docsLinkStatusFail)
    //      return (data)
    //  })
    //  .catch(error=>{
    //     //console.log(error)
    //     return(error)
    // })
//*/
//********MDLINKS

/* ////USANDO PRIMISE ALL
const allLinks =(links)=>{
    return Promise.all(
     links.map((link)=>{
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



/* CREANDO PROMESAS => MDLINKS *************************************************************
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
                .catch(error=>console.log(error))
                res(doclistLinks)
            } 
        } else if (elements.validate==false) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:false}'.bgRed}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md'&& mainFunctions.existRoute(route)){
                mainFunctions.pathReadFile(route)
                .then(data =>{return mainFunctions.readmdLinks(data)})
                .catch(error => console.log(error))
                res(doclistLinks)
            }    
            else{
                mainFunctions.pathRead(route)
                .then(data => data.map((item)=>{return mainFunctions.readmdLinks(item)}))
                .catch(data=>console.log(data))
                res(doclistLinks)
            } 
        
        } else if (elements.stats==true) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{stats}'.bgYellow}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md'&& mainFunctions.existRoute(route)){
                mainFunctions.pathReadFile(route)
                .then(data =>{ return mainFunctions.statsOption(mainFunctions.readmdLinksGlobal(data))})
                .catch(error => console.log(error))
                res()
            }    
            else{
                pathRead(route)
                .then(data =>{ return mainFunctions.statsOption(mainFunctions.readmdLinksGlobal(data))})
                .catch(error => console.log(error))
                res()
            } 
            
        } else if  (elements.validate==true) {

            if(path.extname(route)=='.md'&& mainFunctions.existRoute(route)){
                pathReadFile(route)
                .then(data =>{return readmdLinkStatus(data)})
                .catch(error => console.log(error))
            }    
            else{
                pathRead(route)
                .then(data => data.map((item)=>{return mainFunctions.readmdLinkStatus(item)}))
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
    readmdLinkStatus,
    statsArrayGlobal,
    readDocuments,
    doclistLinks,
    statLinks,
    //functionGlobalStats,
  };
  