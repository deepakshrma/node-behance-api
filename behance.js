/**
 * Created by deepak.m.shrma@gmail.com on 21/10/14.
 */
const request = require('request'),
	_behanceApiUrl = 'http://www.behance.net/v2/',
	_helpers = require('./lib/helpers'),
	MESSAGES = require('./lib/messages'),
	METHODS = require('./lib/methodsEnum');
const Behance = function (options) {
	//client_id is mandatory
	if (!options)
		throw new Error(MESSAGES.NO_OPTIONS);
	if (!options['client_id'])
		throw new Error(MESSAGES.NO_CLIENT_ID);
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
Behance.prototype.get = function () {
	let _apiName, _params;
	if (arguments.length < 1)
		throw  new Error(MESSAGES.NO_CALLBACK_DEFINED);
	if (typeof arguments[0] === 'string') {
		_apiName = arguments[0];
		_params = arguments[1];
	}
	if (typeof arguments[0] === 'object') {
		_params = arguments[0]['params'];
		_apiName = arguments[0]['api'];
		if (!_apiName)
			throw  new Error(MESSAGES.API_NAME_NOT_GIVEN);
	}

	const opt = _helpers.getOptions(_params, arguments[1]);
	const done = opt.done;
	if (!done)
		throw  new Error(MESSAGES.NO_CALLBACK_DEFINED);
	const apiDatas = global._apiOptions;
	if (!apiDatas)
		throw  new Error(MESSAGES.NO_CONFIG_INIT);
	const currentApiData = apiDatas[_apiName];
	if (!currentApiData)
		throw  new Error(MESSAGES.NO_API_DETAILS_AVAIL + ' ' + _apiName);
	const finalApiData = _helpers.parseOptions(currentApiData, opt.params);
	const uri = _helpers.cleanUpUri(this.apiUrl) + '/' + (finalApiData.url !== '' ? finalApiData.url + '/' : '') + finalApiData.options + (finalApiData.options === '' ? '?' : '&') + 'client_id=' + this.client_id;
	request(
		{
			method: METHODS.GET,
			uri: uri
		}
		, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				done(null, body);
			} else {
				error = error || _helpers.getResponseError(response.statusCode);
				done(error, null);
			}
		}
	);

};
module.exports = Behance;