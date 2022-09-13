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
  pathRead,
  mdLinks1,
  mdLinks2,

} = require('./index.js');


describe('existRoute', () => {
  it('Route "readmeExample.md" should return true', () => {
    expect(existRoute('readmeExample.md')).toBe(true)
  });
  it('Route "readmeExamp.md" should return true', () => {
    expect(existRoute('readmeExamp.md')).toBe(false)
  });
});