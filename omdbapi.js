'use strict';

module.exports = class OMDB {
    constructor(apiKey) {
        this.utils = new (require('./utils.js'))(apiKey);
    }

    search(opts) {
        return this.utils.get(opts, 'search');
    }

    get(opts) {
        return this.utils.get(opts, 'get');
    }
};