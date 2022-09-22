const axios = require('axios')

const {
  mdLinks,
} = require('../src/mdLinks')

jest.mock('axios')

const fileRoute = 'readmeAllOkLinks.md';
const fileEmpty = 'readmeVacio.md'  
const fileNoExists = 'readme.md'
const fileNoMd = 'thumb.png'

const folderAbsoluteRoute = '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/carpeta'
const folderOneFile = 'folderTestOneFileMd'
const folderEmpty = 'folderFiles0'
const folderNoMd = 'folderFilesNoMd'

// NO OPTIONS --------------------------------------------------
describe('mdLinks (file) without options', () => {
    test('mdLinks', async() => {
      return mdLinks(fileRoute).then(data=>{
        expect(data).toHaveLength(1);
      });
    });
    test('mdLinks', async() => {
      return mdLinks(fileEmpty).catch(data=>{
        expect(data).toBe('el archivo esta vacio');
      });
     });
    test('mdLinks', async() => {
      return mdLinks(fileNoMd).catch(data=>{
        expect(data.toString()).toContain('Error');
      });
    });
});
      //----------------------------//
describe('mdLinks (folder) without options', () => {
  test.skip('mdLinks', async() => {                       //REVISAR
      return mdLinks(folderAbsoluteRoute).then(data=>{
        expect(data).toHaveLength(24);
      });
     });
  test.skip('mdLinks', async() => {                   //REVISAR
      return mdLinks(folderOneFile).then(data=>{
        expect(data).toHaveLength(5);
      });
    });
  test('mdLinks', async() => {
      return mdLinks(folderEmpty).catch(data=>{
        expect(data.toString()).toContain('TypeError');
      });
    });
});


// VALIDATE:FALSE --------------------------------------------------
describe('mdLinks (file) with validate:false option', () => {
  test.skip('mdLinks', async() => {                           //REVISAR
    return mdLinks(fileRoute,{validate:false}).then(data=>{
      expect(data).toHaveLength(1);
    });
  });
  test('mdLinks', async() => {
    return mdLinks(fileEmpty,{validate:false}).catch(data=>{
      expect(data).toBe('el archivo esta vacio');
    });
   });
  test('mdLinks', async() => {
    return mdLinks(fileNoMd,{validate:false}).catch(data=>{
      expect(data.toString()).toContain('Error');
    });
  });
});
            //-------------------------//
describe('mdLinks (folder) with validate:false option', () => {
test.skip('mdLinks', async() => {                       //REVISAR
    return mdLinks(folderAbsoluteRoute,{validate:false}).then(data=>{
      expect(data).toHaveLength(24);
    });
   });
test.skip('mdLinks', async() => {                   //REVISAR
    return mdLinks(folderOneFile,{validate:false}).then(data=>{
      expect(data).toHaveLength(5);
    });
  });
test('mdLinks', async() => {
    return mdLinks(folderEmpty,{validate:false}).catch(data=>{
      expect(data.toString()).toContain('TypeError');
    });
  });
});


// VALIDATE TRUE --------------------------------------------------
describe('mdLinks (file) with validate:false option', () => {
  test('mdLinks', async() => {
    return mdLinks(fileRoute,{'stats':true}).then(data=>{
      expect(data).toEqual({ Total: '1', Unique: '1' });
    });
  });
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
test.skip('mdLinks', async() => {                       //REVISAR
    return mdLinks(folderAbsoluteRoute,{stats:true}).then(data=>{
      expect(data).toEqual({ Total: '24', Unique: '17' });
    });
   });
test.skip('mdLinks', async() => {                   //REVISAR
    return mdLinks(folderOneFile,{stats:true}).then(data=>{
      expect(data).toEqual({ Total: '5', Unique: '4' });
    });
  });
  test('mdLinks', async() => {
    return mdLinks(folderNoMd,{stats:true}).catch(data=>{
      expect(data).toEqual({ Total: '0', Unique: '0' });
    });
  }); 
test('mdLinks', async() => {
    return mdLinks(folderEmpty,{stats:true}).catch(data=>{
      expect(data.toString()).toContain('TypeError');
    });
  });
});

// STATS TRUE --------------------------------------------------
describe('mdLinks (file) with validate:false option', () => {
  test('mdLinks', async() => {
    return mdLinks(fileRoute,{'stats':true}).then(data=>{
      expect(data).toEqual({ Total: '1', Unique: '1' });
    });
  });
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
test.skip('mdLinks', async() => {                       //REVISAR
    return mdLinks(folderAbsoluteRoute,{stats:true}).then(data=>{
      expect(data).toEqual({ Total: '24', Unique: '17' });
    });
   });
test.skip('mdLinks', async() => {                   //REVISAR
    return mdLinks(folderOneFile,{stats:true}).then(data=>{
      expect(data).toEqual({ Total: '5', Unique: '4' });
    });
  });
  test('mdLinks', async() => {
    return mdLinks(folderNoMd,{stats:true}).catch(data=>{
      expect(data).toEqual({ Total: '0', Unique: '0' });
    });
  }); 
test('mdLinks', async() => {
    return mdLinks(folderEmpty,{stats:true}).catch(data=>{
      expect(data.toString()).toContain('TypeError');
    });
  });
});

//-----

  // describe('readmdLinkStatus', () => {
  //   beforeEach(() => axios.get.mockClear())
  //   test('readmdLinkStatus OK', async() => {
  //     axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
  //     return readmdLinkStatus(links).then(data=>{
  //       expect(data).toEqual(linksAxiosOk);
  //     });
  //   });

  //   test('readmdLinkStatus ERROR 400', async() => {
  //     axios.get.mockImplementation(()=>Promise.reject({response:{status:'400'}}));
  //     return readmdLinkStatus(links).then(data=>{
  //       expect(data).toEqual(linksAxiosFail1);
  //     });
  //   });

  //   test('readmdLinkStatus ERROR.request', async() => {
  //     axios.get.mockImplementation(()=>Promise.reject({request:{status:'undefined'}}));
  //     return readmdLinkStatus(links).then(data=>{
  //       expect(data).toEqual(linksAxiosFail2);
  //     });
  //   });

  //   test('readmdLinkStatus ERROR.request', async() => {
  //     axios.get.mockImplementation(()=>Promise.reject({message:'ERROR'}));
  //     return readmdLinkStatus(links).then(data=>{
  //       expect(data).toEqual(linksAxiosFail3);
  //     });
  //   });
  // });

