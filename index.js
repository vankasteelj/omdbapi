(function(exports) {
    'use strict';

    var config = {
        url: 'http://www.omdbapi.com/?',
        engine: require('got'),
        map: {
            get: {
                id: 'i',
                title: 't',
                type: 'type',
                year: 'y',
                plot: 'plot',
                tomatoes: 'tomatoes',
                season: 'Season',
                episode: 'Episode'
            },
            search: {
                search: 's',
                type: 'type',
                year: 'y',
                plot: 'plot',
                page: 'page'
            }
        },
        retries: 3
    };

    var util = {
        build: function (opts, type) {
            var url = [];
            for (var option in opts) {
                if (config.map[type][option]) {
                    var term = config.map[type][option] + '=' + opts[option];
                    url.push(term);
                } else {
                    return;
                }
            }
            return url.join('&');
        },
        format: function (obj) {
            if (typeof obj === 'object') {
                var newObj = {};
                for (var i in obj) {
                    newObj[i.toLowerCase()] = util.format(obj[i]);
                }
                return newObj;
            } else if (typeof obj === 'string' && obj === 'N/A') {
                obj = null;
            }
            return obj;
        },
        error: function (opts, type) {
            if (type === 'search' && !opts.search) {
                throw new Error('You need to pass a search query');
            } else if (type === 'get' && !opts.id && !opts.title) {
                throw new Error('You need to pass an id or a title');
            }
        },
        verify: function (response) {
            if (response.body.Error) {
                throw new Error(response.body.Error);
            }
        },
        parse: {
            search: function (response) {
                var data = response.body.Search;
                var res = {};
                for (var i in data) {
                    res[i] = {};
                    for (var j in data[i]) {
                        res[i][j] = data[i][j];
                    }
                }
                return util.format(res);
            },
            get: function (response) {
                var data = response.body;
                var res = {};
                for (var i in data) {
                    if (['Actors', 'Genre', 'Writer', 'Director'].indexOf(i) !== -1) {
                        res[i] = data[i].split(', ');
                    } else if (i === 'Response') {
                        // do nothing
                    } else {
                        res[i] = data[i];
                    }
                }
                return util.format(res);
            }
        },
        get: function (opts, type, count) {
            util.error(opts, type);

            count = isNaN(count) ? 1 : count;

            return config.engine(config.url + util.build(opts, type), {
                json: true
            }).then(function (response) {
                util.verify(response);
                return util.parse[type](response);
            }).catch(function (error) {
                if (count < config.retries) {
                    count++;
                    return util.get(opts, type, count);
                } else {
                    throw error;
                }
            });
        }
    }

    var Omdb = {
        search: function (opts) {
            return util.get(opts, 'search');
        }, 
        get: function (opts) {
            return util.get(opts, 'get');
        }
    };

    module.exports = Omdb;
}());