// Behold, the Script Worker for Stewpot

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

on("clicked:mark_cuisine clicked:mark_atmosphere clicked:mark_service", function(event) {
	log(event);
	var what = event.htmlAttributes.name;
	what = what.replace(/act_mark_/,"radio_");
	var val  = event.htmlAttributes.value;
	var ats = {};
	ats[what] = val;
	setAttrs(ats);
	log(ats);
});

on("change:select_character_weapon change:select_character_armor change:select_character_quirk change:select_axp1 change:select_axp2 change:select_axp3 change:select_txp0 change:select_txp1 change:select_txp2 change:select_txp3", function(event) {
	log(event);
	var atname = event.triggerName;
	atname = atname.replace(/select_/,"");
	var ats = {};
	if ( typeof(event.newValue) !== "undefined" && event.newValue !== "" ) { 
		ats[atname] = event.newValue; 
		ats[event.triggerName] = "";
		setAttrs(ats);
		log(ats);
	}
});

