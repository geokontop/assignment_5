/*
 * Test runner
 *
 */

// Dependencies
// const ann = require('./../app/lib')


// Application logic for the test runner
const _app = {};

// Container for the tests
_app.tests = {};

// Require the unit tests
_app.tests.unit = require('./unit')

// Require the api tests
_app.tests.api = require('./api')

// Count all the tests
_app.countTests = ()=>{
    let counter = 0;
    for(let key in _app.tests){
        if (_app.tests.hasOwnProperty(key)){
            const subTests = _app.tests[key];
            for (let testName in subTests){
                if(subTests.hasOwnProperty(testName)){
                    counter++;
                }
            }
        }
    }
    return counter;
}

_app.runTests = ()=>{
    let errors = [];
    let successes = 0;
    const limit = _app.countTests();
    let counter = 0;
    for(let key in _app.tests){
        if(_app.tests.hasOwnProperty(key)){           
            const subTests = _app.tests[key];
            for(let testName in subTests){
                if(subTests.hasOwnProperty(testName)){
                    (()=>{
                        let tmpTestName = testName;
                        const testValue = subTests[testName]
                        // Call the test
                        try{
                            testValue(()=>{
                                // If it calls back without throwing, then it succeded, so log it in green
                                console.log('\x1b[32m%s\x1b[0m', tmpTestName)
                                successes++;
                                counter++             
                                if(counter == limit){
                                    _app.produceTestReport(limit,successes,errors)
                                }
                            })          
                        }catch(e){
                            // If it throws an error, then it failed, so capture the error and log it in red
                            errors.push({
                                'name':testName,
                                'error':e
                            })
                            console.log('\x1b[31m%s\x1b[0m', e)
                            counter++;
                            if(counter == limit){
                                _app.produceTestReport(limit,successes,errors)
                            }
                        }
                    })()
                }
            } 
        }
    }
}

// Create test report
_app.produceTestReport = (limit,successes,errors)=>{
    console.log('');
    console.log('------------- BEGIN TEST REPORT -----------------');
    console.log('');
    console.log('Total Tests', limit);
    console.log('Pass: ',successes);
    console.log('Fails: ',errors.length);
    console.log('');

    // If there are errors print them in detail
    if(errors.length>0){
        console.log('------------- BEGIN ERROR DETAILS -----------------');
        console.log('');

        errors.forEach((err)=>{
            console.log('\x1b[31m%s\x1b[0m', err.name);
            console.log(err.error);
            console.log('');
        })
        console.log('');
        console.log('------------- END ERROR DETAILS -----------------');
    }

    console.log('');
    console.log('------------- END TEST REPORT -----------------');

    process.exit(0);
}

_app.runTests();
