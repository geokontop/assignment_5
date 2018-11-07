/*
 * Primary file for API
 *
 */

 // Dependencies
 const server = require('./serve/server');
 const ann = require('./app/lib');

// App container
const app = {};

process.env.NODE_ENV = 'testing'
// Init function
app.init = (callback)=>{
    // Start servers
    server.init();

    callback()
    
}

// Self invocing only if it is required directly
if(require.main === module){
    app.init(()=>{});
}

// Export app
module.exports = app;


