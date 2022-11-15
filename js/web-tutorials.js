$(document).ready(function() {
	$("div[id^='expandTitle']").each(function(i, obj) { // read the elements and determine if the block is expanded or hidden and take the initial action
		var openClosed = $(this).attr('status');
		if (openClosed == 'hidden') {
			var titleId = $(this).attr("id");
			var siblingId = $("#" + titleId + " ~ div").attr("id");

			if ($("#" + titleId + " span").hasClass("arrow")) {
				$("#" + titleId + " span").addClass("arrowOpen"); // handle the arrow's display
			}

			$("#" + siblingId).slideUp("fast");
		}
	}); 

	$("div[id^='expandTitle']").click(function() { // on click of an expandable section, open/collapse it
		var titleId = $(this).attr("id");
		var siblingId = $("#" + titleId + " ~ div").attr("id");
		var status = $(this).attr("status");
		if (status == "hidden") {
			if ($("#" + titleId + " span").hasClass("arrow")) {
				$("#" + titleId + " span").addClass("arrowOpen"); // handle the arrow's display
			}

			$("#" + siblingId).slideDown("fast");
			$(this).attr("status","open");
			// Cookie.set(titleId,"open");
		} else {
			if ($("#" + titleId + " span").hasClass("arrow")) {
				$("#" + titleId + " span").removeClass("arrowOpen"); // handle the arrow's display
			}

			$("#" + siblingId).slideUp("fast");
			$(this).attr("status","hidden");
			// Cookie.set(titleId,"hidden");
		}
	});
	
	// ** Note: the cookie routine seems to be broken.
	
	// Code blocks: within each unique code block, count the number of elements and display that number in front of each element
	var codeExamples = []; // array to hold all code block ids
	var prefix = "";
	for (var i = 0; i < $("code[id^='code']").length; i++) { // find all code block ids
		var id = $("code[id*='code']")[i].id;
		codeExamples.push(id);
	}
	for (i in codeExamples) { // loop through all code blocks
		$("code#" + codeExamples[i] + " div").each(function(i) { // within each unique code block, loop through it's div elements
			if (i >= 0 && i < 9) {
				$(this).prepend("<strong>00" + (i + 1) + " </strong>"); // count the number of elements and display that number in front of it.
			} else if (i >= 9 && i <= 99) {
				$(this).prepend("<strong>0" + (i + 1) + " </strong>"); // count the number of elements and display that number in front of it.
			}
		});
	}
});