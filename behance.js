/**
 * Created by intelligrape on 21/10/14.
 */
var request = require('request'),
    _behanceApiUrl = "http://www.behance.net/v2/",
    _helpers = require('./lib/helpers'),
    MESSAGES = require('./lib/messages'),
    METHODS = require('./lib/methodsEnum');
var Behance = function (options) {
    //client_id is mandatory
    if (!options)
        throw new Error(MESSAGES.NO_OPTIONS)
    if (!options['client_id'])
        throw new Error(MESSAGES.NO_CLIENT_ID)
    this.client_id = options['client_id'];
    this.client_secret = options['client_secret'];
    this.apiUrl = options['apiUrl'] ? options['apiUrl'] : _behanceApiUrl;
};
Behance.APIS = require('./lib/apiNamesEnum');
Behance.initOptions = function (options) {
    new _helpers.ConfigManager(options, function (config) {
        Object.defineProperty(global, '_apiOptions', {
            get: function () {
                return config;
            }
        });
    });
};
Behance.prototype.get = function (method, api, opts, done) {
    if (method !== METHODS.GET)
        throw  new Error(MESSAGES.NO_API_SUPPORT + " " + method)
    var opt = _helpers.getOptions(opts, done);
    var done = opt.done;
    if (!done)
        throw  new Error(MESSAGES.NO_CALLBACK_DEFINED)
    var apiDatas = global._apiOptions;
    if (!apiDatas)
        throw  new Error(MESSAGES.NO_CONFIG_INIT)
    var currentApiData = apiDatas[api];
    if (!currentApiData)
        throw  new Error(MESSAGES.NO_API_DETAILS_AVAIL + " " + api)
    var finalApiData = _helpers.parseOptions(currentApiData, opt.params)
    var uri = this.apiUrl + "/" + (finalApiData.url !== '' ? finalApiData.url + "/" : "") + finalApiData.options + (finalApiData.options === '' ? "?" : "&") + "client_id=" + this.client_id;
    request(
        {
            method: method,
            uri: uri
        }
        , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(MESSAGES['OK'])
                done(null, body);
            } else {
                error = error || _helpers.getResponseError(response.statusCode);
                done(error, null)
            }
        }
    )

}
;
module.exports = Behance;