/**
 * Created by intelligrape on 21/10/14.
 */
var behance = require("./index"),
    extend = require('extend');
console.log(__dirname)

behance.initOptions({
    postProcess: function (options) {
        var urconfig = {key: "deepak"}
        options = extend(true, {}, urconfig, options);

        //options.key = "deepak";
        return options;
    }
});
console.log(behance._apiOptions)