function sortObjectAlphabetically(obj) {
    if (Array.isArray(obj)) {
        return obj.map(sortObjectAlphabetically);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).sort().reduce((acc, key) => {
            acc[key] = sortObjectAlphabetically(obj[key]);
            return acc;
        }, {});
    }
    return obj;
}

function renderIngredient(ingredient) {
    let html = `<div class="ingredient">`;
    if (ingredient.Name) html += `<h2>${ingredient.Name}</h2>`;
    if (ingredient.Description) html += `<p>${ingredient.Description}</p>`;
    for (const key of Object.keys(ingredient)) {
        if (key === 'Name' || key === 'Description') continue;
        const value = ingredient[key];
        if (Array.isArray(value)) {
            html += `<h3>${key}</h3><ul>`;
            value.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += `</ul>`;
        } else if (typeof value === 'object' && value !== null) {
            html += `<h3>${key}</h3>`;
            for (const subKey of Object.keys(value)) {
                html += `<strong>${subKey}:</strong> `;
                if (Array.isArray(value[subKey])) {
                    html += `<ul>`;
                    value[subKey].forEach(item => {
                        html += `<li>${item}</li>`;
                    });
                    html += `</ul>`;
                } else {
                    html += `${value[subKey]}<br/>`;
                }
            }
        } else {
            html += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }
    html += `</div>`;
    return html;
}


// --- Filter UI Setup ---
function createDropdown(id, label, options) {
    const select = document.createElement('select');
    select.id = id;
    select.innerHTML = `<option value="">All</option>` + options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
    const wrapper = document.createElement('label');
    wrapper.style.marginRight = '1em';
    wrapper.textContent = label + ': ';
    wrapper.appendChild(select);
    return wrapper;
}

function getUniqueValues(key, subkey) {
    const set = new Set();
    ingredients.forEach(ing => {
        let values = [];
        if (subkey && ing[key] && Array.isArray(ing[key][subkey])) {
            values = ing[key][subkey];
        } else if (Array.isArray(ing[key])) {
            values = ing[key];
        } else if (subkey && ing[key] && ing[key][subkey]) {
            values = [ing[key][subkey]];
        } else if (ing[key]) {
            values = [ing[key]];
        }
        values.forEach(val => {
            if (typeof val === 'string') {
                set.add(val);
            } else if (val && typeof val === 'object' && typeof val.name === 'string') {
                set.add(val.name);
            }
            // Ignore objects without a string or .name property
        });
    });
    return Array.from(set).sort();
}

function setupFilters() {
    let filterDiv = document.getElementById('ingredientFilters');
    if (!filterDiv) {
        filterDiv = document.createElement('div');
        filterDiv.id = 'ingredientFilters';
        document.body.insertBefore(filterDiv, document.body.firstChild);
    }
    filterDiv.innerHTML = '';

    // --- Add Search Input with Auto-fill ---
    const searchWrapper = document.createElement('label');
    searchWrapper.style.marginRight = '1em';
    searchWrapper.textContent = 'Search: ';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'ingredientSearch';
    searchInput.setAttribute('autocomplete', 'off');
    searchInput.style.width = '200px';

    // Create datalist for auto-fill
    const dataList = document.createElement('datalist');
    dataList.id = 'ingredientSuggestions';
    searchInput.setAttribute('list', 'ingredientSuggestions');
    // Fill datalist with ingredient names
    if (typeof ingredients !== 'undefined' && Array.isArray(ingredients)) {
        dataList.innerHTML = ingredients.map(ing =>
            `<option value="${ing.Name}"></option>`
        ).join('');
    }
    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(dataList);
    filterDiv.appendChild(searchWrapper);

    // Ingredient Type
    const typeOptions = getUniqueValues('Ingredient Type');
    filterDiv.appendChild(createDropdown('filterType', 'Type', typeOptions));

    // Locations
    const locationOptions = getUniqueValues('Locations');
    filterDiv.appendChild(createDropdown('filterLocation', 'Location', locationOptions));

    // Harvesting Kit
    const harvestingOptions = getUniqueValues('Harvesting', 'Required Kit');
    filterDiv.appendChild(createDropdown('filterHarvest', 'Harvesting Kit', harvestingOptions));

    // Cooking Kit
    const cookingOptions = getUniqueValues('Cooking', 'Required Kit');
    filterDiv.appendChild(createDropdown('filterCooking', 'Cooking Kit', cookingOptions));

    // Seasons
    const seasonOptions = getUniqueValues('Seasons');
    filterDiv.appendChild(createDropdown('filterSeason', 'Season', seasonOptions));

    // --- Add Random Ingredient Button ---
    const randomBtn = document.createElement('button');
    randomBtn.textContent = 'Pick Random Ingredient';
    randomBtn.style.marginLeft = '1em';
    randomBtn.onclick = function () {
        // Get selected Location and Season
        const loc = document.getElementById('filterLocation').value;
        const season = document.getElementById('filterSeason').value;

        // Filter ingredients by Location and Season only
        let filtered = ingredients.slice();
        if (loc) filtered = filtered.filter(ing => (ing.Locations || []).includes(loc));
        if (season) filtered = filtered.filter(ing => (ing.Seasons || []).includes(season));

        // Pick random ingredient
        if (filtered.length > 0) {
            const randomIngredient = filtered[Math.floor(Math.random() * filtered.length)];
            renderIngredients([randomIngredient]);
        } else {
            renderIngredients([]);
        }

        // Reset all other dropdowns to "All"
        ['filterType', 'filterHarvest', 'filterCooking'].forEach(id => {
            document.getElementById(id).selectedIndex = 0;
        });
    };
    filterDiv.appendChild(randomBtn);

    // Listen for changes
    ['filterType', 'filterLocation', 'filterHarvest', 'filterCooking', 'filterSeason'].forEach(id => {
        document.getElementById(id).addEventListener('change', filterAndRenderIngredients);
    });

    // Listen for search input
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            filterAndRenderIngredients();
            return;
        }
        const filtered = ingredients.filter(ing =>
            ing.Name && ing.Name.toLowerCase().includes(query)
        );
        renderIngredients(filtered);
    });
}

// --- Filtering Logic ---
function filterAndRenderIngredients() {
    let filtered = ingredients.slice();

    const type = document.getElementById('filterType').value;
    const loc = document.getElementById('filterLocation').value;
    const harvest = document.getElementById('filterHarvest').value;
    const cook = document.getElementById('filterCooking').value;
    const season = document.getElementById('filterSeason').value;

    if (type) filtered = filtered.filter(ing => ing['Ingredient Type'] === type);
    if (loc) filtered = filtered.filter(ing => (ing.Locations || []).includes(loc));
    if (harvest) filtered = filtered.filter(ing =>
        (ing.Harvesting && Array.isArray(ing.Harvesting['Required Kit']) && ing.Harvesting['Required Kit'].includes(harvest))
    );
    if (cook) filtered = filtered.filter(ing =>
        (ing.Cooking && Array.isArray(ing.Cooking['Required Kit']) && ing.Cooking['Required Kit'].includes(cook))
    );
    if (season) filtered = filtered.filter(ing =>
        (ing.Seasons && Array.isArray(ing.Seasons) && ing.Seasons.includes(season))
    );

    renderIngredients(filtered);
}

// --- Ingredient Rendering (uses your existing renderIngredient) ---
function renderIngredients(list) {
    const container = document.getElementById('json-output');
    if (!list.length) {
        container.innerHTML = '<em>No ingredients found.</em>';
        return;
    }
    container.innerHTML = list.map(renderIngredient).join('\n');
}

// --- Initialize on page load ---
document.addEventListener('DOMContentLoaded', function() {
    if (typeof ingredients !== 'undefined' && Array.isArray(ingredients)) {
        setupFilters();
        // Sort by Name property alphabetically
        const sortedIngredients = [...ingredients].sort((a, b) => {
            if (a.Name < b.Name) return -1;
            if (a.Name > b.Name) return 1;
            return 0;
        });
        renderIngredients(sortedIngredients);
    } else {
        document.getElementById('json-output').textContent = 'No ingredients data found.';
    }
});
