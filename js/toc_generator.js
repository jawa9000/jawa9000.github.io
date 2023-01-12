var count = 0; // used to make sure each heading is unique as some subheadings may have the same name as other subheadings.
var output = '<div class="floatLeft"><ul>'; // variable to handle the collection and display of the ToC

$('h1, h2, h3, h4').each(function() { // generate a Table of Contents (ToC) based on the top four levels only
    count ++;

    var text = $(this).text();
    var id = text.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/\s/g, '_') + count;
    var headingLevel = $(this).context.nodeName.toLowerCase();

    $(this).attr('id', id); // assign an unique id based on the title of the heading

    if (headingLevel == 'h2') {
        output += '<li><a href="#' + id + '">' + text + '</a></li>';
    } else if (headingLevel == 'h3') {
        output += '<ul><li><a href="#' + id + '">' + text + '</a></li></ul>';
    } else if (headingLevel == 'h4') {
        output += '<ul><ul><li><a href="#' + id + '">' + text + '</a></li></ul></ul>';
    }
});

output += '</ul>';
    
$('toc').html(output); // display the ToC in the <toc> element

>> Rename all the recently created PDF files in Downloads folder and move them to D:\jawa9000.github.io\Writing_Samples\content