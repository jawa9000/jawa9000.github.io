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