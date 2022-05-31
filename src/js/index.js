import config from '../../config.yaml';
const parser = require('@deskeen/markdown');


function getRepos() {
    return config && config.repos ? config.repos : null;
}

function getAllFilters() {
    const filterCategories = [
        'human-language',
        'computer-languages'
    ];
    const categories = [];
    const repos = getRepos();

    for (const filterCategoryIndex in filterCategories) {
        const filterCategory = filterCategories[filterCategoryIndex];

        for (const index in repos) {
            const repo = repos[index];
            const parentCategoryExistsIndex = categories.findIndex(category => category.name === filterCategory);
            const categoryExists = categories.find(category => category.items.includes(repo[filterCategory]));

            if (parentCategoryExistsIndex === -1 && !categoryExists) {
                if (!categoryExists) {
                    const category = {};
                    category['name'] = filterCategory;
                    category['items'] = [];
                    category['items'] = category['items'].concat(repo[filterCategory]);
                    categories.push(category);
                }
            }
            else if (!categoryExists){
                categories[parentCategoryExistsIndex].items = categories[parentCategoryExistsIndex].items.concat(repo[filterCategory]);
            }
        }
    }

    return categories;
}

function filterRepos(selectedFilters) {
    const repos = getRepos();
    let filteredRepos = [];

    if (repos && selectedFilters.length) {
        selectedFilters.forEach((filter) => {
            const filterParts = filter.split(':');
            const filterName = filterParts[0];
            const filterValue = filterParts[1];

            // Get object entry to easily filter repos
            filteredRepos = filteredRepos.concat(Object.entries(repos).filter(repo => {
                // Check if the type of value is array
                if (typeof repo[1][filterName] === 'object') {
                    return repo[1][filterName].includes(filterValue);
                }

                return repo[1][filterName] === filterValue;
            }));
        });

        // Return repos to original structure after filtering
        filteredRepos = Object.fromEntries(filteredRepos);
        displayRepos(filteredRepos);
    }
    else {
        displayRepos(repos);
    }
}

function initFilterEvent() {
    const filters = document.querySelectorAll('input[name="selected-category"]');
    const selectedFilters = [];

    filters.forEach((filter) => {
        filter.addEventListener('change', () => {
            if (filter.checked && !selectedFilters.includes(filter.value)) {
                selectedFilters.push(filter.value);
            }
            else {
                const index = selectedFilters.indexOf(filter.value);
                selectedFilters.splice(index, 1);
            }

            filterRepos(selectedFilters);
        });
    });
}

function displayFilters() {
    const categories = getAllFilters();
    const mainContainer = document.querySelector('.categories');
    const categoryList = document.createElement('ul');

    for (const index in categories) {
        const parentCategory = categories[index];
        const parentCategoryContainer = document.createElement('li');
        const childCategoryContainer = document.createElement('ul');

        for (const itemIndex in parentCategory.items) {
            const childCategory = parentCategory.items[itemIndex];

            childCategoryContainer.innerHTML += `<li><input type="checkbox" name="selected-category" id="${childCategory}" value="${parentCategory.name}:${childCategory}"><label for="${childCategory}">${childCategory}</label></li>`;
        }

        const parentCategoryName = parentCategory.name.replace('-', ' ');

        parentCategoryContainer.innerHTML = `<h3>${parentCategoryName}<h3>`; 
        parentCategoryContainer.appendChild(childCategoryContainer);
        categoryList.appendChild(parentCategoryContainer);
    }

    mainContainer.appendChild(categoryList);
    initFilterEvent();
}

function getHTML(repo) {
    try {
        const descriptionHTML = parser.parse(repo.description).innerHTML;
        const repoContainer = document.createElement('div');
        const firstColumn = `<div class="image"><img src="${repo.icon}" width="150" height="150" alt="Repository Icon" onerror="this.src = '../src/img/default.svg';"></div>`;
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
    } catch(error) {
        console.log(error);
    }
}

function addLoadingSkeletons(container) {
    const loadingSkeletonCount = 2;
    
    for (let rendered = 0; rendered < loadingSkeletonCount; rendered++) {
        const repoContainer = document.createElement('div');

        repoContainer.classList.add('repo');
        repoContainer.innerHTML = `<div class="image"></div><div><h2></h2><p></p><div class="details"><span></span><span></span><span></span><span></span></div></div>`;
        container.appendChild(repoContainer);
    }
}

function getSampleCodesContainer() {
    return document.querySelector('.sample-codes');
}

function displayRepos(repos) {
    const container = getSampleCodesContainer();
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
}

(function initCodeSamples() {
    const container = getSampleCodesContainer();
    // Show loading skeletons first
    addLoadingSkeletons(container);
    container.classList.add('loading');

    // Get the repo from the config yaml file
    const repos = getRepos();

    displayRepos(repos);
    displayFilters();
})();