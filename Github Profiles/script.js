const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = "https://api.github.com/users/";

getUser('Haseebzz');
async function getUser(user){
    let res = await fetch(url+ user)
    let resData = await res.json();
    //console.log(resData);
    createRepos(user);
    createCard(resData);
}
async function createRepos(user){
    const resp = await fetch(url + user + '/repos' );
    respData = await resp.json();
    console.log(respData);
    getRepos(respData);
}

function getRepos(repos){
    const reposEl = document.getElementById("repos");

    repos.forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

function createCard(user){
    const card = document.createElement('div');
    card.classList.add('card');

    const cardtext = `
    <div class = 'card'>
    <div class>
       <img class='avatar'src = '${user.avatar_url}' alt = '${user.name}' />
    </div>

    <div class = 'user-info'>
      <h2>${user.name}</h2>
      <p>${user.bio}</p>

     <ul class='info'>
        <li>${user.followers}<strong>Followers</strong></li>
        <li>${user.following}<strong>Follwing</strong></li>
        <li>${user.public_repos}<strong>Repos</strong></li>
     </ul>

     <div id="repos"></div>
 </div>
</div>     
    `
    main.innerHTML = cardtext;
}





form.addEventListener('submit', e => {
    e.preventDefault();
    const text = search.value;

    if(text){
        getUser(text);

        search.value= '';
    }
});