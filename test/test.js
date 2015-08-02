/**
 * Created by intelligrape on 21/10/14.
 */
var should = require("should");
describe("Node Bahance: A simple lib for Adobe Behance API on node.js", function () {
    var Behance, behance;
    before(function () {
        Behance = require("./../index");
        Behance.initOptions();
        behance = new Behance({"client_id": "xxx"})//provide your client id
        if(behance.client_id == "xxx"){
            throw ("update your client id at line no:9");
        }
    });
    describe("Testing init methods and configuration", function () {
        it("Module should be exist", function () {
            should.exist(Behance);
        })
        it("Behance.APIS will exist", function () {
            should.exist(Behance.APIS);
        })
        it("function initOptions should be exist", function () {
            should.exist(Behance.initOptions);
        })
        it("new Behance will create new object behance", function () {
            should.exist(behance);
        })
        it("client_id should be exist", function () {
            should.exist(behance.client_id);
        })
        it("Since client_secret is not provide,client_secret should not be exist", function () {
            should.not.exist(behance.client_secret);
        })
        it("apiUrl should always be there", function () {
            should.exist(behance.apiUrl);
        })
    })
    describe("Testing Behance.get API", function () {
        it("GET_USER API: Will not return error, coz deepakmshrma exist", function (done) {
            behance.get({
                api: Behance.APIS.GET_USER,
                params: { //or simply behance.get('user',
                    user: 'deepakmshrma'

                }
            }, function (error, result) {
                should.not.exist(error);
                done(error);
            });
        })
        it("GET_USER API: should return username deepakshrma", function (done) {
            behance.get({
                api: Behance.APIS.GET_USER,
                params: { //or simply behance.get('user',
                    user: 'deepakmshrma'

                }
            }, function (error, result) {
                should.exist(result);
                (typeof result).should.be.equal("string");
                var user;
                try {
                    user = JSON.parse(result).user;
                }
                catch (error) {
                    return done(error);
                }
                should.exist(user);
                should.exist(user.username);
                user.username.should.be.equal("deepakmshrma");
                return done(error);
            });
        })
        it("GET_USER API: Will return error, coz deepakmsh not exist", function (done) {
            behance.get({
                api: Behance.APIS.GET_USER,
                params: { //or simply behance.get('user',
                    user: 'deepakmsh'
                }
            }, function (error, result) {
                should.exist(error);
                done(null);
            });
        })
    })
})