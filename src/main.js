//instalar modulos
const fs = require('fs'); // Se importa en una var fs mediante require el modulo file_system 
const path = require('path');
//....
const marked = require('marked'); //HTML // En consola : npm install  marked 
const cheerio = require('cheerio'); //ELEMENT
const axios = require('axios'); //BREAK

// LA RUTA EXISTE                   *****************************************
const existRoute =(route) => fs.existsSync((route))

// RUTA ABSOLUTA Y NORMALIZADA             **********************************
function pathGlobal(routaInput){
    return path.normalize(path.isAbsolute(routaInput)?routaInput:path.resolve(routaInput));
}

// LEER ARCHIVOS DE UN DIRECTORIO: ARCHIVOS MD *******************************
const docslist = [];
const error1 = 'no hay archivos en la carpeta'
const error3 = 'no hay archivos .md en la carpeta'
const error4 = 'no hay folders en la carpeta'
//          PASO 1: LISTA DE ARCHIVOS DE UN DIRECTORIO ************************
function readFolder(ruta){
    const rutaAbsoluta = pathGlobal(ruta);
    if (existRoute(rutaAbsoluta)==true){
        return (fs.readdirSync(ruta).length === 0)?(error1): fs.readdirSync(ruta).map(doc=>{return path.join(rutaAbsoluta,doc)});
    } 
}
//          PASO 2: LISTA DE ARCHIVOS MD DE UN DIRECTORIO  *********************
function pathReadMd(carpetaArray){ 
    const mdFiles = carpetaArray.filter(doc => {return(path.extname(doc)==='.md')});
        if (mdFiles.length === 0){ 
            return(error3)
        } else {
            mdFiles.map(doc=>{return docslist.push(doc)})
            return mdFiles
        }
}
//          PASO 3: LISTA DE CARPETAS DE UN DIRECTORIO  **************
function pathReadFolders(carpetaArray){ 
    const folders = carpetaArray.filter(doc => {return(!!path.extname(doc)==false)});
    if (folders.length === 0){ 
        return(error4);
    } else {return folders}
}
//          PASO 4:  ARCHIVOS CON RECURSIVIDAD  *************************
const  pathRead = (ruta) => { 
    const archivos = readFolder(ruta);
    pathReadMd(archivos); //PARA guardar en doclist los archivos .md que estan en la primera ruta
    const folders = pathReadFolders(archivos);
    if  (folders!=error4){
        folders.map(doc=>{ return (pathRead(doc))})
    }
    return(docslist);
}
// LEER ARCHIVOS ARCHIVOS MD           ********************************
const pathReadFile = (ruta)=> { 
    if(path.extname(ruta)==='.md'){
        docslist.push(pathGlobal(ruta))
        return(pathGlobal(ruta))
    } 
}
// MD LINKS LISTA DE LINKS ********************************************
const doclistLinks=[];
const readmdLinks=(document) => {
    return fs.promises.readFile(document,'utf-8')
    .then(data  =>{
        const mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${data}**.`));
        mdToHtml('a').each(function(indice, elemento){
            doclistLinks.push({
              'link': `${indice+1}/${mdToHtml('a').length}`,
              'href': `${elemento.attributes[0].value}`,
              'text': `${elemento.children[0].nodeValue}`,
              'file': `${path.basename(document)}`,
              'route': `${pathGlobal(document)}`,
            })  
        })
        return(doclistLinks)
    })
}
// MD LINKS STATS LISTA DE LINKS CON PROMESAS *******************************
const linksGlobal=[];
/*---------------------- PASO 1: LEER .MD     ******************************/
const readDocuments = (document) => { 
    return fs.promises.readFile(document,'utf-8')
    .then(data  =>{ return([document,data])}) 
}

/*---------------------- PASO 2: LEER ARRAY CON .MD           **************/
const readDocumentsArr = (documentArr) => { 
     const allPromises = documentArr.map((document)=>{
            return readDocuments(document)
            .then(data => { return data})
        })
    return Promise.all(allPromises) 
}  
/*---------------------- PASO 3: convertir Md a HTML     ******************/
const converMdToHtml = (documentHtml) => {
    if(documentHtml!=''){
        const mdToHtml=cheerio.load(marked.parse(`'# Marked in Node.js\n\nRendered by **${documentHtml[1]}**.`));
        mdToHtml('a').each( function(indice,elemento){
            return linksGlobal.push([documentHtml[0],elemento.children[0].nodeValue,elemento.attributes[0].value])  
        })
            return(linksGlobal)
        } 
}
/*---------------------- PASO 4: STATS DE LINKS DE DIFERENTES .MD   ********/
let statLinks;
const statsArrayGlobal= (arrayLinks) => {
    if(typeof(arrayLinks)=='object'){
        const arrayOnlyLinks=arrayLinks.map((link)=>{return(link[2])})    
        statLinks= 
            { 'Total': `${arrayOnlyLinks.length}`,
            'Unique': `${[...new Set(arrayOnlyLinks)].length}`}
        return(statLinks)    
    }
}
/*---------------------- PASO 5: STATS DE LINKS  CON STATUS       ********/
const statsArrayStatus= (arrayLinks) => {
    if(typeof(arrayLinks)=='object'&& arrayLinks.length>=1){
        const links=arrayLinks.map((link)=>{return(link.href)})  
        const files=arrayLinks.map((link)=>{return(link.file)})    
        const linksOk=(arrayLinks.map((link)=>{return(link.result)})).filter((result)=>{return(result=='OK')})    
        const linksNew=arrayLinks.map((link)=>{
                const{file, text, status,...dataWithout} = link; // desestructuración para separar las propiedades del objeto que no vamos a usar
                return dataWithout }) 
        const linksUnique=new Set(linksNew.map(JSON.stringify)) // JSONstringify convierte el objeto en string para q así el new set pueda trabajar con los datos y sacar los que no se repitan 
        const linksUniqueOk= Array.from(linksUnique).map(JSON.parse).filter((item)=>{return(item.result=='OK')})    //convertimos el objeto en un array y JSONparse los string en objetos
        
        statLinks = { 
            'Files': `${[...new Set(files)].length}`,
            'Total': `${links.length}`,
            'Ok': `${linksOk.length}`,
            'Broquen': `${links.length-linksOk.length}`,
            'Unique': `${[...new Set(links)].length}`,
            'UniqueOk': `${linksUniqueOk.length}`,
            'UniqueBroquen': `${[...new Set(links)].length-linksUniqueOk.length}`,
        }
        return(statLinks)    
    }
}

// MD LINKS STATUS CODE     *************************************************************
let docsLinkStatusOk;
let docsLinkStatusFail; 
const readmdLinkStatus = (linksGlobal) => {
    const allPromisesWithAxios= linksGlobal.map((link)=>{
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
    })
    return Promise.all(allPromisesWithAxios)
}  
 
/*---------------------- PASO3: STATS DE LINKS DE UN ARCHIVO MD      **************/
let statLinksLast;
const statsArray= (arrayLinks) => {
    if(typeof(arrayLinks)=='object'){
        statLinksLast= 
            { 'Total': `${arrayLinks.length}`,
            'Unique': `${[...new Set(arrayLinks)].length}`}
        return(statLinksLast)    
    }
}
module.exports = {
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
  };
  