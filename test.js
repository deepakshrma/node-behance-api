/**
 * Created by intelligrape on 21/10/14.
 */
var Behance = require("./index")
var behance = new Behance({"client_id": "xxxxxxxxxxxxxxxxxxxxxxx"})
Behance.initOptions();
behance.get({
    api: Behance.APIS.GET_WIP_REVISION_COMMENTS,
    params: {wip_id: "abc", revision_id: "1245", page: "2"}
}, function (error, result) {
    if (error)
        console.log(error)
    else
        console.log(result)
});