const { mdLinks } = require('../src/index.js')
const axios = require('axios')
jest.mock('axios')

const folderValidate =[
  { file: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md',text: 'Preámbulo',href: 'https://es.wikipedia.org/wiki/Markdown',status: '200',result: 'OK'},
  { file: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md',  text: 'Markdown', href: 'https://es.wikipedia.org/wiki/Markdown', status: '200',result: 'OK'},
  { file: '/Users/vanessa/Documents/LABORATORIA_018_2022/4_Proyecto/LIM018-md-links/folderTestOneFileMd/fileTestExample.md', text: 'Node.js', href: 'http://nodejs.org/', status: '200',result: 'OK'},
]
// VALIDATE TRUE --------------------------------------------------

describe('mdLinks (file) with validate option', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockClear()
  });
  test('mdLinks (file) whith validate option', async() => {
    axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
    return mdLinks('folderTestOneFileMd',{validate:true}).then(data=>{
      expect(data).toEqual(folderValidate);
    });
  });
});
