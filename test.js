/**
 * Created by intelligrape on 21/10/14.
 */
var Behance = require("./index"),
    extend = require('extend');
console.log(__dirname)

var behance = new Behance({"client_id": "8kTASYLumlKK5wAcP02A2Rmc2NFKcfyj"})
Behance.initOptions();
behance.get('POST', Behance.APIS.USERS, {country: "pakistan"},function(error,result){
    if(error)
    console.log(error.message)
    else
    console.log(result)
})