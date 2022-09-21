//....      format
const colors = require('colors');
const mainFunctions = require('./main.js')
const path = require('path');
// CREANDO PROMESAS => MDLINKS *************************************************************

const mdLinks = (route,elements) => {
    return new Promise((res,rej) => {
        if ((!!elements==false)||(elements.validate==false)||(elements.stats==false)) {
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
/*         } else if  ((elements.validate==true) && (elements.stats==true)) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${"{'validate':true, 'stats':true}".bgBlue}) ----- mdLinks ` )
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
                    return(mainFunctions.statsArrayStatus(data))
                })
                .catch(error=>{ rej(error) })   
                .then(data => { 
                    res((data))
                })
                .catch(error=>{ rej(error) }) 
            }  
            else if (mainFunctions.existRoute(route)){
                let folder=mainFunctions.pathRead(route);
                mainFunctions.readDocumentsArr(folder)
                .then(data =>{
                    return data.map((item)=>{
                        return mainFunctions.converMdToHtml(item)
                    })
                })
                .catch(error=>{ rej(error) })  
                .then(data =>{
                    return(mainFunctions.readmdLinkStatus(...new Set(data)))
                    })
                .catch(rej('La carpeta no contiene files ".md"..'))      
                .then(data =>{
                    return(mainFunctions.statsArrayStatus(data))
                    })
                .catch(error=>{ rej(error) })  
                .then(data => { 
                    res((data))
                })
                .catch(error=>{ rej(error) }) 
            } else {
                res('La ruta no existe..')
            }     
*/
/*        } else if (elements.validate==false) {
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
*/            
        } else if (elements.stats) {
            console.log(`*******************************************************************`.yellow)
            console.log(`  mdLinks ----- mdLinks(${route.bgGreen}, ${'{stats}'.bgYellow}) ----- mdLinks ` )
            console.log(`*******************************************************************`.yellow)
            if(path.extname(route)=='.md' && mainFunctions.existRoute(route)){
                return mainFunctions.readDocuments(route)
                .then(data => { 
                    let linksDelMd=mainFunctions.converMdToHtml(data);
                    res(mainFunctions.statsArrayGlobal(linksDelMd));
                }) 
                .catch(error=>{ rej(error)}) 
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
        } else if  (elements.validate) {
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
                mainFunctions.readDocumentsArr(folder)
                .then(data =>{
                    return data.map((item)=>{
                        return mainFunctions.converMdToHtml(item)
                    })
                })
                .catch(error=>{ return('error') })   
                .then(data =>{
                    return(mainFunctions.readmdLinkStatus(...new Set(data)))
                    })
                .catch(error=>{return(`${error}:La carpeta no contiene files '.md'..`)})      
                .then(data =>{
                        //console.log(data)
                        res(data)
                    })
                .catch(error=>{ rej(error) })  
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

  //statsArrayStatus
