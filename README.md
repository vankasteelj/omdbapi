# omdbapi

Omdbapi wrapper, written in NodeJS

## Usage

#### Setup
```
npm install omdbapi
```

#### Initialize
```js
var omdb = require('omdbapi');
```

#### Example usage
```js
omdb.search({
    search: 'lord of the ring'
}).then(function (res) {
    console.log('got response:', res);
}).catch(console.error.bind(console));

omdb.get({
    id: 'tt0145487'
}).then(function (res) {
    console.log('got response:', res);
}).catch(console.error.bind(console));
```

## License

The MIT License

Copyright (c) 2016 - vankasteelj <vankasteelj@gmail.com>

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
