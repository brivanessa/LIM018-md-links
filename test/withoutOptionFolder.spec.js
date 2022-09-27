const { mdLinks } = require('../src/index.js')

 const folderWithoutOptions=[
  {link: '1/3', href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Preámbulo', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md'},
  { link: '2/3', href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md' },
  { link: '3/3', href: 'http://nodejs.org/', text: 'Node.js', file: 'fileTestExample.md', route: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md'},
]

describe('mdLinks (folder)', () => {
  test('mdLinks without options', async() => {                   
    const data = await mdLinks('folderTestOneFileMd');
    expect(data).toEqual(folderWithoutOptions);
  });
});
