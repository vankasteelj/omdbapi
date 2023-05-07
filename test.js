//// FILL ME /////
const apikey = '' //your api key

let search, get

console.time('Elapsed time SEARCH')
console.time('Elapsed time GET')
const omdb = new (require('./omdbapi.js'))(apikey)

omdb.search({
  search: 'game of thrones',
  type: 'series',
  year: '2011',
  page: '1'
}).then(res => {
  search = res
  return omdb.get({
    id: 'tt0944947',
    title: 'Game of Thrones',
    season: 1,
    episode: 1,
    type: 'series',
    plot: 'full',
    tomatoes: true,
    year: '2011'
  })
}).then(res => {
  get = res
  console.log('SEARCH response:', search)
  console.timeEnd('Elapsed time SEARCH')
  console.log('\n\n')
  console.log('GET response:', get)
  console.timeEnd('Elapsed time GET')
}).catch(console.error)