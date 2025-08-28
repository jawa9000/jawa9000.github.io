// List newer example on top so they appear first in your web page.

let samples = {
    // '': {
    //     title: '',
    //     htmlLink: '',
    //     pdfLink: '',
    //     description: '',
    //     labels: [''],
    //     projectDetails: {
    //         audience: '',
    //         starNotes: '',
    //         projectNotes: '',
    //         change: '',
    //         other: ''
    //     }
    // },
    // 'Snapser Landing Page': {
    //     title: 'Welcome to Snapser',
    //     htmlLink: 'https://snapser.com/snapser-docs',
    //     pdfLink: '',
    //     description: '',
    //     labels: [''],
    //     projectDetails: {
    //         audience: '',
    //         starNotes: '',
    //         projectNotes: '',
    //         change: '',
    //         other: ''
    //     }
    // },
    // 'About Snapser': {
    //     title: 'About Snapser',
    //     htmlLink: 'Snapser_About.html',
    //     pdfLink: 'Snapser_About.pdf',
    //     description: '',
    //     labels: ['Overview'],
    //     projectDetails: {
    //         audience: 'All levels',
    //         starNotes: '',
    //         projectNotes: '',
    //         change: '',
    //         other: ''
    //     }
    // },
    '': {
        title: 'Critical Hit and Fumble Roller Overview',
        htmlLink: 'Critical-Hit-Fumble.html',
        pdfLink: 'Critical_Hit_Fumble.pdf',
        description: 'This guide provides a concise tutorial on the user interface and core JavaScript functionality of the Critical Hit and Fumble Roller application.',
        labels: ['Guide', 'Code Sample'],
        projectDetails: {
            audience: 'Entry-level JavaScript developers.',
            starNotes: 'Over the years of GM\'ing various RPGs, I found myself frequently needing to look up critical hit and fumble tables in various online resources. To streamline this process, I decided to create a web application that would allow me to quickly roll for critical hits and fumbles without having to flip through multiple resources. I designed the app to be user-friendly and customizable. After developing the app using HTML, CSS, and JavaScript, I documented its features and functionality in this overview to help my son understand what it looks like to document one\'s code. The documentation includes instructions on how to use the app, as well as details about its development process. This project not only improved my coding skills but also provided a valuable tool for fellow GMs in the RPG community.',
            projectNotes: 'This overview was created to document the features of the Critical Hit and Fumble Roller app I created for RPG GMs. It was created using HTML, CSS, and JavaScript.',
            change: 'I\'d add screenshots of the app in use.'
        }
    },
    'Financial Record Endpoint': {
        title: 'Financial Record Endpoint',
        htmlLink: 'Financial_Record_Endpoint.html',
        pdfLink: 'Financial_Record_Endpoint.pdf',
        description: 'This API endpoint allows users to create, read, update, and delete financial records. It supports various operations such as adding new records, retrieving existing records, updating records, and deleting records. The endpoint is designed to be flexible and user-friendly, making it easy for developers to integrate financial record management into their applications.',
        labels: ['API'],
        projectDetails: {
            audience: 'Entry-level developers and internal testers.',
            starNotes: 'Over several years of developing a financial tracking application, I noticed inconsistencies in my approach and endpoints. To address this, I set a goal to create comprehensive documentation that would align the application with its original objectives. Over several months in my spare time, I focused on a specific endpoint, writing and testing it thoroughly. I then documented my findings, including its functionality, parameters, and expected responses. This documentation has been instrumental in streamlining development and ensuring the application remains consistent with its intended purpose.',
            projectNotes: 'This API documentation is based on a personal project I have been creating in my spare time over the past few years.',
            change: 'If I assigned myself more time to this particular endpoint, I would do more testing and document any newly discovered items.'
        }
    },
    '5.3 release note': {
        title: 'Unreal Engine 5.3 Release Notes',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/unreal-engine-5.3-release-notes/#animation',
        pdfLink: 'Unreal_Engine_5.3_Release_Notes.pdf',
        description: 'Overview of new and updated features in Unreal Engine 5.3',
        labels: ['Release Note'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'Every release included a release note detailing new features, platform changes, SDK upgrades, upgrade notes, and other vital information end users needed to make informed decisions about using the new version. My task was to collaborate with another technical writer to fill out the animation section with all the updates and changes. We worked together with our various teams that we supported to identify and document all the information that needed to go into this section over the course of three weeks. From there, I conducted peer reviews of other sections and contributed to content efforts when other technical writers on the team needed assistance. The end result was this massive and comprehensive release note that covered every single feature and update that was part of Unreal Engine\'s 5.3 release.',
            projectNotes: 'I collaborated with several fellow technical writers and SMEs to gather, write, and revise the release notes for the Animation technologies section of this document.'
        }
    },
    'Multi-Track Audio Capture': {
        title: 'Multi-Track Audio Capture',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/multi-track-audio-capture-for-take-recorder-in-unreal-engine/',
        pdfLink: 'Unreal_Engine_Multi-Track_Audio_Capture_for_Take_Recorder.pdf',
        description: 'Record multi-track audio with Unreal Engine\'s Take Recorder',
        labels: ['Overview'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'This topic was part of a planned 5.3 update release and needed documentation. As part of a larger quarterly project, I took on the documentation task to fill the knowledge gap. The document needed updating to include new features from version 5.3, as well as updating outdated features from previous versions. I worked intermittently on this project for six weeks while also working on other Sequencer-based projects. I regularly met with the Subject Matter Expert (SME) team to provide timely updates on my progress, gained additional information, incorporated team feedback, explored the features myself to ensure no feature was undocumented, created new supporting visual elements, ensured it followed the company\'s documentation style guide, and submitted it for peer review prior to publication. The culmination of these efforts was a comprehensive document detailing the usage of the audio features within Take Recorder.',
            projectNotes: 'I collaborated with SMEs and product owners to research and write this document, addressing information gaps and documenting new 5.3 features.'
        }
    },
    'Pending Take': {
        title: 'Pending Take',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/pending-takes-for-take-recorder-in-unreal-engine/',
        pdfLink: 'Unreal_Engine_Pending_Takes_for_Take_Recorder.pdf',
        description: 'Learn the basics of using Pending Take in Unreal Engine\'s Take Recorder.',
        labels: ['Overview', 'Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'This topic had not been updated since version 4.x. As part of a larger quarterly project, I took on the documentation task to fill the knowledge gap. This document needed to be updated to include new features from version 5.3, as well as updating outdated features from previous versions. I worked intermittently on this project for eight weeks while also working on other Sequencer-based projects. I regularly met with the Subject Matter Expert (SME) team to provide timely updates on my progress, gained additional information, incorporated team feedback, explored the features myself to ensure no feature was undocumented, created new supporting visual elements, ensured it followed the company\'s documentation style guide, and submitted it for peer review prior to publication. The outcome of this effort not only addressed information gaps and corrected misinformation about older features such as Pending Take but also incorporated documentation for new features introduced in Unreal Engine 5.3.',
            projectNotes: 'I collaborated with SMEs and product owners to research and write this document, addressing information gaps and documenting new 5.3 features.'
        }
    },
    'Creating Camera Cuts Using Sequencer': {
        title: 'Creating Camera Cuts Using Sequencer',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/creating-camera-cuts-using-sequencer-in-unreal-engine/',
        pdfLink: 'Unreal_Engine_Creating_Camera_Cuts_Using_Sequencer.pdf',
        description: 'Learn how to create camera cuts in Unreal Engine\'s Sequencer.',
        labels: ['Tutorial'],
        projectDetails: {
            audience: 'Unreal Engine Beginners',
            starNotes: 'Upon joining Epic Games, I found myself unfamiliar with their documentation process. To familiarize myself and test my skills, my manager approved a small project focused on learning and testing their documentation pipeline. I assigned myself the task of writing a tutorial based on features of Unreal Engine that I was unfamiliar with, which was part of a larger project that I would contribute to once I completed my onboarding projects. Over a period of six weeks, I worked intermittently on this project while also working on onboarding and other related projects. I thoroughly researched the topic, read reviews and comments about the problems end users were having with creating and using camera cuts within Sequencer, and created supporting visual elements. After creating a draft, I submitted it to Subject Matter Experts (SMEs) and had it peer-reviewed. I then integrated their feedback and published it. This effort not only filled a knowledge gap and rectified misinformation about some features of Sequencer but also served as a valuable learning experience, allowing me to become proficient in using Epic Games\' documentation pipeline and enhancing user understanding and utilization of these features.',
            projectNotes: 'As part of my onboarding process, I assigned myself the task of writing a tutorial based on a feature I was unfamiliar with. This document is the outcome of that research. It underwent SME and peer reviews before its release to ensure content accuracy and adherence to documentation publication standards.'
        }
    },
    'Dynamic Binding': {
        title: 'Dynamic Binding',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/dynamic-binding-in-sequencer/',
        pdfLink: 'Unreal_Engine_Dynamic_Binding.pdf',
        description: 'Unreal Engine\'s Dynamic Binding provides custom Blueprints logic that picks which object to possess in the level or which to spawn.',
        labels: ['Overview', 'Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'One of the new features introduced in Unreal Engine 5.3 was Dynamic Binding. Given that Dynamic Binding was within my assigned area of expertise, I eagerly embraced the responsibility. I met with Subject Matter Experts (SMEs) to identify the documentation needs, explored the Dynamic Binding feature in a sandbox environment, drafted the documentation, shared it with the feature\'s SMEs, created supporting visual elements, and integrated their feedback. This collaborative effort spanned over a month, during which I worked with the team intermittently. The completed document not only served as the foundation for all dynamically bound features within Unreal Engine\'s Sequencer system but also received positive feedback from users and stakeholders for its clarity, comprehensiveness, and effectiveness in guiding users through the Dynamic Binding feature.',
            projectNotes: 'I collaborated with SMEs and product owners to research and write this document, addressing information gaps and documenting new 5.3 features.'
        }
    },
    'Recording Animation': {
        title: 'Recording Animation',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/recording-animation-using-take-recorder-in-unreal-engine/',
        pdfLink: 'Unreal_Engine_Recording_Animation_Using_Take_Recorder.pdf',
        description: 'Learn how to use Unreal Engine\'s Take Recorder to capture animation from actor manipulation, physics simulations, and gameplay.',
        labels: ['Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'The document, initially created for Unreal Engine 4.x, had become significantly outdated and no longer met the requirements for the latest Unreal Engine 5.x versions. As part of a higher priority series of projects, I needed to identify what could still be used, what needed to be rewritten, and create new supporting visuals. I thoroughly reviewed the outdated material, identified areas where the original content needed improvement, integrated new and updated content, applied the company\'s style guide, collaborated with the Subject Matter Expert (SME) to ensure accuracy, and submitted the revised document for peer review to ensure it met content accuracy and documentation publication standards. These efforts culminated in an up-to-date and precise document that users could rely on across all Unreal Engine 5.x versions for accurate guidance and information.',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.'
        }
    },
    'Take Recorder': {
        title: 'Take Recorder',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/take-recorder-in-unreal-engine/',
        pdfLink: 'Unreal_Engine_Take_Recorder.pdf',
        description: 'Take Recorder records gameplay animation, live performances, and other sources into Unreal Engine directly.',
        labels: ['Overview', 'Reference'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'The document, initially created for Unreal Engine 4.x, had become significantly outdated and no longer met the requirements for the latest Unreal Engine 5.x versions. As part of a higher priority series of projects, I needed to identify what could still be used, what needed to be rewritten, and create new supporting visuals. I thoroughly reviewed the outdated material, identified areas where the original content needed improvement, integrated new and updated content, applied the company\'s style guide, collaborated with the Subject Matter Expert (SME) to ensure accuracy, and submitted the revised document for peer review to ensure it met content accuracy and documentation publication standards. These efforts culminated in an up-to-date and precise document that users could rely on across all Unreal Engine 5.x versions for accurate guidance and information.',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.'
        }
    },
    'Cine Camera Actor': {
        title: 'Cine Camera Actor',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/cinematic-cameras-in-unreal-engine/',
        pdfLink: 'Unreal_Engine_Cine_Camera_Actor.pdf',
        description: 'The Cine Camera Actor is used as the primary camera type for filming cinematic content in Unreal Engine.',
        labels: ['Overview', 'Tutorial'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'The document, initially created for Unreal Engine 4.x, had become significantly outdated and no longer met the requirements for the latest Unreal Engine 5.x versions. As part of a higher priority series of projects, I needed to identify what could still be used, what needed to be rewritten, and create new supporting visuals. I thoroughly reviewed the outdated material, identified areas where the original content needed improvement, integrated new and updated content, collaborated with the Subject Matter Expert (SME) to ensure accuracy, and submitted the revised document for peer review to ensure it met content accuracy and documentation publication standards. These efforts culminated in an up-to-date and precise document that users could rely on across all Unreal Engine 5.x versions for accurate guidance and information.',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.'
        }
    },
    'Possessables and Spawnables': {
        title: 'Possessables and Spawnables',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/spawn-temporary-actors-in-unreal-engine-cinematics/',
        pdfLink: 'Unreal_Engine_Spawnables_and_Possessables.pdf',
        description: 'Spawn temporary Actors, lights, and other objects in your scene by using Spawnables.',
        labels: ['Overview'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'The document, initially created for Unreal Engine 4.x, had become significantly outdated and no longer met the requirements for the latest Unreal Engine 5.x versions. As part of a higher priority series of projects, I needed to identify what could still be used, what needed to be rewritten, and create new supporting visuals. I thoroughly reviewed the outdated material, identified areas where the original content needed improvement, integrated new and updated content, collaborated with the Subject Matter Expert (SME) to ensure accuracy, and submitted the revised document for peer review to ensure it met content accuracy and documentation publication standards. These efforts culminated in an up-to-date and precise document that users could rely on across all Unreal Engine 5.x versions for accurate guidance and information.',
            projectNotes: 'I reviewed outdated material, incorporated new content, and submitted the revisions for SME and peer reviews to ensure content accuracy and compliance with documentation publication standards.'
        }
    },
    'Datasmith Supported Software and File Types': {
        title: 'Datasmith Supported Software and File Types',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/datasmith-supported-software-and-file-types/',
        pdfLink: 'Unreal_Engine_Datasmith_Supported_Software_and_File_Types.pdf',
        description: 'Details all the third-party software applications and data formats that Datasmith works with.',
        labels: ['Reference'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'As part of the 5.3 Unreal Engine update, this document needed to be updated, and the usually assigned technical writer didn\'t have the bandwidth to do this task. Recognizing the need for an update during the 5.3 Unreal Engine update, I volunteered to manage the revision of this document, stepping in when the usual technical writer faced bandwidth constraints. I collaborated with the Subject Matter Expert (SME) to update the support application table and iterated on it with him for two rounds over the course of two weeks. This collaboration and iteration resulted in an updated support application table that accurately reflected the changes introduced in the 5.3 Unreal Engine update. As a result, users were able to quickly and confidently identify the correct version of the feature, leading to improved user experience and reduced support queries related to version compatibility. Additionally, this successful collaboration showcased my ability to take on and deliver short-term projects effectively within the team.',
            projectNotes: 'I collaborated with an SME to update the supported application table, ensuring that the correct versions are listed.'
        }
    },
    'Datasmith Supported Platforms': {
        title: 'Datasmith Supported Platforms',
        htmlLink: 'https://docs.unrealengine.com/5.3/en-US/datasmith-supported-platforms/',
        pdfLink: 'Unreal_Engine_Datasmith_Supported_Platforms.pdf',
        description: 'Details what Datasmith features work on which different platforms.',
        labels: ['Reference'],
        projectDetails: {
            audience: 'All levels of Unreal Engine users',
            starNotes: 'As part of the 5.3 Unreal Engine update, this document needed to be updated, and the usually assigned technical writer didn\'t have the bandwidth to do this task. Recognizing the need for an update during the 5.3 Unreal Engine update, I volunteered to manage the revision of this document, stepping in when the usual technical writer faced bandwidth constraints. I collaborated with the Subject Matter Expert (SME) to update the support application table and iterated on it with him for two rounds over the course of two weeks. This collaboration and iteration resulted in an updated support application table that accurately reflected the changes introduced in the 5.3 Unreal Engine update. As a result, users were able to quickly and confidently identify the correct version of the feature, leading to improved user experience and reduced support queries related to version compatibility. Additionally, this successful collaboration showcased my ability to take on and deliver short-term projects effectively within the team.',
            projectNotes: 'I collaborated with an SME to update the supported application table, ensuring that the correct versions are listed.'
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
            starNotes: 'Some users of our internal documentation site were complaining that they didn\'t want to read long documents or documents perceived to be long. The Document Team I was a part of decided to add a widget to our wiki that would display an estimate of reading time. I wrote a simple JavaScript file and integrated it into the company\'s wiki system as a widget that could be toggled on or off at the space level (applied to all pages within a specified space) or at the individual page level. I completed testing, demonstrated it to the Document Team for approval, implemented it in the wiki platform, and announced it to the company. Once published, I received feedback for improvements, which I incorporated immediately and documented my code for future changes. This new widget significantly reduced bounce rates on our documentation pages, increased user engagement, and improved overall user satisfaction.',
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
            starNotes: 'As part of my onboarding tasks, I was given a short task of documenting the process of how employees should use the company\'s VPN services. I collaborated with the IT department to gather their notes and wrote a simple draft. I tested the steps myself, asked a few colleagues to try them as well, and iterated on the document based on their feedback. Once published, I added a few more notes based on user feedback and integrated a separately written FAQ. This saved the IT department countless hours and calls on how to use the company\'s VPN services.',
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
            starNotes: 'As part of a migration project, I was tasked with migrating over 3,000 documents from Confluence. I needed to first figure out and maintain the site\'s structure prior to migrating it’s content. Using Node.js and Nightmare.js, I wrote and tested a script that traversed the Confluence space, generated a list of pages in hierarchical order, and outputted the results to a user-specified text document based on the command-line interface I designed using JavaScript. The end result saved weeks worth of manual labor and page checking work. This script was also used as part of a bigger series of scripts that were used to export and import content out of and into other Confluence spaces.',
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
    'Creating Your First Mobile App': {
        title: 'Creating Your First Mobile App',
        htmlLink: 'Creating_your_first_mobile_app.html',
        pdfLink: 'Creating_Your_First_Mobile_App.pdf',
        description: 'Entry level user tutorial on how to create a simple mobile app using Appcelerator platform. Collaborated with two engineers to rewrite and test an outdated tutorial.',
        labels: ['Tutorial'],
        projectDetails: {
            audience: 'entry level mobile app developers.',
            starNotes: 'I inherited an outdated tutorial that had received several comments from end-users and internally, indicating that updates were required. As one of my early projects, I was tasked with rewriting this document from scratch. I worked on this project part-time over the course of three weeks while collaborating with engineers and the PM to understand what steps a new user should take, explored the old and newly defined content, experimented with the tutorial myself, applied the style guide, added screenshots, and integrated team feedback as necessary. This resulted in a new and current document that explained each step in the process clearly for new users to understand. The marketing team then picked it up to be used as part of their sales pitch and onboarding process for new and potential customers.',
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
            starNotes: 'I inherited an outdated tutorial that had received several comments from end-users and internally, indicating that updates were required. As one of my early projects, I was tasked with rewriting this document from scratch while defining a company documentation style guide. I spent 17 hours (over five days) meeting with engineers to understand what steps a new user should take, explored the old and newly discovered content, experimented with the tutorial myself, applied the new style guide, added screenshots, and integrated team feedback as necessary. This resulted in a new and current document that explained each step in the process clearly for new users to understand. The marketing team then picked it up to be used as part of their sales pitch and onboarding process for new and potential customers.',
            projectNotes: 'Revised this document based on direct research and feedback I received from the Titanium team. I completely rewrote this document over the course of five days (total of 17 man-hours).',
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
            starNotes: 'Each release required a comprehensive release note that listed all the changes, updates, new and/or removed features, improvements, API changes, fixed issues, and other information as required. It was my responsibility to capture all those updates for each release into a comprehensive document that was easily searchable and included code samples where possible. I collaborated with an average of five engineers for each release to gather updates for each supported platform, organized the content into appropriate categories and subcategories, added links to the relevant Jira tickets, wrote a summary statement about the release\'s theme, and identified and thanked contributors from the open-source community. This resulted in a streamlined and well-organized document that was easily searchable and informed end-users of changes to the platform.',
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
            starNotes: 'Each release required a comprehensive release note that listed all the changes, updates, new and/or removed features, improvements, API changes, fixed issues, and other information as required. It was my responsibility to capture all those updates for each release into a comprehensive document that was easily searchable and included code samples where possible. I collaborated with the product engineer for each release to gather updates for each supported platform, organized the content into appropriate categories, and added links to the relevant Jira tickets. This resulted in a streamlined and well-organized document that was easily searchable and informed end-users of changes to the platform.',
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
            starNotes: 'Every month, the product team released a new major, minor, or patch release. My task was to capture all the changes in these releases and publish a new release note for each one. I met with the team to gather the necessary information promptly, asked clarifying questions, reviewed internal product updates to identify areas that needed documentation, and drafted the release note for approval by the PM. Once approved, I\'d proceed with the automated documentation publication process on the target release date. This process typically spanned two weeks before the release. As a result, we maintained a smooth workflow for all involved members, and we consistently published the release note on time.',
            projectNotes: 'I collaborated on updating, revising, and testing content with help from two engineers and revised with notes from the open source community. Note: The main navigation is missing as I salvaged this document from an archive that didn\'t include the dynamically generated navigation.            ',
            change: 'Add code samples. As the engineers were short on time, one of the features of this document we sacrificed was code samples. Additionally, I\'d like to have better definitions and explanations of each property, method, and function. While brevity is usually best, short descriptions don\'t service new or novice users to the platform. Finally, I\'d ensure there are links to overviews and tutorials (where available).'
        }
    },
    'Properties of a YAML File': {
        title: 'Properties of a YAML File',
        htmlLink: 'Properties_of_a_YAML_File.html',
        pdfLink: 'Properties_of_a_YAML_File.pdf',
        description: 'Reference guide for developers and API documentation contributors to write clean YAML files.',
        labels: ['Reference', 'Guide'],
        projectDetails: {
            audience: 'Internal engineers and documentation contributors.',
            starNotes: 'We did not have any documentation on the purpose or usage of our YAML file format. This led to numerous incorrect usages of YAML properties, resulting in poorly rendered files on the API documentation site or causing the documentation publication process to fail when encountering a poorly formatted YAML file while generating the platform API documents. As part of my onboarding process, I met with the API engineering team to understand the intended usage of this format and wrote a draft documenting all the properties that could be used in these files. I collaborated with the engineering team to iterate on the content I wrote, interviewed the engineer who originally implemented the API documentation system, conducted several hours of testing to ensure I got all the details right, and made changes per the team\'s feedback. I then conducted an audit of all YAML files to find and fix any issues with this format. Once this project was completed, the document served as a guide for how the team was supposed to use the YAML format and reduced poorly formatted YAML files by 100%. This further resulted in zero issues when generating API documentation thanks to this guide that I wrote and shared with the team.',
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
            starNotes: 'Each release required a comprehensive release note that listed all the changes, updates, new and/or removed features, improvements, API changes, fixed issues, and other information as required. It was my responsibility to capture all those updates for each release into a comprehensive document that was easily searchable and included code samples where possible. I collaborated with an average of five engineers for each release to gather updates for each supported platform, organized the content into appropriate categories and subcategories, added links to the relevant Jira tickets, wrote a summary statement about the release\'s theme, and identified and thanked contributors from the open-source community. This resulted in a streamlined and well-organized document that was easily searchable and informed end-users of changes to the platform.',
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
            starNotes: 'Each major and minor release had to include updating this document to ensure that the required packages and target platform information were correct. I was tasked with reviewing the code repo for the package and target platform information, updating the supported and unsupported versions, and ensuring the installation processes were all correct. Once I received information for the next major or minor release, I would review the appropriate code files to find the necessary information for the required packages and target platform information, update the staging documentation, confirm that the installation steps had not changed from the previous versions (and make any necessary changes accordingly), and publish the content on release day. If no updates were required for the installation processes, each update to this document would only take a few hours to complete. This ensured our users had the most current information for using the latest version of the platform and how to install any dependencies.',
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
            starNotes: 'The original document was outdated and missing two new features. I had to include those new features, include a general statement about the document, and remove the marketing terminology. I collaborated with all the project managers whose features were mentioned in the document to ensure I captured the essence of each of the platform\'s features. I also worked with the sales team to help them understand why marketing terminology did not belong in a technical document. The end result was a simplified, less marketing-focused technical overview document that included the new features and had better formatting.',
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
            starNotes: 'The original document had not been updated in nearly two years and was missing key information on how to follow the steps outlined. I was given a month to revamp the document. I collaborated with seven engineers and the PM to review the source content, salvage what we could, and iterated on various drafts I had created to update the content. The project hit a snag as one of the engineers was on vacation, causing a slight delay because only he had the key information I needed to complete the project. I integrated the team\'s notes in a timely manner, followed the company\'s style guide, and verified the content to the best of my ability. The end result included a clear and easy-to-follow set of instructions for each step of the process, inclusion of new features and processes, and better formatting for easier content consumption.',
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
            starNotes: 'I inherited an out-of-date document and was tasked with updating it with missing features. I met with the engineering team to identify what needed to be included and explored the features myself to better understand what I was documenting. I worked on this project part-time over the course of two weeks, verifying its content and updating the document to follow our style guide. The end result included all the new features, better formatting for easier content consumption, which led to an improved user experience.',
            projectNotes: 'I collaborated with three engineers to revise and maintain the CLI documentation. I added the auth switch options section and half the pm section content with the team\'s help.'
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
    //         starNotes: '',
            // projectNotes: 'Documented this function from scratch in 2.5 hours with less than a page\'s worth of notes. Took another hour to review and revise before submitting to the team for review.',
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
            starNotes: 'I inherited an out-of-date document and was tasked with rewriting it from scratch. I met with the lead product engineer and his team to identify what needed to be included in the document and where I could find additional resources to enhance its content. I worked on this project part-time over the course of a month, exploring the product features, identifying key terminology, including the GDPR statement, creating new screenshots, verifying code samples, and ensuring the content followed our style guide. The end result was a new, easy-to-understand, and current document that not only met GDPR requirements but also provided customers with clear instructions on how to apply the analytic features of the platform, leading to improved user experience and satisfaction.',
            projectNotes: 'Collaborated with one product engineer and team lead to rewrite this document from top to bottom. Captured and modified the images myself. Researched and wrote the GDPR statement that was approved by team leadership and the legal department.'
        }
    },
    'Querying Deleted Pages': {
        title: 'Querying Deleted Pages',
        htmlLink: 'Querying_Deleted_Pages.html',
        pdfLink: 'Querying_Deleted_Pages.pdf',
        description: 'SQL tutorial on how to write a query to report how many wiki pages were deleted in a select time period.',
        labels: ['Guide', 'SQL', 'Code Sample'],
        projectDetails: {
            audience: 'entry-level programmers and data scientists.',
            starNotes: 'The documentation team I was part of had created a series of queries that completed a dashboard, identifying documentation metrics and opportunities. I needed to document a query that I had created to ensure that our users understood the intent and usage of this query. I reviewed and tested the code I had created to explore various options with this query. Once I arrived at a peer-reviewed and approved solution, I wrote this document explaining its purpose and documented each line of code in less than a day. This resulted in a clear understanding of the query and its intended usage by our users.',
            projectNotes: 'Researched and developed this query on my own and collaborated with another tech writer to verify the query and documentation.',
            change: 'I would include sample output from the code snippet included in this document and add links to the other query documents related to this topic.'
        }
    },
    'Find Archived Pages': {
        title: 'Find Archived Pages',
        htmlLink: 'Find_Archived_Pages.html',
        pdfLink: 'Find_Archived_Pages.pdf',
        description: 'SQL tutorial on how to write a query to generate a report of all archived wiki pages in a given wikispace.',
        labels: ['Guide', 'SQL', 'Code Sample'],
        projectDetails: {
            audience: 'entry-level programmers and data scientists.',
            starNotes: 'The doc team I was a part of had created a series of other queries that completed a dashboard identifying documentation metrics and opportunities. I needed to document a query that I had collaborated on with another tech writer to ensure that our users understood the intent and usage of this query. I reviewed the code we had created, tested it as we explored various options with this query. Once we arrived at a good solution, I wrote this document explaining its purpose and documented each line of code in less than a day. This resulted in a clear understanding of the query and its intended usage by our users.',
            projectNotes: 'I collaborated with a fellow tech writer to write a series of queries that pulls data about documentation sets. I wrote, tested, and documented this query and updated the document once I received feedback about the inclusion of deleted and hidden pages.',
            change: 'I would include sample output from the code snippet included in this document and add links to the other query documents related to this topic.'
        }
    },
    'Querying Abandoned Wiki Pages': {
        title: 'Querying Abandoned Wiki Pages',
        htmlLink: 'Querying_Abandoned_Wiki_Pages.html',
        pdfLink: 'Querying_Abandoned_Wiki_Pages.pdf',
        description: 'SQL tutorial on how to write a query to generate a list of all abandoned wiki pages in a given wikispace.',
        labels: ['Guide', 'SQL', 'Code Sample'],
        projectDetails: {
            audience: 'entry-level programmers and data scientists.',
            starNotes: 'The doc team I was a part of had created a series of other queries that completed a dashboard identifying documentation metrics and opportunities. I needed to document a query that I had collaborated on with another tech writer to ensure that our users understood the intent and usage of this query. I reviewed the code we had created, tested it as we explored various options with this query. Once we arrived at a good solution, I wrote this document explaining its purpose and documented each line of code in less than a day. This resulted in a clear understanding of the query and its intended usage by our users.',
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
            starNotes: 'The existing document for this topic was badly out of date. I needed to review and revise this document to ensure that it met with the new platform UI and features. I collaborated with another technical writer to overhaul and simplify the content of this document over the course of two months (this was a lower priority project). We would meet weekly do discuss what we had updated or discuss any roadblocks. Upon completion, our customers had a new document for viewing the platform\'s dashboard that was easier to understand, had a better user flow, and filled in blanks that customers were asking for.',
            projectNotes: 'Took existing documentation and collaborated with another technical writer to overhaul and simplify the content as the new UI was published.',
            change: 'Complete the video introduction of the UI that was planned and link it to this document. Additionally, I would have liked to add more details to each of these sections but our project time was cut in half (from six weeks to three weeks).'
        }
    }
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

                    if (samples[j].projectDetails.starNotes) {
                        output += '<li><strong>STAR notes</strong>: ' + samples[j].projectDetails.starNotes + '</li>';
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