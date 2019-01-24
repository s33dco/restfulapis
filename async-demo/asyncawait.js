console.log('before');

// Promise-based Approach
//
// getUser(1)
//   .then(user => getRepos(user.github))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('commits:', commits))
//   .catch( e => console.log(e.message))
//
//
// Async based Approach
const displayCommits = async () =>{

  try {
    const user = await getUser(1);
    const repos = await getRepos(user.github);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch (e) {
    console.log(e.message)
  }
}
displayCommits();

console.log('after');

function getUser(id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('reading user from db');
      resolve({id: id, github: 'bongo'});
    }, 2000)
  });
}

function getRepos(username){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('connecting github api..');
      reject(new Error('could not get repos'));
      // resolve(['repo1', 'repo2', 'repo3']);
    }, 2000)
  });
}

function getCommits(repo){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('connecting repo api..');
      resolve(['commit1', 'commit2', 'commit3']);
    }, 1000)
  });
}
