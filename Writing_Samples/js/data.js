let samples = {
    'Technical Writing Guides': {
        title: 'Technical Writing Guides',
        htmlLink: '../tutorials.html#writing',
        description: 'Collection of documents I wrote that deals with or is related to technical writing.',
        labels: ['Guide']
    },
    'Document Read Time': {
        title: 'Document Read Time',
        htmlLink: 'Document_Read_Time.html',
        description: 'Short tutorial for novice JavaScript developers to create a estimate of reading time for a web document based on typical reader\'s skill level.',
        pdfLink: 'Document_Read_Time.pdf',
        labels: ['Tutorial', 'Code sample'],
        projectDetails: {
            audience: 'Entry-level JavaScript developers',
            projectNotes: 'Wrote this script and documented it based on the needs to include a reading time estimator. Once published, I received some feedback and I incorporated it into the snippet as well as the documentation.',
            change: 'I would add a few images illustrating the appearance of this feature and add links to reference materials and supporting materials for the reading time estimates.'
        }
    },
    'Remote and Workstation Access': {
        title: 'Remote and Workstation Access',
        htmlLink: 'Remote_And_Workstation_Access.html',
        pdfLink: 'Remote_And_Workstation_Access.pdf',
        description: 'Brief guide instructing all user levels on how to remotely access their desktops.',
        labels: ['Guide', 'Tutorial'],
        projectDetails: {
            audience: 'Everyone who used VPN services (all skill levels, position, and tenure)',
            projectNotes: 'In my first month on the job, I was given a simple task of documenting the process of instructing all employees on how to use VPN services. I collaborated with the IT department to gather their notes and wrote a simple draft. I tested the steps myself, asked a few colleagues to try them as well and iterated on the document based on their feedback. Once published, I added a few more notes based on user feedback and integrated a separately written FAQ.',
            change: 'Add more screen grabs for the Windows and Mac sections that illustrate what each section should look like as the audience for this document were mostly visually-based learners. I would also include contact information for the IT department and point any further questions to them as they were in charge of maintaining this service.'
        }
    },
    'Use Nightmare.js to Generate a Confluence Sitemap': {
        title: 'Use Nightmare.js to Generate a Confluence Sitemap',
        htmlLink: 'Use_Nightmare_to_Generate_a_Confluence_Sitemap.html',
        pdfLink: 'Use_Nightmare.js_to_Generate_a_Confluence_Sitemap.pdf',
        description: 'Document I researched, wrote the script, tested, and wrote documentation that explains how to use various Node.js modules to export a Confluence sitemap.',
        labels: ['Tutorial', 'Code sample'],
        projectDetails: {
            audience: 'Intermediate JavaScript developers and Confluence Administrators',
            projectNotes: 'I wrote and documented this script as part of a large process to automate the extraction of content from Confluence. The script and process was put into production where it remained until the company closed (~3.5 years).',
            change: 'Provide a complete code sample that can be copied and pasted.'
        }
    },
    'CRUD the Docs': {
        title: 'CRUD the Docs',
        htmlLink: '',
        pdfLink: '',
        description: 'Personal blog site I maintain on a semi-regular basis that captures documentation tooling, documentation trends, and conference summaries. All posts are researched, tested, and written by me.',
        labels: ['Tutorial', 'Blog', 'Guide'],
    },
    'AMPLIFY CLI Commands': {
        title: 'AMPLIFY CLI Commands',
        htmlLink: 'AMPLIFY_CLI_Commands.html',
        pdfLink: 'AMPLIFY_CLI_Commands.pdf',
        description: 'Reference documentation for using the AMPLIFY CLI.',
        labels: ['CLI', 'Reference'],
        projectDetails: {
            audience: 'developers, all levels',
            projectNotes: 'I collaborated with three engineers to gather and write the outdated CLI documentation. I added the auth switch options section and half the pm section content with the team\'s help.'
        }
    },
    'Creating Your First Mobile App': {
        title: 'Creating Your First Mobile App',
        htmlLink: 'Creating_your_first_mobile_app.html',
        pdfLink: 'Creating_Your_First_Mobile_App.pdf',
        description: 'Entry level user tutorial on how to create a simple mobile app using Appcelerator platform. Collaborated with two engineers to rewrite and test an outdated tutorial.',
        labels: ['Tutorial'],
        projectDetails: {
            audience: 'entry level mobile app developers',
            projectNotes: 'Collaborated with engineers to rewrite the outdated tutorial over the course of three weeks. Rewrote the document from the ground up and tested and confirmed each step myself.',
            change: 'Add back in the screen shots and re-add links for getting help and links to next steps, reference documentation, and other tutorials.'
        }
    },
    'Hello Titanium': {
        title: 'Hello Titanium',
        htmlLink: 'Hello_Titanium_app.html',
        pdfLink: 'Hello_Titanium_App.pdf',
        description: 'Another entry level user tutorial on how to create a simple mobile app using Appcelerator platform. Collaborated with two engineers to rewrite and test an outdated tutorial.',
        labels: ['Tutorial'],
        projectDetails: {
            audience: 'Entry level developer',
            projectNotes: 'Revised this document based on direct research and feedback I received from the Titanium team. I completely rewrote this document over the course of 5 days (total of 17 man-hours).',
            change: 'Re-integrate screen shots.'
        }
    },
    'Studio 5.3.0 RC release note': {
        title: 'Studio 5.3.0 RC release note',
        htmlLink: 'Studio_5.3.0.RC_Release_Note.html',
        pdfLink: 'Studio_5.3.0.RC_Release_Note.pdf',
        description: 'Example of a end-user product release note I collaborated with the entire team.',
        labels: ['Release note'],
        projectDetails: {
            audience: 'All Appcelerator users',
            projectNotes: 'Researched and wrote based on team meeting notes, team feedback, and change log differences every 2-6 weeks (or whenever the release went out).',
            change: 'Add the site navigation back in (missing due to an incomplete site).'
        }
    },
    'Hyperloop 3.0.0 Release Note': {
        title: 'Hyperloop 3.0.0 Release Note',
        htmlLink: 'Hyperloop_3.0.0_Release_Note.html',
        pdfLink: 'Hyperloop_3.0.0_Release_Note.pdf',
        description: 'Release note for Appcelerator\'s Hyperloop 3.0.0.',
        labels: ['Release note'],
        projectDetails: {
            audience: 'All Appcelerator users',
            projectNotes: 'Researched and wrote based on team meeting notes, team feedback, and change log differences every 2-6 weeks (or whenever the release went out).',
            change: 'Add the site navigation back in (missing due to an incomplete site).'
        }
    },
    'Titanium API': {
        title: 'Titanium API',
        htmlLink: 'Titanium.API.html',
        pdfLink: 'Titanium.API.pdf',
        description: 'Example of an end-user API doc I collaborated on updating, revising, and testing content with help from two engineers.',
        labels: ['API'],
        projectDetails: {
            audience: 'End user developers and internal testers',
            projectNotes: 'I collaborated with two software engineers to regularly review and revise this document if there was a release made changes to this feature.',
            change: 'Add code samples. As the engineers were short on time, one of the features of this document we sacrificed was code samples. Additionally, I\'d like to have better definitions and explanations of each property, method, and function. While brevity is usually best, short descriptions don\'t service new or novice users to the platform. Finally, I\'d ensure there are links to overviews and tutorials (where available).'
        }
    },
    'Properties of a YAML File': {
        title: 'Properties of a YAML File',
        htmlLink: 'Properties_of_a_YAML_File.html',
        pdfLink: 'Properties_of_a_YAML_File.pdf',
        description: 'Reference guide for internal developers and API documentation contributors to write clean YAML files.',
        labels: ['Yaml', 'Reference', 'Guide'],
        projectDetails: {
            audience: 'Internal engineers and documentation contributors',
            projectNotes: 'Collaborated with an outgoing engineer to write this guide from scratch. I interviewed the engineer for a total of three hours, tested the contents of this document, and revised it with team feedback.',
            change: 'Integrate additional notes and links for writing YAML files.'
        }
    },
    // '': {
    //     title: '',
    //     htmlLink: '',
    //     pdfLink: '',
    //     description: '',
    //     labels: [''],
    //     projectDetails: {
    //         audience: '',
    //         projectNotes: '',
    //         change: '',
    //         other: ''
    //     }
    // },
}

// ** add a few that shows only select document types based on their labels. Add a toggle to reshow all labels.

// ** build tabs and put writing samples of each accordinging to their labels

var labels = [];

for (i in samples) {
    for (j in samples[i].labels) {
        labels.push(samples[i].labels[j]);
    }
}

let uniqueLabels = [...new Set(labels)];

uniqueLabels = uniqueLabels.sort();
// console.log(uniqueLabels)
var tabOutput = '<div class="tabbable"><ul class="nav nav-tabs">';
var writingSamplesOutput = '';

for (i in uniqueLabels) { 
    // build the navigation tabs
    if (i == 0) {
        tabOutput += '<li class="active">';
    } else {
        tabOutput += '<li>';
    }

    tabOutput += '<a href="#' + uniqueLabels[i] + '" data-toggle="tabe">' + uniqueLabels[i] + '</a></li>';
    
    // build the elements to house the writing samples
    if (i == 0) {
        writingSamplesOutput += '<div class="tab-pane active" id="' + uniqueLabels[i] + '">';
    } else {
        writingSamplesOutput += '<div class="tab-pane" id="' + uniqueLabels[i] + '">';
    }
    
    writingSamplesOutput += '<h2>' + uniqueLabels[i] + '</h2></div>';

}

tabOutput += '</ul></div>';

$('#tabs').append(tabOutput);
$('#writingSamples').append(writingSamplesOutput);


// display function

// var output = '';

// for (i in samples) {
//     output += '<div class="webNote">';
//     output += '<h3><a href="' + samples[i].htmlLink + '" target="blank">' + samples[i].title + '</a></h3>';
//     output += '<p>' + samples[i].description + '</p>';

//     if (samples[i].pdfLink) {
//         output += '<p><a href="' + samples[i].pdfLink + '">PDF version</a></p>';
//     }

//     output += '<div class="label label-default">';

//     var labels = '';

//     for (j in samples[i].labels) {
//         labels += samples[i].labels[j] + ', ';
//     }

//     labels = labels.replace(/, +$/, ''); // remove trailing comma

//     output += labels + '</div>';

//     if (samples[i].projectDetails) {
//         var uniqueTitle = samples[i].title.replace(/\s/g, '').replace(/\./g, ''); // generate an unique id from the title
//         output += '<div class="expandableContainer">';
//         output += '<div class="expandableTitle" id="expandTitle-' + uniqueTitle + '" status="hidden">';
//         output += '<span class="glyphicon glyphicon-circle-arrow-right paddingRight5"></span><span class="expand" title="Click to expand">Project details</span></div>';
//         output += '<div class="expandableContent" id="expandContent-' + uniqueTitle + '" style="display: block;"><ul>'; // build elements for project details to land in that uses a collapsable system

//         if (samples[i].projectDetails.audience) {
//             output += '<li><strong>Audience</strong>: ' + samples[i].projectDetails.audience + '</li>';
//         }

//         if (samples[i].projectDetails.projectNotes) {
//             output += '<li><strong>Project notes</strong>: ' + samples[i].projectDetails.projectNotes + '</li>';
//         }

//         if (samples[i].projectDetails.change) {
//             output += '<li><strong>What would I change?</strong> ' + samples[i].projectDetails.change + '</li>';
//         }

//         if (samples[i].projectDetails.other) {
//             output += '<li>' + samples[i].projectDetails.other + '</li>';
//         }

//         output += '</ul></div></div>';
//     }

//     output += '</div>';
// }

// $('content').append(output);


// // generate labels and toggle display of content based on their assigned labels

// var labels = [];

// for (i in samples) {
//     for (j in samples[i].labels) {
//         labels.push(samples[i].labels[j]);
//     }
// }

// let uniqueLabels = [...new Set(labels)];

// uniqueLabels = uniqueLabels.sort();

// var output = '';

// for (i in uniqueLabels) {
//     var id = uniqueLabels[i].replace(/\s/g, '_');

//     output += '<span class="labels" id="' + id + '">' + uniqueLabels[i] + '</span>';
// }

// $('labels').append(output);

// $('span.labels').on('click', function() {
//     console.log($(this).attr('id')); // 'release_note'
//     // ** explore options using Bootstrap's card system as noted in D:\website\protected\DO_NOT_UPLOAD\unabridged_resume.html
// });
