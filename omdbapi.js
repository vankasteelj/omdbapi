'use strict';

const utils = new (require('./utils.js'))();

module.exports = new class OMDB {
    search(opts) {
        return utils.get(opts, 'search');
    }

    get(opts) {
        return utils.get(opts, 'get');
    }
}