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
    output += '<h4>' + experience[i].dates + ' | ' + experience[i].location + '</h4><ul>';

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

    output += '</ul></div>';
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
    if (i == 'Web') { // display web skills
        displaySkillsObjects(skills, 'Web', 'skills-web');
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

output += '<h2>Certifications</h2><ul id="certifications">';

for (i in certifications) { // display certifications
    output += '<li><a href="' + certifications[i].link + '">' + certifications[i].title + '</a><br />';
    output += '<span>' + certifications[i].date + '</span><br/><span class="label label-default">';
    for (j in certifications[i].meta) {
        if (j == certifications[i].meta.length - 1) {
            output += certifications[i].meta[j];
        } else {
            output += certifications[i].meta[j] + ', ';
        }
    }
    output += '</li>';
}

output += '</ul><h2>Independent Coursework</h2><ul>';

for (i in independentCoursework) { // display independent coursework
    output += '<li>' + independentCoursework[i].name + '</li>';
}

$('#education').append(output);


// functions

function displaySkillsArray(array, title, target) {
    var output = '<h3>' + title + '</h3><ul>';
        
    for (k in array[i]) {
        output += '<li>' + array[i][k] + '</li>';
    }

    output += '</ul>';

    $('#' + target).append(output);
}

function displaySkillsObjects(array, title, target) { // display skills
    var output = '<h3>' + title + '</h3><ul>';

    for (k in array[i]) { // category of skill
        output += '<li>' + k + '</li><ul>';
        if (typeof(array[i][k]) != 'string') {
            for (j in array[i][k]) { // particular skill
                output += '<li>' + array[i][k][j] + '</li>';
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