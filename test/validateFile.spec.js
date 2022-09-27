const { mdLinks } = require('../src/index.js')
const axios = require('axios')
jest.mock('axios')

const validate = [{file: 'readmeAllOkLinks.md',text: 'Markdown',href: 'https://es.wikipedia.org/wiki/Markdown',status: '200',result: 'OK'}]
// VALIDATE TRUE --------------------------------------------------
describe('mdLinks (file) with validate option', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockClear()
  });
  test('mdLinks (file) whith validate option', async() => {
    axios.get.mockImplementation(()=>Promise.resolve({status:'200', statusText:'OK'}));
    return mdLinks('readmeAllOkLinks.md',{validate:true}).then(data=>{
      expect(data).toEqual(validate);
    });
  });
});
