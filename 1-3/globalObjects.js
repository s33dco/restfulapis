const {log} = require('./logger'); // exporting function..




// above prefixed by global.

let message = "";

// variables are not defined on global object - scoped to module

console.log(module);

log('here we are then');
