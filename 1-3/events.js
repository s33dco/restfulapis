const EventEmitter = require('events'); // class
const Logger = require('./logger');
const logger = new Logger();





// Register listener

logger.on('messageLogged', (arg) => {
  console.log(`listener called with id of ${arg.id}, from ${arg.url}`)
});

logger.log('message');

// Raise an event..
// emitter.emit('messageLogged', {id:1, url:'http://'});  // object is evnet arguemeny
// emitter.emit('logging', {message: 'this is straight forward'});
