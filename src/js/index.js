import yaml from 'js-yaml';
const parser = require('@deskeen/markdown')

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
    const descriptionHTML = parser.parse(repo.description).innerHTML;
    const repoContainer = document.createElement('div');
    const firstColumn = `<div class="image"><img src="${repo.icon}" alt="Repository Icon" onerror="this.src = '../src/img/default.svg';"></div>`;
    const bottomDetails = `<div class="details">
        <span><strong>Author:</strong> <a href="${repo['author-link']}" target="_blank">${repo.author}</a></span>
        <span><strong>Human Language:</strong> ${repo['human-language']}</span>
        <span><strong>Computer Language(s):</strong> ${repo['computer-languages']}</span>
        <span><strong>Operating System:</strong> ${repo['operating-system']}</span>
    </div>`;
    const secondColumn = `<div><a href="${repo.location}" target="_blank"><h2>${repo.title}</h2></a><p>${descriptionHTML}</p>${bottomDetails}</div>`

    repoContainer.classList.add('repo');
    repoContainer.innerHTML = `${firstColumn}${secondColumn}`;

    return repoContainer;
}

function addLoadingSkeletons(container) {
    const loadingSkeletonCount = 2;
    
    for (let rendered = 0; rendered < loadingSkeletonCount; rendered++) {
        const repoContainer = document.createElement('div');

        repoContainer.classList.add('repo');
        repoContainer.innerHTML = `<div class="repo"><div class="image"></div><div><h2></h2><p></p><div class="details"><span></span><span></span><span></span><span></span></div></div></div>`;
        container.appendChild(repoContainer);
    }
}

(function displayRepos() {
    const container = document.querySelector('.sample-codes');
    // Show loading skeletons first
    addLoadingSkeletons(container);
    container.classList.add('loading');

    // Get the repo from the config yaml file
    const repos = getRepos();

    // Clear the html of the sample codes container
    container.innerHTML = '';

    if (repos) {
        for(const index in repos) {
            const repo = repos[index];
            const repoHTML = getHTML(repo);
            
            container.appendChild(repoHTML);
        }
    }

    container.classList.remove('loading');
})();