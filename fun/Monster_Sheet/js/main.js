$('input[id^="abilityScore_"]').on('change', function() {
    var ability = $(this).attr('id').split('_')[1];
    var abilityScoreValue = $(this).val();
    
    if (abilityScoreValue == 1) {
        $('#' + ability + 'Modifier').text('-5');
    } else if (abilityScoreValue >= 2 && abilityScoreValue <= 3) {
        $('#' + ability + 'Modifier').text('-4');
    } else if (abilityScoreValue >= 4 && abilityScoreValue <= 5) {
        $('#' + ability + 'Modifier').text('-3');
    } else if (abilityScoreValue >= 6 && abilityScoreValue <=7) {
        $('#' + ability + 'Modifier').text('-2');
    } else if (abilityScoreValue >= 8 && abilityScoreValue <=9) {
        $('#' + ability + 'Modifier').text('-1');
    } else if (abilityScoreValue >= 10 && abilityScoreValue <=11) {
        $('#' + ability + 'Modifier').text('0');
    } else if (abilityScoreValue >= 12 && abilityScoreValue <= 13) {
        $('#' + ability + 'Modifier').text('+1');
    } else if (abilityScoreValue >= 14 && abilityScoreValue <= 15) {
        $('#' + ability + 'Modifier').text('+2');
    } else if (abilityScoreValue >= 16 && abilityScoreValue <= 17) {
        $('#' + ability + 'Modifier').text('+3');
    } else if (abilityScoreValue >= 18 && abilityScoreValue <= 19) {
        $('#' + ability + 'Modifier').text('+4');
    } else if (abilityScoreValue >= 20 && abilityScoreValue <= 21) {
        $('#' + ability + 'Modifier').text('+5');
    } else if (abilityScoreValue >= 22 && abilityScoreValue <= 23) {
        $('#' + ability + 'Modifier').text('+6');
    } else if (abilityScoreValue >= 24 && abilityScoreValue <= 25) {
        $('#' + ability + 'Modifier').text('+7');
    } else if (abilityScoreValue >= 26 && abilityScoreValue <= 27) {
        $('#' + ability + 'Modifier').text('+8');
    } else if (abilityScoreValue >= 28 && abilityScoreValue <= 29) {
        $('#' + ability + 'Modifier').text('+9');
    } else if (abilityScoreValue == 30) {
        $('#' + ability + 'Modifier').text('+10');
    }

    multipleUpdateSavingThrows(); // update any saving throw mods that may have been added
    multipleUpdateSkillModifier(); // update any skill mods that may have been added
    updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version
});

$('div input[id^="abilityScore"]').on('change', function() { // loop through each ability score and update the print version
    $('div#printAbilityScores:nth-child(2)').html(''); // clear all print version ability scores
    
    $('div input[id^="abilityScore"]').each(function() {
        var id = $(this).attr('id').split('_')[1]; // get raw id for ability score
    
        id = 'creature' + id[0].toUpperCase() + id.substring(1).slice(0,2); // convert id string to match the element id for the print version

        $('div#' + id).html($(this).val() + ' (' + $(this).next().text() + ')');
    });    
});

$('input#crOverview').on('change', function() { // toggle disable parameter for the input elements for AC and HP to allow/disallow editing based on the selection of Challenge Rating
    if ($(this).attr('checked') == 'checked') {
        $(this).removeAttr('checked');
        toggleACHP('enable');
    } else {
        $(this).attr('checked', 'checked');
        if ($('#challengeRating').val() == 'none') {
            toggleACHP('disable');
        }
    }
});

// challenge rating selection options
var output = '';

for (i in challengeRating) {
    output += '<option value="' + i + '">' + challengeRating[i].cr + '</option>';
}

$('select#challengeRating').append(output);

$('select#challengeRating').on('change', function() { // set input fields based on CR selection
    var crValue = $(this).val();

    if (crValue == 'none') {
        toggleACHP('disable');
        $('span#xp').text('');
        $('span#attackBonus').text('');
        $('span#damageRound').text('');
        $('span#saveDC').text('');
        $('#print span#challengeRating').text('');
    } else {
        var hp = challengeRating[crValue].hp.split('-');
        
        $('#hitPoints').val(Math.round((parseInt(hp[0]) + parseInt(hp[1]))/2));
        $('span#xp').text('(' + numberWithCommas(challengeRating[crValue].xp + ')')); // xp
        $('#armorClass').val(challengeRating[crValue].ac); // armor class
        $('span#profBonus').text('Prof bonus: ' + challengeRating[crValue].profBonus + ', ');
        $('span#ac').text('AC: ' + challengeRating[crValue].ac + ', ');
        $('span#hp').text('HP: ' + challengeRating[crValue].hp + ', ');
        $('span#attackBonus').text('Attack bonus: ' + challengeRating[crValue].attackBonus + ', ');
        $('span#damageRound').text('Damage/round: ' + challengeRating[crValue].damageRound + ', ');
        $('span#saveDC').text('Save DC: ' + challengeRating[crValue].saveDC);

        toggleACHP('enable');
        calcHitDice();
        multipleUpdateSavingThrows();
        multipleUpdateSkillModifier();
        updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version

        for (i in challengeRating) { // update the print version
            if ($('#challengeRating').val() == i) {
                $('#print span#challengeRating').text(challengeRating[i].cr + ' ('+ numberWithCommas(challengeRating[crValue].xp + ')'));
                break;
            }
        }
        
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

$('select#size').on('change', function() { // apply hit dice based on selected size
    if ($(this).val() == 'blank') {
        $('input#hpDice')
            .attr('disabled', 'disabled')
            .attr('title', '#d#+#');
    } else {
        $('input#hpDice')
            .removeAttr('disabled')
            .removeAttr('title');

        calcHitDice();
    }

    $('#print span#creatuerSize').text($(this).val()); // update print version for size
});

$('input#abilityScore_constitution').on('change', function() {
    calcHitDice();
});
$('input#hpPercentage').on('change', function() {
    calcHitDice();
});
$('#addSkill').on('click', function() {
    removeHidden('div#skills');

    var output = '<div class="thinBorder"><select name="skill" id="skill" class="standardSpacing">';

    for (i in skills) {
        for (j in skills[i]) {
            output += '<option value="' + skills[i][j].simple + '">' + skills[i][j].name + '</option>';
        }
    }
    
    output += '</select><input type="number" id="skillBonus" step="1" min="-5" max="10" value="">';
    output += '<button id="removeSkill">Remove</button></div>';
    
    $('div#skills').append(output);

    updatePrintSingleElement('span#skillList', 'select[id^="skill"]'); // update print version
});

$('div#skills').delegate('select[id^="skill"]','change', function() { // Add bonuses to added skill
    var value = $(this).val();

    $(this).attr('id', 'skill_' + value);

    $(this).next().attr('id', 'skillValue_' + value); // change the id of the input element to match the skill that was selected
     
    for (i in skills) {
        for (j in skills[i]) {
            if (value == skills[i][j].simple) {
                var selectedSkill = i;
                break;
            }
        }
    }

    updateSkillModifier(value, selectedSkill);
    updatePrintSingleElement('span#skillList', 'select[id^="skill"]'); // update print version
});

$('div#skills').delegate('select[id^="skill"] + input', 'change', function() { // update the print output on change of the skill value
    updatePrintSingleElement('span#skillList', 'select[id^="skill"]');
});

$('div#skills').delegate('button[id^="removeSkill"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#skills > div', 'div#skills'); // rehide skills parent element
    updatePrintSingleElement('span#skillList', 'select[id^="skill"]'); // update print version
});

$('#addSavingThrow').on('click', function() {
    removeHidden('div#savingThrows');

    var next = $('select#savingAbility').length + 1;

    var output = '<div class="thinBorder"><select name="savingAbility" id="savingAbility' + next + '"  class="standardSpacing"><option value="none"></option>';

    for (i in abilities) {
        output += '<option value="'  + abilities[i].toLowerCase() + '">'  + abilities[i] + '</option>';
    }

    output += '</select>';
    output += '<input type="number" min="0" step="1" id="" class="standardWidth">';
    output += '<button id="removeSavingThrows">Remove</button></div>'

    $('div#savingThrows').append(output);

    updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version
});

$('div#savingThrows').delegate('select[id^="savingAbility"]', 'change', function() { // assign proper id
    var selected = $(this).val().toLowerCase().replace(/\s/g, '');
    var inputId = selected.charAt(0).toUpperCase() + selected.slice(1);

    $(this).attr('id', 'savingThrow_' + inputId);

    $(this).next().attr('id', 'savingThrowValue_' + inputId); // add id to newly created input as this input can be dynamically updated via ability score changes

    updateSavingThrow(selected, inputId);

    // var short = selected.charAt(0).toUpperCase() + selected.slice(1,3);

    updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version
});

$('div#savingThrows').delegate('button[id^="removeSavingThrows"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#savingThrows > div', 'div#savingThrows'); // rehide savingThrows parent element
    updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version
});

$('div#savingThrows').delegate('select[id^="savingThrows"] + input', 'change', function() { // update the print output on change of the value
    updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version
});

$('div#savingThrows').delegate('input[id^="savingThrowValue"]', 'change', function() { // update the print output on change of the value
    updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version
});

$('#addVulnerability').on('click', function() {
    addSingularElement('div#vulnerabilities','Vulnerability type', 'removeVulnerabilities', 'width200', 'vulnerability');
});
$('div#vulnerabilities').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'vulnerability_', $(this).val());

    updatePrintFromSingleInput('input[id^="vulnerability_"]', 'span#damageVulnerabilityList'); // update print version
});

$('div#vulnerabilities').delegate('button[id^="removeVulnerabilities"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#vulnerabilities > div', 'div#vulnerabilities'); // rehide vulnerabilities parent element

    updatePrintFromSingleInput('input[id^="vulnerability_"]', 'span#damageVulnerabilityList'); // update print version
});
$('#addResistance').on('click', function() {
    addSingularElement('div#resistances', 'Resistance type', 'removeResistances', 'width200', 'resistance')
});
$('div#resistances').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'resistance_', $(this).val());

    updatePrintFromSingleInput('input[id^="resistance_"]', 'span#damageResistanceList'); // update print version
});
$('div#resistances').delegate('button[id^="removeResistances"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#resistances > div', 'div#resistances'); // rehide resistances parent element

    updatePrintFromSingleInput('input[id^="resistance_"]', 'span#damageResistanceList'); // update print version
});
$('#addImmunity').on('click', function() {
    addSingularElement('div#damageImmunity','Damage immunity type', 'removeDamageImmunity', 'width250', 'damageImmunity');
});
$('div#damageImmunity').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'damageImmunity_', $(this).val());

    updatePrintFromSingleInput('input[id^="damageImmunity_"]', 'span#damageImmunityList'); // update print version
});
$('div#damageImmunity').delegate('button[id^="removeDamageImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#damageImmunity > div', 'div#damageImmunity'); // rehide damageImmunity parent element

    updatePrintFromSingleInput('input[id^="damageImmunity_"]', 'span#damageImmunityList'); // update print version
});
$('#addConditionImmunity').on('click', function() {
    addSingularElement('div#conditionImmunity', 'Condition immunity type', 'removeConditionImmunity', 'width250', 'conditionImmunity');
});
$('div#conditionImmunity').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'conditionImmunity_', $(this).val());

    updatePrintFromSingleInput('input[id^="conditionImmunity_"]', 'span#conditionImmunityList'); // update print version
});
$('div#conditionImmunity').delegate('button[id^="removeConditionImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#conditionImmunity > div', 'div#conditionImmunity'); // rehide conditionImmunity parent element

    updatePrintFromSingleInput('input[id^="conditionImmunity_"]', 'span#conditionImmunityList'); // update print version
});
$('#addSense').on('click', function() {
    addSingularElement('div#senses', 'Sense', 'removeSense', 'width200', 'sense');
});
$('div#senses').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'sense_', $(this).val());

    updatePrintFromSingleInput('input[id^="sense_"]', 'span#senseList'); // update print version
});
$('div#senses').delegate('button[id^="removeSense"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#senses > div', 'div#senses'); // rehide sense parent element

    updatePrintFromSingleInput('input[id^="sense_"]', 'span#senseList'); // update print version
});
$('#addLanguage').on('click', function() {
    addSingularElement('div#languages', 'Language', 'removeLanguage', 'width200', 'language');
});
$('div#languages').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'language_', $(this).val());

    updatePrintFromSingleInput('input[id^="language_"]', 'span#languageList'); // update print version
});
$('div#languages').delegate('button[id^="removeLanguage"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#languages > div', 'div#languages'); // rehide characteristic parent element

    updatePrintFromSingleInput('input[id^="language_"]', 'span#languageList'); // update print version
});
$('#addMovement').on('click', function() { // add new movement elements
    removeHidden('div#movements');

    var output = '<div class="thinBorder">';
    output += '<input type="text" id="movementType" class="standardSpacing width200" placeholder="Movement type">';
    output += '<input type="number" id="movementSpeed" min="0" step="1" class="movementSpeed">'
    
    output += '<button id="removeMovement">Remove</button></div>';

    $('div#movements').append(output);
});
$('div#movements').delegate('input[id^="movementType"]', 'change', function() { // get the value of the first input field and use that as an id for both inputs
    var value = $(this).val();

    $(this).attr('id', 'movementType' + value);
    $(this).next().attr('id', 'movementSpeed_' + value);

    updatePrintForMovement('input[id^="movementType"]', 'span#creatureSpeedList'); // update print version
});
$('div#movements').delegate('input[id^="movementSpeed"]', 'change', function() {
    updatePrintForMovement('input[id^="movementType"]', 'span#creatureSpeedList'); // update print version
});

$('div#movements').delegate('button[id^="removeMovement"]','click', function() { // delete clicked movement
    $(this).closest('div').remove(); 

    addHidden('div#movements > div', 'div#movements'); // rehide movement parent element

    updatePrintForMovement('input[id^="movementType"]', 'span#creatureSpeedList'); // update print version
});
$('#addCharacteristic').on('click', function() { // add new characteristic elements
    addDoubleElement('div#characteristics', 'characteristicDescription', 'Characteristic title', 'Characteristic description', 'removeCharacteristic', 'width250', 'characteristic');

    updatePrintFromInputNTextarea('div#characteristics div', 'div#characteristicList'); // update print version
});

$('div#characteristics').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'characteristicText_', 'characteristicTitle_', $(this).val());

    updatePrintFromInputNTextarea('div#characteristics div', 'div#characteristicList'); // update print version
});
$('div#characteristics').delegate('textarea', 'change', function() {
    updatePrintFromInputNTextarea('div#characteristics div', 'div#characteristicList'); // update print version
});

$('div#characteristics').delegate('button[id^="removeCharacteristic"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#characteristics > div', 'div#characteristics'); // rehide characteristic parent element

    updatePrintFromInputNTextarea('div#characteristics div', 'div#characteristicList'); // update print version
});
$('#addActions').on('click', function() {
    addDoubleElement('div#actions', 'actionDescription', 'Action title', 'Action description', 'removeAction', 'width250', 'action');

    updatePrintFromInputNTextarea('div#actions div', 'div#actionList'); // update print version
});
$('div#actions').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'actionText_', 'actionTitle_', $(this).val());

    updatePrintFromInputNTextarea('div#actions div', 'div#actionList'); // update print version
});
$('div#actions').delegate('textarea', 'change', function() {
    updatePrintFromInputNTextarea('div#actions div', 'div#actionList'); // update print version
});
$('div#actions').delegate('button[id^="removeAction"]','click', function() { // delete clicked action
    $(this).closest('div').remove(); 

    addHidden('div#actions > div', 'div#actions'); // rehide actions parent element

    updatePrintFromInputNTextarea('div#actions div', 'div#actionList'); // update print version
});
$('#addReaction').on('click', function() {
    addDoubleElement('div#reactions', 'reactionDescription', 'Reaction title', 'Reaction description', 'removeReaction', 'width250', 'reaction');

    updatePrintFromInputNTextarea('div#reactions div', 'div#reactionList'); // update print version
});
$('div#reactions').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'reactionText_', 'reactionTitle_', $(this).val());

    updatePrintFromInputNTextarea('div#reactions div', 'div#reactionList'); // update print version
});
$('div#reactions').delegate('button[id^="removeReaction"]','click', function() { // delete clicked reaction
    $(this).closest('div').remove(); 

    addHidden('div#reactions > div', 'div#reactions'); // rehide reactions parent element

    updatePrintFromInputNTextarea('div#reactions div', 'div#reactionList'); // update print version
});
$('div#reactions').delegate('textarea', 'change', function() {
    updatePrintFromInputNTextarea('div#reactions div', 'div#reactionList'); // update print version
});
$('#addBonus').on('click', function() {
    addDoubleElement('div#bonuses', 'bonusDescription', 'Bonus title', 'Bonus description', 'removeBonus', 'width250', 'bonus');

    updatePrintFromInputNTextarea('div#bonuses div', 'div#bonusActionList'); // update print version
});
$('div#bonuses').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'bonusText_', 'bonusTitle_', $(this).val());

    updatePrintFromInputNTextarea('div#bonuses div', 'div#bonusActionList'); // update print version
});
$('div#bonuses').delegate('button[id^="removeBonus"]','click', function() { // delete clicked bonus
    $(this).closest('div').remove(); 

    addHidden('div#bonuses > div', 'div#bonuses'); // rehide bonus parent element

    updatePrintFromInputNTextarea('div#bonuses div', 'div#bonusActionList'); // update print version
});
$('div#bonuses').delegate('textarea', 'change', function() {
    updatePrintFromInputNTextarea('div#bonuses div', 'div#bonusActionList'); // update print version
});
$('#addLegendary').on('click', function() {
    if ($('#legendaryMainDescription').length == 0) {
        $('div#legendaries').append('<textarea id="legendaryMainDescription" name="legendaryMainDescription" class="standardSpacing textareaDescription" placeholder="Legendary description overview"/><br/>'); 
    }

    addDoubleElement('div#legendaries', 'legendaryDescription', 'Legendgary title', 'Legendary description', 'removeLegendary', 'width250', 'legendary');

    updateLegendaryPrint(); // update print version
});

$('div#legendaries').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'legendaryText_', 'legendaryTitle_', $(this).val());

    updateLegendaryPrint(); // update print version
});

$('div#legendaries').delegate('button[id^="removeLegendary"]','click', function() { // delete clicked legendary
    $(this).closest('div').remove(); 

    addHidden('div#legendaries > div', 'div#legendaries'); // rehide bonus parent element

    updateLegendaryPrint(); // update print version
    
    if ($('div#legendaries div').length == 0) {
        $('div#legendaryActionList').html(''); // update print version
    }
});

$('div#legendaries').delegate('textarea', 'change', function() {
    updateLegendaryPrint(); // update print version
});

var creatureObj = {}; // object to hold all data for print ** remove this once I'm done testing

$('button#print').on('click', function() {    
    $('div#print').removeClass('hidden'); // reveal the print version
    $('p#returnNotice').delay(2000).fadeOut('slow'); // show notice on how to get back to editor
    $('div#editor').addClass('hidden'); // hide editor content


    /* ** disable the print button if the following fields are blank and add a warning that these fields need to be updated
        input#creatureName
        select#size
        select#type
        select#alignment
    */
    
});

$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
        $('div#editor').removeClass('hidden');
        $('div#print').addClass('hidden');
    }
});



// ** to-do list
/*
    add print functionality
        grab every input element (and some spans) into an object
        create a view that printer-friendly and has the correct formatting for a creature sheet
        drop all data into sheet

    add link to instructions
    
    future
    * create a node.js version
    * create a library of creature sheets
    * list all creatures
    * Use an existing creature as a template to create another (template)
    * basic CRUD operations on creature sheets
    * Export as JSON, image(?), and PDF
*/


// functions
function updateLegendaryPrint() {
    $('div#legendaryActionList').html(''); // clear target area so previous content doesn't show up again

    var output = '<h2>Legendary Actions</h2>';

    output += $('textarea#legendaryMainDescription').val();

    $('div#legendaries div').each(function() {
        output += '<p><span class="bold">' + $(this).find('input').val() + '</span> ' + $(this).find('textarea').val() + '</p>';
    });

    $('div#legendaryActionList').append(output);
}

function updatePrintFromInputNTextarea(source, target) {
    $(target).html(''); // clear target area so previous content doesn't show up again

    var output = '';

    $(source).each(function() {
        output += '<p><span class="bold">' + $(this).find('input').val() + '</span> ' + $(this).find('textarea').val() + '</p>';
    });

    $(target).append(output);
}

function updatePrintFromDoubleInput(source, target) {
    $(target).html(''); // clear target area so previous content doesn't show up again

    var output = '';

    $(source).each(function() {
        // ** add routine to update saving throws based on changes to other abilities scores, prof bonus, etc.
        output += $(this).val() + ' ';
        output += $(this).next().val() + ', ';
    });

    output = output.slice(0, -2);

    $(target).html(output);
}

function updatePrintForMovement(source, target) {
    var output = '';

    $(source).each(function() {
        if ($(this).val() == '') { // no input name given which is fine
            output += $(this).next().val() + ' ft, ';
        } else {
            output += $(this).val() + ' ';
            output += $(this).next().val() + ' ft, ';
        }
    });

    output = output.slice(0, -2);

    $(target).html(output);
}

function updatePrintFromSingleInput(source, target) {
    var output = '';

    $(source).each(function() {
        output += $(this).val() + ', ';
    });
    output = output.slice(0, -2);
    
    $(target).html(output);
}

function updatePrintSingleElement(elem, id) {
    $(elem).text('');

    $(id).each(function() { // loop through each element with this id
        console.log(elem, id)

        $(elem).append($(this).val() + ' ' + $(this).next().val() + ' '); // append the text and the associated value to the print page
    });
}

function getDataFields(id, elem) { // grab all element data and put it in the creatureObj object)
    creatureObj[id] = $(elem + id).val();
}

function assignIdDouble(elem, text, title, value) { // assign id by changing it to lowercase and remove any spaces for two elements
    value = value.toLowerCase().replace(/\s/g, '');
    elem.attr('id', title + value);
    elem.next().next().attr('id', text + value);
}

function assignIdSingular(elem, text, value) { // assign id by changing it to lowercase and remove any spaces for a single element
    value = value.toLowerCase().replace(/\s/g, '');
    elem.attr('id', text + value);
}

function multipleUpdateSkillModifier() {
    if ($('#crOverview').attr('checked') == 'checked') {
        $('select[id^="skill"]').each(function() {
            var value = $(this).val();
    
            for (i in skills) {
                for (j in skills[i]) {
                    if (value == skills[i][j].simple) {
                        var selectedSkill = i;
                        break;
                    }
                }
            }
    
            updateSkillModifier(value, selectedSkill);
        });
    }
}

function updateSkillModifier(value, selectedSkill) {
    if ($('#crOverview').attr('checked') == 'checked') {
        var abilitiyModifier = 0;

        $('span[id$="Modifier"]').each(function() {
            if ($(this).attr('id').split('Modifier')[0] == selectedSkill) {
                abilitiyModifier = parseInt($(this).text());
            }
        });

        var cr = $('select#challengeRating').val();

        for (i in challengeRating) {
            if (cr == i) {
                $('input#' + value).val(abilitiyModifier + challengeRating[i].profBonus);
                break;
            }
        }   
    }
}

function multipleUpdateSavingThrows() {
    if ($('#crOverview').attr('checked') == 'checked') {
        $('select[id^="savingAbility"').each(function() {
            var selected = $(this).val();
            var inputId = selected.charAt(0).toUpperCase() + selected.slice(1);
    
            updateSavingThrow(selected, inputId);
        });   

        updatePrintFromDoubleInput('select[id^="savingThrow"]', 'span#savingThrowList'); // update print version
    }
}

function updateSavingThrow(selected, inputId) { // update saving throw with revised values from profBonus and ability modifier
    // ** note: wherever this is called, you'll need to call updatePrintFromDoubleInput() as well. 
    if ($('#crOverview').attr('checked') == 'checked') {
        var cr = $('select#challengeRating').val(); // get the CR value; prof bonus (profBonus)

        if (cr != 'none') {
            var abilityModifier = parseInt($('#' + selected + 'Modifier').text());

            for (i in challengeRating) {
                if (cr == i) {
                    var profBonus = challengeRating[i].profBonus;
                    break;
                }
            }

            $('input#savingThrow' + inputId).val(profBonus + abilityModifier);
        }    
    }
    
}

function calcHitDice() { // calcualate which hit dice to use and how many to get to the average listed in the HP input field
    if ($('select#size').val() != 'blank') {
        for (i in hitDice) {
            if ($('select#size').val() == i) {
                var hitDie = parseInt(hitDice[i].hitDie.split('d')[1]);
                var avgHP = hitDice[i].average;
                break;
            }
        }
    
        var hpPercentage = $('input#hpPercentage').val() / 100;
        var conModifier = parseInt($('#constitutionModifier').text());
        var hp = parseInt($('input#hitPoints').val());
        var times = Math.round((hp / avgHP) * hpPercentage);
    
        if (times == 0) {
            times = 1;
        }
    
        if (conModifier < 0) {
            $('input#hpDice').val(times + 'd' + hitDie + conModifier); // update edit version
            $('#print span#hitDice').text(times + 'd' + hitDie + conModifier); // update print version
        } else if (conModifier == 0) {
            $('input#hpDice').val(times + 'd' + hitDie); // update edit version
            $('#print span#hitDice').text(times + 'd' + hitDie); // update print version
        } else {
            $('input#hpDice').val(times + 'd' + hitDie + '+' + conModifier); // update edit version
            $('#print span#hitDice').text(times + 'd' + hitDie + '+' + conModifier); // update print version
        }
    }
}

function toggleACHP(state) {
    if (state == 'enable') {
        $('input#armorClass')
            .removeAttr('disabled')
            .removeAttr('title');
        $('input#hitPoints')
            .removeAttr('disabled')
            .removeAttr('title');
    } else {
        $('input#armorClass')
            .attr('disabled', 'disabled')
            .attr('title', 'Disabled until CR has been set');
        $('input#hitPoints')
            .attr('disabled', 'disabled')
            .attr('title', 'Disabled until CR has been set');
    }
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function addDoubleElement(elemId, name, placeholderTitle, placeholderDesc, removeId, width, id) { // creates an input,  textarea, and delete button elements for any feature type that requires a title and a description
    removeHidden(elemId);

    var output = '<div class="thinBorder"><input type="text" class="standardSpacing actionTitle ' + width + '" placeholder="' + placeholderTitle + '" id="title_' + id + '"><br/>';
    output += '<textarea name="' + name + '" class="standardSpacing textareaDescription" placeholder="' + placeholderDesc + '" id="text_' + id + '"/><br/>';
    output += '<button id="' + removeId + '">Remove</button></div>';

    $(elemId).append(output);
}

function addSingularElement(elemId, placeholder, removeId, width, id) { // creates an input element and deletion button for any feature type that requires only a description
    removeHidden(elemId);

    var output = '<div class="thinBorder"><input type="text" class="' + width + '" placeholder="' + placeholder + '" id="' + id + '"><button id="' + removeId + '">Remove</button></div>'

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