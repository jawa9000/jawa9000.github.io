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

document.addEventListener('DOMContentLoaded', function() {
    if (typeof ingredients !== 'undefined' && Array.isArray(ingredients)) {
        // Sort by Name property alphabetically
        const sortedIngredients = [...ingredients].sort((a, b) => {
            if (a.Name < b.Name) return -1;
            if (a.Name > b.Name) return 1;
            return 0;
        });
        const html = sortedIngredients.map(renderIngredient).join('\n');
        document.getElementById('json-output').innerHTML = html;
    } else {
        document.getElementById('json-output').textContent = 'No ingredients data found.';
    }
});
