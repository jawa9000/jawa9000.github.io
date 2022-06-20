/*
 * Note
 * for this to work, the images used on tutorial pages (or other locations) must adhere to the following guidelines:
 * * must use the .imgThumbnail class
 * * the img element must use Bootstrap modal attributes (data-toggle="modal" data-target=".<id>")
 * * data-target attribute must match (case sensitive) the id used on the image element
 * * the target page must have an div with the id of modal-container located right above the footer
 * 
 * Sample img element:
 * <img src="images/2D/fine_art/HERA4.jpg" id="HERA4" class="imgThumbnail" title="Hera4" data-toggle="modal" data-target=".HERA4" />
 */
var message = "";		
var thumbnails = $("img.imgThumbnail");
//console.log(thumbnails);

for (var i = 0; i < thumbnails.length; i++) {
	var temp = thumbnails[i];
	// temp.id, temp.title, temp.src
	//console.log(temp.id);
	buildModals(temp.id,temp.id,temp.title,temp.src);
}
function buildModals(target,id,title,image) {
	// name should be one word
	// id is the unique id of the modal title element
	// title is the text that appears in the modal header
	// image is the path to the image
	var imagePath = $("img#" + target).attr("src");
	message += "<div class='modal fade " + target + " imageModal' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel' aria-hidden='true'>";
	message += "<div class='modal-dialog modal-lg'>";
	message += "<div class='modal-content'>";
	message += "<div class='modal-header'>";
	message += "<button type='button' class='close' data-dismiss='modal'>";
	message += "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>";
	message += "</button>";
	message += "<h4 class='modal-title' id='" + id + "'>" + title + "</h4>";
	message += "</div>";
	message += "<div class='modal-body'>";
	message += "<img src='" + image + "' />";
	message += "</div></div></div></div>";
	document.getElementById("modal-container").innerHTML = message;
}