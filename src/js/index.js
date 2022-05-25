import yaml from 'js-yaml';

function getRepos() {
    try {
        const configPath = '../../config.yaml';
        const request = new XMLHttpRequest(); 
        request.open("GET", configPath, false);
        request.send();
    
        if (request.response) {
            const config = yaml.load(request.response);

            return config.repos ? config.repos : null;
        }
    } catch (e) {
        console.log(e);
    }
};

function getHTML(repo) {
    const repoContainer = document.createElement('div');
    const firstColumn = `<div><img src="${repo.icon}" onerror="this.src = '../src/img/default.svg';"></div>`;
    const bottomDetails = `<div class="details">
        <span><strong>Author:</strong> <a href="${repo['author-link']}" target="_blank">${repo.author}</a></span>
        <span><strong>Human Language:</strong> ${repo['human-language']}</span>
        <span><strong>Computer Language(s):</strong> ${repo['computer-languages']}</span>
        <span><strong>Operating System:</strong> ${repo['operating-system']}</span>
    </div>`;
    const secondColumn = `<div><a href="${repo.location}" target="_blank"><h2>${repo.title}</h2></a><p>${repo.description}</p>${bottomDetails}</div>`

    repoContainer.classList.add('repo');
    repoContainer.innerHTML = `${firstColumn}${secondColumn}`;

    return repoContainer;
}

(function displayRepos() {
    const repos = getRepos();
    const container = document.querySelector('.sample-codes');

    container.innerHTML = '';

    console.log(repos);

    if (repos) {
        for(const index in repos) {
            const repo = repos[index];
            const repoHTML = getHTML(repo);
            
            container.appendChild(repoHTML);
        }
    }
})();