/**
 * Created by intelligrape on 21/10/14.
 */
var Behance = require("./index")
var behance = new Behance({"client_id": "xxxxxxxxxxxxxxxxxxxxxxxxx"})
Behance.initOptions();
behance.get({
    api: Behance.APIS.GET_USER,
    params: {
        user: 'deepakmshrma'
    }
}, function (error, result) {
    if (error)
        console.log(error)
    else
        console.log(result)
});