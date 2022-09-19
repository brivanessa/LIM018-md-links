const mdlinksFunction = require('./mdLinks.js');

//const mdLinks2 = mdlinksFunction.mdLinks('../readmeExample.md');
//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta');
//const mdLinks2 = mdlinksFunction.mdLinks('../carpeta');
//const mdLinks2 = mdlinksFunction.mdLinks('../folderTestOneFileMd');
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFilesNoMd');
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFiles0');
//const mdLinks2 = mdlinksFunction.mdLinks('../folderTestOneFileMds');
//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md');
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVacio.md');
//const mdLinks2 = mdlinksFunction.mdLinks('../carpeta',{validate:false});
const mdLinks2 = mdlinksFunction.mdLinks('../readmeExample.md',{stats:true});

//const mdLinks2 = mdlinksFunction.mdLinks('../carpeta',{validate:true});

//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md');


mdLinks2.then((data)=>{
    console.log(data)
},(error)=>{
    console.log(`Error: ${error}`)

    return (`Error: ${error}`)
})