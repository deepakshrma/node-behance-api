/**
 * Created by intelligrape on 21/10/14.
 */
var extend = require("extend");
var path = require("path");

exports.ConfigManager = function (options, callback) {
    var appOptions = require(path.join(__dirname, "options.json"));
    options.postProcess = options.postProcess || function (config) {
        return config;
    };
    callback(options.postProcess(appOptions));
};
var getOptions = function (params, done) {
    var options = '';
    if (typeof params === "function") {
        done = params;
        params = {};
    }
    if (typeof params === "object") {
        Object.keys(params).forEach(function (key) {
            options += "" + key + "=" + params[key] + "&";
        });
    }
    return {
        done: done,
        options: options
    }
};
var getResponseError = function (statusCode) {
    switch (statusCode) {
        case 403:
            return{
                name: "Forbidden",
                message: "Your API key is invalid"
            };
        case 404:
            return{
                name: "Not Found",
                message: "You try make a request to an endpoint that does not exist, or if you are requesting a specific thing that does not exist (such as a user)"
            };
        case 429:
            return{
                name: "Too Many Requests	",
                message: "You have exceeded your rate limit."
            };
        case 500:
            return{
                name: "Internal Server Error	",
                message: "Something went wrong! Please try after some time or refresh your page."
            };
        case 503:
            return{
                name: "Service Unavailable",
                message: "Behance is up, but overloaded with requests. Try again later."
            };
    }

};