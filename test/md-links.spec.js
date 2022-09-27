const { mdLinks } = require('../src/index.js')

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

