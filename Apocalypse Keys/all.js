const exclusives = {
	"summoned": [ "Sometimes, I Get Angry" ]
};

on("change:playbook", function(event) {
	log(event);
	var nv;
	if ( typeof(event.newValue) == "undefined" ) { nv = ""; } else { nv = event.newValue; }
	log("changed playbook to " + nv );
	var pbs = Object.keys(exclusives);
	var a = {};
	for(var i = 0; i < pbs.length; i++ ) {
		if ( typeof(exclusives[pbs[i]]) !== "undefined" ) {
			for(var j = 0; j < exclusives[pbs[i]].length; j++) {
				var state = 0;
				if ( nv == pbs[i] ) { // then it's the activated playbook
					state = 1;
				}
				var movekey = exclusives[pbs[i]][j];
				movekey = movekey.toLowerCase();
				movekey = movekey.replace(/[^a-z0-9]/g,"_");
				a["view_"+movekey] = state;
			}
		}
	}
	log(a);
	setAttrs(a);
});

on("clicked:expand", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "expand_" + what;
	var ats = {};
	ats[atname] = 1;
	setAttrs(ats);
	log(what + " expanded");
});

on("clicked:contract", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "expand_" + what;
	var ats = {};
	ats[atname] = 0;
	setAttrs(ats);
	log(what + " contract");
});

on("clicked:check", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "check_" + what;
	var view = "view_" + what;
	var ats = {};
	ats[atname] = 1;
	ats[view] = 1;
	setAttrs(ats);
	log(what + " checked");
});

on("clicked:uncheck", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "check_" + what;
	var unview = "view_" + what;
	var ats = {};
	ats[atname] = 0;
	ats[unview] = 0;
	setAttrs(ats);
	log(what + " unchecked");
});

on("clicked:view", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "view_" + what;
	var ats = {};
	ats[atname] = 1;
	setAttrs(ats);
	log(what + " view");
});

on("clicked:unview", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "view_" + what;
	var ats = {};
	ats[atname] = 0;
	setAttrs(ats);
	log(what + " unview");
});

on("sheet:opened change:darkness_spend change:darkness_tokens", function(event) {
	getAttrs(["darkness_spend","darkness_tokens"], function(v) {
		var current = parseInt(v.darkness_tokens)||0;
		var spend = parseInt(v.darkness_spend)||0;
		var a = {};
		if ( spend > 3 ) { 
			a.darkness_spend = 3;
			spend = 3; 
		}
		if ( spend > current ) { 
			a.darkness_spend = current;
		}
		if ( current > 4 ) {
			a.torn_between_active = "1";
		} else {
			a.torn_between_active = "0";
		}
		setAttrs(a);
	});
});

on("clicked:rolldice", function(event) {
	var title = event.htmlAttributes.value;
	getAttrs(["darkness_spend","darkness_tokens"], function(v) {
		var current = parseInt(v.darkness_tokens)||0;
		var spend = parseInt(v.darkness_spend)||0;
		if ( spend > 3 ) { spend = 3; }
		if ( spend > current ) { spend = current; }
		var exp = "2d6 + " + spend;
		startRoll("&{template:2d6-roll} {{character=@{character_name}}} {{title="+title+"}} {{expression="+exp+"}} {{roll=[[2d6+"+spend+"]]}}", function(results) {
			log(results);
			var a = {};
			a.darkness_tokens = current - spend;
			a.darkness_spend = 0;
			a.view_recent_roll = 1;
			a.expand_roll_bonds = 1;
			a.recent_roll_result = results.results.roll.result;
			a.recent_roll = results.results.roll.expression;
			setAttrs(a);
			finishRoll(results.rollId);
		});
	});
});

on("change:repeating_bonds:spend", function(e) {
	// Strips off the "spend"
	const rowprefix = (e.sourceAttribute).slice(0,-5); 
	// Couple things to do here:
	// • One is to make sure the amount is within the bounds of the 
	//   limiting attr_points current value of the bond's strength
	// • Another is to run through *all* of the rows in the set
	//   to tally up the total spend and produce a text summary of it
	var atlist = [ rowprefix+"spend", rowprefix+"points" ];
	log(atlist)
});



