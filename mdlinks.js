const mdlinksFunction = require('./index.js');

// (mdLinks('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/HOLIS'))
//const mdLinks2 = mdlinksFunction.mdLinks('HOLIS');
const mdLinks21 = mdlinksFunction.mdLinks('HOLIS',{validate:false});
mdLinks21.then((data)=>{
    console.log(data)
},(error)=>{
    console.log(`Error: ${error}`)
})