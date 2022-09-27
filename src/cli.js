#!/usr/bin/env node

const mdlinksFunction = require('./index.js');
const colors = require('colors');
const arguments = process.argv;
const route = arguments[2];

if (arguments.length === 3){
    if((route ==='--help')||route ==='--h') {
        console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
        console.log(`                                    MD - LINKS`.bold)
        console.log('                                 md-links ' + '--help'.yellow)
        console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
        console.log('\nLa aplicación se ejecuta de la siguiente manera en la terminal: '+'md-links' + ' <path-to-file>'.cyan  + ' [options]'.yellow)
        console.log('\n<path-to-file> '.cyan + ': Ruta absoluta o relativa al archivo o directorio.\n ')
        console.log(' --validate '.yellow + `: El output incluye el status de la respuesta recibida a la petición HTTP por cada 
              link encontrado. Se puede usar la abreviación '--va'.`)
        console.log(' --stats '.yellow + `   : El output corresponde a estadísticas básicas sobre los links. Se puede usar la 
              abreviación '--st'.`)
        console.log(' --stats  --validate'.yellow + `: El output corresponde a estadísticas luego de la validación de los links 
                      Se peude usar la abreviación '--st --va'.`)
        console.log(`\nIMPORTANTE: El comportamiento por defecto no valida links, solo identifica archivos markdown 
            (a partir de la ruta que recibe como argumento) y los analiza.\n`)
        console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    
    } else {
        console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
        console.log(`                                    MD - LINKS`.bold)
        console.log('                                 md-links ' + '<path-to-file> '.cyan)
        console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    
        mdlinksFunction.mdLinks(route)
        .then((data)=>{
            for(let i=0;i<data.length;i++){
                console.log(`LINK Nº${i+1}`.cyan.bold)
                console.log(`SERIE: ${data[i].link} \nHREF: ${data[i].href} \nTEXT: ${data[i].text} \nFILE: ${data[i].file} \nROUTE: ${data[i].route}\n`)
            }
        },(error)=>{
            console.log(`Error: ${error}`)
        }) 
    }

}

if (arguments.length === 4 && (arguments[3]=='--validate'||arguments[3]=='--va')){
    console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    console.log(`                                    MD - LINKS`.bold)
    console.log('                                 md-links ' + '--validate'.yellow)
    console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    mdlinksFunction.mdLinks(route,{validate:true})
    .then((data)=>{
        for(let i=0;i<data.length;i++){
            console.log(`LINK Nº${i+1}`.cyan.bold)
            console.log(`HREF: ${data[i].href} \nTEXT: ${data[i].text} \nFILE: ${data[i].file} \nSTATUS: ${data[i].status}`+ '\nRESULT: '+`${data[i].result}`.yellow +'\n')
        }
    },(error)=>{
        console.log(`Error: ${error}`)
    })   
}

if (arguments.length === 4 && (arguments[3]=='--stats'||arguments[3]=='--st')){
    console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    console.log(`                                    MD - LINKS`.bold)
    console.log('                                 md-links ' + '--stats'.yellow)
    console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    mdlinksFunction.mdLinks(route,{stats:true})
    .then((data)=>{
            console.log('ESTADÍSTICAS GENERALES:'+'\nTOTAL'.cyan + ` LINKS: ${data.Total}`+ '\nUNIQUE'.cyan + ` LINKS: ${data.Unique}`)
    },(error)=>{
        console.log(`Error: ${error}`)
    })   
}
if (arguments.length === 5){
    console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    console.log(`                                    MD - LINKS`.bold)
    console.log('                            md-links ' + '--validate --stats'.yellow)
    console.log(`₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪`.cyan)
    if((arguments[4]=='--stats'||arguments[4]=='--st') && (arguments[3]=='--validate'||arguments[3]=='--va')){
        mdlinksFunction.mdLinks(route,{validate:true,stats:true})
        .then((data)=>{
            console.log('ESTADÍSTICAS DE ' + `${data.Files}`.cyan +' ARCHIVO(s) ANALIZADO(s):\n\n'+'TOTAL'.cyan +`: ${data.Total} LINKS ( `+`${data.Ok} OK `.green +' & ' + `${data.Broquen} BROQUEN`.yellow +' )')
            console.log('UNIQUE'.cyan +`: ${data.Unique} LINKS ( `+`${data.UniqueOk} OK `.green +' & ' + `${data.UniqueBroquen} BROQUEN`.yellow +' )')
        },(error)=>{
            console.log(`Error: ${error}`)
        })   
    }
    if((arguments[3]=='--stats'||arguments[3]=='--st') && (arguments[4]=='--validate'||arguments[4]=='--va')){
        mdlinksFunction.mdLinks(route,{validate:true,stats:true})
        .then((data)=>{
            console.log('ESTADÍSTICAS DE ' + `${data.Files}`.cyan +' ARCHIVO(s) ANALIZADO(s):\n\n'+'TOTAL'.cyan +`: ${data.Total} LINKS ( `+`${data.Ok} OK `.green +' & ' + `${data.Broquen} BROQUEN`.yellow +' )')
            console.log('UNIQUE'.cyan +`: ${data.Unique} LINKS ( `+`${data.UniqueOk} OK `.green +' & ' + `${data.UniqueBroquen} BROQUEN`.yellow +' )')
        },(error)=>{
            console.log(`Error: ${error}`)
        })   
    }
}
