
var nicknames = [];
var currentAge = null;
var currentColor = null;

function generateDragon() {
    // reset nicknames each time
    nicknames = [];

    // use dropdown selections if provided, otherwise random
    var selectedAge = $('#ageSelect').val();
    var selectedColor = $('#colorSelect').val();

    var dragonAge = selectedAge || roller(age);
    var dragonColor = selectedColor || roller(colors);

    // track current age/color for per-field regeneration
    currentAge = dragonAge;
    currentColor = dragonColor;

    var hoard = pickHoard(dragonAge, dragonColor);
    var appearance = rndAppearanceMods(dragonAge);

    if (appearance.length > 0) {
        if (appearance == 'Normal appearance') {
            $('p#appearance').html('<strong>Appearance</strong>: normal');
        } else {
            if (appearance[0].length > 0) {
                var output = '<div id="appearanceMod"><strong>Appearance</strong><ol>';

                for (j in appearance[0]) {
                    output += '<li>' + appearance[0][j] + '</li>'
                }

                output += '</ol></div>';
                $('p#appearance').html(output);
            }
        }
    }

    // dragon characteristics
    $('h1#name').html(pickName());
    $('h2#ageColor').html(dragonAge + ' ' + dragonColor + ' dragon');
    $('p#size').html('<strong>Size</strong>: ' + pickSize(dragonAge));
    $('p#mannerism').html('<strong>Mannerism</strong>: ' + roller(mannerisms));
    $('p#bond').html('<strong>Bond</strong>: ' + roller(bonds));
    $('p#flawSecret').html('<strong>Flaw/Secret</strong>: ' + roller(flawsSecrets));
    $('p#goal').html('<strong>Goal</strong>: ' + pickGoal(dragonAge));
    $('p#personality').html('<strong>Personality</strong>: ' + pickPersonality(dragonColor));
    $('p#ideal').html('<strong>Ideal</strong>: ' + pickIdeal(dragonColor));
    $('p#hook').html('<strong>Hook</strong>: ' + pickHook(dragonColor));
    $('p#connection').html('<strong>Connection</strong>: ' + pickConnection(dragonColor, dragonAge));
    $('p#origninDragonEgg').html('<strong>Origin Dragon Egg</strong>: ' + roller(originDragonAges));
    $('p#deathThroe').html('<strong>Death Throe</strong>: ' + roller(deathThroes));
    $('p#echo').html('<strong>Echo</strong>: ' + roller(echoCharacteristics));
    $('p#encounterComplication').html('<strong>Encounter Complication</strong>: ' + roller(encounterComplications));
    $('p#location').html('<strong>Location</strong>: ' + roller(lairLocation));
    // hoard characteristics
    $('p#hoardItemQuark').html('<strong>Hoard Item Quark</strong>: ' + roller(hoardItemQuarks));
    $('p#hoardLinkingItem').html('<strong>Hoard Linking Item</strong>: ' + roller(hoardLinkingItems));
    $('p#hoardLinkingItem').html('<strong>Hoard Linking Item</strong>: ' + roller(hoardLinkingItems));
    $('p#unfinishedBusiness').html('<strong>Unfinished Business</strong>: ' + roller(unfinishedBusiness));
    $('p#hoardCurseEffect').html('<strong>Hoard Curse Effect</strong>: ' + roller(hoardCurseEffects));
    $('p#breakingHoardCurse').html('<strong>Breaking Hoard Curse</strong>: ' + roller(breakingHoardCurse));
    $('p#hoardMagic').html('<strong>Hoard Magic</strong>: ' + roller(hoardMagic));
    $('p#coinOrigin').html('<strong>Coin Origin</strong>: ' + pickCoinOrigin());
    // hoard
    $('p#cp').html(hoard.cp);
    $('p#sp').html(hoard.sp);
    $('p#gp').html(hoard.gp);

    if (hoard.pp) {
        $('p#pp').html(hoard.pp);
    } else {
        $('p#pp').html('');
    }

    if (hoard.gems) {
        renderHoard(hoard.gems, 'p#gems');
    } else {
        $('p#gems').html('');
    }

    if (hoard.art) {
        renderHoard(hoard.art, 'p#art');
    } else {
        $('p#art').html('');
    }

    if (hoard.mundane) {
        renderHoard(hoard.mundane, 'p#mundane');
    } else {
        $('p#mundane').html('');
    }

    if (hoard.magic) {
        renderHoard(hoard.magic, 'p#magic');
    } else {
        $('p#magic').html('');
    }

    if (dragonAge == 'Wyrmling') { // 0-2
        nicknameLoop(pickNum(3));
    } else if (dragonAge == 'Young') { // 1-3
        nicknameLoop(pickNum(3) + 1);
    } else if (dragonAge == 'Adult') { // 1-4
        nicknameLoop(pickNum(4) + 1);
    } else if (dragonAge == 'Ancient') { // 3-7
        nicknameLoop(pickNum(4) + 3);
    }

    var nickname = ''
    for (i in nicknames) {
        nickname += '"' + nicknames[i] + '", ';
    } 

    nickname = nickname.replace(/,\s*$/, "");

    $('h3#nicknames').html(nickname);
}

// initialize dropdowns and generate first dragon on load
$(function () {
    if (typeof age !== 'undefined' && Array.isArray(age)) {
        var ageOptions = '<option value="">Random age</option>';
        for (var i = 0; i < age.length; i++) {
            ageOptions += '<option value="' + age[i] + '">' + age[i] + '</option>';
        }
        $('#ageSelect').html(ageOptions);
    }

    if (typeof colors !== 'undefined' && Array.isArray(colors)) {
        var colorOptions = '<option value="">Random color</option>';
        for (var j = 0; j < colors.length; j++) {
            var label = colors[j].charAt(0).toUpperCase() + colors[j].slice(1);
            colorOptions += '<option value="' + colors[j] + '">' + label + '</option>';
        }
        $('#colorSelect').html(colorOptions);
    }

    $('#generateBtn').on('click', function (e) {
        e.preventDefault();
        generateDragon();
    });

    // regenerate name only
    $('h1#name').on('click', function () {
        $(this).html(pickName());
    });

    // regenerate nicknames only
    $('h3#nicknames').on('click', function () {
        if (!currentAge) {
            return;
        }
        nicknames = [];
        if (currentAge == 'Wyrmling') { // 0-2
            nicknameLoop(pickNum(3));
        } else if (currentAge == 'Young') { // 1-3
            nicknameLoop(pickNum(3) + 1);
        } else if (currentAge == 'Adult') { // 1-4
            nicknameLoop(pickNum(4) + 1);
        } else if (currentAge == 'Ancient') { // 3-7
            nicknameLoop(pickNum(4) + 3);
        }

        var nickname = '';
        for (var i in nicknames) {
            nickname += '"' + nicknames[i] + '", ';
        }
        nickname = nickname.replace(/,\s*$/, '');
        $(this).html(nickname);
    });

    // click-to-regenerate single fields
    $('p#mannerism').on('click', function () {
        $(this).html('<strong>Mannerism</strong>: ' + roller(mannerisms));
    });

    $('p#bond').on('click', function () {
        $(this).html('<strong>Bond</strong>: ' + roller(bonds));
    });

    $('p#flawSecret').on('click', function () {
        $(this).html('<strong>Flaw/Secret</strong>: ' + roller(flawsSecrets));
    });

    $('p#goal').on('click', function () {
        if (currentAge) {
            $(this).html('<strong>Goal</strong>: ' + pickGoal(currentAge));
        }
    });

    $('p#personality').on('click', function () {
        if (currentColor) {
            $(this).html('<strong>Personality</strong>: ' + pickPersonality(currentColor));
        }
    });

    $('p#ideal').on('click', function () {
        if (currentColor) {
            $(this).html('<strong>Ideal</strong>: ' + pickIdeal(currentColor));
        }
    });

    $('p#hook').on('click', function () {
        if (currentColor) {
            $(this).html('<strong>Hook</strong>: ' + pickHook(currentColor));
        }
    });

    $('p#connection').on('click', function () {
        if (currentColor && currentAge) {
            $(this).html('<strong>Connection</strong>: ' + pickConnection(currentColor, currentAge));
        }
    });

    $('p#origninDragonEgg').on('click', function () {
        $(this).html('<strong>Origin Dragon Egg</strong>: ' + roller(originDragonAges));
    });

    $('p#deathThroe').on('click', function () {
        $(this).html('<strong>Death Throe</strong>: ' + roller(deathThroes));
    });

    $('p#echo').on('click', function () {
        $(this).html('<strong>Echo</strong>: ' + roller(echoCharacteristics));
    });

    $('p#encounterComplication').on('click', function () {
        $(this).html('<strong>Encounter Complication</strong>: ' + roller(encounterComplications));
    });

    $('p#location').on('click', function () {
        $(this).html('<strong>Location</strong>: ' + roller(lairLocation));
    });

    $('p#hoardItemQuark').on('click', function () {
        $(this).html('<strong>Hoard Item Quark</strong>: ' + roller(hoardItemQuarks));
    });

    $('p#hoardLinkingItem').on('click', function () {
        $(this).html('<strong>Hoard Linking Item</strong>: ' + roller(hoardLinkingItems));
    });

    $('p#unfinishedBusiness').on('click', function () {
        $(this).html('<strong>Unfinished Business</strong>: ' + roller(unfinishedBusiness));
    });

    $('p#hoardCurseEffect').on('click', function () {
        $(this).html('<strong>Hoard Curse Effect</strong>: ' + roller(hoardCurseEffects));
    });

    $('p#breakingHoardCurse').on('click', function () {
        $(this).html('<strong>Breaking Hoard Curse</strong>: ' + roller(breakingHoardCurse));
    });

    $('p#hoardMagic').on('click', function () {
        $(this).html('<strong>Hoard Magic</strong>: ' + roller(hoardMagic));
    });

    $('p#coinOrigin').on('click', function () {
        $(this).html('<strong>Coin Origin</strong>: ' + pickCoinOrigin());
    });

    // regenerate appearance block
    $('p#appearance').on('click', function () {
        if (!currentAge) {
            return;
        }
        var appearance = rndAppearanceMods(currentAge);
        if (appearance.length > 0) {
            if (appearance == 'Normal appearance') {
                $(this).html('<strong>Appearance</strong>: normal');
            } else if (appearance[0] && appearance[0].length > 0) {
                var output = '<div id="appearanceMod"><strong>Appearance</strong><ol>';
                for (var j = 0; j < appearance[0].length; j++) {
                    output += '<li>' + appearance[0][j] + '</li>';
                }
                output += '</ol></div>';
                $(this).html(output);
            }
        }
    });

    // separate regeneration for treasure sections
    function regenCoins() {
        if (!currentAge || !currentColor) {
            return;
        }
        var hoard = pickHoard(currentAge, currentColor);
        $('p#cp').html(hoard.cp);
        $('p#sp').html(hoard.sp);
        $('p#gp').html(hoard.gp);
        if (hoard.pp) {
            $('p#pp').html(hoard.pp);
        } else {
            $('p#pp').html('');
        }
    }

    function regenGems() {
        if (!currentAge || !currentColor) {
            return;
        }
        var hoard = pickHoard(currentAge, currentColor);
        if (hoard.gems) {
            renderHoard(hoard.gems, 'p#gems');
        } else {
            $('p#gems').html('');
        }
    }

    function regenMundane() {
        if (!currentAge || !currentColor) {
            return;
        }
        var hoard = pickHoard(currentAge, currentColor);
        if (hoard.mundane) {
            renderHoard(hoard.mundane, 'p#mundane');
        } else {
            $('p#mundane').html('');
        }
    }

    function regenArt() {
        if (!currentAge || !currentColor) {
            return;
        }
        var hoard = pickHoard(currentAge, currentColor);
        if (hoard.art) {
            renderHoard(hoard.art, 'p#art');
        } else {
            $('p#art').html('');
        }
    }

    function regenMagic() {
        if (!currentAge || !currentColor) {
            return;
        }
        var hoard = pickHoard(currentAge, currentColor);
        if (hoard.magic) {
            renderHoard(hoard.magic, 'p#magic');
        } else {
            $('p#magic').html('');
        }
    }

    // coins: clicking any coin line regenerates all coins
    $('p#cp, p#sp, p#gp, p#pp').on('click', regenCoins);
    // each treasure group regenerates independently
    $('p#gems').on('click', regenGems);
    $('p#mundane').on('click', regenMundane);
    $('p#art').on('click', regenArt);
    $('p#magic').on('click', regenMagic);

    // generate an initial random dragon
    generateDragon();
});


/* A dragon's appearance modifier is influenced by it's age.

    wyrmling:
        chance: 10%
        mods: 0-1
    young:
        chance: 20%
        mods: 0-2
    adult:
        chance: 50%
        mods: 0-3
    ancient:
        chance: 100%
        mods: 1-3
*/

// feature for future version
function pickHp(color, age) { // takes an object (dragon color and its age) and determines its health
    var average = color[age].hp[0];
    var diceArray = color[age].hp[1].split('d');
    var dieTotal = 0;

    for (var i = 0; i <  diceArray[0]; i++) {
        var dieRoll = Math.floor(Math.random() * diceArray[1]) + 1;
        
        dieTotal += dieRoll;
    }

    return 'Average HP: ' + average + ', Roll HP: ' + parseInt(dieTotal + color[age].hp[2]);
}

// console.log(pickHp(green, age));

function nicknameLoop(num) {
    for (var i = 0; i < num; i++) {
        generatorNickname();
    }
}

function generatorNickname() {
    var rnd = pickNum(8);

    if (rnd == 0) { // pick good, neutral, or evil nickname
        var rnd2 = pickNum(3);

        if (rnd2 == 0) { // good
            nicknames.push(good[Math.floor(Math.random() * good.length)]);
        } else if (rnd2 == 1) { // neutral
            nicknames.push(neutral[Math.floor(Math.random() * neutral.length)]);
        } else { // evil
            nicknames.push(evil[Math.floor(Math.random() * evil.length)]);
        }
    } else if (rnd == 1) { // 'the' [colors],[elements]
        var rnd2 = pickNum(2);
            
        if (rnd2 == 0) {
            nicknames.push('The ' + elements[Math.floor(Math.random() * elements.length)]);
        } else {
            nicknames.push('The ' + pickColorName());
        }

    } else if (rnd == 2) { // [elements] 'Strongbreath'
        nicknames.push(elements[Math.floor(Math.random() * elements.length)] + ' Strongbreath');
    } else if (rnd == 3) { // [colors],[elements],[biome] 'Dragonlord'
        var rnd2 = pickNum(3);

        if (rnd2 == 0) { // [colors]
            nicknames.push(pickColorName() + ' Dragonlord');
        } else if (rnd2 == 1) { // elements
            nicknames.push('The ' + elements[Math.floor(Math.random() * elements.length)] + ' Dragonlord');
        } else { // biome
            nicknames.push('The ' + biome[Math.floor(Math.random() * biome.length)] + ' Dragonlord');
        }
    } else if (rnd == 4) { // [colors] ['Dawn','Day','Night']
        var timeName = ['Dawn', 'Day','Night'];

        nicknames.push(pickColorName() + ' ' + timeName[Math.floor(Math.random() * timeName.length)]);
    } else if (rnd == 5) { // [elements],[champion],[breather] 'Eater'
        var rnd2 = pickNum(3);

        if (rnd2 == 0) { // element
            nicknames.push(elements[Math.floor(Math.random() * elements.length)] + ' Eater');
        } else if (rnd2 == 1) { // champion
            nicknames.push(pickChampionName() + ' Eater');
        } else { // breather
            nicknames.push(breather[Math.floor(Math.random() * breather.length)] + ' Eater');
        }
    } else if (rnd == 6) { // 'The' [champion],[eater],['Killer','Slayer']
        var rnd2 = pickNum(2);
        var rnd3 = pickNum(2);

        if (rnd2 == 0) {
            var suffix = ' Killer';
        } else {
            var suffix = ' Slayer';
        }

        if (rnd3 == 0) {
            nicknames.push(pickChampionName() + suffix);
        } else {
            nicknames.push(eater[Math.floor(Math.random() * eater.length)] + suffix);
        }
    }
    else { // [title] 'of' [[elements],[champion]]
        var rnd2 = pickNum(2);
        var titleName = title[Math.floor(Math.random() * title.length)];

        if (rnd2 == 0) {
            nicknames.push(titleName + ' of ' + elements[Math.floor(Math.random() * elements.length)]);
        } else {
            nicknames.push(titleName + ' of ' + champion[Math.floor(Math.random() * champion.length)]);
        }
    }
}

function pickColorName() {
    var tmp = colors[Math.floor(Math.random() * colors.length)];

    tmp = tmp[0].toUpperCase() + tmp.substring(1);

    return tmp;
}

function pickChampionName() {
    var tmp = champion[Math.floor(Math.random() * champion.length)];

    tmp = tmp[0].toUpperCase() + tmp.substring(1);

    return tmp;
}

function pickNum(num) {
    return Math.floor(Math.random() * num);
}

function renderHoard(obj, target) {
    var output = '';

    for (i in obj) {
        output += '<li>' + obj[i] + '</li>';
    }

    $(target).html('<ul>' + output + '</ul>');
}

function pickHoard(age,color,treasureOutput) {
    var treasureOutput = {
        cp: 0,
        sp: 0,
        gp: 0,
        pp: 0,
        mundane: [],
        gems: [],
        art: [],
        magic: []
    };

    if (hoard[age].art) {
        var dice = hoard[age].art[0].split('d');
        var dieTotal = 0;
        var artObjects = [];

        for (var i = 0; i <  dice[0]; i++) {
            var dieRoll = Math.floor(Math.random() * dice[1]) + 1;
            
            dieTotal += dieRoll;
        }

        for (var i = 0; i < dieTotal; i++) {
            for (var i = 0; i < dieTotal; i++) {
                var rnd = Math.floor(Math.random() * 100) + 1;

                for (j in hoardArtObjectValues[age]) {
                    if (rnd >= hoardArtObjectValues[age][j][0] && rnd <= hoardArtObjectValues[age][j][1]) {
                        treasureOutput.art.push(pickArtObject(color) + ' (' + numberWithCommas(hoardArtObjectValues[age][j][2]) + 'gp)');
                    }
                }
            }
        }
    }

    if (hoard[age].cp) {
        treasureOutput.cp = numberWithCommas(returnCoinCount(hoard[age].cp[2], hoard[age].cp[1].split('d'))) + 'cp';
    }

    if (hoard[age].sp) {
        treasureOutput.sp = numberWithCommas(returnCoinCount(hoard[age].sp[2], hoard[age].sp[1].split('d'))) + 'sp'
    }

    if (hoard[age].gp) {
        treasureOutput.gp = numberWithCommas(returnCoinCount(hoard[age].gp[2], hoard[age].gp[1].split('d'))) + 'gp'
    }

    if (hoard[age].pp) {
        treasureOutput.pp = numberWithCommas(returnCoinCount(hoard[age].pp[2], hoard[age].pp[1].split('d'))) + 'pp'
    }

    if (hoard[age].gems) {
        var gemCount = returnCoinCount(1, hoard[age].gems[0].split('d'));

        for (var i = 0; i < gemCount; i++) {
            var rnd = Math.floor(Math.random() * 100) + 1;

            for (j in hoardGems[age]) {
                if (rnd >= hoardGems[age][j][0] && rnd <= hoardGems[age][j][1]) {
                    treasureOutput.gems.push(gemTypes[hoardGems[age][j][2]][Math.floor(Math.random() * gemTypes[hoardGems[age][j][2]].length)] + ' (' + numberWithCommas(hoardGems[age][j][2]) + 'gp)');
                }
            }                    
        }
    }

    if (hoard[age].mundane) {
        var mundaneDice = hoard[age].mundane[0].split('d')
        var mundaneTotal = 0;

        for (var i = 0; i <  mundaneDice[0]; i++) {
            var dieRoll = Math.floor(Math.random() * mundaneDice[1]) + 1;
            mundaneTotal += dieRoll;
        }

        for (var i = 0; i < mundaneTotal; i++) {
            var rnd = Math.floor(Math.random() * 100) + 1;

            for (j in mundaneItems) {
                if (rnd >= mundaneItems[j][0] && rnd <= mundaneItems[j][1]) {
                    treasureOutput.mundane.push(mundaneItems[j][2]);
                }
            }
        }
    }
    
    if (hoard[age].magic) {
        var magicDice = hoard[age].magic[0].split('d');
        var magicTotal = 0;

        for (var i = 0; i < magicDice[0]; i++) {
            var dieRoll = Math.floor(Math.random() * magicDice[1]) + 1;
            magicTotal += dieRoll;
        }

        for (var i = 0; i < magicTotal; i++) {
            var rnd = Math.floor(Math.random() * 100) + 1;

            for (j in hoardMagicItems[age]) {
                if (rnd >= hoardMagicItems[age][j][0] && rnd <= hoardMagicItems[age][j][1]) {
                    treasureOutput.magic.push(hoardMagicItems[age][j][2]);
                }
            }
        }
    }
    
    return treasureOutput;
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function returnCoinCount(multiplier, dice) {
    var dieTotal = 0;

    for (var i = 0; i <  dice[0]; i++) {
        var dieRoll = Math.floor(Math.random() * dice[1]) + 1;
        dieTotal += dieRoll;
    }

    return dieTotal * multiplier;
}

function pickCoinOrigin() {
    var rnd = Math.floor(Math.random() * 10) + 1;

    for (var i = 0; i < coinOrigins.length; i++) {
        if (coinOrigins[i][0] == rnd || coinOrigins[i][1] == rnd) {
            return coinOrigins[i][2];
        }
    }
}

function roller(obj) {
    return obj[Math.floor(Math.random() * obj.length)];
}

function pickArtObject(color) {
    if (artObject[color]) {
        return artObject[color][Math.floor(Math.random() * artObject[color].length)];
    } else {
        return 'In development';
    }
}

function pickConnection(color, age) {
    if (color == 'faerie') {
        return connections[color].all[Math.floor(Math.random() * connections[color].all.length)];
    } else {
        if (connections[color] && connections[color][age]) {   
            return connections[color][age][Math.floor(Math.random() * connections[color][age].length)];
        } else {
            return 'In development';
        }
    }
}

function pickHook(color) {
    if (hooks[color]) {
        return hooks[color][Math.floor(Math.random() * hooks[color].length)];
    } else {
        return 'In development';
    }
}

function pickIdeal(color) {
    if (ideals[color]) {
        return ideals[color][Math.floor(Math.random() * ideals[color].length)];
    } else {
        return 'In development';
    }
}

function pickPersonality(color) { // pick a random personality
    if (personalities[color]) {
        return personalities[color][Math.floor(Math.random() * personalities[color].length)];
    } else {
        return 'In development';
    }
}

function pickGoal(age) {
    return goals[age][Math.floor(Math.random() * goals[age].length)];
}

function pickSize(age) {
    if (age == 'Wyrmling') {
        return 'Medium';
    } else if (age == 'Young') {
        return 'Large';
    } else if (age == 'Adult') {
        return 'Huge';
    } else if (age == 'Ancient') {
        return 'Gargantuan';
    }
}

function pickName() {
    var nameLength = Math.floor(Math.random() * 3) + 2;
    var dragonName = '';

    for (var j = 0; j < nameLength; j++) {
        var rndTable = Math.floor(Math.random() * 4); // pick a table

        if (rndTable == 0) {
            dragonName += names0[Math.floor(Math.random() * names0.length)];
        } else if (rndTable == 1) {
            dragonName += names1[Math.floor(Math.random() * names1.length)];
        } else if (rndTable == 2) {
            dragonName += names2[Math.floor(Math.random() * names2.length)];
        } else {
            dragonName += names3[Math.floor(Math.random() * names3.length)];
        }
    }

    return dragonName.toLowerCase();
}

function rndAppearanceMods(age) {
    var rndRoll = Math.floor(Math.random() * 100) + 1;
    var rndRoll2 = Math.floor(Math.random() * 100) + 1;
    var appearances = [];

    if (age == 'wyrmling') {
        if (20 <= rndRoll) {
            if (rndRoll2 <= 10) { // 10% change of wyrmling having a modified appearance
                appearances.push(pickAppearances(1));
            }
        }
    } else if (age == 'young') { // 20% change for young
        if (rndRoll2 > 0 && rndRoll <= 10) {
            appearances.push(pickAppearances(1));
        } else if (rndRoll2 > 10 && rndRoll <= 20) {
            appearances.push(pickAppearances(2));
        }
    } else if (age == 'adult') { // 80% for adults
        // var rndRoll = Math.floor(Math.random() * 100) + 1;

        if (rndRoll > 0 && rndRoll <= 20) {
            appearances.push(pickAppearances(1));
        } else if (rndRoll2 > 20 && rndRoll < 50) {
            appearances.push(pickAppearances(2));
        } else if (rndRoll2 > 50 && rndRoll < 80) {
            appearances.push(pickAppearances(3));
        }
    } else { // 80% for ancient
        // var rndRoll = Math.floor(Math.random() * 100) + 1;

        if (rndRoll > 0 && rndRoll <= 20) {
            appearances.push(pickAppearances(1));
        } else if (rndRoll2 > 20 && rndRoll < 50) {
            appearances.push(pickAppearances(2));
        } else if (rndRoll2 > 50 && rndRoll < 80) {
            appearances.push(pickAppearances(3));
        }
    }

    if (appearances.length > 0) {
        return appearances.filter(n => n);
    } else {
        appearances = ['Normal appearance'];
        return appearances;
    }
}

function pickAppearances(level) {
    var output = [];

    for (i = 0; i < level; i++) {
        var rndRoll = Math.floor(Math.random() * 100) + 1;

        output.push(appearance[Math.floor(Math.random() * appearance.length)]);
    }

    return output;
}
