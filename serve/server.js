/*
 * Primary server file 
 *
 */

// Dependencies
const http = require('http');
const https = require('https');
const config = require('./config');
const fs = require('fs');
const listener = require('./listener');
const router = require('./router');

// Container
const server = {};

 // Instantiate the HTTP server
const httpServer = http.createServer(function(req,res){
  unifiedServer(req,res);
});




server.init =function(){
    // Start the HTTP server
    httpServer.listen(config.httpPort,function(){
        console.log('The HTTP server is running on port '+config.httpPort);
      });
      
}

// All the server logic for both the http and https server
const unifiedServer = function(req,res){
  listener(router,req,res);
};

module.exports = server;