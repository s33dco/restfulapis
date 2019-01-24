// create promise

const p = new Promise((resolve, reject) => {
  // kick of async work
  // ...
  setTimeout(()=> {
      // resolve(1);
      reject(new Error('there was an error'))
  }, 2000);
});


// consume promise
p
  .then((result) => { console.log(result)})
  .catch((e) => { console.log(e.message)})
