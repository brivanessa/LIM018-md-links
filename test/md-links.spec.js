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
  pathRead,
  mdLinks1,
  mdLinks2,

} = require('/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/index.js');

const fileRoute = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';
const fileRouteNormalize = '/Users///vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md';
const fileRouteTestExample = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md';
const folderTestOneFileMd ='/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd';
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

describe(' pathReadFile', () => {
  it('Route " pathReadFile" should return the route of file',() => {
      expect(pathReadFile('readmeExample.md')).toBe(fileRoute);
    })
});

// describe('pathRead',() => {
//   it('Route "pathRead" should return the route of file', async() => {
//       const route = await pathRead(folderTestOneFileMd);
//       (expect(route).toEqual(fileRouteTestExample));
//     })
// });
test('the data is peanut butter', async () => {
  function pathRead(error,  folderTestOneFileMd) {
    if (error) {
      throw error;
    }
    await expect( folderTestOneFileMd).toBe(fileRouteTestExample);
  }

  pathRead(pathRead);
});

// describe(' pathReadFile', () => {
//   it('Route " pathReadFile" should return true',async () => {
//     let docslist=[];
//     const datos = await pathReadFile('readmeExample.md')
//     expect(docslist.length).toBe(1);
//   });
// });

// describe('pathRead', () => {
//   it('Route "pathRead" should return true',() => {
//     expect(pathRead('carpeta')).toBe(1);
//   });
// });