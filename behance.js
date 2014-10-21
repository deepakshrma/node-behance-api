/**
 * Created by intelligrape on 21/10/14.
 */
var request = require('request'),
    _behanceApiUrl = "http://www.behance.net/v2/",
    _helpers = require('./lib/helpers'),
    ERRORS = require('./lib/errors');
var Behance = function (options) {
    //client_id is mandatory
    if (!options)
        throw new Error(ERRORS.NO_OPTIONS)
    if (!options['client_id'])
        throw new Error(ERRORS.NO_CLIENT_ID)
    this.client_id = options['client_id'];
    this.client_secret = options['client_secret'];
    this.apiUrl = options['apiUrl'] ? options['apiUrl'] : _behanceApiUrl;
};
Behance.APIS = require('./lib/apiNames');
Behance.initOptions = function (options) {
    new _helpers.ConfigManager(options, function (config) {
        Object.defineProperty(Behance, '_apiOptions', {
            get: function () {
                return config;
            }
        });
    });
};
Behance.prototype.get = function (method, opts, result) {

    var options = '';

    if (typeof opts == 'function') {
        result = opts;
        opts = undefined;
    }

    if (opts) {
        for (var item in opts) {
            options += "&" + item + "=" + opts[item];
        }
    }

    api_url = this.apiUrl + method + "?client_id=" + this.client_id + options;

    // console.log(api_url);

    http.get(api_url, function (res) {

        data = "";

        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            var jsonObj = JSON.parse(data);
            result(jsonObj);
        });

    });
    if (!collectionId) {
        throw new Error("collectionId is undefined please enter a valid collectionId.");
    }
    var opt = getOptions(params, done);
    done = opt.done;
    var behanceApiUrl = apiBaseUrl + "collections/" + collectionId + "/projects?" + opt.options + "api_key=" + this.client_id;
    request.get(behanceApiUrl, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            done(null, body);
        } else {
            err = err || getResponseError(res.statusCode);
            done(err, null)
        }
    });

};
module.exports = Behance;