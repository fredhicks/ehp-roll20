var gTBK = function(t) {
	if ( typeof t === "undefined" ) {
		return "";
	} else {
		var result = getTranslationByKey(t);
		// log(`${t} -> ${result}`,"translation")
		if ( result === false ) {
			log("could not translate: " + t);
			return "UNTRANSLATED ["+t+"]";
		} else {
			if ( result === "" ) { return ""; }
			else { return result; }
		}
	}
};

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
	a.view_pbinstructions = 1;
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

on("clicked:checklist", function(event) {
	var source = event.htmlAttributes.value;
	var what = source.replace(/\|.*$/,"");
	var atname = "check_" + what;
	var ats = {};
	ats[atname] = 1;
	if ( what !== source ) { // then there was more
		var field = source.replace(/^.*\|/,"");
		var fname = field.replace(/=.*$/,"");
		var fval = field.replace(/^.*=/,"");
		var isblank = false;
		var blankfield = fval.replace(/^>/,"");
		var gets = [fname];
		if ( blankfield !== fval ) {
			isblank = true;
			gets[1] = blankfield;
		} else {
			fval = gTBK(String(fval));
		}
		getAttrs(gets, function(f) {
			if ( isblank ) { fval = f[blankfield].replace(/^ */,"").replace(/ *$/,""); }
			if ( typeof(fval) !== "undefined" && fval !== "" ) {
				if ( f[fname] == "" ) {
					ats[fname] = fval;
				} else {
					ats[fname] = f[fname] + ", " + fval;
				}
				log(ats);
				setAttrs(ats);
			}
		});
	} else {
		setAttrs(ats);
	}
	log(what + " checked");
});

on("clicked:unchecklist", function(event) {
	var source = event.htmlAttributes.value;
	var what = source.replace(/\|.*$/,"");
	var atname = "check_" + what;
	var ats = {};
	ats[atname] = 0;
	if ( what !== source ) { // then there was more
		var field = source.replace(/^.*\|/,"");
		var fname = field.replace(/=.*$/,"");
		var fval = field.replace(/^.*=/,"");
		var isblank = false;
		var blankfield = fval.replace(/^>/,"");
		var gets = [fname];
		if ( blankfield !== fval ) {
			isblank = true;
			gets[1] = blankfield;
		} else {
			fval = gTBK(String(fval));
		}
		getAttrs(gets, function(f) {
			if ( isblank ) { fval = f[blankfield].replace(/^ */,"").replace(/ *$/,""); }
			if ( typeof(fval) !== "undefined" && fval !== "" ) {
				if ( f[fname] == fval ) {
					ats[fname] = "";
				} else {
					ats[fname] = f[fname];
					ats[fname] = ats[fname].replace(fval + ", ",""); // if there's a comma after it
					ats[fname] = ats[fname].replace(", " + fval,""); // if there's one before it
				}
				setAttrs(ats);
				log(ats);
			}
		});
	} else {
		setAttrs(ats);
	}
	log(what + " unchecked");
});


on("change:condition_blank1_text change:condition_blank2_text change:condition_blank3_text change:condition_blank4_text change:condition_blank5_text change:condition_blank6_text", function(event) {
		log(event);
		var field = event.sourceAttribute; // condition_blank?_text
		var cfield = "check_" + field.replace("_text",""); // check_condition_blank?
		var pval = ""; var nval = "";
		if ( typeof(event.previousValue) !== "undefined" ) {
			pval = event.previousValue.replace(/^ */,"").replace(/ *$/,"");
		}
		if ( typeof(event.newValue) !== "undefined" ) {
			nval = event.newValue.replace(/^ */,"").replace(/ *$/,"");
		}
		getAttrs([cfield,"current_conditions"], function(v) {
			log(v);
			var state = parseInt(v[cfield])||0;
			var ats = {};
			if ( state == 1 ) { // then it was changed while checked
				var ccon = v.current_conditions;
				log("changed while checked " + pval + " --> " + nval);
				if ( ccon == pval ) { // then we just set it to the new value
					ats.current_conditions = nval;
				} else {
					ats.current_conditions = ccon;
					if ( pval !== "" ) {
						ats.current_conditions = ats.current_conditions.replace(", " + pval,"").replace(pval + ", ",""); // if there's a comma after it or before it plus the thing, get rid of that, but only if pval is non-blank!
					}
					if ( nval !== "" ) {
						ats.current_conditions = ats.current_conditions + ", " + nval;
					}
				}
				log(ats);
				setAttrs(ats);
			}
		});
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

on("sheet:opened change:xp", function(event) {
	getAttrs(["xp"], function(v) {
		var current = parseInt(v.xp)||0;
		var a = {};
		if ( current > 7 ) {
			a.xp_advance_active = "1";
		} else {
			a.xp_advance_active = "0";
		}
		setAttrs(a);
	});
});

on("sheet:opened change:ruin", function(event) {
	getAttrs(["ruin"], function(v) {
		var current = parseInt(v.ruin)||0;
		var a = {};
		if ( current > 4 ) {
			a.ruin_advance_active = "1";
		} else {
			a.ruin_advance_active = "0";
		}
		setAttrs(a);
	});
});

on("clicked:rolldicedark", function(event) {
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
			a.expand_roll_bonds = 0; // we don't need to see the bonds unless we want to
			a.bond_mod_summary = "";
			a.bond_mod_result = 0;
			a.bond_mod = 0;
			a.recent_roll_result = results.results.roll.result;
			a.recent_roll = results.results.roll.expression;
			getSectionIDs("bonds", function(s) {
				var fields = [ "recent_roll_result" ];
				for(var i=0; i < s.length; i++) {
					a["repeating_bonds_" + s[i] + "_spend"] = 0;
				}
				setAttrs(a);
				finishRoll(results.rollId);
			});
		});
	});
});

// rolldicecustom is for dice rolls that don't involve spending darkness tokens

on("clicked:rolldicecustom", function(event) {
	var title = event.htmlAttributes.value;
	getAttrs(["custom_bonus"], function(v) {
		var bonus = parseInt(v.custom_bonus)||0;
		if ( bonus > 3 ) { bonus = 3; }
		var exp = "2d6 + " + bonus;
		startRoll("&{template:2d6-roll} {{character=@{character_name}}} {{title="+title+"}} {{expression="+exp+"}} {{roll=[[2d6+"+bonus+"]]}}", function(results) {
			log(results);
			var a = {};
			a.custom_bonus = 0;
			a.view_recent_roll = 1;
			a.expand_roll_bonds = 0; // we don't need to see the bonds unless we want to
			a.bond_mod_summary = "";
			a.bond_mod_result = 0;
			a.bond_mod = 0;
			a.recent_roll_result = results.results.roll.result;
			a.recent_roll = results.results.roll.expression;
			getSectionIDs("bonds", function(s) {
				var fields = [ "recent_roll_result" ];
				for(var i=0; i < s.length; i++) {
					a["repeating_bonds_" + s[i] + "_spend"] = 0;
				}
				setAttrs(a);
				finishRoll(results.rollId);
			});
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
	getAttrs(atlist, function(v) {
		var a = {};
		var spend = parseInt(v[rowprefix+"spend"])||0;
		var points = parseInt(v[rowprefix+"points"])||0;
		if ( spend !== 0 ) { // nothing to do if not spending
			if ( Math.abs(spend) > points ) {
				spend = points * spend / Math.abs(spend); // gets us the signage
				a[rowprefix+"spend"] = spend;
			}
		}
		setAttrs(a,"",function() {
			// Now that we've corrected anything that needs correcting 
			// We may proceed to summarizing the whole deal
			getSectionIDs("bonds", function(s) {
				var fields = [ "recent_roll_result" ];
				for(var i=0; i < s.length; i++) {
					fields[i*3+1] = "repeating_bonds_" + s[i] + "_bondname";
					fields[i*3+2] = "repeating_bonds_" + s[i] + "_points";
					fields[i*3+3] = "repeating_bonds_" + s[i] + "_spend";
				}
				getAttrs(fields, function(f) {
					log(f);
					var result = parseInt(f.recent_roll_result)||0;
					var summary = "";
					var mod = 0;
					for(var i=0; i < s.length; i++) {
						var bn = f["repeating_bonds_" + s[i] + "_bondname"];
						var bs = f["repeating_bonds_" + s[i] + "_spend"];
						bs = parseInt(bs)||0;
						if ( bs != 0 ) {
							if ( summary != "" ) { summary = summary + " "; }
							if ( bs > 0 ) { summary = summary + "+ " }
							if ( bs < 0 ) { summary = summary + "– " }
							summary = summary + Math.abs(bs) + " (" + bn + ")";
							mod = mod + bs;
						}
					}
					if ( summary != "" ) { // then there is a nonzero spend
						summary = result + " " + summary;
						var newresult = result + mod;
						summary = summary + " = " + newresult;
					}
					log(summary);
					var c = {};
					c["bond_mod_summary"] = summary;
					c["bond_mod"] = newresult - result;
					setAttrs(c);
				});
			});
		});
	});
});

on("clicked:spendbonds", function(event) {
	var title = event.htmlAttributes.value;
	// we *could* trust bond_mod, but maybe let's do an actual recalculation
	// just in case. We'll need to adjust the spend field value anyway.
	// I know, I know, we've got repeating code, but there are going to be
	// differences in this one vs the one in change:repeating_bonds:spend
	getSectionIDs("bonds", function(s) {
		var fields = [ "recent_roll_result", "recent_roll" ];
		for(var i=0; i < s.length; i++) {
			fields[i*3+2] = "repeating_bonds_" + s[i] + "_bondname";
			fields[i*3+3] = "repeating_bonds_" + s[i] + "_points";
			fields[i*3+4] = "repeating_bonds_" + s[i] + "_spend";
		}
		getAttrs(fields, function(f) {
			var result = parseInt(f.recent_roll_result)||0;
			var summary = "";
			var mod = 0;
			var c = {};
			for(var i=0; i < s.length; i++) {
				var bn = f["repeating_bonds_" + s[i] + "_bondname"];
				var bs = f["repeating_bonds_" + s[i] + "_spend"];
				var bp = f["repeating_bonds_" + s[i] + "_points"];
				bs = parseInt(bs)||0;
				bp = parseInt(bp)||0;
				if ( bs != 0 && Math.abs(bs) > bp ) { bs = bp * bs / Math.abs(bs); } // signage
				if ( bs != 0 ) {
					if ( summary != "" ) { summary = summary + " "; }
					if ( bs > 0 ) { summary = summary + "+ " }
					if ( bs < 0 ) { summary = summary + "– " }
					summary = summary + Math.abs(bs) + " (" + bn + ")";
					mod = mod + bs;
					c["repeating_bonds_" + s[i] + "_spend"] = 0;
					c["repeating_bonds_" + s[i] + "_points"] = bp - Math.abs(bs);
				}
			}
			if ( summary != "" ) { // then there is a nonzero spend
				summary = result + " " + summary;
				var newresult = result + mod;
				summary = summary + " = " + newresult;
			}
			log(c);
			startRoll("&{template:bondspend} {{character=@{character_name}}} {{title="+title+"}} {{summary="+summary+"}} {{roll=[["+newresult+"]]}}", function(results) {
				c["bond_mod_summary"] = ""; // blank it
				c["bond_mod"] = 0; // zero this out
				c["bond_mod_applied"] = mod;
				c.recent_roll_result = newresult;
				c.recent_roll = f.recent_roll;
				if ( mod > -1 ) { c.recent_roll = c.recent_roll + "+"; }
				c.recent_roll = c.recent_roll + mod;
				c.expand_roll_bonds = 0; // collapse the bonds section, we don't need to be looking at it so much now.
				setAttrs(c);
				finishRoll(results.rollId);
			});
		});
	});
});

on("clicked:addxp", function(event) {
	var what = parseInt(event.htmlAttributes.value)||0;
	var ats = {};
	getAttrs(["xp"], function(v) {
		var xp = parseInt(v.xp)||0;
		xp = xp + what;
		ats.xp = xp;
		setAttrs(ats);
	});
});

on("clicked:addruin", function(event) {
	var what = parseInt(event.htmlAttributes.value)||0;
	var ats = {};
	getAttrs(["ruin"], function(v) {
		var ruin = parseInt(v.ruin)||0;
		ruin = ruin + what;
		ats.ruin = ruin;
		setAttrs(ats);
	});
});

on("clicked:spendxp", function(event) {
	var what = parseInt(event.htmlAttributes.value)||0;
	var ats = {};
	getAttrs(["xp"], function(v) {
		var xp = parseInt(v.xp)||0;
		xp = xp - what;
		if ( xp < 0 ) { xp = 0; }
		ats.xp = xp;
		setAttrs(ats);
	});
});

on("clicked:spendruin", function(event) {
	var what = parseInt(event.htmlAttributes.value)||0;
	var ats = {};
	getAttrs(["ruin"], function(v) {
		var ruin = parseInt(v.ruin)||0;
		ruin = ruin - what;
		if ( ruin < 0 ) { ruin = 0; }
		ats.ruin = ruin;
		setAttrs(ats);
	});
});

on("clicked:adddark", function(event) {
	var what = parseInt(event.htmlAttributes.value)||0;
	var ats = {};
	getAttrs(["darkness_tokens"], function(v) {
		var dark = parseInt(v.darkness_tokens)||0;
		dark = dark + what;
		ats.darkness_tokens = dark;
		setAttrs(ats);
	});
});

on("clicked:spenddark", function(event) {
	var what = parseInt(event.htmlAttributes.value)||0;
	var ats = {};
	getAttrs(["darkness_tokens"], function(v) {
		var dark = parseInt(v.darkness_tokens)||0;
		dark = dark - what;
		if ( dark < 0 ) { dark = 0; }
		ats.darkness_tokens = dark;
		setAttrs(ats);
	});
});


