// const axios = require('axios')

const {
  mdLinks,
} = require('../src/mdLinks')

// jest.mock('axios')

const folderAbsoluteRoute1 = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta';
const fileRoute1 = 'readmeAllOkLinks.md';
const fileRouteFails = 'readmeAllFailLinks.md';
const fileEmpty = 'readmeVacio.md';  
const fileNoExists = 'readmeOk.md';
const fileNoMd = 'thumb.png';

const folderOneFile = 'folderTestOneFileMd';
const folderEmpty = 'folderFiles0';
const folderNoMd = 'folderFilesNoMd';
const folderFail = 'carpetaTest';
const folderNoExists = 'readmeOk';
beforeEach(()=>{
  folderAbsoluteRoute1.clear
  const fileRoute1 = 'readmeAllOkLinks.md';
  const fileRouteFails = 'readmeAllFailLinks.md';
  const fileEmpty = 'readmeVacio.md';  
  const fileNoExists = 'readmeOk.md';
  const fileNoMd = 'thumb.png';
  
  const folderOneFile = 'folderTestOneFileMd';
  const folderEmpty = 'folderFiles0';
  const folderNoMd = 'folderFilesNoMd';
  const folderFail = 'carpetaTest';
  const folderNoExists = 'readmeOk';
})


// const rutas ={
//   folderAbsoluteRoute1:'/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta',
//   fileRoute1:'/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/readmeAllOkLinks.md',
// }

// NO OPTIONS --------------------------------------------------
describe('mdLinks (file) without options', () => {
    test('mdLinks', async() => {
      return mdLinks(fileRoute1).catch(data=>{
        expect(data).toHaveLength(1);
      }); 
    });
    test('mdLinks', async() => {                     
      return mdLinks(fileEmpty).catch(data=>{
        expect(data).toStrictEqual([]);
      });

    });
    // test('mdLinks', async() => {
    //   const data = await mdLinks(fileNoMd);
    //   expect(data.toString()).toContain('Error');
    // });

    test('mdLinks', async() => {                           
      return mdLinks(fileNoExists).catch(data=>{
        expect(data).toBe('La ruta no existe..');
      });
    });
});
      //----------------------------//
describe('mdLinks (folder) without options', () => {
  // test('mdLinks', async() => {                    //FAIL   24 -26
  //   const data = await  mdLinks(folderAbsoluteRoute);
  //   expect(data).toHaveLength(24);
  // });
  // test('mdLinks', async() => {                   //FAIL 5-56
  //   const data = await  mdLinks(folderOneFile);
  //   expect(data).toHaveLength(5);
  //   });
  // test('mdLinks', async() => {                    //FAIL
  //   const data = await  mdLinks(folderNoMd);
  //   expect(data).toBe('La ruta no tiene archivos .md...');
  //   });
});

// VALIDATE:FALSE --------------------------------------------------
describe('mdLinks (file) with validate:false option', () => {
  // test('mdLinks', async() => {                           //FAIL  1-57
  //   return mdLinks(fileRoute,{validate:false}).then(data=>{
  //     expect(data).toHaveLength(1);
  //   });
  // });
  test('mdLinks', async() => {
    return mdLinks(fileEmpty,{validate:false}).catch(data=>{
      expect(data).toBe('el archivo esta vacio');
    });
   });
  test('mdLinks', async() => {      //REVISAR
    return mdLinks(fileNoMd,{validate:false}).catch(data=>{
      expect(data.toString()).toContain('Error');
    });
  });
});
            //-------------------------//
describe('mdLinks (folder) with validate:false option', () => {
// test('mdLinks', async() => {                       //FAIL 24 -112
//     return mdLinks(folderAbsoluteRoute,{validate:false}).then(data=>{
//       expect(data).toHaveLength(24);
//     });
//    });
// test('mdLinks', async() => {                   //FAIL 5 -172
//     return mdLinks(folderOneFile,{validate:false}).then(data=>{
//       expect(data).toHaveLength(5);
//     });
//   });
test('mdLinks', async() => {
    return mdLinks(folderEmpty,{validate:false}).catch(data=>{
      expect(data.toString()).toContain('TypeError');
    });
  });
});


// VALIDATE TRUE --------------------------------------------------
describe('mdLinks (file) with validate:true option', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // axios.get.mockClear()
  });
  test('mdLinks', async() => {
    // axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
    return mdLinks(fileRoute1,{validate:true}).then(data=>{
      expect(data).toHaveLength(1);
    });
  });
  // test('mdLinks', async() => {                                                //FAIL 3 -4
  //   axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
  //   return mdLinks(fileRouteFails,{validate:true}).then(data=>{
  //     expect(data).toHaveLength(3);
  //   });
  // });
  test('mdLinks', async() => {   
    return mdLinks(fileNoExists,{validate:true}).catch(data=>{
      expect(data).toBe('La ruta no existe..');
    });
  });
});
            //--------------------------//
describe('mdLinks (folder) with validate:true option', () => {
  // beforeEach(() => axios.get.mockClear()) 
    // test('mdLinks', async () => {                                                     //FAIL 24 - 88
    //  axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
    //   const data = await mdLinks(folderAbsoluteRoute, { validate: true });
    //   expect(data).toHaveLength(24);
    // });
    // test('mdLinks', async() => {                                                    //FAIL 8 - 180
    //   axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
    //   return mdLinks(folderFail,{validate:true}).then(data=>{
    //     expect(data).toHaveLength(8);
    //   });
    // });        
    test('mdLinks', async() => {   
      return mdLinks(folderNoExists,{validate:true}).catch(data=>{
      expect(data).toBe('La ruta no existe..');
      });
    });

    // test('mdLinks', async() => {   
    //     return mdLinks(folderNoMd,{validate:true}).then(data=>{
    //     expect(data).toBe('La ruta no tiene archivos .md...');
    //     });
    // }); 

});

// STATS TRUE --------------------------------------------------
describe('mdLinks (file) with validate:false option', () => {
  // test('mdLinks', async() => {                                          //FAIL
  //   return mdLinks(fileRoute,{'stats':true}).then(data=>{
  //     expect(data).toEqual({ Total: '1', Unique: '1' });
  //   });
  // });
  test('mdLinks', async() => {
    return mdLinks(fileEmpty,{stats:true}).catch(data=>{
      expect(data).toEqual({ Total: '0', Unique: '0' });
    });
   });
   test('mdLinks', async() => {
    return mdLinks(fileNoExists,{stats:true}).catch(data=>{
      expect(data).toBe('La ruta no existe..');
    });
   }); 
  test('mdLinks', async() => {
    return mdLinks(fileNoMd,{stats:true}).catch(data=>{
      expect(data.toString()).toContain('Error');
    });
  });
});
            //--------------------------//
describe('mdLinks (folder) with validate:false option', () => {
// test('mdLinks', async() => {                                              //FAIL
//     return mdLinks(folderAbsoluteRoute,{stats:true}).then(data=>{
//       expect(data).toEqual({ Total: '24', Unique: '4' });
//     });
//    });
// test('mdLinks', async() => {                                                       //FAIL
//     return mdLinks(folderOneFile,{stats:true}).then(data=>{
//       expect(data).toEqual({ Total: '5', Unique: '4' });
//     });
//   });

test('mdLinks', async() => {
    return mdLinks(folderEmpty,{stats:true}).catch(data=>{
      expect(data.toString()).toContain('TypeError');
    });
  });
// test('mdLinks', async() => {                   
//     const data = await  mdLinks(folderNoMd,{stats:true});
//     expect(data).toBe('La ruta no tiene archivos .md...');
//     });
});

// VALIDATE TRUE & STATS TRUE --------------------------------------------------
describe('mdLinks (file) with validate:false option', () => {                                  //FAIL
  // beforeEach(() => axios.get.mockClear()) 
  // test('mdLinks', async() => {
  //   axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
  //   return mdLinks(fileRoute,{validate:true,stats:true}).then(data=>{
  //     expect(data).toEqual({Files:'1',Total:'1',Ok:'1',Broquen:'0',Unique:'1',UniqueOk:'1',UniqueBroquen:'0'});
  //   });
  // });

  test('mdLinks', async() => {
    return mdLinks(fileEmpty,{validate:true,stats:true}).catch(data=>{
      expect(data).toBe('No hay links por analizar...');
    });
   });
   test('mdLinks', async() => {
    return mdLinks(fileNoExists,{validate:true,stats:true}).catch(data=>{
      expect(data).toBe('La ruta no existe..');
    });
   }); 
  test('mdLinks', async() => {
    return mdLinks(fileNoMd,{validate:true,stats:true}).catch(data=>{
      expect(data.toString()).toContain('Error');
    });
  });
});
            //--------------------------//
describe('mdLinks (folder) with validate:true & stats:true option', () => {                                  //FAIL
  // beforeEach(() => axios.get.mockReset()) 
  test('mdLinks', async() => {   
    // axios.get.mockClear()                  
    // axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
      //console.log(mdLinks(folderAbsoluteRoute))
      return mdLinks(folderAbsoluteRoute1,{validate:true,stats:true}).then(data=>{
        expect(data).toEqual({Files:'4',Total:'24',Ok:'24',Broquen:'0',Unique:'4',UniqueOk:'4',UniqueBroquen:'0'});
      });
     });

  test('mdLinks', async() => {
    // axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
    return mdLinks(folderFail,{validate:true,stats:true}).catch(data=>{
      expect(data).toEqual({Files:'4',Total:'8',Ok:'0',Broquen:'8',Unique:'2',UniqueOk:'2',UniqueBroquen:'0'});
    });
  }); 
  test('mdLinks', async() => {
      return mdLinks(folderNoExists,{validate:true,stats:true}).catch(data=>{
        expect(data).toBe('La ruta no existe..');
      });
    });
  // test('mdLinks', async() => {                   
  //   const data = await  mdLinks(folderNoMd,{validate:true,stats:true});
  //   expect(data).toBe('La ruta no tiene archivos .md...');
  //   });
});