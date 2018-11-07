/*
 * Handlers overview
 * 
 */


// Define the handlers
const handlers = {};

/* 
 * JSON API handlers
 * 
 */
/*--------- Users -----------*/
// ANN handler
handlers.ann =function(data, callback){
    const acceptableMethods = ['get'];
    if(acceptableMethods.indexOf(data.method)>-1){
        handlers._ann[data.method](data,callback);
    }else{
        callback(405);
    }
}

// Container for all the checks methods
handlers._ann  = {};

// Users submethods
handlers._ann.get = function(data,callback){
    // Callback a http status code, and a payload object
    callback(200,{"ann":"lucks functionality"});
  };

// Ping handler
handlers.ping =function(data, callback){
    // Callback a http status code, and a payload object
    callback(200);
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

module.exports = handlers;