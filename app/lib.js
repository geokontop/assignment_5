
/*
    Application main library
    Artificial Neural Network

             In
Inp1 []------------O Out
        \       /   \
          \   / In    \In
            X          O ---- Out
          /   \       /In
        /    In \   /
Inp2 []------------O Out
            In
        
  Trained to perform logical XOR operations
  ----------------------------------    
   Inp1 | Inp2 | Output
  ----------------------------------    
     0  |   0  |    0  
     1  |   0  |    1  
     0  |   1  |    1 
     1  |   1  |    0
  ----------------------------------   
  
  Layers
  ----------------------------------   
  Input Layer
  1 Hidden Layer
  Output Layer

  Activation Function : Sigmoid
  Corection algorithm : Back Propagation

*/

// Dependencies
const helpers = require('../app/helpers')

// Container
const ann ={}

// Create an ANN and initialize it with random values. Pass as input an array with neurons per layer (input - ... hidden layers - output) 
// e.g. [5,4,3,2] - 5 inputs, 2 outputs, 2 hidden layers with 4 and 3 neurons each.
// For the XOR example network [2,2,1]. 2 inputs, 1 output, 1 hidden layer with 2 neurons
ann.initializeNetwork= (neurons)=>{
    // Sanity check
    neurons = typeof(neurons) == 'object' && neurons instanceof Array ? neurons: false;
    if(neurons){
        // neurons should hold indegers, otherwise return false
        let allIntegers =true
        neurons.forEach(element => {
            if(  !Number.isInteger(element)){
                allIntegers =false;
            }
        })
        if (allIntegers){
            // Initialize network
            const network = [];
            // Going through the hidden layers and output layer (We will skip the input layer)
            [...Array(neurons.length - 1)].forEach((_,i)=>{
                // For each layer initialize weights
                const layerWeights = []; 
                // Initialize thresholds            
                const thresholds = [];

                // Going through the layers' neurons. (skip the input layer, start from the second layer)
                [...Array(neurons[i+1])].forEach((_)=>{
                    // Initialize neuron's input weights
                    const neuronWeight = [];
                    // For each neuron, go through its inputs. The number of inputs equals the number of neurons of the previous layer
                    [...Array(neurons[i])].forEach((_)=>{
                        // Get a random value betueen -1 and 1
                        const randomInpWeight = Math.round((helpers.getRandomArbitrary(-1,1))*10000)/10000
                        neuronWeight.push(randomInpWeight);
                    });
                    layerWeights.push(neuronWeight)
                    // A random value for threshold
                    const thresh = Math.round((helpers.getRandomArbitrary(-1,1))*10000)/10000
                    thresholds.push(thresh);
                });
                
                const layer = {'weights':layerWeights,'threshold':thresholds};

                network.push(layer)
            });
            return network
        } else {
            return false
        }
        
    } else {
        return false
    }
}

// Evaluates the output of a neuron (with sigmoid activation function) for a given input array and respective weights.
ann.neuronSigmoidActivation = (weights, inputs, threshold)=>{
    // Each input, has its own weight to the neuron
    if(weights.length == inputs.length && !weights.some(isNaN) && !inputs.some(isNaN) && !isNaN(threshold)){
        let sum=0;
        for(let i=0; i<weights.length; i++){
            // We sum the impact of the inputs (inputValue * inputWeight)
            sum += weights[i]* inputs[i]
        }
        // We substract the threshold
        const active = sum-threshold;
        // Pass the result to the sigmoid activation function 1/(1+Math.exp(-active). Round the result to 4 decimal places
        const out = Math.round(1/(1+Math.exp(-active))*10000)/10000
        return out
    }else {
        return false;
    }
}

// Returns an array with all outputs (final and intermediate), along with the error.
ann.activate = (network,inputs,desiredOutput)=>{
    if(typeof(network) === 'object' && network instanceof Array && !inputs.some(isNaN) && typeof(desiredOutput) === 'object' && desiredOutput instanceof Array &&!desiredOutput.some(isNaN)){
    
        let newOutputs = []
        newOutputs.push(inputs);
        for(let i=0; i < network.length; i++){
            let out = []
            for(let j = 0; j< network[i].weights.length; j++){
                // console.log(network[i].weights[j], newOutputs[newOutputs.length-1], network[i].threshold[j])
                const newOut = ann.neuronSigmoidActivation(network[i].weights[j], newOutputs[newOutputs.length-1], network[i].threshold[j]);
                if(newOut){
                    out.push(newOut);
                }else{
                    return false;
                }  
            }
            newOutputs.push(out);
        }
        let err =[];
        for(let i =0;i<newOutputs[newOutputs.length-1];i++){
            err.push(desiredOutput[i] - newOutputs[newOutputs.length-1][i])
        }
        return {'out':newOutputs,'err':err}
    } else {
        return false
    }
}

// Computes the network state corection values and adds them to the existing. Returns a new network state
ann.backPropagate = (network,outputs,err, a)=>{

    // Sanity check
    network = typeof(network) == 'object' && network instanceof Array ? network : false;
    outputs = typeof(outputs) == 'object' && outputs instanceof Array ? outputs : false;
    err = typeof(err) == 'object' && err instanceof Array ? err : false;
    a = typeof(a) == 'number' ? a : false;
    if (network && outputs && err && a && network.length == outputs.length - 1){
        // console.log('++++ ',JSON.stringify(network),outputs,err)
        const deltaState = JSON.parse(JSON.stringify(network));
        // const a= 0.1    
        let e = err ;
        let gradients = []
        for(let i = 0;i<outputs.length-1;i++){
            gradients.push([])
        }
        for(let i = outputs.length-1; i > 0 ; i--){
            for(let j = 0; j< outputs[i].length; j++){
                let d = undefined;
                if (i==outputs.length-1){ 
                    d = outputs[i][j] * (1-outputs[i][j]) * e[j]
                    gradients[i-1].push(d)
                }
                else { 
                    let aux=0
                    const levelsAfter = network[i].threshold.length;
                    for (let l=0; l < levelsAfter;l++){

                        aux +=  network[i].weights[l][j] * gradients[i][l]
                    }
                    d = outputs[i][j]*(1-outputs[i][j])*aux
                    
                    gradients[i-1].push(d)
                }
                deltaState[i-1].threshold[j] =  a * (-1) * d
                for(let k = 0; k < network[i-1].weights[j].length ; k++){
                    deltaState[i-1].weights[j][k] =  a * d *  outputs[i-1][k]
                }
            }        
        }  
        // Having evaluaed the delta adjustments, add them to the initian network respective values 
        const newState = ann.addStates (network, deltaState)
        // Return it
        return   newState;
    } else {
        return false
    }     
    
}

// Add two networks, that have the same layers and neurons per layer, so that 
// in the resulting network each weight equals the sum of the respective weights of the two operant networks, 
// and each threshold in the resulting network equals the sum of the respective thresholds of the two opereant networks.
ann.addStates = (stateA, stateB)=>{
    // The networks should hane the same layer number (Input layer not counted in both)
    if(stateA.length == stateB.length){
        // Go through the layers 
        for(let i=0; i<stateA.length; i++){
            // The networks should have the same neurons number in the layer. (weights.length gives the number of neurons)
            if(stateA[i].weights.length == stateB[i].weights.length){
                // Go through the neurons in the layer
                for (let j=0; j<stateA[i].weights.length;j++){
                    // Go through the previous layer neurons (weights[j].length). That produces an j X k matrix
                    for (let k=0 ; k<stateA[i].weights[j].length ; k++){
                        // Add the respectie weights. Store result to network A. 4 decimal digits.
                        stateA[i].weights[j][k] = Math.round((stateA[i].weights[j][k] + stateB[i].weights[j][k])*10000)/10000
                    }
                }
            }else{
                return false;
            } 
            // A similar procedure for the thresholds. Smaller arrays' depth here  
            if(stateA[i].threshold.length == stateB[i].threshold.length){
                for (let j=0; j<stateA[i].threshold.length;j++){
                    stateA[i].threshold[j] = Math.round((stateA[i].threshold[j] + stateB[i].threshold[j])*10000)/10000
                }
            }else{
                return false;
            }  
        }
    }else{
        return false
    }
    return stateA;
}

// A full cycle. Activation followed by backpropagation
ann.cycle = (initialState, inputs, desiredOutputs, a,callback)=>{
    
    // Sanity check
    initialState = typeof(initialState) == 'object' && initialState instanceof Array ? initialState : false;
    inputs = typeof(inputs) == 'object' && inputs instanceof Array ? inputs : false;
    desiredOutputs = typeof(desiredOutputs) == 'object' && desiredOutputs instanceof Array ? desiredOutputs : false;
    a = typeof(a) == 'number' && a>0 ? a : false;

    if (initialState && inputs && desiredOutputs && a){

        // The forward activation
        const result = ann.activate(initialState, inputs, desiredOutputs);
        // The backward propagation
        const newState = ann.backPropagate(initialState,result.out,result.err, a);
        if(result && newState){
            callback({ 'newState' : newState, 'error' : result.err }) 
        }else{
            callback(false);
        }

    }else{
        callback(false);
    }
    
}

// Iterate applying the dataset values to ANN in order to train it
ann.epoch = async (initialState, dataset, a, callback)=>{

    // Sanity check
    initialState = typeof(initialState) == 'object' && initialState instanceof Array ? initialState : false;
    dataset = typeof(dataset) == 'object' && dataset instanceof Array ? dataset : false;
    a = typeof(a) == 'number' && a>0 ? a : false;

    if (initialState && dataset && a ){
        
        // The state is initialized
        let state = initialState;
        // The sum error is initialized
        let sumErr = 0;

        // Apply sequentially the dataset values
        for (const data of dataset){   
            // For every record in the dataset execute a cycle (activate forward -> adjust backward)
            await ann.cycle(state, data.inputs, data.desiredOutputs, a,(result)=>{
                // Eval the sum error 
                sumErr += result.error * result.error
                // Get the new state to continue
                state = result.newState;
            });            
        }
        callback ({ 'newState' : state, 'sumErr' : sumErr })        
    }else{
        callback (false);
    }
}

ann.train= async (initialState, dataset, epochs, a, callback)=>{
    // Sanity check
    initialState = typeof(initialState) == 'object' && initialState instanceof Array? initialState: false;
    dataset = typeof(dataset) == 'object' && dataset instanceof Array? dataset: false;
    epochs = typeof(epochs) == 'number' && Number.isInteger(epochs) && epochs>1 ? epochs: false;
    a = typeof(a) == 'number' && a>0 ? a: false;

    if ( initialState && dataset && epochs && a){
        // The state is initialized
        let state = initialState;
        // The sum error is initialized
        let se = 0;
        // Execute sequentially epochs
        for (let epoch in [...Array(epochs)]){
            await ann.epoch(state, dataset, a,(result)=>{
                // After each epoch update state to be readjusted
                state = result.newState;
            })
        };
        callback({ 'newState' : state, 'sumErr' : se })
    }else{
        callback(false)
    }    
}

module.exports = ann;
