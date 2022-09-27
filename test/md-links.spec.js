const { mdLinks } = require('../src/index.js')

<<<<<<< HEAD
const {
  mdLinks,
} = require('../src/mdLinks')

jest.mock('axios')

const fileRoute = 'readmeAllOkLinks.md';
const fileRouteFails = 'readmeAllFailLinks.md';
const fileEmpty = 'readmeVacio.md'  
const fileNoExists = 'readmeOk.md'
const fileNoMd = 'thumb.png'

const folderAbsoluteRoute = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta'
const folderOneFile = 'folderTestOneFileMd'
const folderEmpty = 'folderFiles0'
const folderNoMd = 'folderFilesNoMd'
const folderFail = 'carpetaTest'
const folderNoExists = 'readmeOk'
// NO OPTIONS --------------------------------------------------
// describe('mdLinks (file) without options', () => {
//     test('mdLinks', async() => {
//       return mdLinks(fileRoute).then(data=>{
//         expect(data).toHaveLength(1);
//       });
//     });
//     test('mdLinks', async() => {
//       return mdLinks(fileEmpty).catch(data=>{
//         expect(data).toBe('el archivo esta vacio');
//       });
//      });
//     test('mdLinks', async() => {
//       return mdLinks(fileNoMd).catch(data=>{
//         expect(data.toString()).toContain('Error');
//       });
//     });
// });
      //----------------------------//
describe('mdLinks (folder) without options', () => {

  test('mdLinks', () => {                       //REVISAR
      return mdLinks(folderAbsoluteRoute).then(data=>{
        expect(data).toHaveLength(24);
      });
     });
  test('mdLinks', () => {                   //REVISAR
      return mdLinks(folderOneFile).then(data=>{
        console.log(data.length)
        expect(data).toHaveLength(5);
      });
    });
  // test('mdLinks', () => {                   //REVISAR IMPP
  //     return mdLinks(fileNoExists).then(data=>{
  //       expect(data).toBe('La ruta no existe..');
  //     });
  //   });  
});


// // VALIDATE:FALSE --------------------------------------------------
// describe('mdLinks (file) with validate:false option', () => {
//   test('mdLinks', async() => {                           //REVISAR
//     return mdLinks(fileRoute,{validate:false}).then(data=>{
//       expect(data).toHaveLength(1);
//     });
//   });
//   test('mdLinks', async() => {
//     return mdLinks(fileEmpty,{validate:false}).catch(data=>{
//       expect(data).toBe('el archivo esta vacio');
//     });
//    });
//   test('mdLinks', async() => {
//     return mdLinks(fileNoMd,{validate:false}).catch(data=>{
//       expect(data.toString()).toContain('Error');
//     });
//   });
// });
//             //-------------------------//
// describe('mdLinks (folder) with validate:false option', () => {
// test('mdLinks', async() => {                       //REVISAR
//     return mdLinks(folderAbsoluteRoute,{validate:false}).then(data=>{
//       //console.log(data)
//       expect(data).toHaveLength(24);
//     });
//    });
// test('mdLinks', async() => {                   //REVISAR
//     return mdLinks(folderOneFile,{validate:false}).then(data=>{
//       expect(data).toHaveLength(5);
//     });
//   });
// test('mdLinks', async() => {
//     return mdLinks(folderEmpty,{validate:false}).catch(data=>{
//       expect(data.toString()).toContain('TypeError');
//     });
//   });
// });


// // VALIDATE TRUE --------------------------------------------------
// describe('mdLinks (file) with validate:true option', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     axios.get.mockClear()
//   });
//   test('mdLinks', async() => {
//     axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
//     return mdLinks(fileRoute,{validate:true}).then(data=>{
//       expect(data).toHaveLength(1);
//     });
//   });
//   test('mdLinks', async() => {                                                //REVISAR
//     axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
//     return mdLinks(fileRouteFails,{validate:true}).then(data=>{
//       expect(data).toHaveLength(3);
//     });
//   });
//   test('mdLinks', async() => {   
//     return mdLinks(fileNoExists,{validate:true}).then(data=>{
//       expect(data).toBe('La ruta no existe..');
//     });
//   });
// });
//             //--------------------------//
// describe('mdLinks (folder) with validate:true option', () => {
//   beforeEach(() => axios.get.mockClear()) 
//     test('mdLinks', async() => {                                                     //REVISAR
//      axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
//       return mdLinks(folderAbsoluteRoute,{validate:true}).then(data=>{
//         expect(data).toHaveLength(24);
//       });
//     });
//     test('mdLinks', async() => {                                                    //REVISAR
//       axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
//       return mdLinks(folderFail,{validate:true}).then(data=>{
//         expect(data).toHaveLength(8);
//       });
//     });        
//     test('mdLinks', async() => {   
//       return mdLinks(folderNoExists,{validate:true}).then(data=>{
//       expect(data).toBe('La ruta no existe..');
//       });
//     });
// });

// // STATS TRUE --------------------------------------------------
// describe('mdLinks (file) with validate:false option', () => {
//   test('mdLinks', async() => {                                          //REVISAR
//     return mdLinks(fileRoute,{'stats':true}).then(data=>{
//       expect(data).toEqual({ Total: '1', Unique: '1' });
//     });
//   });
//   test('mdLinks', async() => {
//     return mdLinks(fileEmpty,{stats:true}).catch(data=>{
//       expect(data).toEqual({ Total: '0', Unique: '0' });
//     });
//    });
//    test('mdLinks', async() => {
//     return mdLinks(fileNoExists,{stats:true}).catch(data=>{
//       expect(data).toBe('La ruta no existe..');
//     });
//    }); 
//   test('mdLinks', async() => {
//     return mdLinks(fileNoMd,{stats:true}).catch(data=>{
//       expect(data.toString()).toContain('Error');
//     });
//   });
// });
//             //--------------------------//
// describe('mdLinks (folder) with validate:false option', () => {
// test('mdLinks', async() => {                                              //REVISAR
//     return mdLinks(folderAbsoluteRoute,{stats:true}).then(data=>{
//       expect(data).toEqual({ Total: '24', Unique: '17' });
//     });
//    });
// test('mdLinks', async() => {                                                       //REVISAR
//     return mdLinks(folderOneFile,{stats:true}).then(data=>{
//       expect(data).toEqual({ Total: '5', Unique: '4' });
//     });
//   });
//   test('mdLinks', async() => {
//     return mdLinks(folderNoMd,{stats:true}).catch(data=>{
//       expect(data).toEqual({ Total: '0', Unique: '0' });
//     });
//   }); 
// test('mdLinks', async() => {
//     return mdLinks(folderEmpty,{stats:true}).catch(data=>{
//       expect(data.toString()).toContain('TypeError');
//     });
//   });
// });

// // VALIDATE TRUE & STATS TRUE --------------------------------------------------
// describe('mdLinks (file) with validate:false option', () => {                                  //REVISAR
//   beforeEach(() => axios.get.mockClear()) 
//   test('mdLinks', async() => {
//     axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
//     return mdLinks(fileRoute,{validate:true,stats:true}).then(data=>{
//       expect(data).toEqual({Files:'1',Total:'1',Ok:'1',Broquen:'0',Unique:'1',UniqueOk:'1',UniqueBroquen:'0'});
//     });
//   });
//   test('mdLinks', async() => {                                                            //REV // URG
//     axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
//     return mdLinks(fileRouteFails,{validate:true,stats:true}).then(data=>{
//       expect.only(data).toEqual({Files:'1',Total:'3',Ok:'0',Broquen:'3',Unique:'1',UniqueOk:'0',UniqueBroquen:'0'});
//     });
//   });
//   test('mdLinks', async() => {
//     return mdLinks(fileEmpty,{validate:true,stats:true}).catch(data=>{
//       expect(data).toBe('No hay links por analizar...');
//     });
//    });
//    test('mdLinks', async() => {
//     return mdLinks(fileNoExists,{validate:true,stats:true}).catch(data=>{
//       expect(data).toBe('La ruta no existe..');
//     });
//    }); 
//   test('mdLinks', async() => {
//     return mdLinks(fileNoMd,{validate:true,stats:true}).catch(data=>{
//       expect(data.toString()).toContain('Error');
//     });
//   });
// });
//             //--------------------------//
// describe('mdLinks (folder) with validate:false option', () => {                                  //REVISAR
// beforeEach(() => axios.get.mockClear()) 
// test('mdLinks', async() => {                     
//   axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
//     return mdLinks(folderAbsoluteRoute,{validate:true,stats:true}).then(data=>{
//       expect(data).toEqual({Files:'4',Total:'24',Ok:'24',Broquen:'0',Unique:'4',UniqueOk:'4',UniqueBroquen:'0'});
//     });
//    });

//   test('mdLinks', async() => {
//     axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
//     return mdLinks(folderFail,{validate:true,stats:true}).catch(data=>{
//       expect(data).toEqual({Files:'4',Total:'8',Ok:'0',Broquen:'8',Unique:'2',UniqueOk:'2',UniqueBroquen:'0'});
//     });
//   }); 
// test('mdLinks', async() => {
//     return mdLinks(folderNoExists,{validate:true,stats:true}).catch(data=>{
//       expect(data).toBe('La ruta no existe..');
//     });
//   });
// });
=======
 const withoutOptions =[
    {link: '1/5',href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Preámbulo', file: 'readmeExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md'},
    {link: '2/5',href: 'https://es.wikipedia.org/wiki/Markdown',text: 'Markdown',file: 'readmeExample.md',route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md'},
    {link: '3/5',href: 'http://nodejs.org/', text: 'Node.js', file: 'readmeExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md'},
    {link: '4/5',href: 'https://www.lego.com/en-us/notfound', text: 'PIXAR', file: 'readmeExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md'},
    {link: '5/5',href: 'https://blueg.co.uk/404',text: 'Arreglos',file: 'readmeExample.md',route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeExample.md'}
 ]
 const folderWithoutOptions=[
  {link: '1/5', href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Preámbulo', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md'},
  { link: '2/5', href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md' },
  { link: '3/5', href: 'http://nodejs.og/', text: 'Node.js', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md'},
  { link: '4/5', href: 'https://www.lego.com/en-us/notfound', text: 'PIXAR', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md'},
  { link: '5/5', href: 'https://blueg.co.uk/404', text: 'Arreglos', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md'}
]
// // NO OPTIONS --------------------------------------------------
describe('mdLinks error', () => {
  test('mdLinks error path', async() => {                           
    return mdLinks('prueba1234').catch(data=>{
      expect(data).toBe('La ruta no existe..');
    });
  });
  test('mdLinks error path', async() => {                           
    return mdLinks('prueba1234',{validate:true}).catch(data=>{
      expect(data).toBe('La ruta no existe..');
    });
  });
  test('mdLinks error path', async() => {                           
    return mdLinks('prueba123',{stats:true}).catch(data=>{
      expect(data).toBe('La ruta no existe..');
    });
  });
  test('mdLinks error path', async() => {                           
    return mdLinks('prueba1234',{validate:true,stats:true}).catch(data=>{
      expect(data).toBe('La ruta no existe..');
    });
  });
  test('mdLinks there are not .md files', async() => {   
    return mdLinks('folderFilesNoMd').then(data=>{
     expect(data).toBe('La ruta no tiene archivos .md...');
    });
  }); 
  test('mdLinks there are not .md files', async() => {   
    return mdLinks('folderFilesNoMd',{validate:true}).then(data=>{
     expect(data).toBe('La ruta no tiene archivos .md...');
    });
  }); 
  test('mdLinks there are not .md files', async() => {   
    return mdLinks('folderFilesNoMd',{stats:true}).then(data=>{
     expect(data).toBe('La ruta no tiene archivos .md...');
    });
  }); 
  test('mdLinks there are not .md files', async() => {   
    return mdLinks('folderFilesNoMd',{validate:true,stats:true}).then(data=>{
     expect(data).toBe('La ruta no tiene archivos .md...');
    });
  }); 
});

describe('mdLinks (file)', () => {
  test('mdLinks stats option', async() => {                   
    const data = await mdLinks('readmeExample.md',{stats:true});
    expect(data).toEqual({ Total: '5', Unique: '4' });
  });
  test('mdLinks without options', async() => {                   
    const data = await mdLinks('readmeExample.md');
    expect(data).toEqual(withoutOptions);
  });
});
>>>>>>> pre_main

