/*
 * API tests
 *
 */

const app = require ('./../index')
const assert = require('assert')
const http = require('http')
const config = require('./../serve/config')

// Container
const api = {};

// Helpers
const helpers = {};
helpers.makeGetRequest = (path,callback)=>{
    // Configure the request details
    var requestDetails = {
        'protocol': 'http:',
        'hostname': 'localhost',
        'port' : config.httpPort,
        'method' : 'GET',
        'path' : path,
        'headers' :{
            'Content-Type' : 'application/json'
        }        
    }
    // Send the request
    const req = http.request(requestDetails, (res)=>{
        callback(res)
    })
    req.end();
}

// The main init() should be able to run without throwing
api['app.init should start without throwing'] = (done)=>{
    assert.doesNotThrow(()=>{
        app.init(err=>{
            done();
        })
    }, TypeError)    
};

// Make a request to ping
api['http /ping should respond with 200'] = (done)=>{
    helpers.makeGetRequest('/ping',(res)=>{
        assert.equal(res.statusCode,200)
        done();
    })  
};

// Make a request to ann
api['http /ann should respond with 200'] = (done)=>{
    helpers.makeGetRequest('/ann',(res)=>{
        assert.equal(res.statusCode,200)
        done();
    })  
};

// Make a request to wrong path
api['page not found should respond with 404'] = (done)=>{
    helpers.makeGetRequest('/does/not/exist',(res)=>{
        assert.equal(res.statusCode,404)
        done();
    })  
};

module.exports = api;