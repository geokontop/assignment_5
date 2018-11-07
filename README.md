# Assignment 5

directories /test , /app, /serve 

## Inside /test
1. The unit test in unit.js 
    - helpers.getRandomInt(2) should return integer 0 or 1
    - helpers.getRandomArbitrary(-1,1) should return a number between -1 and 1
    - ann.neuronSigmoidActivation should return a number
    - ann.neuronSigmoidActivation should return 0.8808 for specific input values
    - ann.neuronSigmoidActivation should not throw when threshold is not a number.
    - ann.neuronSigmoidActivation should not throw when some input is not a number.
    - ann.neuronSigmoidActivation should not throw when some weight is not a number.
    - ann.initializeNetwork should not throw when passing non integer values
    - ann.initializeNetwork should return an array with specific elements lengths for given input
    - ann.activate should not throw when passing a state that is not an array
    - ann.activate should not throw when passing invalid network input
    - ann.activate should not throw when passing invalid network a non-array as desired output
    - ann.activate should return an object
    - ann.activate should return expected values for given input
    - ann.backPropagate should return an array with expected value for given input
    - ann.backPropagate should not throw when passing a non-array previous state
    - ann.backPropagate should not throw when arrays's lengths do not comply
    - ann.backPropagate should not throw when alpha is not a number
    - ann.cycle response should be well formed and have the right values
    - ann.epoch response should be well formed
    - ann.train response should be well formed
    
1. The api test in api.js
Quite minimal here.
    - app.init should start without throwing
    - http /ping should respond with 200
    - http /ann should respond with 200
    - page not found should respond with 404

## Inside /app 
Some application related functionality. The application assumption is about training a feedforward artificial neural network to implement the XOR logic. Backpropagation is used as training algorithm. Neurons activation function used, is sigmoid.
### Some artificial neural networks functionality in lib.js
- initializeNetwork(neurons). Generates an ANN with neurons per layer as specified in input array and random input weights and thresholds. Returns the network state.
- neuronSigmoidActivation((weights, inputs, threshold). Returns neuron output, after implementing the sigmoid activation function in a neuron with specified threshold, for some specified inputs with some specified input weights.
- activate(network,inputs,desiredOutput). Returns an array with all outputs (final and intermediate), along with the error, for the given network state, network inputs and desired output.
- backPropagate(network,outputs,err, a). For the given network state, network layers' outputs, error and learning rate, computes the corection values and adds them to the existing. Returns a new network state
- addStates(stateA, stateB). Helper function that adds two network states. Returns the new one.
- cycle(initialState, inputs, desiredOutputs, a,callback). Forward and backward propagation. Network adjustments
- epoch(initialState, dataset, a, callback). Iterates applying values from a dataset to the ANN
- train(initialState, dataset, epochs, a, callback). Repeats for a number of epochs

### Some helper functions in helpers.js
- getRandomInt(max). Returns a random integer in range 0 to max-1. 
- getRandomArbitrary(min, max). Returns a random number between min and max. 

## Inside /serve
The usual server functionality. 

 