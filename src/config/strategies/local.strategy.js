var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
envConfig = require('../../../env')[env];
module.exports = function(){
    passport.use(new localStrategy({
        usernameField:  'username',
        passwordField: 'password'
    },function(username, password,done){
        console.log(username,password);
        var mongodb = require('mongodb').MongoClient;
        mongodb.connect(envConfig.db,function(err,db){
            console.log("auth middleware");
            var query = { "name": username , "password": password };
            var collection = db.collection('users');
            collection.findOne(query, function(err, result) {
                console.log(result);
              done(null,result);
            });        
        });
        // var user = {
        //     name: username,
        //     password: password
        // }
        // done(null,user);
    }));
};