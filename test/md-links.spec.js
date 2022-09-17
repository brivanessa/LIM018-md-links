// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
const {
  mdLinks,
  existRoute,
  pathGlobal,
  pathReadFile,
  readmdLinksGlobal,
  pathReadMd,
  pathReadFolders,
  pathRead,
  readmdLinks,
  readmdLinkStatus,
  statslinksGlobal,
} = require('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/index.js');
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
  it('Route "readmeExample.md" should return true', () => {
    expect(existRoute('readmeExample.md')).toBe(true)
  });
  it('Route "readmeExamp.md" should return true', () => {
    expect(existRoute('readmeExamp.md')).toBe(false)
  });
});

describe('pathGlobal', () => {
  it('Route "readmeExample.md" should return true', () => {
    expect(pathGlobal('readmeExample.md')).toBe(fileRoute)
  });
  it('Route "readmeExamp.md" should return true', () => {
    expect(pathGlobal(fileRouteNormalize)).toBe(fileRoute)
  });
});


describe(' pathReadFolders', () => {
  it('Route "pathReadFolders" should return true', () => {
    expect( pathReadFolders(folderArray)).toEqual(folderArray2)
  });
  it('Route "readmeExamp.md" should return true', () => {
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
  it('Route " pathReadMd" should return true', () => {
    expect( pathReadMd(folderArray)).toHaveLength(1)
  });
  it('Route "readmeExamp.md" should return true', () => {
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

describe('readmdLinksGlobal', () => {
  test('readmdLinksGlobal', async() => {
    return readmdLinksGlobal('readmeVacio.md').catch(error=>{
      expect(error).toBe('el archivo esta vacio');
    });
  });

  test('readmdLinksGlobal', async() => {
    return readmdLinksGlobal('readmeExample.md').then(data=>{
      expect(data).toEqual(readmeExampleLinks);
    });
  });
});

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


describe('statslinksGlobal', () => {
  test('statslinksGlobal', async() => {
    return statslinksGlobal('readmeVacio.md').catch(error=>{
      expect(error).toBe('el archivo esta vacio');
    });
  });

  test('statslinksGlobal', async(done) => {
    return statslinksGlobal('readmeExample.md').then(data=>{
      setTimeout(()=>{
        expect(data).toHaveLength(2)
        done()
      },5000)
      //expect(data).toHaveLength(5);
    });
  });
});
