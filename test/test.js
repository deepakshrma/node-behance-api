/**
 * Created by intelligrape on 21/10/14.
 */
var Behance = require("node-behance-api");
var behance = new Behance({"client_id": "xxxx"})
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