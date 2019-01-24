console.log('before');

getUser(1, getRepos);

console.log('after');

function getRepos(user){
  getRepos(user.github, getCommits);
}

function getCommits(repo){
  getCommits(repo, displayCommits)
}


function displayRepos(repos){
  repos.forEach((repo) => {
    console.log(repo);
  });
}

function displayCommits(commits){
  console.log(commits);
}


function getUser(id, callback){
  console.log('reading user from db');
  setTimeout(() => {
    callback({id: id, github: 'bongo'});
  }, 2000)
}

function getRepos(username, callback){
  console.log('connecting github api..');
  setTimeout(() => {
    return ['repo1', 'repo2', 'repo3'];
  }, 2000)
}
