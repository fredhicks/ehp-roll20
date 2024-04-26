// Sheetworker for Godkiller

on("clicked:mark", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
	ats[atname] = 1;
	setAttrs(ats);
	log(what + " mark");
});

on("clicked:unmark", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
	ats[atname] = 0;
	setAttrs(ats);
	log(what + " unmark");
});
