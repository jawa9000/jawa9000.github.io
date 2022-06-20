// randomized header quotes
var QUOTE = [
	["Brian likes cheese."], //0
	["Brian is a loving and caring father and husband."], //1
	["Check out Brian's <a href='http://technoscribblesbybimmel.blogspot.com/'>technical writing blog</a>!"], //2
	["Brian enjoys a good bicycle ride on the weekends."], //3
	["Check out Brian's latest web dev find on his <a href='http://bimmelwebdevelopment.blogspot.com/'>web dev blog</a>."], //4
	["Favorite quote: &quot;When you do things right, people won't be sure you you've done anything at all&quot; - God Entity to Bender"], //5
	["&quot;Everything is awesome!&quot;"], //6
	["<i>Click, click</i>"], //7
	["Brian loves to get lost..."], //8
	["\"I don't alway test my code but when I do, I do it production.\" - some developer genius"],
	["Programmer humor: #titanic {float: none;}"],
	["/* no comment */"],
	["Things aren't always #000000 and #ffffff"],
	["Don't be afraid to go slowly. Be afraid of stopping. - Buddhist saying"],
	["Don't speak if it doesn't improve on silence. - Buddhist saying"],
	["Don't be afraid that you do not know something. Be afraid of not learning about it. - Buddhist saying"],
	["If you've made a mistake, it's better just to laugh at it. - Buddhist saying"],
	["The bets time to plant a tree was 20 years ago. The second best time is now. - Buddhist saying"],
];
var ABOUT = [
	["Who doesn't like (good) cheese?"], //0
	["While it is true that Brian loves his family, he loves spending time with them even more."], //1
	["What started out as a mild interest, home brewing has become a semi-serious hobby for Brian."], //2
	["One of Brian's favorite hobbies is road cycling for hours on end which is then rewarded with his second favorite hobby of enjoying a good home brew."], //3
	["Brian's web development blog contains a series of useful links, thoughts about his experience in web development, and tutorials he has written as they relate to web development."], //4
	["Yes, Brian enjoys Futurama as well as geeky comics like xkcd, Saturday Morning Breakfast Cereal, and The Oatmeal."], //5
	["When no one is looking (his wife and son), Brian can be found drooling over Lego sets and building a few from time to time. His inspirations can be found in his <a href='http://bimmelsbrick.blogspot.com/'>Lego blog</a>."], //6
	["Brian has studied photography for many years in academic and post-academic settings. Today, he focuses his camera mostly on his son, family, and regional hiking trips. Check out his photo stream on <a href='https://www.flickr.com/photos/jawa9000/'>Flickr</a>."], //7
	["...On the trails that is. He finds his center and calm easiest on a day hike through any one of Pacific Northwest's beautiful parks."] //8
];

var randomQuote = Math.floor(Math.random() * QUOTE.length);
$("#quote").html(QUOTE[randomQuote]);
$("#about").html(ABOUT[randomQuote]);
