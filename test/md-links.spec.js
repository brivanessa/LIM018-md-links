// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
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
  statsArrayGlobal,
} = require('../src/main.js')
jest.setTimeout(20000)
const fileRoute = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';
const fileRouteNormalize = '/Users///vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';
const fileRouteTestExample = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md';
const folderTestOneFileMd ='/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd';
//files de folder:carpeta1
//const carpeta = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta'
const carpeta1 = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta1'
const carpeta2 = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/carpeta2'
const readmeExample = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta/readmeExample.md'
const folderArray = [carpeta1, carpeta2, readmeExample]
const folderArray2 = [carpeta1, carpeta2]
const folderArray3 = [readmeExample]
const readmeExampleLinks = [
  'https://es.wikipedia.org/wiki/Markdown',
  'https://es.wikipedia.org/wiki/Markdown',
  'http://nodejs.og/',
  'https://www.lego.com/en-us/notfound',
  'https://blueg.co.uk/404'
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
    test(' pathRead', async() => {
      return pathRead('folderFiles0').catch(error=>{
        expect(error).toBe('no hay archivos en la carpeta');
      });
    });
    test(' pathRead', async() => {
      return pathRead('folderFiles0234').catch(error=>{
        expect(error).toBe('la carpeta o ruta no existen');
      });
    });

    test(' pathRead', async() => {
      return pathRead('carpetaTest').then(data=>{
        expect(data).toHaveLength(4);
      });
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
  test(' pathReadFile', async() => {
    return pathReadFile('readmeExample.md').then(data=>{
      expect(data).toBe(fileRoute);
    })
  });
  test(' pathReadFile', async() => {
    return pathReadFile('thumb.png').catch(error=>{
      expect(error).toBe('no es un archivo .md...');
    });
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
  test('converMdToHtml', async() => {
    return converMdToHtml('').catch(error=>{
      expect(error).toBe('no hay links...');
    });
  });

  test('converMdToHtml', async() => {
    return converMdToHtml(`[Node.js](http://nodejs.og/)`).then(data=>{
      expect(data).toHaveLength(1);
    });
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
      expect(data).toContain('es un lenguaje de marcado');
    });
  });
});

describe('statslinksGlobal', () => {
  it('function "statslinksGlobal" should return files that are ".md"', () => {
    expect( statsArrayGlobal(['link1','link2','link2'])).toEqual({ Total: '3', Unique: '2' })
  });
  it('function "statslinksGlobal" should return erro3 if the array has not ".md" files', () => {
    expect( statsArrayGlobal('link1')).toBe('...no se puede analizar')
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

// describe('readmdLinksGlobal', () => {
//   test('readmdLinksGlobal', async() => {
//     return readmdLinksGlobal('readmeVacio.md').catch(error=>{
//       expect(error).toBe('undefined: el archivo esta vacio');
//     });
//   });

//   test('readmdLinksGlobal', async() => {
//     return readmdLinksGlobal('readmeExample.md').then(data=>{
//       expect(data).toEqual(readmeExampleLinks);
//     });
//   });
// });

/*
describe('readmdLinkStatus', () => {
  test('readmdLinkStatus', async() => {
    return readmdLinkStatus('readmeVacio.md').catch(error=>{
      expect(error).toBe('el archivo esta vacio');
    });
  });

  test('readmdLinkStatus', async(done) => {
    return readmdLinkStatus('readmeExample.md').then(data=>{
      setTimeout(()=>{
        expect(data).toHaveLength(5)
        done()
      },1000)
      //expect(data).toHaveLength(5);
    });
  });
});


describe('functionGlobalStats', () => {
  test('functionGlobalStats', async() => {
    return functionGlobalStats('readmeVacio.md').catch(error=>{
      expect(error).toBe('el archivo esta vacio');
    });
  });

  test('functionGlobalStats', async(done) => {
    return functionGlobalStats('readmeExample.md').then(data=>{
        expect(data).toEqual(2)
    });
  });
});
*/
