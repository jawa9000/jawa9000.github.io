*************************************************************************************
*************************************************************************************
**                                                                                 **
**                                                                                 **
**                     Read me                                                     **
**                     How to update this site and why                             **
**                                                                                 **
*************************************************************************************
*************************************************************************************

NAVIGATION
All navigation is done via the navigation.js file.

ANCHOR LINKS
When creating an anchor, use the class .anchor. This will offset any clicked link from the height of the navigation element. Also, keep the text out of the
anchor's body as the CSS rule that governs this class hides it from the user.
Example: <h1><a class="anchor" name="home"></a>Tutorials</h1>

WRITING TUTORIALS
Use the file called tutorial-template.html and follow the documentation within that file.
Note: in the title element, make sure the term "tutorial" is used. The navigation.js script depends on that term being used to correctly identify the level of
the pages for navigation reasons. "Tutorial" must be at the end of the title tag.

RSS FEEDS ON INDEX.HTML
The index.html file uses a series of third-party RSS feeds to bring in content from my various blogs and flickr accounts.
This system works thanks to this website: http://feed2js.org/index.php?s=build
Setting:
* Show channel? no 
* Number of items to display: 2
* Show/hide item descriptions? How much? 0
* Show item author? no
* Use HTML in item display? yes
* Show item posting date? yes (this is reformatted via a jQuery call on the page)
* Time Zone Offset: feed
* Target links in the new window? n
* UTF-8 Character Encoding: checked
* Podcast enclosures: no (currently not creating or hosting any podcasts)
* Custom CSS Class: varies depending on the feed types
** photo, dev, brew, and lego
