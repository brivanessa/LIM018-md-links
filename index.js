//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 

const path = require('path');
// En consola : npm install  marked 
const marked = require('marked'); //HTML
const cheerio = require('cheerio'); //ELEMENT
const axios = require('axios'); //BREAK
//      format
const colors = require('colors');
// const { doesNotMatch } = require('assert');

// PATH

// LA RUTA EXISTE          YES TEST *************************************************************
const existRoute =(route) => fs.existsSync(route)

// RUTA ABSOLUTA Y NORMALIZADA    YES TEST **********************************************************
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
//          PASO 2: LISTA DE ARCHIVOS MD DE UN DIRECTORIO  YES TEST *************************************
function pathReadMd(carpetaArray){ 
    let mdFiles = carpetaArray.filter(doc => {return(path.extname(doc)==='.md')});
        if (mdFiles.length === 0){ 
            return(error3)
        } else {
            mdFiles.map(doc=>{return docslist.push(doc)})
            return mdFiles
        }
}
//          PASO 3: LISTA DE CARPETAS DE UN DIRECTORIO  YES TEST *************************************
function pathReadFolders(carpetaArray){ 
    let folders = carpetaArray.filter(doc => {return(!!path.extname(doc)==false)});
        if (folders.length === 0){ 
            return(error4);
        } else {return folders}
}
//          PASO 4: LISTA DE ARCHIVOS DE UN DIRECTORIO CON RECURSIVIDAD  YES TEST *************************************
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

//****************************************** YES TEST*/
const pathReadFile = (ruta)=> { 
    return new Promise((res,rej) => {
        if(path.extname(ruta)==='.md'){
            docslist.push(pathGlobal(ruta))
            res(pathGlobal(ruta))
        } else {rej('no es un archivo .md...')}  
    })}

//console.log(pathReadFile('readmeExample.md'))

// MD LINKS LISTA DE LINKS ***YES TEST (CAMBIAR fs.Sync)************************************************************
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

// LINKS *************************+

let linksGlobal=[];
/*
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
console.log(readmdLinksGlobal('readmeExample.md'));
*/
/*   CON PROMESAS                              YES TEST */
const converMdToHtml = (documentHtml) => {
    return new Promise((res,rej)=> {
        if(documentHtml!=''){
            let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${documentHtml}**.`));
            mdToHtml('a').each( function(indice,elemento){
                return linksGlobal.push(elemento.attributes[0].value)   
            })
            //console.log(linksGlobal)
            res(linksGlobal)
        } else {rej('no hay links...')}
    })
}
//console.log(converMdToHtml(`[Node.js](http://nodejs.og/)`))
/// YES TEST
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


// MD LINKS STATS     *************************************************************
//           YES TEST*************************+
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
const readmdLinksGlobal = (document) => {   
    return readDocuments(document)
        .then(data => { 
            return  converMdToHtml(data)
        }) 
        .catch(error=>{
            return error
        })    
         .then(data => { 
            //console.log(data)
            //console.log(statslinksGlobal(data))
            return (statsArrayGlobal(data))
        }) 
        .catch(error => { 
            //console.log(error)
            //return (error)
            return (error)
        }) 
            
}


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
    // return new Promise ((res,rej)=> {
            return axios.get(`${link}`)
            .then( (response)=>{
                (docsLinkStatusOk.push({
                    'href': `${link}`,
                   // 'text': `${elemento.children[0].nodeValue}`,
                    //'file': `${path.basename(document)}`,
                    //'route': `${pathGlobal(document)}`,
                    'status': `${ response.status}`,
                    'result':  `${response.statusText}`,  
                }))
                return(docsLinkStatusOk)
            })
            .catch((error) => {
               if (error.response) {
                  // La respuesta fue hecha y el servidor respondió con un código de estado
                  // que esta fuera del rango de 2xx
                   (docsLinkStatusFail.push({
                        'href': `${link}`,
                    // 'text': `${elemento.children[0].nodeValue}`,
                        //'file': `${path.basename(document)}`,
                        //'route': `${pathGlobal(document)}`,
                        'status': `${error.response.status}`,
                        'result':  `FAIL`,
                    }))
                    return (docsLinkStatusFail)
                } else if (error.request) {
                  // La petición fue hecha pero no se recibió respuesta
                  // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
                  // http.ClientRequest en node.js
                  //console.log(error.request);
                    (docsLinkStatusFail.push({
                        'href': `${link}`,
                    // 'text': `${elemento.children[0].nodeValue}`,
                        //'file': `${path.basename(document)}`,
                        //'route': `${pathGlobal(document)}`,
                        'status': `${error.request}`,
                        'result':  `FAIL`,
                    }))
                    return (docsLinkStatusFail)
                } else {
                  // Algo paso al preparar la petición que lanzo un Error
                  //console.log('Error', error.message);
                    (docsLinkStatusFail.push({
                        'href': `${link}`,
                    // 'text': `${elemento.children[0].nodeValue}`,
                        //'file': `${path.basename(document)}`,
                        //'route': `${pathGlobal(document)}`,
                        'status': `error`,
                        'result':  `FAIL`,
                    }))
                    return (docsLinkStatusFail)
                } 
            }); 
    //  })
}  
  
const readmdLinkStatus3 = (link) => {
    return new Promise ((res,rej)=> {
            return axios.get(`${link}`)
            .then( (response)=>{
                docsLinkStatusOk.push({
                    'href': `${link}`,
                    'status': `${ response.status}`,
                    'result':  `${response.statusText}`,  
                })
                res(docsLinkStatusOk)
            })
            .catch((error) => {
               if (error.response) {
                   docsLinkStatusFail.push({
                        'href': `${link}`,
                        'status': `${error.response.status}`,
                        'result':  `FAIL`,
                    })
                    rej (docsLinkStatusFail)
                } else if (error.request) {
                    docsLinkStatusFail.push({
                        'href': `${link}`,
                        'status': `${error.request.status}: no se recibió respuesta`,
                        'result':  `FAIL`,
                    })
                    rej(docsLinkStatusFail)
                } else {
                    docsLinkStatusFail.push({
                        'href': `${link}`,
                        'status': `${error.message}`,
                        'result':  `FAIL`,
                    })
                    rej(docsLinkStatusFail)
                } 
            }); 
     })
}    

///*
//let linksExamples=['https://es.wikipedia.org/wiki/Markdown'];
// let linksExamples= [
//   //'https://es.wikipedia.org/wiki/Markdown',
//   //'https://es.wikipedia.org/wiki/Markdown',
//   //'https://www.kualo.co.uk/404',
//     'https://www.kualo.co.uk/404',
//   //'http://nodejs.og/',
//   //'https://blueg.co.uk/404'
//   ]

//   const xxx =async (document)=>{
//     console.log(await readmdLinkStatus(document))
//   }
//   xxx(linksExamples)
 
/*
readmdLinkStatus3(linksExamples)
    .then(data=>{
        console.log(data)
       // console.log(docsLinkStatusOk)
        return(data)}    
    )
    .catch(error=>{
        console.log(error)
       // console.log(docsLinkStatusFail)
        return(error)}
    )
*/  
// MD LINKS STATUS CODE  FINAL    *************************************************************

///******** GLOBAL 
let newArray =[]
let newArray2 =[]
let linksExamples2= [
   'https://es.wikipedia.org/wiki/Markdown',
    //'https://es.wikipedia.org/wiki/Markdown',
    'https://www.kualo.co.uk/404',
    //'https://www.kualo.co.uk/404',
    'http://nodejs.or/',
    //'https://blueg.co.uk/404'
    ]
//******** GLOBAL
const readmdLinksGlobal2 = (data) => {   
    return data.map((element) => {
        //console.log(`'${element}'`)
        return (readmdLinkStatus3(`${element}`))
        .then((data)=>{
             console.log(data)
            return(data)})  
        .catch(error=>{
            console.log(error)
             return(error)})
    })
}
 //}
    
// const impr = async(document)=>{
//     {console.log(await(readmdLinksGlobal2(document)))}
// };

// impr(linksExamples2)


let docsLinkStatus=[]
const readmdLinkStatusw= (linksArray) => {
    linksArray.map((link)=> {
       axios.get(`${link}`)
        .then( (response)=>{
            return (docsLinkStatus.push({
                'href': `${link}`,
               // 'text': `${elemento.children[0].nodeValue}`,
                //'file': `${path.basename(document)}`,
                //'route': `${pathGlobal(document)}`,
                'status': `${ response.status}`,
                'result':  `${response.statusText}`,
            }))
         })
        .catch((error)=>{
            return (docsLinkStatus.push({
                'href': `${link}`,
               // 'text': `${elemento.children[0].nodeValue}`,
                //'file': `${path.basename(document)}`,
                //'route': `${pathGlobal(document)}`,
                'status': `${error}`,
                'result':  `FAIL`,
            })) 
        })
        return (docsLinkStatus) 
         })
}

// readmdLinkStatusw(linksExamples2);
// //console.log(readmdLinkStatusw(linksExamples2))
// setTimeout(()=>{console.log(docsLinkStatus)},1000)
const impr = async(document)=>{
    readmdLinkStatusw(document)
    return console.log(await docsLinkStatus)
}

impr(linksExamples2)


///******** GLOBAL 
// const readmdLinkStatus= async(document) => {
//     let linksArray = await (readmdLinksGlobal(document))
//     //console.log(linksArray)
//     linksArray.map((link)=> {
//        axios.get(`${link}`)
//         .then( (response)=>{
//             return (docsLinkStatus.push({
//                 'href': `${link}`,
//                // 'text': `${elemento.children[0].nodeValue}`,
//                 'file': `${path.basename(document)}`,
//                 'route': `${pathGlobal(document)}`,
//                 'status': `${ response.status}`,
//                 'result':  `${response.statusText}`,
//             }))
//          })
//         .catch((error)=>{
//             return (docsLinkStatus.push({
//                 'href': `${link}`,
//                // 'text': `${elemento.children[0].nodeValue}`,
//                 'file': `${path.basename(document)}`,
//                 'route': `${pathGlobal(document)}`,
//                 'status': `${error}`,
//                 'result':  `FAIL`,
//             })) 
//         })
//         return (docsLinkStatus) 
//          })
// }

//readmdLinkStatus('readmeExample.md');
//console.log(readmdLinkStatus('readmeExample.md'))
//setTimeout(()=>{console.log(docsLinkStatus)},1000)

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
    converMdToHtml,
    pathReadMd,
    readmdLinks,
    readmdLinkStatus,
    statsArrayGlobal,
    readDocuments,
    //functionGlobalStats,
  };
  