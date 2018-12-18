module.exports = class UTILS {

    constructor(apiKey) {
        if (!apiKey) throw new Error('No apiKey provided');

        this.config = require('./config.json');
        this.engine = require('got');
        this.apiKey = apiKey;
    }

    build(opts, type) {
        const urlParts = [];
        for (let option in opts) {
            if (this.config.map[type][option]) {
                urlParts.push(this.config.map[type][option] + '=' + opts[option]);
            } else {
                return;
            }
        }
        return urlParts.join('&');
    }

    format(obj) {
        if (typeof obj === 'object') {
            const newObj = {};
            for (let i in obj) {
                newObj[i.toLowerCase()] = this.format(obj[i]);
            }
            return newObj;
        } else if (typeof obj === 'string' && obj === 'N/A') {
            obj = null;
        }
        return obj;
    }

    error(opts, type) {
        if (type === 'search' && !opts.search) {
            throw new Error('You need to pass a search query');
        } else if (type === 'get' && !opts.id && !opts.title) {
            throw new Error('You need to pass an id or a title');
        }
    }

    verify(response) {
        if (response.body.Error) {
            throw new Error(response.body.Error);
        }
        return response;
    }

    searchParse(response) {
        const data = response.body.Search;
        const res = {};
        for (let i in data) {
            res[i] = {};
            for (let j in data[i]) {
                res[i][j] = data[i][j];
            }
        }
        return this.format(res);
    }

    getParse (response) {
        const data = response.body;
        const res = {};
        for (let i in data) {
            if (['Actors', 'Genre', 'Writer', 'Director'].indexOf(i) !== -1) {
                res[i] = data[i].split(', ');
            } else if (i === 'Response') {
                // do nothing
            } else {
                res[i] = data[i];
            }
        }
        return this.format(res);
    }

    get(opts, type, count) {
        this.error(opts, type);

        count = isNaN(count) ? 1 : count;

        return this.engine(this.config.url + this.build(opts, type) + `&apikey=${this.apiKey}`, {
            json: true
        }).then(response => 
                this[type+'Parse'](this.verify(response))
        ).catch(error => {
            if (count < this.config.retries) {
                count++;
                return this.get(opts, type, count);
            } else {
                throw error;
            }
        });
    }
};