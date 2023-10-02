// List newer example on top so they appear first in your web page.

let samples = {
    'Multi-Track Audio Capture': {
        title: 'Multi-Track Audio Capture',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/multi-track-audio-capture-for-take-recorder-in-unreal-engine/',
        pdfLink: '',
        description: 'Record multi-track audio with Unreal Engine\'s Take Recorder',
        labels: ['Overview'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I collaborated with SMEs and product owners to research and write this document, addressing information gaps and documenting new 5.3 features.',
        }
    },
    'Pending Take': {
        title: 'Pending Take',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/pending-takes-for-take-recorder-in-unreal-engine/',
        pdfLink: '',
        description: 'Learn the basics of using Pending Take in Unreal Engine\'s Take Recorder.',
        labels: ['Overview', 'Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I collaborated with SMEs and product owners to research and write this document, addressing information gaps and documenting new 5.3 features.',
        }
    },
    'Creating Camera Cuts Using Sequencer': {
        title: 'Creating Camera Cuts Using Sequencer',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/creating-camera-cuts-using-sequencer-in-unreal-engine/',
        pdfLink: '',
        description: 'Learn how to create camera cuts in Unreal Engine\'s Sequencer.',
        labels: ['Tutorial'],
        projectDetails: {
            audience: 'Unreal Engine Beginners',
            projectNotes: 'As part of my onboarding process, I assigned myself the task of writing a tutorial based on a feature I was unfamiliar with. This document is the outcome of that research. It underwent SME and peer reviews before its release to ensure content accuracy and adherence to documentation publication standards.',
        }
    },
    'Dynamic Binding': {
        title: 'Dynamic Binding',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/dynamic-binding-in-sequencer/',
        pdfLink: '',
        description: 'Unreal Engine\'s Dynamic Binding provides custom Blueprints logic that picks which object to possess in the level or which to spawn.',
        labels: ['Overview', 'Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I collaborated with SMEs and product owners to research and write this document, addressing information gaps and documenting new 5.3 features.',
        }
    },
    'Recording Animation': {
        title: 'Recording Animation',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/recording-animation-using-take-recorder-in-unreal-engine/',
        pdfLink: '',
        description: 'Learn how to use Unreal Engine\'s Take Recorder to capture animation from actor manipulation, physics simulations, and gameplay.',
        labels: ['Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.',
        }
    },
    'Take Recorder': {
        title: 'Take Recorder',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/take-recorder-in-unreal-engine/',
        pdfLink: '',
        description: 'Take Recorder records gameplay animation, live performances, and other sources into Unreal Engine directly.',
        labels: ['Overview', 'Reference'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.',
        }
    },
    'Cine Camera Actor': {
        title: 'Cine Camera Actor',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/cinematic-cameras-in-unreal-engine/',
        pdfLink: '',
        description: 'The Cine Camera Actor is used as the primary camera type for filming cinematic content in Unreal Engine.',
        labels: ['Overview', 'Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.',
        }
    },
    'Possessables and Spawnables': {
        title: 'Possessables and Spawnables',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/spawn-temporary-actors-in-unreal-engine-cinematics/',
        pdfLink: '',
        description: 'Spawn temporary Actors, lights, and other objects in your scene by using Spawnables.',
        labels: ['Overview'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.',
        }
    },
    'Datasmith Supported Software and File Types': {
        title: 'Datasmith Supported Software and File Types',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/datasmith-supported-software-and-file-types/',
        pdfLink: '',
        description: 'Details all the third-party software applications and data formats that Datasmith works with.',
        labels: ['Reference'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I collaborated with an SME to update the supported application table, ensuring that the correct versions are listed.',
        }
    },
    'Datasmith Supported Platforms': {
        title: 'Datasmith Supported Platforms',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/datasmith-supported-platforms/',
        pdfLink: '',
        description: 'Details what Datasmith features work on which different platforms.',
        labels: ['Reference'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            projectNotes: 'I collaborated with an SME to update the supported application table, ensuring that the correct versions are listed.',
        }
    },
    'Technical Writing Guides': {
        title: 'Technical Writing Guides',
        htmlLink: '../tutorials.html#writing',
        description: 'Collection of documents I wrote that explores technical writing.',
        labels: ['Guide', 'Tutorial']
    },
    'Document Read Time': {
        title: 'Document Read Time',
        htmlLink: 'Document_Read_Time.html',
        description: 'Short tutorial for novice JavaScript developers to create a estimate of reading time for a web document based on typical reader\'s skill level.',
        pdfLink: 'Document_Read_Time.pdf',
        labels: ['Tutorial', 'Code Sample'],
        projectDetails: {
            audience: 'Entry-level JavaScript developers.',
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
            audience: 'Everyone who used VPN services (all skill levels, position, and tenure).',
            projectNotes: 'In my first month on the job, I was given a short task of documenting the process of instructing all employees on how to use VPN services. I collaborated with the IT department to gather their notes and wrote a simple draft. I tested the steps myself, asked a few colleagues to try them as well and iterated on the document based on their feedback. Once published, I added a few more notes based on user feedback and integrated a separately written FAQ. Note: this document was originally requested for print only but was later adapted to web format.',
            change: 'Add more screen grabs for the Windows and Mac sections that illustrate what each section should look like as the audience for this document were mostly visually-based learners. I would also include contact information for the IT department and point any further questions to them as they were in charge of maintaining this service.'
        }
    },
    'Use Nightmare.js to Generate a Confluence Sitemap': {
        title: 'Use Nightmare.js to Generate a Confluence Sitemap',
        htmlLink: 'Use_Nightmare_to_Generate_a_Confluence_Sitemap.html',
        pdfLink: 'Use_Nightmare.js_to_Generate_a_Confluence_Sitemap.pdf',
        description: 'Document I researched, wrote the script, tested, and wrote documentation that explains how to use various Node.js modules to export a Confluence sitemap.',
        labels: ['Tutorial', 'Code Sample'],
        projectDetails: {
            audience: 'Intermediate JavaScript developers and Confluence Administrators.',
            projectNotes: 'I wrote and documented this script as part of a large process to automate the extraction of content from Confluence. The script and process was put into production where it remained until the company closed (~3.5 years).',
            change: 'Provide a complete code sample that can be copied and pasted.'
        }
    },
    'CRUD the Docs': {
        title: 'CRUD the Docs',
        htmlLink: 'https://crudthedocs.blogspot.com/',
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
            audience: 'Developers, all levels.',
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
            audience: 'entry level mobile app developers.',
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
            audience: 'Entry level developer.',
            projectNotes: 'Revised this document based on direct research and feedback I received from the Titanium team. I completely rewrote this document over the course of 5 days (total of 17 man-hours).',
            change: 'Re-integrate screen shots.'
        }
    },
    'Studio 5.3.0 RC release note': {
        title: 'Studio 5.3.0 RC release note',
        htmlLink: 'Studio_5.3.0.RC_Release_Note.html',
        pdfLink: 'Studio_5.3.0.RC_Release_Note.pdf',
        description: 'Example of a end-user product release note I collaborated with the entire team.',
        labels: ['Release Note'],
        projectDetails: {
            audience: 'All Appcelerator users.',
            projectNotes: 'Researched and wrote based on team meeting notes, team feedback, and change log differences every 2-6 weeks (or whenever the release went out).',
            change: 'Add the site navigation back in (missing due to an incomplete site).'
        }
    },
    'Hyperloop 3.0.0 Release Note': {
        title: 'Hyperloop 3.0.0 Release Note',
        htmlLink: 'Hyperloop_3.0.0_Release_Note.html',
        pdfLink: 'Hyperloop_3.0.0_Release_Note.pdf',
        description: 'Release note for Appcelerator\'s Hyperloop 3.0.0.',
        labels: ['Release Note'],
        projectDetails: {
            audience: 'All Appcelerator users.',
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
            audience: 'End user developers and internal testers.',
            projectNotes: 'I collaborated on updating, revising, and testing content with help from two engineers and revised with notes from the open source community. Note: The main navigation is missing as I salvaged this document from an archive that didn\'t include the dynamically generated navigation.            ',
            change: 'Add code samples. As the engineers were short on time, one of the features of this document we sacrificed was code samples. Additionally, I\'d like to have better definitions and explanations of each property, method, and function. While brevity is usually best, short descriptions don\'t service new or novice users to the platform. Finally, I\'d ensure there are links to overviews and tutorials (where available).'
        }
    },
    'Properties of a YAML File': {
        title: 'Properties of a YAML File',
        htmlLink: 'Properties_of_a_YAML_File.html',
        pdfLink: 'Properties_of_a_YAML_File.pdf',
        description: 'Reference guide for internal developers and API documentation contributors to write clean YAML files.',
        labels: ['Reference', 'Guide'],
        projectDetails: {
            audience: 'Internal engineers and documentation contributors.',
            projectNotes: 'Collaborated with an outgoing engineer to write this guide from scratch. I interviewed the engineer for a total of three hours, tested the contents of this document, and revised it with team feedback.',
            change: 'Integrate additional notes and links for writing YAML files.'
        }
    },
    'Titanium SDK 8.2.0.GA Release Note': {
        title: 'Titanium SDK 8.2.0.GA Release Note',
        htmlLink: 'Titanium_SDK_8.2.0.GA.html',
        pdfLink: 'Titanium_SDK_8.2.0.GA.pdf',
        description: 'Titanium SDK release note that includes information about platform behavioral changes, new features, API changes, and supported SDK modules.',
        labels: ['SDK', 'Release Note'],
        projectDetails: {
            audience: 'All levels of mobile app developers.',
            projectNotes: 'I collaborated with five engineers to produce this release note by gathering information from meetings, presentations, code snippets shared by end-users and internal engineers, feedback from end-users, automated content changes from code docs, and checked in repo files over the course of three weeks.'
        }
    },
    'Installing the Android SDK': {
        title: 'Installing the Android SDK',
        htmlLink: 'Installing_the_Android_SDK.html',
        pdfLink: 'Installing_the_Android_SDK.pdf',
        description: 'Guide on how to obtain and how to install the Google Android SDK and associated packages.',
        labels: ['SDK', 'Reference', 'Guide'],
        projectDetails: {
            audience: 'All levels of mobile app developers.',
            projectNotes: 'I collaborated with the entire team to produce and maintain this document for each release. This document would be updated each time there was a minor or major release or when one of the required packages changed.',
            change: 'I would add back in the graphics and screen grabs to better illustrate the processes mentioned in this document and organize the note into a section of it\'s own.'
        }
    },
    'Introduction to Axway Appcelerator Mobile Solution Platform': {
        title: 'Introduction to Axway Appcelerator Mobile Solution Platform',
        htmlLink: 'Introduction_to_Axway_Appcelerator_Mobile_Solution_Platform.html',
        pdfLink: 'Introduction_to_Axway_Appcelerator_Mobile_Solution_Platform.pdf',
        description: 'Overview of all the Axway Appcelerator products used to build mobile applications.',
        labels: ['Overview'],
        projectDetails: {
            audience: 'All levels of mobile app developers.',
            projectNotes: 'Collaborated with project managers and sales team to write and maintain this overview document.',
            change: 'Add screen shots and short-form videos of the products.'
        }
    },
    'Quick Start Guide for Android APS SDK': {
        title: 'Quick Start Guide for Android APS SDK',
        htmlLink: 'Quick_Start_Guide_for_Android_APS_SDK.html',
        pdfLink: 'Quick_Start_Guide_for_Android_APS_SDK.pdf',
        description: 'Tutorial on how to setup of the AMPLIFY Appcelerator Services for Android applications.',
        labels: ['Tutorial', 'Code Sample', 'SDK'],
        projectDetails: {
            audience: 'Entry level mobile app developers.',
            projectNotes: 'Collaborated with seven different engineers and the project manager to write this document from scratch.',
            change: 'Add screen shots and short-form videos various steps as they are completed. Additionally, I would split this document into two separate, and linked, documents.'
        }
    },
    'AMPLIFY CLI Commands': {
        title: 'AMPLIFY CLI Commands',
        htmlLink: 'AMPLIFY_CLI_Commands.html',
        pdfLink: 'AMPLIFY_CLI_Commands.pdf',
        description: 'Reference documentation for using the AMPLIFY CLI.',
        labels: ['CLI', 'Reference'],
        projectDetails: {
            audience: 'intermediate to advanced level mobile app developers.',
            projectNotes: 'Collaborated with three different engineers to revise and maintain this document.',
        }
    },
     // 'applyBonus Function': { // note to self: if I don't get the gig with Niantic, post this some time in April.
    //     title: 'applyBonus Function',
    //     htmlLink: 'applyBonus_function.html',
    //     pdfLink: 'applyBonus_function.pdf',
    //     description: 'Two page document explaining how to use a function that applies a modifier (bonus) based on player\'s weather (location).',
    //     labels: ['Reference', 'Code Sample', 'Tutorial'],
    //     projectDetails: {
    //         audience: 'Entry level developers new to game development on Unity.',
    //         projectNotes: 'Documented this function from scratch in 2.5 hours with less than a page\'s worth of notes. Took another hour to review and revise before submitting to the team for review.',
    //         change: '',
    //         other: ''
    //     }
    // },
    'Appcelerator Analytics': {
        title: 'Appcelerator Analytics',
        htmlLink: 'Appcelerator_Analytics.html',
        pdfLink: 'Appcelerator_Analytics.pdf',
        description: 'Overview and tutorial on how to use Appcelerator\'s analytics tool.',
        labels: ['Overview', 'Tutorial'],
        projectDetails: {
            audience: 'Entry-level mobile app developers',
            projectNotes: 'Collaborated with one product engineer and team lead to rewrite this document from top to bottom. Captured and modified the images myself. Researched and wrote the GDPR statement that was approved by team leadership and the legal department.'
        }
    },
    'Querying Deleted Pages': {
        title: 'Querying Deleted Pages',
        htmlLink: 'Querying_Deleted_Pages.html',
        pdfLink: 'Querying_Deleted_Pages.pdf',
        description: 'SQL tutorial on how to write a query to report how many wiki pages were deleted in a select time period.',
        labels: ['Tutorial', 'SQL', 'Code Sample'],
        projectDetails: {
            audience: 'entry-level programmers and data scientists.',
            projectNotes: 'Researched and developed this query on my own and collaborated with another tech writer to verify the query and documentation.',
            change: 'I would include sample output from the code snippet included in this document and add links to the other query documents related to this topic.'
        }
    },
    'Find Archived Pages': {
        title: 'Find Archived Pages',
        htmlLink: 'Find_Archived_Pages.html',
        pdfLink: 'Find_Archived_Pages.pdf',
        description: 'SQL tutorial on how to write a query to generate a report of all archived wiki pages in a given wikispace.',
        labels: ['Tutorial', 'SQL', 'Code Sample'],
        projectDetails: {
            audience: 'entry-level programmers and data scientists.',
            projectNotes: 'I collaborated with a fellow tech writer to write a series of queries that pulls data about documentation sets. I wrote, tested, and documented this query and updated the document once I received feedback about the inclusion of deleted and hidden pages.',
            change: 'I would include sample output from the code snippet included in this document and add links to the other query documents related to this topic.'
        }
    },
    'Querying Abandoned Wiki Pages': {
        title: 'Querying Abandoned Wiki Pages',
        htmlLink: 'Querying_Abandoned_Wiki_Pages.html',
        pdfLink: 'Querying_Abandoned_Wiki_Pages.pdf',
        description: 'SQL tutorial on how to write a query to generate a list of all abandoned wiki pages in a given wikispace.',
        labels: ['Tutorial', 'SQL', 'Code Sample'],
        projectDetails: {
            audience: 'entry-level programmers and data scientists.',
            projectNotes: 'I collaborated with a fellow tech writer to write a series of queries that pulls data about documentation sets. I wrote, tested, and documented this query.',
            change: 'I would include sample output from the code snippet included in this document and add links to the other query documents related to this topic.'
        }
    },
    'Viewing Metrics With Appcelerator Dashboard': {
        title: 'Viewing Metrics With Appcelerator Dashboard',
        htmlLink: 'Viewing_Metrics_With_Appcelerator_Dashboard.html',
        pdfLink: 'Viewing_Metrics_With_Appcelerator_Dashboard.pdf',
        description: '',
        labels: ['Overview'],
        projectDetails: {
            audience: 'New users to the Appcelerator platform (new to intermediate developers).',
            projectNotes: 'Took existing documentation and collaborated with another technical writer to overhaul and simplify the content as the new UI was published.',
            change: 'Complete the video introduction of the UI that was planned and link it to this document. Additionally, I would have liked to add more details to each of these sections but our project time was cut in half (from six weeks to three weeks).'
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



$('span#count').text(Object.keys(samples).length); // display the number of writing samples in this collection

// get and display labels
var labels = []; // gather all labels from (writing) samples

for (i in samples) {
    for (j in samples[i].labels) {
        labels.push(samples[i].labels[j].replace(/ /g,'_'));
    }
}

let uniqueLabels = [...new Set(labels)];

uniqueLabels = uniqueLabels.sort();

var output = '<div class="tabbable"><ul class="nav nav-tabs">';

for (i in uniqueLabels) { // build the navigation tabs
    if (i == 0) {
        output += '<li class="active">';
    } else {
        output += '<li>';
    }

    output += '<a href="#' + uniqueLabels[i] + '" data-toggle="tab">' + uniqueLabels[i].replace(/_/g, ' ') + '</a></li>';
}

output += '</ul></div>';

$('#tabs').append(output);

var output = '';

// set and display content of samples object
for (i in uniqueLabels) { // build the elements to house the writing samples
    if (i == 0) {
        output += '<div class="tab-pane active" id="' + uniqueLabels[i] + '">';
    } else {
        output += '<div class="tab-pane" id="' + uniqueLabels[i] + '">';
    }
    
    output += '<h2>' + uniqueLabels[i].replace(/_/g, ' ') + '</h2>';

    for (j in samples) {
        for (k in samples[j].labels) {
            if (samples[j].labels[k].replace(/ /g, '_') == uniqueLabels[i]) {
                output += '<div class="webNote">';
                if (uniqueLabels[i] == 'Blog' || samples[j].title == 'Technical Writing Guides') { // deal with the blog or local website tutorials entry URL
                    output += '<h3><a href="' + samples[j].htmlLink + '" target="blank">' + samples[j].title + '</a></h3>';
                } else if (samples[j].htmlLink.indexOf('http') > -1) { // build elements for externally linked content
                    output += '<h3><a href="' + samples[j].htmlLink + '" target="blank">' + samples[j].title + '</a></h3>';
                } else { // build elements for internally linked content
                    output += '<h3><a href="content/' + samples[j].htmlLink + '" target="blank">' + samples[j].title + '</a></h3>';    
                }

                output += '<p>' + samples[j].description + '</p>';
                
                if (samples[j].pdfLink) {
                    output += '<p><a href="content/' + samples[j].pdfLink + '">PDF version</a></p>';
                }

                output += '<div class="label label-default">';

                var sampleLabels = '';

                for (k in samples[j].labels) {
                    sampleLabels += samples[j].labels[k] + ', ';
                }

                sampleLabels = sampleLabels.replace(/, +$/, ''); // remove trailing comma
                output += sampleLabels;
                output += '</div>';

                if (samples[j].projectDetails) {
                    var uniqueTitle = samples[j].title.replace(/\s/g, '').replace(/\./g, ''); // generate an unique id from the title

                    output += '<ul>';

                    if (samples[j].projectDetails.audience) {
                        output += '<li><strong>Audience</strong>: ' + samples[j].projectDetails.audience + '</li>';
                    }

                    if (samples[j].projectDetails.projectNotes) {
                        output += '<li><strong>Project notes</strong>: ' + samples[j].projectDetails.projectNotes + '</li>';
                    }

                    if (samples[j].projectDetails.change) {
                        output += '<li><strong>What would I change?</strong> ' + samples[j].projectDetails.change + '</li>';
                    }

                    if (samples[j].projectDetails.other) {
                        output += '<li>' + samples[j].projectDetails.other + '</li>';
                    }

                    output += '</ul>';
                }

                output += '</div>';
            }
        }
    }

    output += '</div>';
}

$('#writingSamples').append(output);