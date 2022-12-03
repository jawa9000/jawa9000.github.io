$('input[id^="abilityScore_"]').on('change', function() {
    var ability = $(this).attr('id').split('_')[1];
    var abilityScoreValue = $(this).val();
    // console.log(ability); 'str'
    
    if (abilityScoreValue == 1) {
        $('#' + ability + 'PlusMinus').text('-5');
    } else if (abilityScoreValue >= 2 && abilityScoreValue <= 3) {
        $('#' + ability + 'PlusMinus').text('-4');
    } else if (abilityScoreValue >= 4 && abilityScoreValue <= 5) {
        $('#' + ability + 'PlusMinus').text('-3');
    } else if (abilityScoreValue >= 6 && abilityScoreValue <=7) {
        $('#' + ability + 'PlusMinus').text('-2');
    } else if (abilityScoreValue >= 8 && abilityScoreValue <=9) {
        $('#' + ability + 'PlusMinus').text('-1');
    } else if (abilityScoreValue >= 10 && abilityScoreValue <=11) {
        $('#' + ability + 'PlusMinus').text('0');
    } else if (abilityScoreValue >= 12 && abilityScoreValue <= 13) {
        $('#' + ability + 'PlusMinus').text('+1');
    } else if (abilityScoreValue >= 14 && abilityScoreValue <= 15) {
        $('#' + ability + 'PlusMinus').text('+2');
    } else if (abilityScoreValue >= 16 && abilityScoreValue <= 17) {
        $('#' + ability + 'PlusMinus').text('+3');
    } else if (abilityScoreValue >= 18 && abilityScoreValue <= 19) {
        $('#' + ability + 'PlusMinus').text('+4');
    } else if (abilityScoreValue >= 20 && abilityScoreValue <= 21) {
        $('#' + ability + 'PlusMinus').text('+5');
    } else if (abilityScoreValue >= 22 && abilityScoreValue <= 23) {
        $('#' + ability + 'PlusMinus').text('+6');
    } else if (abilityScoreValue >= 24 && abilityScoreValue <= 25) {
        $('#' + ability + 'PlusMinus').text('+7');
    } else if (abilityScoreValue >= 26 && abilityScoreValue <= 27) {
        $('#' + ability + 'PlusMinus').text('+8');
    } else if (abilityScoreValue >= 28 && abilityScoreValue <= 29) {
        $('#' + ability + 'PlusMinus').text('+9');
    } else if (abilityScoreValue == 30) {
        $('#' + ability + 'PlusMinus').text('+10');
    }
});

// challenge rating selection options
var output = '';

for (i in challengeRating) {
    output += '<option value="' + i + '">' + challengeRating[i].cr + '</option>';
}

$('select#challengeRating').append(output);

// set input fields based on CR selection
$('select#challengeRating').on('change', function() {
    if ($('#crOverview').is(':checked')) { // if the Challenge Override checkbox is enabled, replace values in various locations
        var crValue = $(this).val();
        $('span#xp').text('(' + numberWithCommas(challengeRating[crValue].xp + ')')); // xp
        $('#armorClass').val(challengeRating[crValue].ac); // ac

        var hp = challengeRating[crValue].hp.split('-');
        
        hp = Math.round((parseInt(hp[0]) + parseInt(hp[1]))/2)
        $('#hp').val(hp);

        // ** attack bonus
            // this should publish to a note for the attack section but not in the printed version
        // save DC
            // this should publish to a note for the attack section but not in the printed version
    }
});

// display challenge ratings for challenge_ratings.html
var output = '<table><tr><th>CR</th><th>Prof Bonus</th><th>AC</th><th>HP</th><th>Attack Bonus</th><th>Damange/Round</th><th>Save DC</th><th>XP</th></tr>';

for (i in challengeRating) {
    output += '<tr><td>' + challengeRating[i].cr + '</td>';
    output += '<td>' + challengeRating[i].profBonus + '</td>';
    output += '<td>' + challengeRating[i].ac + '</td>';
    output += '<td>' + challengeRating[i].hp + '</td>';
    output += '<td>' + challengeRating[i].attackBonus + '</td>';
    output += '<td>' + challengeRating[i].damageRound + '</td>';
    output += '<td>' + challengeRating[i].saveDC + '</td>';
    output += '<td>' + numberWithCommas(challengeRating[i].xp) + '</td></tr>';
}

output += '</table>';

$('div#crTable').html(output);

$('#addSkill').on('click', function() {
    console.log('add skill clicked')
});

// ** add skill
// Athletics
// Acrobatics
// Sleight of Hand
// Stealth
// Arcana
// History
// Investigation
// Nature
// Religion
// Animal Handling
// Insight
// Medicine
// Perception
// Survival
// Deception
// Intimidation
// Performance
// Persuasion

$('#addSavingThrow').on('click', function() {
    addSingularElement('div#savingThrows', 'Saving Throw +#', 'removeSavingThrows');
});
$('div#savingThrows').delegate('button[id^="removeSavingThrows"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#savingThrows > div', 'div#savingThrows'); // rehide savingThrows parent element
});
$('#addVulnerability').on('click', function() {
    addSingularElement('div#vulnerabilities','Vulnerability type', 'removeVulnerabilities');
});
$('div#vulnerabilities').delegate('button[id^="removeVulnerabilities"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#vulnerabilities > div', 'div#vulnerabilities'); // rehide vulnerabilities parent element
});
$('#addResistance').on('click', function() {
    addSingularElement('div#resistances', 'Resistance type', 'removeResistances')
});
$('div#resistances').delegate('button[id^="removeResistances"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#resistances > div', 'div#resistances'); // rehide resistances parent element
});
$('#addImmunity').on('click', function() {
    addSingularElement('div#damageImmunity','Damage immunity type', 'removeDamageImmunity');
});
$('div#damageImmunity').delegate('button[id^="removeDamageImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#damageImmunity > div', 'div#damageImmunity'); // rehide damageImmunity parent element
});
$('#addConditionImmunity').on('click', function() {
    addSingularElement('div#conditionImmunity', 'Condition immunity type', 'removeConditionImmunity');
});
$('div#conditionImmunity').delegate('button[id^="removeConditionImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#conditionImmunity > div', 'div#conditionImmunity'); // rehide conditionImmunity parent element
});
$('#addSense').on('click', function() {
    addSingularElement('div#senses', 'sense', 'removeSense');
});
$('div#senses').delegate('button[id^="removeSense"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#senses > div', 'div#senses'); // rehide sense parent element
});
$('#addLanguage').on('click', function() {
    addSingularElement('div#languages', 'languages', 'removeLanguage');
});
$('div#languages').delegate('button[id^="removeLanguage"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#languages > div', 'div#languages'); // rehide characteristic parent element
});
$('#addCharacteristic').on('click', function() { // add new characteristic elements
    addDoubleElement('div#Characteristics', 'characteristicDescription', 'Characteristic title', 'Characteristic description', 'removeCharacteristic');
});
$('div#Characteristics').delegate('button[id^="removeCharacteristic"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#Characteristics > div', 'div#Characteristics'); // rehide characteristic parent element
});
$('#addActions').on('click', function() {
    addDoubleElement('div#actions', 'actionDescription', 'Action title', 'Action description', 'removeAction');
});
$('div#actions').delegate('button[id^="removeAction"]','click', function() { // delete clicked action
    $(this).closest('div').remove(); 

    addHidden('div#actions > div', 'div#actions'); // rehide actions parent element
});
$('#addReaction').on('click', function() {
    addDoubleElement('div#reactions', 'reactionDescription', 'Reaction title', 'Reaction description', 'removeReaction');
});
$('div#reactions').delegate('button[id^="removeReaction"]','click', function() { // delete clicked reaction
    $(this).closest('div').remove(); 

    addHidden('div#reactions > div', 'div#reactions'); // rehide reactions parent element
});
$('#addBonus').on('click', function() {
    addDoubleElement('div#bonuses', 'bonusDescription', 'Bonus title', 'Bonus description', 'removeBonus');
});
$('div#bonuses').delegate('button[id^="removeBonus"]','click', function() { // delete clicked bonus
    $(this).closest('div').remove(); 

    addHidden('div#bonuses > div', 'div#bonuses'); // rehide bonus parent element
});
$('#addLegendary').on('click', function() {
    if ($('#legendaryMainDescription').length == 0) {
        $('div#legendaries').append('<textarea id="legendaryMainDescription" name="legendaryMainDescription" class="standardSpacing textareaDescription" placeholder="Legendary description overview"/><br/>'); 
    }

    addDoubleElement('div#legendaries', 'legendaryDescriptin', 'Legendgary title', 'Legendary description', 'removeLegendary');
});
$('div#legendaries').delegate('button[id^="removeLegendary"]','click', function() { // delete clicked legendary
    $(this).closest('div').remove(); 

    addHidden('div#legendaries > div', 'div#legendaries'); // rehide bonus parent element
});

// functions

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function addDoubleElement(elemId, name, placeholderTitle, placeholderDesc, removeId) { // creates an input,  textarea, and delete button elements for any feature type that requires a title and a description
    removeHidden(elemId);

    // generate input fields and delete button
    var output = '<div class="thinBorder"><input type="text" class="standardSpacing actionTitle" placeholder="' + placeholderTitle + '"><br/>';
    output += '<textarea name="' + name + '" class="standardSpacing textareaDescription" placeholder="' + placeholderDesc + '"/><br/>';
    output += '<button id="' + removeId + '">Remove</button></div>';

    $(elemId).append(output);
}

function addSingularElement(elemId, placeholder, removeId) { // creates an input element and deletion button for any feature type that requires only a description
    removeHidden(elemId);

    var output = '<div class="thinBorder"><input type="text" placeholder="' + placeholder + '"><button id="' + removeId + '">Remove</button></div>'

    $(elemId).append(output);
}

function addHidden(id1, id2) { // add hidden class to second element (parent)
    if ($(id1).length == 0) {
        $(id2).addClass('hidden');
    }
}

function removeHidden(id) { // remove hidden classes
    if ($(id).hasClass('hidden')) {
        $(id).removeClass('hidden');
    }
}