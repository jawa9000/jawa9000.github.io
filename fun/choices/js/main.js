var balances = [ // list of "balance" options
  ['cost', 'scope', 'schedule'],
  ['elegant', 'documented', 'on time'],
  ['privacy', 'accuracy', 'security'],
  ['have fun', 'do good', 'stay out of trouble'],
  ['study', 'socialize', 'sleep'],
  ['diverse', 'free', 'equal'],
  ['good', 'fast', 'cheap'],
  ['fast', 'efficient', 'useful'],
  ['cheap', 'healthy', 'tasty'],
  ['secure', 'usable', 'affordable'],
  ['short', 'memorable', 'unique'],
  ['cheap', 'light', 'strong'],
];

pickBalance();

// insert a random balance into the input options
function pickBalance() {
  var rnd = Math.floor(Math.random() * balances.length);
  var output = ""; // build input elements
  for (var i = 0; i < balances[rnd].length; i++) {
    output += '<label><input id="input' + i + '" type="checkbox"> ' + balances[rnd][i] + '</input>';
    if (i == 3) {
      output += '</label>';
    } else {
      output += '</label><br/>';
    }
  }
  $('#inputs').html(output); // render input elements
}

$('button').on('click',function() { // reset checkboxes and pick a new balance list
  $('input:checked').each(function() { // uncheck each checkbox
    $(this).attr('checked',false);
  });
  pickBalance(); // pick a new balance list
});

// if three checkboxes are checked, randomly uncheck one of them
$(document).on('click', 'input', function() {
  if ($(this).parent().hasClass('active')) {
    $(this).parent().removeClass('active');
  } else {
    $(this).parent().addClass('active');
  }
  if ($('input:checked').length == 3) {
    $('input#input' + Math.floor(Math.random() * 3))
      .attr('checked',false)
      .parent().removeClass('active');
  }
});

/*
  inspiration:
  http://galshir.com/life-balance/galshir-life-balance-gif.gif
*/
