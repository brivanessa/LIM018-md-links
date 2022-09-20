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
/******** PROBANDO pathRead
//console.log(pathRead('../carpeta'))
//console.log(pathRead('../folderFiles0'))
//console.log(pathRead('../folderFilesNoMd'))
//console.log(pathRead('../folderTestOneFileMd'))
*/
// LEER ARCHIVOS ARCHIVOS MD           YES TEST*******************************
const pathReadFile = (ruta)=> { 
        if(path.extname(ruta)==='.md'){
            docslist.push(pathGlobal(ruta))
            return(pathGlobal(ruta))
        } else {return('no es un archivo .md...')}  
}
/******** PROBANDO pathReadFile 
console.log(pathReadFile('../readmeExample.md'))
//console.log(pathReadFile('../thumb.png'))
*/
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
/******** PROBANDO eadmdLinks 
console.log(readmdLinks('../readmeExample.md'));
*/
// MD LINKS STATS LISTA DE LINKS CON PROMESAS *******************************
let linksGlobal=[];
let leerDocs=[]
/*---------------------- PASO 1: LEER .MD            YES TEST **************/
const readDocuments = (document) => { 
    return fs.promises.readFile(document,'utf-8')
    .then(data => { 
        //leerDocs.push([document,data])
        return([document,data])
    }) 
    .catch(error=>{
        return((`${error.code}`=='ENOENT')?(`${error.code}: el archivo no existe`):`${error.code}`)
    })
}
/*---------------------- PASO 1: LEER ARRAY CON .MD            YES TEST **************/
const readDocumentsArr = (documentArr) => { 
    return Promise.all(
        documentArr.map((document)=>{
                return readDocuments(document)
                .then(data => { 
                    return data
                })
                .catch(error=>{
                    return error
                }) 
            })
    )              
}
/*
let arrrayEjemplo= [
    '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/readmeExample.md',
    '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/aeadmExample.md',
    '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/readmeExample2.md',
    '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/fs/ffs/readmeExample.md'
  ]
//readDocumentsArr(arrrayEjemplo) 
// .then((data)=> {console.log('aqui',data)})
// .catch((error)=> {return (error)}) 
//console.log('aqui',readDocumentsArr(arrrayEjemplo) )
readDocumentsArr(arrrayEjemplo)
.then(data =>{
    return data.map((item)=>{
        return converMdToHtml(item)
    })
})
.then(data =>{
    //console.log(readmdLinkStatus(data[0]))
    //return(readmdLinkStatus(data[0]))
    return(readmdLinkStatus(...new Set(data)))
    })

.then(data =>{
        console.log(data)
        return(data)
    })
 */   
/*---------------------- PASO 2: convertir Md a HTML       YES TEST **************/
const converMdToHtml = (documentHtml) => {
        if(documentHtml!=''){
            let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${documentHtml[1]}**.`));
            mdToHtml('a').each( function(indice,elemento){
                return linksGlobal.push([documentHtml[0],elemento.children[0].nodeValue,elemento.attributes[0].value])  
            })
            return(linksGlobal)
        } else {return('no hay links...')}
}
// const converMdToHtml = (documentHtml) => {
//     if(documentHtml!=''){
//         let mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${documentHtml[1]}**.`));
//         mdToHtml('a').each( function(indice,elemento){
//             return linksGlobal.push([documentHtml[0],elemento.children[0].nodeValue,elemento.attributes[0].value])  
//         })
//         return(linksGlobal)
//     } else {return('no hay links...')}
// }
/******** PROBANDO converMdToHtml 
console.log(converMdToHtml(['../readmeAllOkLinks.md','[Node.js](http://nodejs.og/)']))
////result:[ [ '../readmeAllOkLinks.md', 'Node.js', 'http://nodejs.og/' ] ]
*/
/*---------------------- PASO3: STATS DE LINKS              YES TEST **************/
let statLinks;
const statsArrayGlobal= (arrayLinks) => {
    if(typeof(arrayLinks)=='object'){
        let arrayOnlyLinks=arrayLinks.map((link)=>{return(link[2])})    
        statLinks= 
            { 'Total': `${arrayOnlyLinks.length}`,
            'Unique': `${[...new Set(arrayOnlyLinks)].length}`}
        return(statLinks)    
    }
    else{return('...no se puede analizar')}
}

/******** PROBANDO statsArrayGlobal 
console.log(statsArrayGlobal([[ '../readmeAllOkLinks.md', 'N.js', 'https://es.wikipedia.org/wiki/Markdown'],
    [ '../readmeAllOnks.md', 'No.js','https://es.wikipedia.org/wiki/Markdown'],
    [ '../readmeAs.md', 'Nod.js','https://www.kualo.co.uk/404']]))
////result: { Total: '3', Unique: '2' }
*/

/* PROBANDO statsArrayGlobal CUANDO NOS DAN ARCHIVO .MD
//------------------------------------------------------
readDocuments('../readmeAllOkLinks.md')
//readDocuments('../readmeVaciodd.txt')
//readDocuments('')
//readDocuments('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md')
        .then(data => { 
            let linksDelMd=converMdToHtml(data)
            console.log(statsArrayGlobal(linksDelMd))
            return (statsArrayGlobal(linksDelMd))
        }) 
        .catch(error=>{ return error })    

*/

/*---------------------- PASO3: STATS DE LINKS  CON STATUS            YES TEST **************/
let statLinksStat;
const statsArrayStatus= (arrayLinks) => {
    if(typeof(arrayLinks)=='object'){
        let links=arrayLinks.map((link)=>{return(link.href)})  
        let files=arrayLinks.map((link)=>{return(link.file)})    
        let linksOk=(arrayLinks.map((link)=>{return(link.result)})).filter((result)=>{return(result=='OK')})    
        statLinks = { 
            'Files': `${[...new Set(files)].length}`,
            'Total': `${links.length}`,
            'Ok': `${linksOk.length}`,
            'Broquen': `${links.length-linksOk.length}`,
            'Unique': `${[...new Set(links)].length}`,
            'UniqueOk': `${[...new Set(linksOk)].length}`,
            'UniqueBroquen': `${[...new Set(links)].length-[...new Set(linksOk)].length}`,
        }
        return(statLinks)    
    }
    else{return('...no se puede analizar')}
}
/*
let ejemplo =[
    {
      file: '/Users/',
      href: 'https://es.wikipedia.org/wiki/Markdown',
      result: 'OK'
    },
    {
      file: '/Users/',
      href: 'https://es.wikipedia.org/wiki/Markdown',
      result: 'OK'
    },
    {
        file: '/Users/',
        href: 'https://es.wikipedia.org/wiki/Markdo',
        result: 'OK'
    },
    {
        file: '/Users/',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        result: 'FAIL'
    },
]  
console.log(statsArrayStatus(ejemplo))
*/
// MD LINKS STATUS CODE     *************************************************************
let docsLinkStatusOk;
let docsLinkStatusFail; 
const readmdLinkStatus = (linksGlobal) => {
    return Promise.all(linksGlobal.map((link)=>{
        return axios.get(link[2])
            .then( (response)=>{
                docsLinkStatusOk=({
                'file': `${link[0]}`,
                'text': `${link[1]}`,
                'href': `${link[2]}`,
                'status': `${response.status}`,
                'result':  `${response.statusText}`,  
                })
                return (docsLinkStatusOk)
            })
            .catch((error) => {
                if (error.response) {
                    docsLinkStatusFail=({
                        'file': `${link[0]}`,
                        'text': `${link[1]}`,
                         'href': `${link[2]}`,
                        'status': `${error.response.status}`,
                        'result':  `FAIL`,
                    })
                    return (docsLinkStatusFail)
                } else if (error.request) {
                    docsLinkStatusFail=({
                        'file': `${link[0]}`,
                        'text': `${link[1]}`,
                        'href': `${link[2]}`,
                        'status': `${error.request.status}: no se recibió respuesta`,
                        'result':  `FAIL`,
                    })
                    return(docsLinkStatusFail)
                } else {
                    docsLinkStatusFail=({
                        'file': `${link[0]}`,
                        'text': `${link[1]}`,
                        'href': `${link[2]}`,
                        'status': `${error.message}`,
                        'result':  `FAIL`,
                    })
                    return(docsLinkStatusFail)
                } 
            }); 
    }))
} 

/******** PROBANDO readmdLinkStatus 
let linksExamples= [
    [ '../readmeAllOkLinks.md', 'N.js', 'https://es.wikipedia.org/wiki/Markdown'],
    [ '../readmeAllOnks.md', 'No.js','https://es.wikipedia.org/wiki/Markdown'],
    [ '../readmeAs.md', 'Nod.js','https://www.kualo.co.uk/404'],
    [ '../readmeAllOkLinkd', 'Node.js','https://www.kualo.co.uk/404'],
    [ '../readmeAllOkLinkmd', 'Nodes.js','http://nodejs.org/'],
    [ '../readmeAllmd', 'Nodesp.js','https://blueg.co.uk/404'],
    ]
readmdLinkStatus(linksExamples)  
.then((data) => {
    console.log(data)
    return data
})
.catch((error) => {
    console.log(error)
    return error
})
*/ 

/* PROBANDO readmdLinkStatus CUANDO NOS DAN ARCHIVO .MD
//------------------------------------------------------
const readmdLinkdeMd = (document) => {
    return readDocuments(document)
        .then(data => { 
            return converMdToHtml(data)
        })
        .catch(error=>{ return error }) 
        .then(data => { 
            return readmdLinkStatus(data)
        })
        .catch(error=>{ return error })    
    }

//readmdLinkdeMd('../readmeAllOkLinks.md')
//readmdLinkdeMd('../readmeVaciodd.txt')
//readmdLinkdeMd('')
//readmdLinkdeMd('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md')
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
//*/

/*---------------------- PASO3: STATS DE LINKS       **************/
let statLinksLast;
const statsArray= (arrayLinks) => {
    if(typeof(arrayLinks)=='object'){
        statLinksLast= 
            { 'Total': `${arrayLinks.length}`,
            'Unique': `${[...new Set(arrayLinks)].length}`}
        return(statLinksLast)    
    }
    else{return('...no se puede analizar')}
}
/******** PROBANDO statsArrayGlobal 
console.log(statsArray(['https://es.wikipedia.org/wiki/Markdown','https://es.wikipedia.org/wiki/Markdown','https://www.kualo.co.uk/404']))
////result: { Total: '3', Unique: '2' }
//*/

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
    statsArrayStatus,
    readmdLinkStatus,
    statsArrayGlobal,
    readDocuments,
    statsArray,
    readDocumentsArr,
    linksGlobal,
    doclistLinks,
    statLinks,
    docsLinkStatusOk,
    docsLinkStatusFail,
    //functionGlobalStats,
  };
  