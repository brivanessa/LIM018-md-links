const axios = require('axios')
const {
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

jest.mock('axios')

const fileRoute = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';
const fileRouteNormalize = '/Users///vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';

const carpeta1 = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1'
const carpeta2 = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta2'
const readmeExample = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/exampleFolder1.md'
const folderArray = [carpeta1, carpeta2, readmeExample]
const folderArray2 = [carpeta1, carpeta2]
const folderArray3 = [readmeExample]
const arrrayEjemplo= [
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/exampleFolder1.md',
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/aeadmExample.md',
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/readmeExample2.md',
  '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1/fs/ffs/ExampleFolder2.md'
]

const links= [[ 'a', '1', 'https://abc'],[ 'c', '5','http://def']]
const linksAxiosOk= [
  {file:`${links[0][0]}`,text:`${links[0][1]}`,href:`${links[0][2]}`,status:'200',result:'OK'},
  {file:`${links[1][0]}`,text:`${links[1][1]}`,href:`${links[1][2]}`,status:'200',result:'OK'}]
  const linksAxiosFail1= [
    {file:`${links[0][0]}`,text:`${links[0][1]}`,href:`${links[0][2]}`,status:'400',result:'FAIL'},
    {file:`${links[1][0]}`,text:`${links[1][1]}`,href:`${links[1][2]}`,status:'400',result:'FAIL'}]  
const linksAxiosFail2= [
  {file:`${links[0][0]}`,text:`${links[0][1]}`,href:`${links[0][2]}`,status:'undefined: no se recibió respuesta',result:'FAIL'},
  {file:`${links[1][0]}`,text:`${links[1][1]}`,href:`${links[1][2]}`,status:'undefined: no se recibió respuesta',result:'FAIL'}]
const linksAxiosFail3= [
  {file:`${links[0][0]}`,text:`${links[0][1]}`,href:`${links[0][2]}`,status:'ERROR',result:'FAIL'},
  {file:`${links[1][0]}`,text:`${links[1][1]}`,href:`${links[1][2]}`,status:'ERROR',result:'FAIL'}]
    
  

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
    it('"pathRead" should return all files .md',() => {
        expect(pathRead('carpeta')).toHaveLength(4);
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
});

/// cambiar sync ------
describe('readmdLinks', () => {

  test('readmdLinks', async() => {
    return readmdLinks('readmeExample.md').then(data=>{
      expect(data).toHaveLength(5);
    });
  });
});
//*******

describe('converMdToHtml', () => {
  it('function "converMdToHtml" array that contain all links with their document and text', () => {
      expect(converMdToHtml(['../readmeAllOkLinks.md','[Node.js](http://nodejs.og/)'])).toEqual([ [ '../readmeAllOkLinks.md', 'Node.js', 'http://nodejs.og/' ] ])
  });
});

describe('readDocuments', () => {
  test('readDocuments', async() => {
    return readDocuments('src').catch(error=>{
      expect(error.code).toBe('EISDIR');
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
});

describe('statsArray', () => {
  it('function "statsArray" should return number of total and unique links WHEN there is a file ".md"', () => {
    expect( statsArray(['link1','link2','link2'])).toEqual({ Total: '3', Unique: '2' })
  });
});

describe('statsArrayGlobal', () => {
  it('function "statsArrayGlobal" should return number of total and unique links WHEN there are diferents files ".md"', () => {
    expect( statsArrayGlobal([['a','b','link1'],['c','d','link2'],['e','f','link2']])).toEqual({ Total: '3', Unique: '2' })
  });
});
//-----

  describe('readmdLinkStatus', () => {
    beforeEach(() => axios.get.mockClear())
    test('readmdLinkStatus OK', async() => {
      axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
      return readmdLinkStatus(links).then(data=>{
        expect(data).toEqual(linksAxiosOk);
      });
    });

    test('readmdLinkStatus ERROR 400', async() => {
      axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
      return readmdLinkStatus(links).then(data=>{
        expect(data).toEqual(linksAxiosFail1);
      });
    });

    test('readmdLinkStatus ERROR.request', async() => {
      axios.get.mockImplementation(()=>Promise.reject({request:{status:'undefined'}}));
      return readmdLinkStatus(links).then(data=>{
        expect(data).toEqual(linksAxiosFail2);
      });
    });

    test('readmdLinkStatus ERROR.request', async() => {
      axios.get.mockImplementation(()=>Promise.reject({message:'ERROR'}));
      return readmdLinkStatus(links).then(data=>{
        expect(data).toEqual(linksAxiosFail3);
      });
    });
  });
