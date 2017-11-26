var amqp = require('amqplib');

module.exports = function(){
    return amqp.connect('amqp://localhost').then(function(conn) {    
        return conn;
    })};
