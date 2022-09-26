const { mdLinks } = require('../src/mdLinks.js')
const axios = require('axios')
jest.mock('axios')

const validate = [{file: 'readmeAllOkLinks.md',text: 'Markdown',href: 'https://es.wikipedia.org/wiki/Markdown',status: '200',result: 'OK'}]
const validateStatsOptions={Files: '1', Total: '1', Ok: '1', Broquen: '0',Unique: '1',UniqueOk: '1',UniqueBroquen: '0'}

// VALIDATE TRUE --------------------------------------------------
describe('mdLinks (file) with validate option', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockClear()
  });

  test('mdLinks(file) whith validate and stats options', async() => {
    axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
    return mdLinks('readmeAllOkLinks.md',{validate:true,stats:true}).then(data=>{
      expect(data).toEqual(validateStatsOptions);
    });
  });
});

