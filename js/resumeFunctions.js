var output = '';

for (i in honors) { // display honors and awards
    output += '<div class="span8 lozenge">';
    output += '<h3>' + honors[i].title + '</h3>';
    output += '<h4>' + honors[i].date + '</h4>';
    output += honors[i].note;
    output += '</div>';
}

$('#honors-n-Awards').append(output);

var output = '';

for (i in experience) { // display experience
    output += '<div id="' + i.replace(/ /g, '_') + '" class="span8 lozenge">'; // ensure id doesn't have any spaces
    output += '<h3 class="resumeTitle">' + experience[i].title + ', ' + experience[i].company + '</h3>';
    output += '<h4>' + experience[i].dates[0] + ' - ' + experience[i].dates[1] + ' | ' + experience[i].location + '</h4>';
    output +='<p class="summary"><strong>Summary</strong>: ' + experience[i].summary + '</p><ul>';

    for (j in experience[i].responsbilities) { // display responsibilities based on series of strings or single strings
        if (typeof(experience[i].responsbilities[j]) === 'object') {
            output += '<li>' + j + '</li><ul>';
            
            for (k in experience[i].responsbilities[j]) {
                output += '<li>' + experience[i].responsbilities[j][k] + '</li>';
            }
            
            output += '</ul>';
        } else {
            output += '<li>' + experience[i].responsbilities[j] + '</li>';
        }
    }

    output += '</ul>';

    output += '</ul>';

    if (experience.hasOwnProperty(i) && experience[i].hasOwnProperty("skills")) { // add skills used
        let sortedSkills = experience[i].skills.sort(); // Sort skills alphabetically
        output += `<p><strong>Skills</strong>: ${sortedSkills.join(", ")}</p>`;
    }

    if (experience.hasOwnProperty(i) && experience[i].hasOwnProperty("technology")) { // add technologies used
        let sortedTechnology = experience[i].technology.sort(); // Sort technology alphabetically
        output += `<p><strong>Technologies</strong>: ${sortedTechnology.join(", ")}</p>`;
    }

    output += '</div>';
}

$('#experience').append(output);

var output = '<h2>Interests</h2>';

for (i in interests) { // display interests, organizations (current and past)
    if (i == 'interests') {
        output += '<ul>';

        for (k in interests.interests) { // display interests
            output += '<li>' + interests.interests[k] + '</li>';
        }

        output += '</ul>';
    } else if (i == 'organizations') { // display organizations
        output += '<h2>Organizations</h2><p>In no particular order.</p>';
    
        for (k in interests.organizations) {
            if (k == 'current') {
                output += ' <h3>Current</h3>';

                for (j in interests.organizations.current) {
                    output += '<ul><li><a href="' + interests.organizations.current[j].link + '" title="' + interests.organizations.current[j].title + '" target="blank">' + interests.organizations.current[j].title + '</a></li><ul>';
                    output += '<li>' + interests.organizations.current[j].membership + '</li>';
                    output += '<li>' + interests.organizations.current[j].dates + '</li>';
                    output += '<li>' + interests.organizations.current[j].notes + '</li></ul></ul>';
                }
            } else if (k == 'previous') {
                output += ' <h3>Previous</h3>';

                for (j in interests.organizations.previous) {
                    if (interests.organizations.previous[j].link) {
                        output += '<ul><li><a href="' + interests.organizations.previous[j].link + '" title="' + interests.organizations.previous[j].title + '" target="blank">' + interests.organizations.previous[j].title + '</a></li><ul>';
                    } else {
                        output += '<ul><li>' + interests.organizations.previous[j].title + '</li><ul>';
                    }
                    
                    output += '<li>' + interests.organizations.previous[j].membership + '</li>';
                    output += '<li>' + interests.organizations.previous[j].dates + '</li>';

                    if (interests.organizations.previous[j].notes) {
                        output += '<li>' + interests.organizations.previous[j].notes + '</li></ul></ul>';
                    } else {
                        output += '</ul></ul>';
                    }
                }
            }
        }
    }
}

$('#interests').append(output);

var output = '<ul>';

for (i in competencies) {
    output += '<li>' + competencies[i] + '</li>';
}

output += '</ul>';

$('#competencies').append(output);

for (i in skills) {
    if (i == 'Programming') { // display Programming skills
        displaySkillsObjects(skills, 'Programming', 'skills-programming');
    } else if (i == 'Operating systems') {
        displaySkillsObjects(skills, 'Operating systems', 'skills-operatingSystems');
    } else if (i == 'Atlassian') {
        displaySkillsObjects(skills, 'Atlassian', 'skills-atlassian');
    } else if (i == 'Documentation types') {
        displaySkillsArray(skills, i, 'skills-documentationTypes');
    } else if (i == 'Communication') {
        displaySkillsArray(skills, i, 'skills-communication');
    } else if (i == 'General skills') {
        displaySkillsArray(skills, i, 'skills-general');
    } else if (i =='Software') {
        displaySkillsObjects(skills, i, 'skills-software');
    } else if (i =='Photography and video') {
        displaySkillsArray(skills, i, 'skills-PhotographyAndVideo');
    } else if (i == 'Technical writing skills') {
        displaySkillsArray(skills, i, 'skills-TechnicalWritingSkills');
    }
}

var output = '';

for (i in volunteer) { // display volunteer
    output += '<div class="span8 lozenge">';
    output += '<h3>' + volunteer[i].title + '</h3>';
    output += '<h4>' + volunteer[i].date + '</h4>';
    output += volunteer[i].note;
    output += '</div>';
}

$('#volunteer').append(output);

var output = '';

for (i in education) { // display education
    output += '<div class="span8 lozenge">';
    output += '<h3 class="resumeTitle">' + education[i].location + '</h3>';
    output += '<p><strong>Degree</strong>: ' + education[i].degree + '</p>';
    output += '<p><strong>Dates</strong>: ' + education[i].dates + '</p>';
    output += '<p><strong>Grade</strong>: ' + education[i].grade + '</p>';
    output += '<p><strong>Address</strong>: ' + education[i].address + '</p>';
    output += '<p>' + education[i].notes + '</p>';
}

output += '<h2>Certifications</h2><ol id="certifications">';

Object.size = function(obj) { // get the length of an object
    var size = 0;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    
    return size;
}

var certLength = Object.size(certifications);

// create an array and reverse it for counting how many certs I have so that they can be numbered from highest to lowest
var certArray = [];

for (var i = certLength; i > 0; i--) {
    certArray.push(i);
}

var count = 0;

for (i in certifications) { // display certifications
    if (certifications[i].link.length > 0) { // if the certification has a link to the cert, add it
        output += '<li><span>' + certArray[count] + '</span>. <a href="' + certifications[i].link + '">' + certifications[i].title + '</a><br />';
    } else {
        output += '<li><span>' + certArray[count] + '</span>. ' + certifications[i].title + '<br/>';
    }

    if (certifications[i].notes) {
        output += '<span class="indend28">' + certifications[i].notes + '</span><br/>';
    }
    
    output += '<span class="indend28">' + certifications[i].date + '</span><br/><span class="label label-default indend28">';
    for (j in certifications[i].meta) {
        if (j == certifications[i].meta.length - 1) {
            output += certifications[i].meta[j];
        } else {
            output += certifications[i].meta[j] + ', ';
        }
    }
    output += '</span>';

    output += '</li>';

    count++;
}

output += '</ol><h2>Independent Coursework</h2><ul>';

for (i in independentCoursework) { // display independent coursework
    output += '<li>' + independentCoursework[i].name + '</li>';
}

$('#education').append(output);

// copy resume content (ignoring the summaries) to system's clipboard via the keypress of 'c' or 'C'
$(document).ready(function() {
    $(document).on('keydown', function(event) {
        if (event.key === 'c' || event.key === 'C') {
            var contentToCopy = $('div#experience').clone(); // Clone the div#experience element
            contentToCopy.find('.summary').remove(); // Remove elements with the summary class
            var textContentToCopy = contentToCopy.text(); // Get only the text content from the cleaned HTML

            var clipboardElement = $("<textarea>").text(textContentToCopy); // Create a temporary textarea with the text content

            $("body").append(clipboardElement); // Append the temporary element to the document
      
            clipboardElement[0].select(); // Select and copy the text in the temporary element
            document.execCommand("copy");
      
            clipboardElement.remove(); // Remove the temporary element
        }
    });
});



// functions

function displaySkillsArray(array, title, target) { // display skills that are listed from an array
    var output = '<h3>' + title + '</h3><ul>';
        
    // Convert to array and sort alphabetically
    var sortedSkills = array[i].sort(function(a, b) {
        return a.localeCompare(b);
    });
    
    for (k in sortedSkills) {
        output += '<li>' + sortedSkills[k] + '</li>';
    }

    output += '</ul>';

    $('#' + target).append(output);
}

function displaySkillsObjects(array, title, target) { // display skills that listed from an object
    var output = '<h3>' + title + '</h3><ul>';

    // Sort categories alphabetically
    var sortedCategories = Object.keys(array[i]).sort(function(a, b) {
        return a.localeCompare(b);
    });

    for (k of sortedCategories) { // category of skill
        output += '<li>' + k + '</li><ul>';

        if (typeof(array[i][k]) != 'string') {
            // Sort skills within category alphabetically
            var sortedSkills = array[i][k].sort(function(a, b) {
                return a.localeCompare(b);
            });
            
            for (j in sortedSkills) { // particular skill
                output += '<li>' + sortedSkills[j] + '</li>';
            }
        } else {
            if (k != array[i][k]) { // only display the top level li if the content is the same as the nested li
                output += '<li>' + array[i][k] + '</li>';
            }   
        }
        
        output += '</ul>';
    }

    output += '</ul>';

    $('#' + target).append(output);
}