const {
  //mdLinks,
  existRoute,
  pathGlobal,
  pathReadFile,
  converMdToHtml,
  pathReadMd,
  pathReadFolders,
  pathRead,
  readmdLinks,
  readDocuments,
  readmdLinkStatus,
  readDocumentsArr,
  statsArrayGlobal,
  statsArray,
  statsArrayStatus
} = require('../src/main.js')


const fileRoute = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';
const fileRouteNormalize = '/Users///vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';

const carpeta1 = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1'
const carpeta2 = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta2'
const readmeExample = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/readmeExample.md'
const folderArray = [carpeta1, carpeta2, readmeExample]
const folderArray2 = [carpeta1, carpeta2]
const folderArray3 = [readmeExample]
const arrrayEjemplo= [
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/readmeExample.md',
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/aeadmExample.md',
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/readmeExample2.md',
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/fs/ffs/readmeExample.md'
]

describe('existRoute', () => {
  it('Route "readmeExample.md" should return TRUE', () => {
    expect(existRoute('readmeExample.md')).toBe(true)
  });
  it('Route "readmeExamp.md" should return FALSE', () => {
    expect(existRoute('readmeExamp.md')).toBe(false)
  });
});

describe('pathGlobal', () => {
  it('Relative route "readmeExample.md" should return absolute route', () => {
    expect(pathGlobal('readmeExample.md')).toBe(fileRoute)
  });
  it('Route "readmeExample.md" should return absolute route', () => {
    expect(pathGlobal(fileRouteNormalize)).toBe(fileRoute)
  });
});


describe('pathReadFolders', () => {
  it('Route "pathReadFolders" should return only folders', () => {
    expect( pathReadFolders(folderArray)).toEqual(folderArray2)
  });
  it('Route "pathReadFolders" should return error4 if the array of folder dont have folders', () => {
    expect( pathReadFolders(folderArray3)).toBe('no hay folders en la carpeta')
  });
});

describe('pathRead', () => {
    it('"pathRead" should return error1',() => {
        expect(pathRead('folderFiles0')).toBe('no hay archivos en la carpeta');
    });
    it('"pathRead" should return error2',() => {
        expect(pathRead('folderFiles0234')).toBe('la carpeta o ruta no existen');
      });
    it('"pathRead" should return all files .md',() => {
        expect(pathRead('carpetaTest')).toHaveLength(4);
      });
});

describe(' pathReadMd', () => {
  it('function "pathReadMd" should return files that are ".md"', () => {
    expect( pathReadMd(folderArray)).toHaveLength(1)
  });
  it('function "pathReadMd" should return erro3 if the array has not ".md" files', () => {
    expect( pathReadMd(folderArray2)).toBe('no hay archivos .md en la carpeta')
  });
});


describe(' pathReadFile', () => {
  it('function "pathReadFile" should return route of file ".md" normalize and absolute', () => {
      expect(pathReadFile('readmeExample.md')).toBe(fileRoute);
  });
  it('function "pathReadFile" will be error if the file is not ".md"', () => {
      expect(pathReadFile('thumb.png')).toBe('no es un archivo .md...');
  });
});

/// cambiar sync ------
describe('readmdLinks', () => {
  test('readmdLinks', async() => {
    return readmdLinks('readmeVacio.md').catch(error=>{
      expect(error).toBe('el archivo esta vacio');
    });
  });

  test('readmdLinks', async() => {
    return readmdLinks('readmeExample.md').then(data=>{
      expect(data).toHaveLength(5);
    });
  });
});
//*******

describe('converMdToHtml', () => {
  it('function "converMdToHtml" will be error if the file has not links', () => {
      expect( converMdToHtml('')).toBe('no hay links...');
  });
  it('function "converMdToHtml" array that contain all links with their document and text', () => {
      expect(converMdToHtml(['../readmeAllOkLinks.md','[Node.js](http://nodejs.og/)'])).toEqual([ [ '../readmeAllOkLinks.md', 'Node.js', 'http://nodejs.og/' ] ])
  });
});

describe('readDocuments', () => {
  test('readDocuments', async() => {
    return readDocuments('readmeVaci.md').catch(error=>{
      expect(error).toBe('ENOENT: el archivo no existe');
    });
  });

  test('readDocuments', async() => {
    return readDocuments('readmeExample.md').then(data=>{
      expect(data[1]).toContain('es un lenguaje de marcado');
    });
  });
});


describe('readDocumentsArr', () => {
  test('readDocumentsArr', async() => {
    return readDocumentsArr(arrrayEjemplo).then(data=>{
      expect(data).toHaveLength(4);
    });
  });
});

describe('statsArrayStatus', () => {
  it('function "statsArrayStatus" should return links with details', () => {
    expect( statsArrayStatus([{file:'a',text:'b',href:'c',status:'e',result:'OK'},{file:'a',text:'b',href:'d',status:'e',result:'FAIL'},{file:'b',text:'b',href:'d',status:'e',result:'FAIL'}])).toEqual({Files:'2' ,Total:'3',Ok:'1',Broquen:'2',Unique:'2',UniqueOk:'1',UniqueBroquen:'1'})
  });
  it('function "statsArrayStatus" should return erro3 if the array has not links', () => {
    expect( statsArrayStatus([])).toBe('No hay links por analizar...')
  });
});

describe('statsArray', () => {
  it('function "statsArray" should return number of total and unique links WHEN there is a file ".md"', () => {
    expect( statsArray(['link1','link2','link2'])).toEqual({ Total: '3', Unique: '2' })
  });
  it('function "statsArray" should return error if the array has not links WHEN there is a file ".md"', () => {
    expect( statsArray(18)).toBe('...no se puede analizar')
  });
});

describe('statsArrayGlobal', () => {
  it('function "statsArrayGlobal" should return number of total and unique links WHEN there are diferents files ".md"', () => {
    expect( statsArrayGlobal([['a','b','link1'],['c','d','link2'],['e','f','link2']])).toEqual({ Total: '3', Unique: '2' })
  });
  it('function "statsArrayGlobal" should return error if the array has not links WHEN there are diferents files ".md"', () => {
    expect( statsArrayGlobal(18)).toBe('...no se puede analizar')
  });
});
//-----
describe('readmdLinkStatus', () => {
  test('readmdLinkStatus', async() => {
    return readmdLinkStatus('https://www.kualo.co.uk/404').catch(error=>{
      expect(error.response).toBe('404');
    });
  });
test('readmdLinkStatus', async() => {
    return readmdLinkStatus('http://nodejs.og/').catch(error=>{
      expect(error.request).toBe('undefined: no se recibió respuesta');
    });
  });
  test('readmdLinkStatus', async() => {
    return readmdLinkStatus('https://es.wikipedia.org/wiki/Markdown').then(data=>{
      expect(response).toBe('200');
    });
  });
});
