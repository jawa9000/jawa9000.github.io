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
        $('span#xp').text('(' + challengeRating[crValue].xp + ')'); // xp
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
    addElement('div#savingThrows', 'Saving Throw +#', 'removeSavingThrows');
});
$('div#savingThrows').delegate('button[id^="removeSavingThrows"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#savingThrows > div', 'div#savingThrows'); // rehide savingThrows parent element
});
$('#addVulnerability').on('click', function() {
    addElement('div#vulnerabilities','Vulnerability type', 'removeVulnerabilities');
});
$('div#vulnerabilities').delegate('button[id^="removeVulnerabilities"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#vulnerabilities > div', 'div#vulnerabilities'); // rehide vulnerabilities parent element
});
$('#addResistance').on('click', function() {
    addElement('div#resistances', 'Resistance type', 'removeResistances')
});
$('div#resistances').delegate('button[id^="removeResistances"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#resistances > div', 'div#resistances'); // rehide resistances parent element
});
$('#addImmunity').on('click', function() {
    addElement('div#damageImmunity','Damage immunity type', 'removeDamageImmunity');
});
$('div#damageImmunity').delegate('button[id^="removeDamageImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#damageImmunity > div', 'div#damageImmunity'); // rehide damageImmunity parent element
});
$('#addConditionImmunity').on('click', function() {
    addElement('div#conditionImmunity', 'Condition immunity type', 'removeConditionImmunity');
});
$('div#conditionImmunity').delegate('button[id^="removeConditionImmunity"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#conditionImmunity > div', 'div#conditionImmunity'); // rehide conditionImmunity parent element
});
$('#addSense').on('click', function() {
    addElement('div#senses', 'sense', 'removeSense');
});
$('div#senses').delegate('button[id^="removeSense"]','click', function() { // deleted clicked parent element
    $(this).closest('div').remove(); 

    addHidden('div#senses > div', 'div#senses'); // rehide sense parent element
});
$('#addLanguage').on('click', function() {
    addElement('div#languages', 'languages', 'removeLanguage');
});
$('div#languages').delegate('button[id^="removeLanguage"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#languages > div', 'div#languages'); // rehide characteristic parent element
});
$('#addCharacteristic').on('click', function() { // add new characteristic elements
    removeHidden('div#characterists');

    var output = '<div class="thinBorder"><input type="text" class="standardSpacing characteristicTitle" placeholder="characteristic title"><br/><input type="text" class="standardSpacing characteristicDescription" placeholder="characteristic description"><br/><button id="removeCharacteristic">Remove</button></div>'; // generate input fields and delete button

    $('div#characterists').append(output);
});
$('div#characterists').delegate('button[id^="removeCharacteristic"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#characterists > div', 'div#characterists'); // rehide characteristic parent element
});

$('#addActions').on('click', function() {
    console.log('add action clicked')
});
$('#addReaction').on('click', function() {
    console.log('add reaction clicked')
});
$('#addBonus').on('click', function() {
    console.log('add bonus clicked')
});
$('#addLegendary').on('click', function() {
    console.log('add legendary clicked')
    // add an opening text input element
    // add a singular title and description input elements
    // each additional legendary action does not create another opening text input element
});


// functions

function addElement(elemId, placeholder, removeId) { // creates an input element and deletion button for any type of sheet feature
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