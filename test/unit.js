/*
 * Unit tests
 *
 */

// Dependencies
const ann = require('./../app/lib')
const helpers = require('./../app/helpers')
const assert = require('assert')

// Container
const unit = [];

// Assert that helpers.getRandomInt(2) function returns a number. The number is either 0 or 1.
unit['helpers.getRandomInt(2) should return integer 0 or 1'] = (done)=>{    
    const val = helpers.getRandomInt(2);
    assert.equal(typeof(val), 'number');
    assert.ok([0,1].indexOf(val)>-1);
    done();
}

// Assert that helpers.getRandomArbitrary(-1,1)  returns a number between -1 and 1.
unit['helpers.getRandomArbitrary(-1,1) should return a number between -1 and 1'] = (done)=>{    
    const val = helpers.getRandomArbitrary(-1,1);
    assert.equal(typeof(val), 'number');
    assert.ok(val>=-1 && val<=1);
    done();
}

// For the appropriate inputs, assert that the ann.neuronSigmoidActivation function returns a number
unit['ann.neuronSigmoidActivation should return a number'] = (done)=>{    
    const inputWeights = [ helpers.getRandomArbitrary(-1,1), helpers.getRandomArbitrary(-1,1) ]
    const inputValues = [ helpers.getRandomInt(2), helpers.getRandomInt(2) ]
    const threshold =  helpers.getRandomArbitrary(-1,1)

    const val = ann.neuronSigmoidActivation(inputWeights,inputValues, threshold);
    assert.equal(typeof(val), 'number');
    done();
}

// Sigmoid activation function test. For the appropriate inputs, assert that the ann.neuronSigmoidActivation function returns 0.8808
unit['ann.neuronSigmoidActivation should return 0.8808 for specific input values. '] = (done)=>{    
    const inputWeights = [ 0.9, 1 ]
    const inputValues = [ 1, 1 ]
    const threshold =  -0.1
    
    const val = ann.neuronSigmoidActivation(inputWeights,inputValues, threshold); // 0.8808
    assert.equal(val, 0.8808);
    done();
}

// ann.neuronSigmoidActivation should not throuh  when threshold is not a number
unit['ann.neuronSigmoidActivation should not throuh  when threshold is not a number.'] = (done)=>{    
    const inputWeights = [ 0.9, 1 ]
    const inputValues = [ 1, 1 ]
    const threshold =  'a'
    
    assert.doesNotThrow(()=>{
        const val = ann.neuronSigmoidActivation(inputWeights,inputValues, threshold);
        assert.equal(val,false)
        done();
    },TypeError)
}

// ann.neuronSigmoidActivation should not throuh  when some input is not a number
unit['ann.neuronSigmoidActivation should not throuh  when some input is not a number.'] = (done)=>{    
    const inputWeights = [ 0.9, 1 ]
    const inputValues = [ 1, 'a' ]
    const threshold =  0.5
    
    assert.doesNotThrow(()=>{
        const val = ann.neuronSigmoidActivation(inputWeights,inputValues, threshold);
        assert.equal(val,false)
        done();
    },TypeError)
}

// ann.neuronSigmoidActivation should not throuh  when some weight is not a number
unit['ann.neuronSigmoidActivation should not throuh  when some weight is not a number.'] = (done)=>{    
    const inputWeights = [ 0.9, 'a' ]
    const inputValues = [ 1, 0 ]
    const threshold =  0.5
    
    assert.doesNotThrow(()=>{
        const val = ann.neuronSigmoidActivation(inputWeights,inputValues, threshold);
        assert.equal(val,false)
        done();
    },TypeError)
}

// Assert that ann.initializeNetwork should not throw when passing non integer values
unit['ann.initializeNetwork should not throw when passing non integer values'] = (done)=>{

    // Number of neurons per layer should be an integer but it isn't
    const neurons = [5,4.5,3,2]
    assert.doesNotThrow(()=>{
        const val = ann.initializeNetwork(neurons);
        assert.equal(val,false)
        done();
    },RangeError)
}

// For the appropriate inputs, assert that the ann.initializeNetwork function returns an array object
unit['ann.initializeNetwork should return an array with specific elements lengths for given input'] = (done)=>{

    // Number of neurons per layer
    const neurons = [5,4,3,2]

    const val = ann.initializeNetwork(neurons);
    // console.log(JSON.stringify(val))
    // [
    //     {
    //         "weights":[[0.3843,-0.158,-0.2639],[0.6062,0.4462,0.0001],[0.6204,0.1331,0.6085],[0.6333,-0.3554,-0.1635],[0.7557,0.3701,0.7755]],
    //         "threshold":[0.0016,0.6657,-0.3022,0.4021,0.3105]
    //     },
    //     {
    //         "weights":[[0.1395,0.3445,0.6667,0.6163,-0.0287],[0.2928,0.7915,0.8882,-0.2747,-0.3542],[0.8071,-0.493,-0.1623,-0.8762,0.7165],[-0.0813,-0.5056,0.4039,0.5475,0.4447]],
    //         "threshold":[0.058,-0.6754,0.7787,0.0673]
    //     },
    //     {
    //         "weights":[[0.9045,0.1187,-0.0065,0.015],[-0.8095,0.2525,-0.7722,-0.6583]],
    //         "threshold":[0.2709,0.5309]
    //     }
    // ]

    assert.equal(typeof(val), 'object');
    assert.ok(val instanceof Array);
    assert.ok(val.length == neurons.length-1); 
    assert.ok(val[0].weights.length == neurons[1]); // Number of first hidden layer's neurons determined ok
    assert.ok(val[0].weights[0].length == neurons[0]); // Number of first hidden layer's neuron's inputs determined ok (as previous layer's neuron number).
    assert.ok(val[1].weights.length == neurons[2]); // Number of second hidden layer's neurons determined ok
    assert.ok(val[1].weights[0].length == neurons[1]); // Number of second hidden layer's neuron's inputs determined ok (as previous layer's neuron number).
    assert.ok(val[2].weights.length == neurons[3]); // Number of output neurons determined ok
    assert.ok(val[2].weights[0].length == neurons[2]); // Number of output neuron's inputs determined ok (as previous layer's neuron number).

    done();
}

// Assert that ann.activate should not throw when passing a state that is not an array
unit['ann.activate should not throw when passing a state that is not an array'] = (done)=>{

    const state = {"weights":[[4.0623,4.0627],[5.6901,5.6901]],"threshold":[6.1473,2.4384]}
        
    assert.doesNotThrow(()=>{
        const val = ann.activate(state,[1,1],[0])
        assert.equal(val,false)
        done();
    },TypeError)
}

// Assert that ann.activate should not throw when passing invalid network input
unit['ann.activate should not throw when passing invalid network input'] = (done)=>{

    const state = [
        {"weights":[[4.0623,4.0627],[5.6901,5.6901]],"threshold":[6.1473,2.4384]},
        {"weights":[[-8.5232,7.9173]],"threshold":[3.5695]}
    ]

    assert.doesNotThrow(()=>{
        const val = ann.activate(state,[1,'a'],[0])
        assert.equal(val,false)
        done();
    },TypeError)
}

// Assert that ann.activate should not throw when passing a non-array as desired output
unit['ann.activate should not throw when passing invalid network a non-array as desired output'] = (done)=>{

    const state = [
        {"weights":[[4.0623,4.0627],[5.6901,5.6901]],"threshold":[6.1473,2.4384]},
        {"weights":[[-8.5232,7.9173]],"threshold":[3.5695]}
    ]

    assert.doesNotThrow(()=>{
        const val = ann.activate(state,[1,1],0)
        assert.equal(val,false)
        done();
    },TypeError)
}

// Assert that the ann.activate function returns an object
unit['ann.activate should return an object'] = (done)=>{

    const state = [
        {"weights":[[4.0623,4.0627],[5.6901,5.6901]],"threshold":[6.1473,2.4384]},
        {"weights":[[-8.5232,7.9173]],"threshold":[3.5695]}
    ]

    const val = ann.activate(state,[1,1],[0])
    assert.equal(typeof(val),'object');
    done();
}

// Assert that the ann.activate function returns expected values
unit['ann.activate should return expected values for given input'] = (done)=>{

    const state = [
        {"weights":[[4.0623,4.0627],[5.6901,5.6901]],"threshold":[6.1473,2.4384]},
        {"weights":[[-8.5232,7.9173]],"threshold":[3.5695]}
    ]

    const val = ann.activate(state,[1,1],[0])
    // const expected = { 
    //     'out': [ [ 1, 1 ], [ 0.8784, 0.9999 ], [ 0.0415 ] ],
    //     'err': [ -0.0415 ] 
    // }

    assert.equal(val.err[0],-0.0415);
    assert.equal(val.out[0][0], 1);
    assert.equal(val.out[0][1], 1);
    assert.equal(val.out[1][0], 0.8784);
    assert.equal(val.out[1][1], 0.9999);
    assert.equal(val.out[2][0], 0.0415);
    done();
}

// Assert that the ann.backPropagate function returns expected values
unit['ann.backPropagate should return an array with expected value for given input'] = (done)=>{

    // The test sample for a [2,2,1] network
    const networkToAdjust = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]
    const layersOutputs =[ 
        [ 1, 1 ],           // what the input layer outputs
        [ 0.525, 0.8808 ],  // what the hidden layer outputs
        [ 0.5097 ]          // final output
    ]        
    const error = [-0.5097]   // (Expected output) - (Actual output)
    const alpha = 0.1         // Learning rate

    const val = ann.backPropagate(networkToAdjust, layersOutputs, error, alpha)

    // ------------ The expected newly adjusted ANN
    // const expected = [
    //     {
    //         "weights":[[0.5038,0.4038],[0.8985,0.9985]],
    //         "threshold":[0.7962,-0.0985]
    //     },
    //     {
    //         "weights":[[-1.2067,1.0888]],
    //         "threshold":[0.3127]
    //     }]

    assert.equal(typeof(val), 'object');
    assert.ok(val instanceof Array);
    assert.equal(val[0].weights[0][0],0.5038);
    assert.equal(val[0].weights[0][1],0.4038);
    assert.equal(val[0].weights[1][0],0.8985);
    assert.equal(val[0].weights[1][1],0.9985);
    assert.equal(val[0].threshold[0],0.7962);
    assert.equal(val[0].threshold[1],-0.0985);
    assert.equal(val[1].weights[0][0],-1.2067);
    assert.equal(val[1].weights[0][1],1.0888);
    assert.equal(val[1].threshold[0],0.3127);
    done();
}

// Assert that ann.backPropagate should not throw when passing a non-array previous state
unit['ann.backPropagate should not throw when passing a non-array previous state'] = (done)=>{
 
    // previous state should be an array but it is not
    const networkToAdjust = { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]} 

    const layersOutputs =[ 
        [ 1, 1 ],           // what the input layer outputs
        [ 0.525, 0.8808 ],  // what the hidden layer outputs
        [ 0.5097 ]          // final output
    ]        
    const error = [-0.5097]   // (Expected output) - (Actual output)
    const alpha = 0.1         // Learning rate

    assert.doesNotThrow(()=>{
        const val = ann.backPropagate(networkToAdjust, layersOutputs, error, alpha)
        assert.equal(val,false)
        done();
    },TypeError)
}

// Assert that ann.backPropagate should not throw when previous network state length and layers Outputs length do not comply to each other
unit['ann.backPropagate should not throw when arrays\' lengths do not comply to each other'] = (done)=>{
 
    const networkToAdjust = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]
    // layersOuputs length should be equal to networkToAdjust.length + 1 , but it isn't
    const layersOutputs =[ 
        [ 0.525, 0.8808 ], 
        [ 0.5097 ]      
    ]        
    const error = [-0.5097]   // (Expected output) - (Actual output)
    const alpha = 0.1         // Learning rate

    const val = ann.backPropagate(networkToAdjust, layersOutputs, error, alpha)

    assert.doesNotThrow(()=>{
        const val = ann.backPropagate(networkToAdjust, layersOutputs, error, alpha)
        assert.equal(val,false)
        done();
    },TypeError)
}

// Assert that ann.backPropagate should not throw when alpha is not a number
unit['ann.backPropagate should not throw when alpha is not a number'] = (done)=>{
 
    const networkToAdjust = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]
    const layersOutputs = [ 
        [ 1, 1 ],           // what the input layer outputs
        [ 0.525, 0.8808 ],  // what the hidden layer outputs
        [ 0.5097 ]          // final output
    ]        
    const error = [-0.5097]   // (Expected output) - (Actual output)
    // alpha should be a number but it isn't
    const alpha = 'a'        // Learning rate

    const val = ann.backPropagate(networkToAdjust, layersOutputs, error, alpha)

    assert.doesNotThrow(()=>{
        const val = ann.backPropagate(networkToAdjust, layersOutputs, error, alpha)
        assert.equal(val,false)
        done();
    },TypeError)
}

// Assert that the ann.cycle function response is well formed and has the right values for given inputs in a sample
unit['ann.cycle response should be well formed and have the right values'] = (done)=>{

    // The test sample. XOR result of [1,1] inputs in a [2,2,1] network and backward adjustments.
    const initialState = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]
    const inputs =[ 1, 1 ]
    
    const desiredOutputs = [0]   
    const alpha = 0.1         

    const val = ann.cycle(initialState, inputs, desiredOutputs, alpha, (result)=>{
        assert.ok(result != false)
        assert.equal(typeof(result),'object')
        assert.equal(typeof(result.error),'object')
        assert.ok(result.error instanceof Array)
        assert.equal(typeof(result.newState),'object')
        assert.ok(result.newState instanceof Array)
        assert.equal(typeof(result.error[0]),'number')
        assert.equal(typeof(result.newState[0]),'object')
        assert.equal(typeof(result.newState[0].weights),'object')
        assert.ok(result.newState[0].weights instanceof Array)
        assert.equal(typeof(result.newState[0].threshold),'object')
        assert.ok(result.newState[0].threshold instanceof Array)
        // a sample of result values
        assert.equal(result.error[0], -0.5097)
        assert.equal(result.newState[0].threshold[1], -0.0985)
        assert.equal(result.newState[0].weights[1][1], 0.9985)
        assert.equal(result.newState[0].weights[0][0], 0.5038)
         
        done();
    })
}

// Assert that the ann.epoch function response is well formed 
unit['ann.epoch response should be well formed '] = (done)=>{

    // The test sample. XOR result of [1,1] inputs in a [2,2,1] network and backward adjustments.
    const initialState = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]
    const dataset =[ 
        {"inputs": [1,1],"desiredOutputs": [0]},
        {"inputs": [0,0],"desiredOutputs": [0]},
        {"inputs": [1,0],"desiredOutputs": [1]},
        {"inputs": [0,1],"desiredOutputs": [1]}
    ]
    
    const alpha = 0.1         

    ann.epoch(initialState, dataset, alpha, (result)=>{
        assert.ok(result != false)
        assert.equal(typeof(result),'object')
        assert.equal(typeof(result.sumErr),'number')
        assert.equal(typeof(result.newState),'object')
        assert.ok(result.newState instanceof Array)
        assert.equal(typeof(result.newState[0]),'object')
        assert.equal(typeof(result.newState[0].weights),'object')
        assert.ok(result.newState[0].weights instanceof Array)
        assert.equal(typeof(result.newState[0].threshold),'object')
        assert.ok(result.newState[0].threshold instanceof Array)
         
        done();
    })
}

// Assert that the ann.train function response is well formed
unit['ann.train response should be well formed '] = (done)=>{

    // The test sample. XOR result of [1,1] inputs in a [2,2,1] network.
    const initialState = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]
    const dataset =[ 
        {"inputs": [1,1],"desiredOutputs": [0]},
        {"inputs": [0,0],"desiredOutputs": [0]},
        {"inputs": [1,0],"desiredOutputs": [1]},
        {"inputs": [0,1],"desiredOutputs": [1]}
    ]
    const epochs = 10
    const alpha = 0.1         

    ann.train(initialState, dataset, epochs, alpha, (result)=>{
        assert.ok(result != false)
        assert.equal(typeof(result),'object')
        assert.equal(typeof(result.sumErr),'number')
        assert.equal(typeof(result.newState),'object')
        assert.ok(result.newState instanceof Array)
        assert.equal(typeof(result.newState[0]),'object')
        assert.equal(typeof(result.newState[0].weights),'object')
        assert.ok(result.newState[0].weights instanceof Array)
        assert.equal(typeof(result.newState[0].threshold),'object')
        assert.ok(result.newState[0].threshold instanceof Array)
         
        done();
    })
}

// Assert that ann.cycle should not throw when desired outputs is not an array
unit['ann.cycle should not throw when desired outputs is not an array'] = (done)=>{
 
    const initialState = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]
    const inputs = [1,1]        
    const desiredOutputs = 0        
    const alpha = 0.1 ;    

    assert.doesNotThrow(()=>{
        ann.cycle(initialState, inputs, desiredOutputs, alpha, (result)=>{
            assert.equal(result,false)
            done();
        },RangeError)        
    })
}

// Assert that ann.epoch should not throw when initial state is not an array
unit['ann.epoch should not throw when initial state is not an array'] = (done)=>{
 
    const initialState = { 'weights':[[0.5,0.4],[0.9,1]], 'threshold':[0.8,-.1]}

    const dataset =[ 
        {"inputs": [1,1],"desiredOutputs": [0]},
        {"inputs": [0,0],"desiredOutputs": [0]},
        {"inputs": [1,0],"desiredOutputs": [1]},
        {"inputs": [0,1],"desiredOutputs": [1]}
    ];

    const alpha = 0.1 ;    

    assert.doesNotThrow(()=>{
        ann.epoch(initialState, dataset, alpha, (result)=>{
            assert.equal(result,false)
            done();
        },RangeError)        
    })
}

// Assert that ann.train should not throw when epochs is not integer
unit['ann.train should not throw when epochs is not an integer'] = (done)=>{
 
    const initialState = [
        { 'weights':[[.5,.4],[.9,1]], 'threshold':[.8,-.1]}, // hidden layer
        { 'weights':[[-1.2,1.1]], 'threshold':[.3]}     // outputs layer
    ]

    const dataset =[ 
        {"inputs": [1,1],"desiredOutputs": [0]},
        {"inputs": [0,0],"desiredOutputs": [0]},
        {"inputs": [1,0],"desiredOutputs": [1]},
        {"inputs": [0,1],"desiredOutputs": [1]}
    ];
    const epochs = 5.2;
    const alpha = 0.1 ;    

    assert.doesNotThrow(()=>{
        ann.train(initialState, dataset, epochs, alpha, (result)=>{
            assert.equal(result,false)
            done();
        },TypeError)        
    })
}

module.exports = unit;