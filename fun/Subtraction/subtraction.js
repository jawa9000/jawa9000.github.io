var output = '';

for (var i = 0; i < 50; i++) {
    var rndNumberBottom = 0;
    var rndNumberTop = 0;

    while(rndNumberBottom >= rndNumberTop) {
        rndNumberTop = Math.floor(Math.random() * 20) + 1;
        rndNumberBottom = Math.floor(Math.random() * 20) + 1;
    }

    if (i % 10 == 0) {
        output += '</div><div class="newGroup"><div class="block">';
    } else {
        output += '<div class="block">';
    }

    if (rndNumberTop < 10) {
        output += '<div class="top singleDigitTop"> ' + rndNumberTop + '</div>';
    } else {
        output += '<div class="top"> ' + rndNumberTop + '</div>';
    }

    if (rndNumberBottom < 10) {
        output += '<div class="bottom singleDigitBottom">-' + rndNumberBottom + '</div>';
    } else {
        output += '<div class="bottom">-' + rndNumberBottom + '</div>';
    }

    output += '<div class="answer"></div></div>'
}

$('.table').html(output);