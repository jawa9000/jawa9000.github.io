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
    console.log('add saving throw clicked')
});
$('#addVulnerability').on('click', function() {
    console.log('add vulnerability clicked')
});
$('#addResistance').on('click', function() {
    console.log('add resistance clicked')
});
$('#addImmunity').on('click', function() {
    console.log('add immunity clicked')
});
$('#addConditionImmunity').on('click', function() {
    console.log('add condition immunity clicked')
});
$('#addSense').on('click', function() {
    console.log('add sense clicked')
});
$('#addLanguage').on('click', function() {
    removeHidden('div#languages');

    var output = '<div class="thinBorder"><input type="text" placeholder="languages"><button id="removeLanguage">Remove</button></div>'

    $('div#languages').append(output);
});

$('div#languages').delegate('button[id^="removeLanguage"]','click', function() { // delete clicked characteristic
    $(this).closest('div').remove(); 

    addHidden('div#languages > div', 'div#languages'); // rehide characteristic parent element
});

$('#addCharacteristic').on('click', function() { // add new characteristic elements
    removeHidden('div#characterists');

    var next = $('div#characterists > div').length + 1; // unique id generator
    var output = '<div class="thinBorder"><input type="text" class="standardSpacing characteristicTitle" placeholder="characteristic title"><br/><input type="text" class="standardSpacing characteristicDescription" placeholder="characteristic description"><br/><button id="removeCharacteristic' + next + '">Remove</button></div>'; // generate input fields and delete button

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
});


// functions

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