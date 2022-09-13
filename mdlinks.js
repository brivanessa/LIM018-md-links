const mdlinksFunction = require('./index.js');

// (mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/HOLIS'))
//const mdLinks2 = mdlinksFunction.mdLinks('HOLIS');
//const mdLinks2 = mdlinksFunction.mdLinks('HOLIS',{validate:false});
const mdLinks2 = mdlinksFunction.mdLinks('HOLIS',{validate:true});
mdLinks2.then((data)=>{
    console.log(data)
},(error)=>{
    console.log(`Error: ${error}`)
})