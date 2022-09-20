//....      format
const colors = require('colors');
const mainFunctions = require('./main.js')
const path = require('path');
// CREANDO PROMESAS => MDLINKS *************************************************************

const mdLinks = (route,elements) => {
    return new Promise((res,rej) => {
        if (!!elements==false) {
         console.log(`***************************************************************`.yellow)
         console.log(`   mdLinks ---------- mdLinks(${route.bgGreen}) ----------- mdLinks ` )
         console.log(`***************************************************************`.yellow)       
         if(path.extname(route)=='.md'){
                let file = mainFunctions.pathReadFile(route);
                return mainFunctions.readmdLinks(file)
                .then((data)=> {res(data)})
                .catch((error)=> {rej(error)})
            }    
            else{
                let folder=mainFunctions.pathRead(route);
                return Promise.all(
                    folder.map((item)=>{
                    return mainFunctions.readmdLinks(item)
                    .then((data)=> {res(data)})
                    .catch((error)=> {rej(error)})
                }))
            } 
        } else if (elements.validate==false) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:false}'.bgRed}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md'){
                let file = mainFunctions.pathReadFile(route);
                return mainFunctions.readmdLinks(file)
                .then((data)=> {res(data)})
                .catch((error)=> {rej(error)})
            }    
            else{
                let folder=mainFunctions.pathRead(route);
                return Promise.all(
                    folder.map((item)=>{
                    return mainFunctions.readmdLinks(item)
                    .then((data)=> {res(data)})
                    .catch((error)=> {rej(error)})
                }))
            } 
        } else if (elements.stats==true) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{stats}'.bgYellow}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                .then(data => { 
                    let linksDelMd=mainFunctions.converMdToHtml(data);
                    res(mainFunctions.statsArrayGlobal(linksDelMd));
                }) 
                .catch(error=>{ 
                    rej(error)
                }) 
            }    
            else if(mainFunctions.existRoute(route)){
                let folder=mainFunctions.pathRead(route);
                Promise.all(
                    folder.map((item)=>{
                    return mainFunctions.readmdLinks(item)
                    .then((data)=> {res(data)})
                    .catch((error)=> {rej(error)})
                }))
                let datos= mainFunctions.doclistLinks
                let links=datos.map((item)=>{return item.href})
                res(mainFunctions.statsArray(links))
            } else {
                res('La ruta no existe..')
            }
        } else if  (elements.validate==true) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{validate:true}'.bgBlue}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                .then(data => { 
                    return mainFunctions.converMdToHtml(data)
                })
                .catch(error=>{  rej(error) }) 
                .then(data => { 
                    return(mainFunctions.readmdLinkStatus(data))
                })
                .catch(error=>{ rej(error) })  
                .then(data => { 
                    res((data))
                })
                .catch(error=>{ rej(error) })   
            }  

            else if (mainFunctions.existRoute(route)){
                let folder=mainFunctions.pathRead(route);
                console.log(folder)
                // let xx = folder.map((item)=>{return(mainFunctions.linksGlobal)})
                // console.log(xx)
                //console.log(xxx)
                    // .then(data => { 
                    //     Promise.all(data
                    //     return(mainFunctions.readmdLinkStatus(data))
                    //     .then((data)=> {res(data)})
                    //     .catch((error)=> {rej(error)})
                        
                        

                    // })
                    // .catch(error=>{ rej(error) })  
                    // .then(data => { 
                    //     res((data))
                    // })
                    // .catch(error=>{ rej(error) }) 
                //}
                //let datos=mainFunctions.linksGlobal
                //console.log(datos)
                
                //res(mainFunctions.docsLinkStatusOk)  
                // let newLinksStatus=mainFunctions.docsLinkStatusOk.concat(mainFunctions.docsLinkStatusFail)
                // res(mainFunctions.docsLinkStatusOk)   
                    

            } else {
                res('La ruta no existe..')
            }
        } else {
            return('La ruta no existe..')
        }
    })
}
module.exports = {
    mdLinks,
  };