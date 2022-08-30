const {pets, nickName } = require('./index');
pets.forEach((item) => console.log(item));
console.log(nickName);  // node . // node index

// probando modulo file_system 

const fs = require('fs'); // importo en una var fs mediante require el modulo fs

//WRITEFILE - CREAR UN ARCHIVO Y SU CONTENIDO 
fs.writeFile('data1.txt','hola bri :) vane', (error)=>{
    if (error){
        console.log(`Error: ${error}`)
    }
}) //1er parametro doc, lo que se escribira en el doc, fn anonima para controlar casos de error

// READFILE - LEER UN ARCHIVO EN LA CONSOLA
fs.readFile('data1.txt','utf-8',(error,data)=>{
if (!error){
    console.log(data);
} else {
    console.log(`Error: ${error}`)
}
})

//RENAME ARCHIVO
fs.rename('data1.txt', 'dataEjem.txt',(error)=>{
    if (!error){
        console.log('se renombró');
    } else{
        console.log(`Error:${error}`);
    }
})

//AÑADIR CONTENIDO
fs.appendFile('dataEjem.txt','Hola vane',(error)=>{
    if(!error){
        console.log('se agregó correctamente');
    } else {
        console.log(`Error:${error}`);
    }
})

//PARA CREAR UNA COPIA
fs.createReadStream('dataEjem.txt').pipe(fs.createWriteStream('dataEjem_copia.txt')) //la fn -metodo pipe me permite hacer una copia

//PARA ELIMINAR ARCHIVO
fs.unlink('dataEjem_copia.txt', error =>{
    if(error){
        console.log(`Error:${error}`);
    }
})

//PARA LEER ARCHIVOS DE UN DIRECTORIO
fs.readdir('./',(error,docs)=>{
    if(!error){
        docs.forEach(doc => {
            console.log(doc)
        })
    }
})