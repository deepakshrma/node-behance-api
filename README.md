node-behance-api
================
![alt text](https://lh3.googleusercontent.com/-LhvnLJ399cM/VEeEVoEjoXI/AAAAAAAAAy8/EkHJZWtKkfM/w530-h207-no/behance-logo-grey.png "node-behance-logo")

A utility wrapper for adobe behance services. This utility is developed for nodejs only. Currently it supports most of the API's of Adobe Behance.

Before starting development on node. You have to register your app on https://www.behance.net/dev/register. Register your app and get the client id from there.

###Prerequisites for node-behance-api
This utility wrapper uses request module.

Requirement
------------
request - npm
https://www.npmjs.org/package/request

###Require node-behance-api to your nodejs app
``` javascript
var Behance = require("node-behance-api");
```
###Initialize Behance module with your client_id
``` javascript
var behance = new Behance({"client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
Behance.initOptions();
```
Here Behance.initOptions() is where you intialize node-behance-api. You can further integrate this module with currently added API. We will see example later on.

###Call a simple api let's say users/{user}
##Examples:
``` javascript
var Behance = require("node-behance-api");
var behance = new Behance({"client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"})
Behance.initOptions();
behance.get({
    api: Behance.APIS.GET_USER,
    params: { //or simply behance.get('user',
        user:'deepakmshrma'

    }
}, function (error, result) {
    if (error)
        console.log(error)
    else
        console.log(result)
});
```
Here Behance.APIS.GET_USER, name of the API which you want to access. There are several API's available. You can find name of the API's in apiNameEnum.js. You can also pass simple string as api name here.

List of API's available right now:
``` javascript
GET_USERS: "users",
GET_USER: "user",
GET_USER_PRODUCT: "user_products",
GET_USER_WIPS: "user_wips",
GET_USER_APR: "user_appreciations",
GET_USER_COLLECTIONS: "user_collections",
GET_USER_STATS: "user_stats",
GET_USER_FOLLOWERS: "user_followers",
GET_USER_FOLLOWEES: "user_following",
GET_USER_FEEDBACK: "user_feedback",
GET_USER_WORK_EXP: "user_work_experience",
GET_PRODUCTS: "projects",
GET_PRODUCT: "project",
GET_PRODUCT_COMMENTS: "project_comments",
GET_COLLECTIONS: "collections",
GET_COLLECTION: "collection",
GET_COLLECTION_PROJECTS: "collection_projects",
GET_WIPS: "wips",
GET_WIP_REVISION: "wip_revision",
GET_WIP_REVISION_COMMENTS: "wip_revision_comments",
GET_WIP: "wip"
```
###Integration of another API's node-behance-api
Currently this node-behance-api supports most of the behance api. But if future you can upgrade it with other list of API's.
``` javascript
var Behance = require('node-behance-api'),
    extend = require('extend');
var behance = new Behance({'client_id': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'})
Behance.initOptions({
    postProcess: function (options) {
        var newapis = {
            'newapis': {
                'name': 'newapis',
                'url': 'users',
                'params': {
                    'client_id': true,
                    'q': false,
                    'sort': false
                }
            }
        }
        options = extend(true, {}, newapis, options);
        return options;
    }
});
behance
    .get({
        api: 'newapis',
        params: {
            user: 'deepakmshrma'
        }
    }, function (error, result) {
        if (error)
            console.log(error)
        else
            console.log(result)
    });
```
Here i have use https://www.npmjs.com/package/extend module to extend previous option with new api.

You can use this initOptions method to override the existing api. If you pass new api name same as defined one it will override the previous api.
####Example:
``` javascript
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
```
###Error handling with node-behance-api
Error handling with this module is very easy. You can specify the mandatory param with options. If the param value is true. It means it is mandatory for given API’s.
``` javascript
"newapi": {
    "name": "newapis",
    "url": "users",
    "params": {
        "client_id": true,
        "q": false,
        "sort": false,
        "time": true,
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
```
Here param "time" is mandatory for newapi.
