const EventEmitter = require('events'); // class

let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {                        // add method to EventEmitter class
      // send HTTP request....
      console.log(message);
      // raise event
      this.emit('messageLogged', {id:1, url:'http://'});  // object is evnet arguemeny
    }
}



module.exports = Logger;

// module.exports.log = log
// module.exports.url = url
