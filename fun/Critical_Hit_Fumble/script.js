const criticalHitBtn = document.getElementById('criticalHitBtn');
const fumbleBtn = document.getElementById('fumbleBtn');
const criticalHitDiv = document.getElementById('criticalHit');
const fumbleDiv = document.getElementById('fumble');
const criticalHitRandomBtn = document.getElementById('criticalHitRandom');
const criticalHitInput = document.getElementById('criticalHitInput');
const criticalHitSubmitBtn = document.getElementById('criticalHitSubmit');
const criticalHitResultDiv = document.getElementById('criticalHitResult');
const fumbleRandomBtn = document.getElementById('fumbleRandom');
const fumbleInput = document.getElementById('fumbleInput');
const fumbleSubmitBtn = document.getElementById('fumbleSubmit');
const fumbleResultDiv = document.getElementById('fumbleResult');

criticalHitBtn.addEventListener('click', () => {
    criticalHitDiv.style.display = 'block';
    fumbleDiv.style.display = 'none';
});

fumbleBtn.addEventListener('click', () => {
    fumbleDiv.style.display = 'block';
    criticalHitDiv.style.display = 'none';
});

criticalHitRandomBtn.addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 100) + 1;
    criticalHitInput.value = roll;
    displayCriticalHitResult(roll);
});

criticalHitSubmitBtn.addEventListener('click', () => {
    const roll = parseInt(criticalHitInput.value);
    if (roll >= 1 && roll <= 100) {
        displayCriticalHitResult(roll);
    } else {
        criticalHitResultDiv.textContent = "Please enter a number between 1 and 100.";
    }
});

fumbleRandomBtn.addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 100) + 1;
    fumbleInput.value = roll;
    displayFumbleResult(roll);
});

fumbleSubmitBtn.addEventListener('click', () => {
    const roll = parseInt(fumbleInput.value);
    if (roll >= 1 && roll <= 100) {
        displayFumbleResult(roll);
    } else {
        fumbleResultDiv.textContent = "Please enter a number between 1 and 100.";
    }
});

function findResult(table, roll) {
    for (let i = 0; i < table.length; i++) {
        const range = table[i]["% Roll"].split("-");
        if (range.length === 1) {
            if (parseInt(range[0]) === roll) {
                return table[i];
            }
        } else if (range.length === 2) {
            const min = parseInt(range[0]);
            const max = parseInt(range[1]);
            if (roll >= min && roll <= max) {
                return table[i];
            }
        }
    }
    return null;
}

function displayCriticalHitResult(roll) {
    const result = findResult(criticalHitTable, roll);
    if (result) {
        let description = `Roll: ${roll}<br>`;
        for (const key in result) {
            if (key !== "% Roll") {
                description += `${key}: ${result[key]}<br>`;
            }
        }
        criticalHitResultDiv.innerHTML = description;
    } else {
        criticalHitResultDiv.textContent = "No result found.";
    }
}

function displayFumbleResult(roll) {
    const result = findResult(fumbleTable, roll);
    if (result) {
        let description = `Roll: ${roll}<br>`;
        for (const key in result) {
            if (key !== "% Roll") {
                description += `${key}: ${result[key]}<br>`;
            }
        }
        fumbleResultDiv.innerHTML = description;
    } else {
        fumbleResultDiv.textContent = "No result found.";
    }
}