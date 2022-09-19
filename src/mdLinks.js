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
                mainFunctions.pathReadFile(route)
                .then(data =>{return mainFunctions.readmdLinks(data)})
                .catch(error => console.log(error))
                res(mainFunctions.doclistLinks)
            }    
            else{
                mainFunctions.pathRead(route)
                .then(data => data.map((item)=>{return mainFunctions.readmdLinks(item)}))
                .catch(error=>console.log(error))
                res(mainFunctions.doclistLinks)
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
module.exports = {
    mdLinks,
  };