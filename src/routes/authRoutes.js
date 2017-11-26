var express = require('express');
var authRouter = express.Router();

var router = function(){
    authRouter.route('/signUp')
        .post(function(req,res){
            console.log("ddede");
            console.log(req.body);        
        });
    authRouter.route('/')
    .get(function(req,res){
        res.send('Hello Books');
    })
    return authRouter;    
}
console.log(router);
module.exports = router;
