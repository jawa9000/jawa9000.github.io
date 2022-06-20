$(document).ready(function() {
  var sections = [];
  var tabs = $("ul#tabs li").each(function() {
    sections.push($(this).attr("id"));
  });
  //console.log(sections);
  var random = Math.floor(Math.random() * sections.length);
  //console.log(sections[random]);
  $("#" + sections[random]).addClass("active");
  var content = sections[random].slice(0,sections[random].indexOf("-"));
  $("#" + content).addClass("active");
});


// ** fix issue with the timestamp in Tech Writing not displaying like this:
//2015-10-05 07:29:00
// currently it displays like this: 2017-04-14 00:00:00.000-07:00
// Also, the icon for Tech Writing needs to be replaced by a book (not a martini glass)
$("div[class^='rss-box-']").each(function() { // reformat the blog date stamp
  var blogClass = $(this).attr("class");
  if (blogClass == "rss-box-photo") {// reformat blog date stamp from Flickr
    var blogDate = $("." + blogClass + " span.rss-date").text().slice(0,$("." + blogClass + " span.rss-date").text().indexOf(" -"));
    $("." + blogClass + " span.rss-date").text(blogDate);
  } else { // reformat all other time stamps from blogs
    var blogDate = $("." + blogClass + " li.rss-item span.rss-date").text().slice(0,$("." + blogClass + " li.rss-item span.rss-date").text().indexOf("."));
    $("." + blogClass + " li.rss-item span.rss-date").text(blogDate);
  }
});
$(".rss-box-photo ul.rss-items li.rss-item p a").each(function() { // remove element that contains flickr post (user) info
  var temp = $(this).attr("href");
  if (temp == "http://www.flickr.com/people/jawa9000/") {
    $(this).parent().get(0).remove(); //removes poster info (my info)
  }
});
$("span.rss-date").addClass("label label-info"); // add bootstrap formatting around date stamps
$("span.rss-date").each(function() { // for some reason the CRUDtheDocs blogposts don't follow the same rules as the other blogger time stamps
  var spanText = $(this).text(); // get the text of the time stamp
  if (spanText.indexOf('00:00:00.000-') > -1) { // if it has '00:00:00.000-', rebuild the time stamp text
    var timestamp = spanText.slice(0,spanText.indexOf('00:00:00.000-')) + spanText.slice(spanText.indexOf('00:00:00.000-') + 13, spanText.length);
    $(this).text(timestamp);
  }
})
// Bootstrap tabs
$("#myTab a").click(function (e) {
  e.preventDefault();
  $(this).tab("show");
});
