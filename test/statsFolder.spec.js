const { mdLinks } = require('../src/index.js')

describe('mdLinks (folder)', () => {
  test('mdLinks stats option', async() => {                   
    const data = await mdLinks('carpeta',{stats:true});
    expect(data).toEqual({ Total: '24', Unique: '4' });
  });
});
