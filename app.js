var express = require('express');
var app = express(); 
var path = require('path');
var rootPath = path.normalize(__dirname);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var amqp = require('amqplib');
// const http = require('http').Agent; 
const hostname = '127.0.0.1';
const port = 8080;
env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
envConfig = require('./env')[env];
var mongodb = require('mongodb').MongoClient;
var obejctID = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret : 'userApp',
  resave: true,
        saveUninitialized: true
}));
require('./src/config/passport')(app);
// var rabbitConnection = require('./rabbitConn');
var router = express.Router();
router.route('/signIn')
.post(passport.authenticate('local',{
    failureRedirect: '/'
  }),
  function(req,res){
    res.redirect('/auth/profile');               
});

router.route('/signUp')
.post(function(req,res){
  console.log("herer");
  var now = new Date();
  var validity = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  var userCreateEvent = {
    userId: new obejctID(),
    name: req.body.username,
    password: req.body.password,
    email: req.body.email,
    subscriptionType: req.body.subscriptionType,
    validUpTo: validity
  };
  // console.log(userCreateEvent);
  mongodbConnectionCallBack = function(err,userAppDb){
    var query = { $or: [ { "name": userCreateEvent.name }, { "email": userCreateEvent.email } ] };
    var mongoDbcollection = userAppDb.collection('users');
    findOneCallBack = function(err, existingUser) {
      if(!existingUser){
        amqp.connect('amqp://localhost').then(function(conn) {
          return conn.createChannel().then(function(ch) {
            var ex = 'users';
            var ok = ch.assertExchange(ex, 'fanout', {durable: true})
            var message = JSON.stringify(userCreateEvent);	
            return ok.then(function() {
              ch.publish(ex, 'userCreate', Buffer.from(message),{persistent: true});
              console.log("Sent '%s'", message);
              return ch.close();
            });
          }).finally(function() { conn.close(); });
        }).catch(console.warn);
      }
      else{
        console.log("existing user");
      }
      res.redirect('/');    
    }
    mongoDbcollection.findOne(query, findOneCallBack);    
  }  
  mongodb.connect(envConfig.db,mongodbConnectionCallBack);   
  // console.log(req.body);                
}); 

router.route('/profile')
          .all(function(req,res,next){
            if(!req.user){
              res.redirect('/');
            }  
            next();
          })
          .get(function(req,res){
            // res.send('huga buga');
            res.sendFile(rootPath + '/profile.html');              
          });
app.use('/auth',router);
// var authRouter = require('./src/routes/authRoutes');


app.use(express.static('public'));
app.use(express.static('src'));
app.set('views','.src/views');

app.get("/profile",function(req,res){
  console.log(req.user);
  var query = { "name": req.user.name };
  mongodb.connect(envConfig.db,function(err,db){
    var collection = db.collection('users');
    collection.findOne(query, function(err, result) {
      if(result){
        res.status(200);
        res.json(result); 
      } 
      else
        res.status(404);    
    });
  });
});
app.post("/logout",function(req,res){
  req.logOut();
  res.redirect('/');
});
app.get("/",function(req,res){
  // res.send('Hello World');  
  res.sendFile(rootPath + '/index.html');
});


// amqp.connect('amqp://localhost').then(function(conn) {
//     process.once('SIGINT', function() { conn.close(); });
//     return conn.createChannel().then(function(ch) {
//       var ok = ch.assertExchange('users', 'fanout', {durable: true});
//       ok = ok.then(function() {
//         return ch.assertQueue('', {durable: true});
//       });
//       ok = ok.then(function(qok) {
//         return ch.bindQueue(qok.queue, 'users', '').then(function() {
//           return qok.queue;
//         });
//       });
//       ok = ok.then(function(queue) {
//         return ch.consume(queue, logMessage, {noAck: false});
//       });
//       return ok.then(function() {
//         console.log('Waiting for events...');
//       });
  
//       function logMessage(msg) {
//         console.log("received");
//         var user = JSON.parse(msg.content);
//         mongodbConnectionCallBack = function(err,userAppDb){
//           var query = {"_id" : user.userId };
//           var mongoDbcollection = userAppDb.collection('users');
//           findOneCallBack = function(err, existingUser) {
//             if(!existingUser){
//               var newUser = {
//                 name: user.name,
//                 email: user.email,
//                 password: user.password,
//                 _id: user.userId
//               }
//               userInsertCallBack = function(err,insertedUser){
//                 if(err)
//                   console.log("error in creating user");
//                 else{
//                   console.log("new user added");
//                   console.log(insertedUser);
//                 }
//                 ch.ack(msg);
//               }
//               mongoDbcollection.insert(newUser,userInsertCallBack);
//             }
//             else{
//               console.log("userId conflict");
//             }    
//           }
//           mongoDbcollection.findOne(query, findOneCallBack);
//         }
//         mongodb.connect(envConfig.db,mongodbConnectionCallBack);   
//       }
//     });
//   }).catch(console.warn);

app.listen(port, () => {
  console.log(`Server running...`);
  mongodbConnectionCallBack = function(err,db){
    console.log("checkin connection");
    console.log(err,db);
    }
  mongodb.connect(envConfig.db,mongodbConnectionCallBack);
});


