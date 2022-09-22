//....      format
const colors = require('colors');
const mainFunctions = require('./main.js')
const path = require('path');
// CREANDO PROMESAS => MDLINKS *************************************************************

const mdLinks = (route,elements) => {
    return new Promise((res,rej) => {
    if (!elements) {
        // console.log(`***************************************************************`.yellow)
        // console.log(`   mdLinks ---------- mdLinks(${route.bgGreen}) ----------- mdLinks ` )
        // console.log(`***************************************************************`.yellow)       
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                const file = mainFunctions.pathReadFile(route);
                return mainFunctions.readmdLinks(file)
                        .then((data)=> {res(data)})
                        .catch((error)=> {rej(error)})
            }else if (mainFunctions.existRoute(route)){
                const folder = mainFunctions.pathRead(route);
                return Promise.all(
                    folder.map((item)=>{
                        return mainFunctions.readmdLinks(item)
                                .then((data)=> {
                                    //console.log(data.length)
                                    res(data)})
                                .catch((error)=> {rej(error)})
                    })
                )
            } else {
                return('La ruta no existe..')
            }    
    } else 
    if ((elements.validate) && (elements.stats)) {
            // console.log(`*******************************************************************`.yellow)
            // console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${"{'validate':true, 'stats':true}".bgBlue}) ----- mdLinks ` )
            // console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                .then(data => { return mainFunctions.converMdToHtml(data) })
                .catch(error=>{ return(error) }) 
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(data))})
                .catch(error=>{ return(error) })  
                .then(data  =>{ return(mainFunctions.statsArrayStatus(data))})
                .catch(error=>{ return(error) })   
                .then(data  =>{ res((data))})
                .catch(error=>{ rej(error) }) 
            } else if (mainFunctions.existRoute(route)){
                let folder = mainFunctions.pathRead(route);
                mainFunctions.readDocumentsArr(folder)
                .then(data  =>{ return data.map((item)=> {
                                    return mainFunctions.converMdToHtml(item)
                                })
                })
                .catch(error=>{ return(error) })
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(...new Set(data)))})
                .catch(error=>{ return(`${error}: La carpeta no contiene files '.md'..`)})      
                .then(data  =>{ return(mainFunctions.statsArrayStatus(data))})
                .catch(error=>{ return(error) })  
                .then(data  =>{ res(data) })
                .catch(error=>{ rej(error) }) 
            } else {
                res('La ruta no existe..')
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
                    .catch(error=>{ rej(error)}) 
            } else if(mainFunctions.existRoute(route)){ // FUNCIONA BUT SOS ARREGLAR
                const folder = mainFunctions.pathRead(route);
                Promise.all(
                    folder.map((item)=>{
                    return mainFunctions.readmdLinks(item) //promesa que devuelve lista de objetos con links
                        .then((data)  => {res(data)})
                        .catch((error)=> {rej(error)})
                    })
                )
                const datos = mainFunctions.doclistLinks;
                const links = datos.map((item)=>{
                                return item.href
                              })
                res(mainFunctions.statsArray(links))
            } else {
                res('La ruta no existe..')
            }
    } else if  (elements.validate) {
            // console.log(`*******************************************************************`.yellow)
            // console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:true}'.bgBlue}) ----- mdLinks ` )
            // console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                .then(data  =>{ return mainFunctions.converMdToHtml(data)})
                .catch(error=>{ return(error) }) 
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(data))})
                .catch(error=>{ return(error) })  
                .then(data  =>{ res((data)) })
                .catch(error=>{ rej(error) })   
            }  
            else if (mainFunctions.existRoute(route)){
                let folder=mainFunctions.pathRead(route);
                mainFunctions.readDocumentsArr(folder)
                .then(data  =>{
                    return data.map((item)=>{
                        return mainFunctions.converMdToHtml(item)
                    })
                })
                .catch(error=>{ return(error) })  
                .then(data  =>{ return(mainFunctions.readmdLinkStatus(...new Set(data)))})
                .catch(error=>{ return(`${error}:La carpeta no contiene files '.md'..`)})      
                .then(data  =>{ res(data) })
                .catch(error=>{ rej(error) })
            } else {
                res('La ruta no existe..')
            } 
               
    } else {
            // console.log(`***************************************************************`.yellow)
            // console.log(`   mdLinks ---------- mdLinks(${route.bgGreen}) ----------- mdLinks ` )
            // console.log(`***************************************************************`.yellow)       
                if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                    const file = mainFunctions.pathReadFile(route);
                    return mainFunctions.readmdLinks(file)
                            .then((data)=> {res(data)})
                            .catch((error)=> {rej(error)})
                }else if (mainFunctions.existRoute(route)){
                    const folder = mainFunctions.pathRead(route);
                    return Promise.all(
                        folder.map((item)=>{
                            return mainFunctions.readmdLinks(item)
                                    .then((data)=> {res(data)})
                                    .catch((error)=> {rej(error)})
                        })
                    )
                } else {
                    return('La ruta no existe..')
                }    
    } 
    })
}
//Caso 


module.exports = {
    mdLinks,
  };


