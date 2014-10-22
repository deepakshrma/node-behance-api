/**
 * Created by intelligrape on 21/10/14.
 */
var path = require("path"),
    MESSAGES = require('./messages'),
    CODES = require('./codesEnum');


exports.ConfigManager = function (options, callback) {
    var appOptions = require(path.join(__dirname, "options.json"));
    if (!options)
        var options = {}
    options.postProcess = options.postProcess || function (config) {
        return config;
    };
    callback(options.postProcess(appOptions));
};
exports.getOptions = function (params, done) {
    var options = {};
    if (typeof params === "function") {
        done = params;
        params = {};
    }
    if (typeof params === "object") {
        options = params;
    }
    return {
        done: done,
        params: options
    }
};
exports.parseOptions = function (apiData, params) {
    var options = '';
    for (var key in apiData.params) {
        if (apiData.params[key]) {
            if (key === 'client_id' || key === 'client_secret')
                continue;
            if (!params[key])
                throw  new Error(ERRORS.OPTION_MISSING + " " + key)
            else {
                options = options + (options === '' ? "?" : "&" ) + key + "=" + params[key];
            }
        } else {
            if (params[key])
                options = options + (options === '' ? "?" : "&" ) + key + "=" + params[key];
        }
    }
    var finalApiData = {};
    finalApiData['url'] = parseUrl(apiData.url, params).url;
    finalApiData['options'] = options;
    return finalApiData;
}
function parseUrl(url, params) {
    var changed = false;
    url = url.replace(/{(.+?)}/g, function (a, b, c) {
        if (params[b]) {
            changed = true;
            return params[b];
        } else {
            return b
        }

    })
    return {
        url: url,
        changed: changed
    };
}
exports.parseUrl = parseUrl;


exports.getResponseError = function (statusCode) {
    switch (statusCode) {
        case CODES.FORBIDDEN:
            return{
                name: "Forbidden",
                message: MESSAGES['FORBIDDEN']
            };
        case CODES.NOT_FOUND:
            return{
                name: "Not Found",
                message: MESSAGES['NOT_FOUND']
            };
        case CODES.TOO_MANY_REQUEST:
            return{
                name: "Too Many Requests",
                message: MESSAGES['TOO_MANY_REQUEST']
            };
        case CODES.INTERNAL_SERVER_ERROR:
            return{
                name: "Internal Server Error",
                message: MESSAGES['INTERNAL_SERVER_ERROR']
            };
        case CODES.SERVICE_UNAVAILABLE:
            return{
                name: "Service Unavailable",
                message: MESSAGES['SERVICE_UNAVAILABLE']
            };
    }

};