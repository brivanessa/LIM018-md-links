#!/usr/bin/env node

const mdlinksFunction = require('./index.js');
// const  tiza  =  requerir ( 'tiza' );
const arguments = process.argv;
const route = arguments[2];

if (arguments.length === 3){
    mdlinksFunction.mdLinks(route)
    .then((data)=>{
        console.log(data)
    },(error)=>{
        console.log(`Error: ${error}`)
    })   
}

if (arguments.length === 4 && (arguments[3]=='--validate'||arguments[3]=='--va')){
    mdlinksFunction.mdLinks(route,{validate:true})
    .then((data)=>{
        console.log(data)
    },(error)=>{
        console.log(`Error: ${error}`)
    })   
}

if (arguments.length === 4 && (arguments[3]=='--stats'||arguments[3]=='--st')){
    mdlinksFunction.mdLinks(route,{stats:true})
    .then((data)=>{
        console.log(data)
    },(error)=>{
        console.log(`Error: ${error}`)
    })   
}

if (arguments.length === 5){
    if((arguments[4]=='--stats'||arguments[4]=='--st') && (arguments[3]=='--validate'||arguments[3]=='--va')){
        mdlinksFunction.mdLinks(route,{validate:true,stats:true})
        .then((data)=>{
            console.log(data)
        },(error)=>{
            console.log(`Error: ${error}`)
        })   
    }
    if((arguments[3]=='--stats'||arguments[3]=='--st') && (arguments[4]=='--validate'||arguments[4]=='--va')){
        mdlinksFunction.mdLinks(route,{validate:true,stats:true})
        .then((data)=>{
            console.log(data)
        },(error)=>{
            console.log(`Error: ${error}`)
        })   
    }
}