$('ul').on('click', 'li', function() { // toggle the appearance of a line item
  $(this).toggleClass('completed'); // toggle the display of clicked item
});

$('ul').on('click', 'span', function (event) { // delete clicked item
  $(this).parent().fadeOut('slow', function() {
    $(this).remove(); // remove item li element after it has faded out
  });
  event.stopPropagation();
});

$('input[type="text"]').on('keypress', function(event) { // add a new item to the bottom of the ul element list
  if (event.which == 13) { // upon pressing the enter key, add new item to ul element
    $('ul').append('<li><span><i class="fa fa-trash"></i></span> ' + $(this).val() + '</li>');
    $(this).val(''); // clear input
  }
});

$('#pencil').on('click', function() { // toggle the add new item area
  $('input[type="text"]').slideToggle('fast');
  $(this).toggleClass('fa-pencil-square');
});
