/*
 * Create and export configuration variables
 *
 */

// Container for all environments
const environments = {};


// Staging (default) environment
environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'templateGlobals' : {
    'appName' : 'assignment 5',
    'baseUrl' : 'http://localhost:3000'
  }
};


// Testing  environment
environments.staging = {
  'httpPort' : 4000,
  'httpsPort' : 4001,
  'envName' : 'testing',
  'templateGlobals' : {
    'appName' : 'assignment 5',
    'baseUrl' : 'http://localhost:3000'
  }
};

// Production environment
environments.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'templateGlobals' : {
    'appName' : 'assignment 5',
    'baseUrl' : 'http://localhost:5000'
  }
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
