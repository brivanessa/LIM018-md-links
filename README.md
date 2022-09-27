# Markdown Links

## Índice

* [1. Descripción](#1-Descripción)
* [2. Instalación](#2-Instalación)
* [3. Uso](#3-Uso)
* [4. Diagrama de flujo](#4-Diagrama-de-flujo)

***

## 1. Descripción

`Markdown Links` es una herramienta creada usando `Node.js` que lee y analiza
 archivos en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

### ¿Por qué es importante?
`Markdown` es un lenguaje de marcado ligero muy popular entre developers. Es 
usado en diversas plataformas que manejan texto plano y es común encontrar 
varios archivos en este formato. Estos archivos `Markdown Links` normalmente 
contienen _links_ (vínculos/ligas) que aveces están rotos o ya no son válidos 
lo que perjudica el valor de la información que se quiere compartir.

## 2. Instalación

Módulo instalable via `npm install vaneah-md-links`.Este módulo incluye
**un ejecutable** que podamos invocar en la línea de comando e incluye 
**una interfaz** que puede importarse con `require` y usarlo programáticamente. 


## 3. Uso

Para corroborar las opciones válidas podemos ejecutar en la terminal: 
`md-links --help` o  `md-links --h`

**--help:**  
![help](https://github.com/brivanessa/LIM018-md-links/blob/main/folderFilesNoMd/help.png)


El ejecutable de la aplicación se ejecuta de la siguiente manera a través 
de la **terminal**:

`md-links <path-to-file> [options]`

**route** 
`md-links readmeExample.md`
![route](https://github.com/brivanessa/LIM018-md-links/blob/main/folderFilesNoMd/md-links.png)

**--validate:**  
`md-links readmeExample.md --validate`
![--validate](https://github.com/brivanessa/LIM018-md-links/blob/main/folderFilesNoMd/validate.png)

**--stats:**  
`md-links readmeExample.md --stats`
![--stats](https://github.com/brivanessa/LIM018-md-links/blob/main/folderFilesNoMd/stats.png)

**--validate --stats:**  
`md-links readmeExample.md --validate --stats`
![--va--st](https://github.com/brivanessa/LIM018-md-links/blob/main/folderFilesNoMd/va%26st.png)


## 4. Diagrama de flujo
![md-links](https://github.com/brivanessa/LIM018-md-links/blob/main/folderFilesNoMd/Diagrama%20sin%20t%C3%ADtulo.drawio-2.png)

