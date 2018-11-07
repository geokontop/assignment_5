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

// const helpers = require('./app/helpers')
// const ann = require('./app/lib')


// try {
//     console.log(JSON.stringify(ann.initializeNetwork([3,5.9,4,2])))
//   }
//   catch(e) {
//     console.log(e);
//     // expected output: "Parameter is not a number!"
//   }

// const state = [
//     { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]},
//     { 'weights':[[-1.2,1.1]], 'threshold':[.3]}
// ]

// const out = ann.activate(state,[1,1],[0]); //out  [ [ 1, 1 ], [ 0.525, 0.8808 ], [ 0.5097 ] ]

// console.log('out ', out)

//  const ot = ann.backPropagate(state,[ [ 1, 1 ], [ 0.525, 0.8808 ], [ 0.5097 ] ],[-0.5097],0.1); //out  [ [ 1, 1 ], [ 0.525, 0.8808 ], [ 0.5097 ] ]

//  console.log('ot ', JSON.stringify(ot))
