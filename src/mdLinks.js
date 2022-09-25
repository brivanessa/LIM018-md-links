//....      format
const colors = require('colors');
const mainFunctions = require('./main.js')
const path = require('path');
// CREANDO PROMESAS => MDLINKS *************************************************************

const mdLinks = (route,elements) => {
    return new Promise((res,rej) => {
        if ((!elements)||(elements.stats===false)||((elements.validate===false))) {
        // console.log(`***************************************************************`.yellow)
        // console.log(`   mdLinks ---------- mdLinks(${route.bgGreen}) ----------- mdLinks ` )
        // console.log(`***************************************************************`.yellow)       
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                const file = mainFunctions.pathReadFile(route);
                return mainFunctions.readmdLinks(file)
                        .then((data)=> {return(data)})
                        .then((data)=> {res(data)})
                        .catch((error)=> {return(error)})

            }else if (mainFunctions.existRoute(route)){
                const folder = mainFunctions.pathRead(route);
                (folder=='')?res('La ruta no tiene archivos .md...'):(folder)
                const promisesFs=folder.map((item)=>{ 
                        return mainFunctions.readmdLinks(item)
                        .then((data)=> {return(data)})
                        .catch((error)=> {return(error)})
                    })
                return Promise.all(promisesFs)   
                .then(data => { return (data[0])})
                .then(data =>(res(data)))
                .catch(error => {return(error)})    //////

            } else {
                rej('La ruta no existe..')
            }    
        } else if ((elements.validate) && (elements.stats)) {
            // console.log(`*******************************************************************`.yellow)
            // console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${"{'validate':true, 'stats':true}".bgBlue}) ----- mdLinks ` )
            // console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                .then(data => { return mainFunctions.converMdToHtml(data) })
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(data))})
                .then(data  =>{ return(mainFunctions.statsArrayStatus(data))})
                .then(data  =>{ res((data))})
                .catch(error=>{ return(error) }) 
            } else if (mainFunctions.existRoute(route)){
                let folder = mainFunctions.pathRead(route);
                (folder=='')?res('La ruta no tiene archivos .md...'):(folder)
                mainFunctions.readDocumentsArr(folder)
                .then(data  =>{ return data.map((item)=> {
                                    return mainFunctions.converMdToHtml(item)
                                })
                })
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(...new Set(data)))})
                .then(data  =>{ return(mainFunctions.statsArrayStatus(data))})
                .then(data  =>{ res(data) })
                .catch(error=>{ return(error) }) 
            } else {
                rej('La ruta no existe..')
            }                
        } else if (elements.stats) {
            // console.log(`*******************************************************************`.yellow)
            // console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{stats}'.bgYellow}) ----- mdLinks ` )
            // console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                    .then(data  =>{ 
                        const linksDelMd = mainFunctions.converMdToHtml(data);
                        res(mainFunctions.statsArrayGlobal(linksDelMd));
                    }) 
                    .catch(error=>{ return(error)}) 
            } else if(mainFunctions.existRoute(route)){ // FUNCIONA BUT SOS ARREGLAR
                const folder = mainFunctions.pathRead(route);
                (folder=='')?res('La ruta no tiene archivos .md...'):(folder)
                const allPromisesFs = folder.map((item)=>{
                    return mainFunctions.readmdLinks(item) //promesa que devuelve lista de objetos con links
                        .then((data)  => {return(data)})
                        .catch((error)=> {return(error)}) ////////
                    })
                Promise.all(allPromisesFs)
                .then(data => { return ((data[0]).map((item) => (item.href)))})
                .then(data => {res(mainFunctions.statsArray(data))})
                .catch(error => {return(error)})    //////
            } else {
                rej('La ruta no existe..')
            }
        } else if (elements.validate) {
            // console.log(`*******************************************************************`.yellow)
            // console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:true}'.bgBlue}) ----- mdLinks ` )
            // console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                .then(data  =>{ return mainFunctions.converMdToHtml(data)})
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(data))})
                .then(data  =>{ res((data)) })
                .catch(error=>{ return(error) })   
            }  
            else if (mainFunctions.existRoute(route)){
                const folder=mainFunctions.pathRead(route);
                (folder=='')?res('La ruta no tiene archivos .md...'):(folder)
                mainFunctions.readDocumentsArr(folder)
                .then(data  =>{
                    return data.map((item)=>{
                        return mainFunctions.converMdToHtml(item)
                    })
                })
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(...new Set(data)))})
                .then(data  =>{ res(data) })
                .catch(error=>{ return(error) })
            } else {
                rej('La ruta no existe..')
            }                
        } 
    })
}

module.exports = {
    mdLinks,
  };


