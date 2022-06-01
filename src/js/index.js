const parser = require('@deskeen/markdown');
import config from '../../config.yaml';
import { 
    detailTags,
    filterCategories
} from './constants.js';

function getRepos() {
    return config && config.repos ? config.repos : null;
}

function getAllFilters() {
    const categories = [];
    const repos = getRepos();

    for (const filterCategoryIndex in filterCategories) {
        const filterCategory = filterCategories[filterCategoryIndex];

        for (const index in repos) {
            const repo = repos[index];
            const parentCategoryExistsIndex = categories.findIndex(category => category.name === filterCategory);

            if (parentCategoryExistsIndex === -1) {
                // if (!categoryExists) {
                    const category = {};
                    category['name'] = filterCategory;
                    category['items'] = [];
                    category['items'] = repo[filterCategory] ? category['items'].concat(repo[filterCategory]) : category['items'];
                    categories.push(category);
                // }
            }
            else {
                categories[parentCategoryExistsIndex].items = repo[filterCategory] ? categories[parentCategoryExistsIndex].items.concat(repo[filterCategory]) : categories[parentCategoryExistsIndex].items;
                // categories[parentCategoryExistsIndex].items = categories[parentCategoryExistsIndex].items.map(item => item.toLowerCase()); // might need in the future
                categories[parentCategoryExistsIndex].items = categories[parentCategoryExistsIndex].items.filter((category, position, self) => self.indexOf(category) == position);
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
    const mobileFilterButton = document.querySelectorAll('.filter-button');
    const container = document.querySelector('.sample-codes-container');
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
            showSelectedFilters(selectedFilters);
        });
    });

    mobileFilterButton.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('name');

            console.log(name);
            if (name === 'add-filters') {
                container.classList.remove('mobile-sample-codes');
                container.classList.add('mobile-categories');
            }
            else {
                container.classList.add('mobile-sample-codes');
                container.classList.remove('mobile-categories');
            }
        });
    });
}

function initRemoveSelectedFilterEvent() {
    const removeButtons = document.querySelectorAll('button[class="remove-selected-filter"]');

    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const toRemoveName = button.parentElement.getAttribute('name');
            const filterElement = document.querySelector(`input[value="${toRemoveName}"]`);
            const event = document.createEvent("HTMLEvents");
            
            filterElement.checked = false;
            event.initEvent("change", false, true);
            filterElement.dispatchEvent(event);
        });
    });
}

function showSelectedFilters(filters) {
    const selectedCategoriesContainer = document.querySelector('.selected-categories');
    selectedCategoriesContainer.innerHTML = '<h3>Results:</h3>';

    if (filters.length) {
        filters.forEach(filter => {
            const name = filter.split(':')[1];

            selectedCategoriesContainer.innerHTML += `<span name="${filter}">${name}<button class="remove-selected-filter">&#x2715;</button></span>`;
        });

        initRemoveSelectedFilterEvent();
    }
    else {
        selectedCategoriesContainer.innerHTML = '';
    }
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
    mainContainer.innerHTML += '<button name="filter" class="filter-button">Filter</button>';
    initFilterEvent();
}

function checkIfExists(value) {
    return value ? value : '';
}

function getHTML(repo) {
    try {
        const descriptionHTML = parser.parse(repo.description).innerHTML;
        const repoContainer = document.createElement('div');
        const firstColumn = `<div class="image"><img src="${repo.icon}" width="150" height="150" alt="Repository Icon" onerror="this.src = '../src/img/default.svg';"></div>`;
        let bottomDetails = '<div class="details">';
        let detailTagCounter = 0;

        detailTags.forEach(item => {
            detailTagCounter++;

            if (item.tag === 'author') {
                return bottomDetails += `<span><strong>${checkIfExists(item.title)}:</strong> <a href="${checkIfExists(repo['author-link'])}" target="_blank">${checkIfExists(repo[item.tag])}</a></span>`
            }

            bottomDetails += `<span><strong>${checkIfExists(item.title)}:</strong> ${checkIfExists(repo[item.tag])}</span>`;

            if (detailTagCounter == 4) {
                bottomDetails += '<div class="break"></div>';
                detailTagCounter = 0;
            }
        });

        bottomDetails += '</div>';
        
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
    return document.querySelector('.sample-codes .main');
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