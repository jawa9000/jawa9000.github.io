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

        for (i in challengeRating) { // update the print version
            if ($('#challengeRating').val() == i) {
                $('#print span#xp').text('Challenge ' + challengeRating[i].cr + ' ('+ numberWithCommas(challengeRating[crValue].xp + ')'));
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

    // ** update print version
    // get all skills and put that in an object (skill, mod)
    // turn this into a function as it will be used multiple times
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

    // ** update print version
});

$('div#skills').delegate('button[id^="removeSkill"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#skills > div', 'div#skills'); // rehide skills parent element
    // ** update print version
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

    // ** update print version
});

$('div#savingThrows').delegate('select[id^="savingAbility"]', 'change', function() { // assign proper id
    var selected = $(this).val().toLowerCase().replace(/\s/g, '');
    var inputId = selected.charAt(0).toUpperCase() + selected.slice(1);

    $(this).attr('id', 'savingThrow_' + inputId);

    $(this).next().attr('id', 'savingThrowValue_' + inputId); // add id to newly created input as this input can be dynamically updated via ability score changes

    updateSavingThrow(selected, inputId);

    // var short = selected.charAt(0).toUpperCase() + selected.slice(1,3);

    // ** update print version
});

$('div#savingThrows').delegate('button[id^="removeSavingThrows"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#savingThrows > div', 'div#savingThrows'); // rehide savingThrows parent element

    // ** update print version
});
$('#addVulnerability').on('click', function() {
    addSingularElement('div#vulnerabilities','Vulnerability type', 'removeVulnerabilities', 'width200', 'vulnerability');

    // ** update print version
});
$('div#vulnerabilities').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'vulnerability_', $(this).val());

    // ** update print version
});
$('div#vulnerabilities').delegate('button[id^="removeVulnerabilities"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#vulnerabilities > div', 'div#vulnerabilities'); // rehide vulnerabilities parent element

    // ** update print version
});
$('#addResistance').on('click', function() {
    addSingularElement('div#resistances', 'Resistance type', 'removeResistances', 'width200', 'resistance')
    
    // ** update print version
});
$('div#resistances').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'resistance_', $(this).val());

    // ** update print version
});
$('div#resistances').delegate('button[id^="removeResistances"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#resistances > div', 'div#resistances'); // rehide resistances parent element

    // ** update print version
});
$('#addImmunity').on('click', function() {
    addSingularElement('div#damageImmunity','Damage immunity type', 'removeDamageImmunity', 'width250', 'damageImmunity');

    // ** update print version
});
$('div#damageImmunity').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'damageImmunity_', $(this).val());

    // ** update print version
});
$('div#damageImmunity').delegate('button[id^="removeDamageImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#damageImmunity > div', 'div#damageImmunity'); // rehide damageImmunity parent element

    // ** update print version
});
$('#addConditionImmunity').on('click', function() {
    addSingularElement('div#conditionImmunity', 'Condition immunity type', 'removeConditionImmunity', 'width250', 'conditionImmunity');

    // ** update print version
});
$('div#conditionImmunity').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'conditionImmunity_', $(this).val());

    // ** update print version
});
$('div#conditionImmunity').delegate('button[id^="removeConditionImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#conditionImmunity > div', 'div#conditionImmunity'); // rehide conditionImmunity parent element

    // ** update print version
});
$('#addSense').on('click', function() {
    addSingularElement('div#senses', 'Sense', 'removeSense', 'width200', 'sense');

    // ** update print version
});
$('div#senses').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'sense_', $(this).val());

    // ** update print version
});
$('div#senses').delegate('button[id^="removeSense"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#senses > div', 'div#senses'); // rehide sense parent element

    // ** update print version
});
$('#addLanguage').on('click', function() {
    addSingularElement('div#languages', 'Language', 'removeLanguage', 'width200', 'language');

    // ** update print version
});
$('div#languages').delegate('input', 'change', function() { // assign proper id
    assignIdSingular($(this), 'language_', $(this).val());

    // ** update print version
});
$('div#languages').delegate('button[id^="removeLanguage"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#languages > div', 'div#languages'); // rehide characteristic parent element

    // ** update print version
});
$('#addMovement').on('click', function() { // add new movement elements
    removeHidden('div#movements');

    var output = '<div class="thinBorder">';
    output += '<input type="text" id="movementType" class="standardSpacing width200" placeholder="Movement type">';
    output += '<input type="number" id="movementSpeed" min="0" step="1" class="movementSpeed">'
    
    output += '<button id="removeMovement">Remove</button></div>';

    $('div#movements').append(output);

    // ** update print version
});
$('div#movements').delegate('input[id^="movementType"]', 'change', function() { // get the value of the first input field and use that as an id for both inputs
    var value = $(this).val();

    $(this).attr('id', 'movementType_' + value);
    $(this).next().attr('id', 'movementSpeed_' + value);

    // ** update print version
});
$('div#movements').delegate('button[id^="removeMovement"]','click', function() { // delete clicked movement
    $(this).closest('div').remove(); 

    addHidden('div#movements > div', 'div#movements'); // rehide movement parent element

    // ** update print version
});
$('#addCharacteristic').on('click', function() { // add new characteristic elements
    addDoubleElement('div#characteristics', 'characteristicDescription', 'Characteristic title', 'Characteristic description', 'removeCharacteristic', 'width250', 'characteristic');

    // ** update print version
});
$('div#characteristics').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'characteristicText_', 'characteristicTitle_', $(this).val());

    // ** update print version
});

$('div#characteristics').delegate('button[id^="removeCharacteristic"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#characteristics > div', 'div#characteristics'); // rehide characteristic parent element

    // ** update print version
});
$('#addActions').on('click', function() {
    addDoubleElement('div#actions', 'actionDescription', 'Action title', 'Action description', 'removeAction', 'width250', 'action');

    // ** update print version
});
$('div#actions').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'actionText_', 'actionTitle_', $(this).val());

    // ** update print version
});
$('div#actions').delegate('button[id^="removeAction"]','click', function() { // delete clicked action
    $(this).closest('div').remove(); 

    addHidden('div#actions > div', 'div#actions'); // rehide actions parent element

    // ** update print version
});
$('#addReaction').on('click', function() {
    addDoubleElement('div#reactions', 'reactionDescription', 'Reaction title', 'Reaction description', 'removeReaction', 'width250', 'reaction');

    // ** update print version
});
$('div#reactions').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'reactionText_', 'reactionTitle_', $(this).val());
});
$('div#reactions').delegate('button[id^="removeReaction"]','click', function() { // delete clicked reaction
    $(this).closest('div').remove(); 

    addHidden('div#reactions > div', 'div#reactions'); // rehide reactions parent element

    // ** update print version
});
$('#addBonus').on('click', function() {
    addDoubleElement('div#bonuses', 'bonusDescription', 'Bonus title', 'Bonus description', 'removeBonus', 'width250', 'bonus');

    // ** update print version
});
$('div#bonuses').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'bonusText_', 'bonusTitle_', $(this).val());

    // ** update print version
});
$('div#bonuses').delegate('button[id^="removeBonus"]','click', function() { // delete clicked bonus
    $(this).closest('div').remove(); 

    addHidden('div#bonuses > div', 'div#bonuses'); // rehide bonus parent element

    // ** update print version
});
$('#addLegendary').on('click', function() {
    if ($('#legendaryMainDescription').length == 0) {
        $('div#legendaries').append('<textarea id="legendaryMainDescription" name="legendaryMainDescription" class="standardSpacing textareaDescription" placeholder="Legendary description overview"/><br/>'); 
    }

    addDoubleElement('div#legendaries', 'legendaryDescription', 'Legendgary title', 'Legendary description', 'removeLegendary', 'width250', 'legendary');

    // ** update print version
});
$('div#legendaries').delegate('input', 'change', function() { // assign proper id
    assignIdDouble($(this), 'legendaryText_', 'legendaryTitle_', $(this).val());

    // ** update print version
});
$('div#legendaries').delegate('button[id^="removeLegendary"]','click', function() { // delete clicked legendary
    $(this).closest('div').remove(); 

    addHidden('div#legendaries > div', 'div#legendaries'); // rehide bonus parent element

    // ** update print version
});

var creatureObj = {}; // object to hold all data for print ** remove this once I'm done testing

$('button#print').on('click', function() {
    // creatureObj = {}; // clear obj

    // $('div#editor input').each(function() { // grab all the values from input elements
    //     // getDataFields($(this).attr('id'), 'input#');
    //     // creatureObj[id] = $(elem + id).val();
    //     // $('input#hp').val()
    //     var id = $(this).attr('id');
    //     var value = $(this).val()

    //     console.log(id, value)
    //     creatureObj[id] = value;
    // });

    // $('div#editor span').each(function() { // grab all the text from span elements
    //     getDataFields($(this).attr('id'), 'span#');
    // });

    // $('div#editor select').each(function() { // grab all values from select elements
    //     getDataFields($(this).attr('id'), 'select#');
    // });

    // $('div#editor textarea').each(function() { // grab all textarea element data
    //     getDataFields($(this).attr('id'), 'textarea#');
    // });

    // creatureObj.xp = $('span#xp').text().replace('(','').replace(')',''); // fix xp value
    // creatureObj.armorClass = $('input#armorClass').val();

    // for (i in challengeRating) { // fix challenge rating
    //     if ($('select#challengeRating').val() == i) {
    //         creatureObj.challengeRating = challengeRating[i].cr;
    //     }
    // }

    // console.log(creatureObj)
    
    
    $('div#print').removeClass('hidden'); // reveal the print version
    $('p#returnNotice').delay(2000).fadeOut('slow'); // show notice on how to get back to editor
    $('div#editor').addClass('hidden'); // hide editor content

    // $('h1#creatureName').text(creatureObj.creatureName);
    // $('#print span#creatuerSize').text(creatureObj.size);
    // $('#print span#creatureType').text(creatureObj.type);
    // $('#print span#creatureAlignment').text(creatureObj.alignment); // 'lg'
    
    /* ** disable the print button if the following fields are blank and add a warning that these fields need to be updated
        input#creatureName
        select#size
        select#type
        select#alignment
    */

    
    // if (creatureObj.creatureImage != '') { // display text and figure out which way to float the image (if any)
    //     // console.log(creatureObj.creatureImage)
    //     var path = creatureObj.creatureImage.split('\\')[2];
    //     if (creatureObj.imageAlignment == 'right') {
    //         var output = '<img src="' + path + '" style="float: right;"><p>' + creatureObj.creatureDescription + '</p>';
    //     } else if (creatureObj.imageAlignment == 'left') {
    //         var output = '<img src="' + path + '" style="float: left;"><p>' + creatureObj.creatureDescription + '</p>';
    //     } else if (creatureObj.imageAlignment == 'top') {
    //         var output = '<img src="' + path + '"><p>' + creatureObj.creatureDescription + '</p>';
    //     } else if (creatureObj.imageAlignment == 'bottom') {
    //         var output = '<p>' + creatureObj.creatureDescription + '</p><img src="' + path + '">';
    //     }
    // } else { // no image
    //     var output = '<p>' + creatureObj.creatureDescription + '</p><img src="' + creatureObj.creatureImage + '">';
    // }

    // $('div#descNImage').html(output);
    
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
    }
}

function updateSavingThrow(selected, inputId) { // update saving throw with revised values from profBonus and ability modifier
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