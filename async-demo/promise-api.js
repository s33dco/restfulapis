// const p = Promise.resolve({id:1, ok: 'resolved'})

const p = Promise.reject(new Error('boo hoo rejected!'));

// always use an error object when rejecting to get call stack....

p
  .then(result => console.log(result))
  .catch( e => console.log(e.message));


  const p1 = new Promise((resolve, reject)=> {
    setTimeout(()=>{
      console.log('async 1');
      resolve(1);
    }, 4000);
  });

  const p2 = new Promise((resolve, reject)=> {
    setTimeout(()=>{
      console.log('async 2');
      resolve(2);
    }, 3000);
  });

  Promise.all([p1, p2])
  .then(results => console.log(results))
  .catch(e => console.log(e.message));

// Promise.race returns only first....
