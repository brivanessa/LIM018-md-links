const mdlinksFunction = require('./mdLinks.js');

//const mdLinks2 = mdlinksFunction.mdLinks('../readmeExample.md');
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVacio.md');
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeOk.md'); 
//const mdLinks2 = mdlinksFunction.mdLinks('../thumb.png'); ///////// revisar

//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta');
//const mdLinks2 = mdlinksFunction.mdLinks("../carpeta");
//const mdLinks2 = mdlinksFunction.mdLinks('../folderTestOneFileMd');
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFilesNoMd');
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFiles0'); // revisar



//const mdLinks2 = mdlinksFunction.mdLinks('../readmeExample.md',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVacio.md',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVo.md',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('../thumb.png',{validate:false}); //// revisar

//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('../carpeta',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderTestOneFileMd',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFilesNoMd',{validate:false});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFiles0',{validate:false}); // revisar que me salga error


// VALIDATE TRUE ok

const mdLinks2 = mdlinksFunction.mdLinks('../readmeExample.md',{validate:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVacio.md',{validate:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVo.md',{validate:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../thumb.png',{validate:true}); //revisar

//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta',{validate:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../carpeta',{validate:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderTestOneFileMd',{validate:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFilesNoMd',{validate:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFiles0',{validate:true}); // revisar que me salga error

//STATS TRUE ok

//const mdLinks2 = mdlinksFunction.mdLinks('../readmeExample.md',{stats:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVacio.md',{stats:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVo.md',{stats:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../thumb.png',{stats:true}); // por erevisar

//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta',{stats:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../carpeta',{stats:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderTestOneFileMd',{stats:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFilesNoMd',{stats:true});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFiles0',{stats:true}); // revisar que me salga error


//STATS Y VALIDATE TRUE ok

//const mdLinks2 = mdlinksFunction.mdLinks('../readmeAllOkLinks.md',{'validate':true,'stats':true});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeAllFailLinks.md',{'validate':true,'stats':true});
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVacio.md',{'validate':true,'stats':true}); //copiar a los demas
//const mdLinks2 = mdlinksFunction.mdLinks('../readmeVo.md',{'validate':true,'stats':true});
//const mdLinks2 = mdlinksFunction.mdLinks('../thumb.png',{'validate':true,'stats':true}); // revisar

//const mdLinks2 = mdlinksFunction.mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta',{'validate':true,'stats':true});
//++++++

//const mdLinks2 = mdlinksFunction.mdLinks('../carpeta',{'validate':true,'stats':true});
//const mdLinks2 = mdlinksFunction.mdLinks('../carpetaTest',{'validate':true,'stats':true});
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFilesDDDD',{'validate':true,'stats':true}); 
//const mdLinks2 = mdlinksFunction.mdLinks('../folderFilesNoMd',{'validate':true,'stats':true});


// const elements = {'validate':true,
// 'stats':true,}
// console.log(elements.validate)
// //console.log(elements)

// console.log('ddddd')
// mdLinks2.then((data)=>{
//     console.log(data)
// },(error)=>{
//     console.log(`Error: ${error}`)

//     return (`Error: ${error}`)
// })