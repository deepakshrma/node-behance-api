node-behance-api
================
![alt text](https://lh3.googleusercontent.com/-LhvnLJ399cM/VEeEVoEjoXI/AAAAAAAAAy8/EkHJZWtKkfM/w530-h207-no/behance-logo-grey.png "node-behance-logo")

A utility wrapper for adobe behance services. This utility is developed for nodejs only. Currently it supports some of the API's of Adobe Behance. We will update it soon for rest of the API's.

Before starting development on node. You have to register your app on https://www.behance.net/dev/register. Register your app and get the client id from there.

*This utility wrapper uses request module.

Requirement
------------
request - npm
https://www.npmjs.org/package/request


#Examples:

``` javascript
var Behance = require("./index");
var behance = new Behance({"client_id": "8kTASYLumlKK5wAcP02A2Rmc2NFKcfyj"})
Behance.initOptions();
behance.get('GET', Behance.APIS.USERS, {country: "pakistan"}, function (error, result) {
    if (error)
        console.log(error.message)
    else
        console.log(result)
})
```
#Integration of another API's node-behance-api
``` javascript
var Behance = require("./index");
var behance = new Behance({"client_id": "8kTASYLumlKK5wAcP02A2Rmc2NFKcfyj"})
Behance.initOptions({
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
behance.get('GET', Behance.APIS.USERS, {country: "pakistan"}, function (error, result) {
    if (error)
        console.log(error.message)
    else
        console.log(result)
})
```
