var path = require('path'),
rootPath = path.normalize(__dirname);


module.exports = {
development: {
    rootPath : rootPath,
    db: 'mongodb://localhost/userApp',
    port: process.env.PORT || 3000,
    eventDb: 'mongodb://localhost/eventStore',
},
production: {}
};