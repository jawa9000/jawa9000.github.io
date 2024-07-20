var count = 0; // used to make sure each heading is unique as some subheadings may have the same name as other subheadings.
var output = '<div class="floatLeft"><ul>'; // variable to handle the collection and display of the ToC

$('h2, h3, h4').each(function() {
    count ++;

    if ($(this).is('h2, h3, h4')) { // generate a Table of Contents (ToC) based on the top four levels only
        var headingLevel = $(this).prop('tagName').toLowerCase();  // Use prop('tagName') instead
        var text = $(this).text();
        var id = text.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s/g, '_') + count;

        $(this).attr('id', id); // assign an unique id based on the title of the heading

        if (headingLevel == 'h2') {
            output += '<li><a href="#' + id + '">' + text + '</a></li>';
        } else if (headingLevel == 'h3') {
            output += '<ul><li><a href="#' + id + '">' + text + '</a></li></ul>';
        } else if (headingLevel == 'h4') {
            output += '<ul><ul><li><a href="#' + id + '">' + text + '</a></li></ul></ul>';
        }
    }
  });

  output += '</ul></div>';

  $('toc').html(output); // display the ToC in the <toc> element