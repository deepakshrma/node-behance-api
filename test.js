/**
 * Created by deepak.m.shrma@gmail.com on 21/10/14.
 *
 */
"use strict";
var behance = require("./index"),
    extend = require('extend');
console.log(__dirname)

behance.initOptions({
    postProcess: function (options) {
        var newapis = {
            "users": {
                "name": "users",
                "url": "users",
                "params": {
                    "client_id": true,
                    "q": false,
                    "sort": false,
                    "time": false,
                    "field": false,
                    "country": false,
                    "state": false,
                    "city": false,
                    "page": false,
                    "tags": false,
                    "color_hex": false,
                    "color_range": false
                }
            }
        }
        options = extend(true, {}, newapis, options);
        return options;
    }
});
console.log(behance._apiOptions)