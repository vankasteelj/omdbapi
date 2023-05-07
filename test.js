//// FILL ME /////
const apikey = '' //your api key

console.time('Elapsed time')
const omdb = new (require('./omdbapi.js'))(apikey)
omdb.search({
  search: 'game of thrones',
  type: 'series',
  year: '2011',
  page: '1'
}).then(res => {
  console.log('Got response', res)
  console.timeEnd('Elapsed time')
}).catch(console.error)