const mdlinksFunction = require('./index.js');

//const mdLinks2 = mdlinksFunction.mdLinks('carpeta');
const mdLinks2 = mdlinksFunction.mdLinks('folderTestOneFileMd');
//const mdLinks2 = mdlinksFunction.mdLinks('readmeExample.md');
//const mdLinks2 = mdlinksFunction.mdLinks('carpeta',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('carpeta',{validate:true});
mdLinks2.then((data)=>{
    console.log(data)
},(error)=>{
    console.log(`Error: ${error}`)
})