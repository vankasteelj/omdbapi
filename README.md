# omdbapi

Omdbapi wrapper, written in NodeJS

## Usage

#### Setup
```
npm install omdbapi
```

#### Initialize
```js
const omdb = require('omdbapi');
```

#### Example usage
```js
omdb.search({
    search: 'game of thrones',  // required
    type: 'series',             // optionnal  ['series', 'episode', 'movie']
    year: '2011',               // optionnal
    page: '1'                   // optionnal (1 to 100)
}).then(res => {
    console.log('got response:', res);
}).catch(console.error);

omdb.get({
    id: 'tt0944947',            // optionnal (requires imdbid or title)
    title: 'Game of Thrones',   // optionnal (requires imdbid or title)
    season: 1,                  // optionnal
    episode: 1,                 // optionnal
    type: 'series',             // optionnal ['series', 'episode', 'movie']
    plot: 'full',               // optionnal (defaults to 'short')
    tomatoes: true,             // optionnal (get rotten tomatoes ratings)
    year: '2011'                // optionnal
}).then(res => {
    console.log('got response:', res);
}).catch(console.error);
```

## License

The MIT License

Copyright (c) 2016-2017 - vankasteelj <vankasteelj@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
