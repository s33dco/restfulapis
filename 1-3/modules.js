const path = require('path');
const os = require('os');
const fs = require('fs');

let pathObj = path.parse(__filename);

fs.readdir('./', function(err, files) {
  if (err) console.log("error", err);
  else console.log(files);
})

console.log(pathObj);

let currentUser = os.userInfo()
let free = os.freemem();
let total= os.totalmem();

console.log(currentUser);

console.log(`Total Memory : ${total}, Free Memory : ${free}`)

console.log(`hostname of the operating system is ${os.hostname()}`)
