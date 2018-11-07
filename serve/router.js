/*
 * Routing overview
 * 
 */

// Dependencies
const handlers = require('./handlers')

// Define a request router
const router = {
    '' : handlers.ann,
    'ann' : handlers.ann,
    'ping' : handlers.ping,
    'notFound' : handlers.notFound
}

module.exports = router;