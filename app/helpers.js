

// Container
const helpers= {}

// Returns an integer between 0 and max-1
helpers.getRandomInt = (max)=>{
    return Math.floor(Math.random() * Math.floor(max));
}

// Returns a random number between min and max
helpers.getRandomArbitrary = (min, max)=>{
    return Math.random() * (max - min) + min;
  }

module.exports = helpers;