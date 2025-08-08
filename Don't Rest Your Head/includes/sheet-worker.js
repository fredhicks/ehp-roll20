// Functions

var uniqueids = {}; // Need this to persist across executions

var generateActuallyUniqueRowID = function() {
	var generated = generateRowID();
	while ( uniqueids[generated] === true ) {
		log("generateActuallyUniqueRowID: " + generated + " is not a unique ID, trying again.");
		generated = generateRowID();
	}
	// log("generateActuallyUniqueRowID: " + generated + " verified as unique, returning.");
	uniqueids[generated] = true;
	return generated;
}; 

var gTBK = function(t) {
	if ( typeof t === "undefined" ) {
		return "";
	} else {
		var result = getTranslationByKey(t);
		// log(`${t} -> ${result}`,"translation")
		if ( result === false ) {
			log("could not translate: " + t);
			// return "UNTRANSLATED ["+t+"]";
			return t; // It's untranslated, but we want it to fail over to the original language
		} else {
			if ( result === "" ) { return ""; }
			else { return result; }
		}
	}
};

const qLists = {
	"standard": [
		"What’s been keeping you awake?",
		"What just happened to you?",
		"What’s on the surface?",
		"What lies beneath?",
		"What’s your path?",
	],
	"badman": [
		"Why can’t you sleep?",
		"What just happened to you?",
		"What do the other kids think of you?",
		"What is home really like?",
		"Why do you deserve to be punished?",
		"What do you wish upon a star for?",
	]
};

var qSetup = function(q) {
	log("qSetup!");
	if ( typeof q !== "undefined" && typeof qLists[q] !== undefined ) {
		var wa = {};
		setAttrs({ "setquestionnaire": "" }); // we want to clear this out real fast so it doesn't glitch!
		qLists[q].forEach( (query) => {
			var stringid = "repeating_questions_" + generateActuallyUniqueRowID();
			wa[`${stringid}_query`] = gTBK(query); 
		});
		setAttrs(wa);
	}
}

// Event Handlers

on("sheet:opened", function(event) {
	log("sheet:opened");
	log(event);
	getAttrs([
		"dryh-sheet-migrated", "scardescription1", "scarbox1", "scardescription2", "scarbox2", "scardescription3", "scarbox3", "scardescription4", "scarbox4", "qawake", "qhappening", "qsurface", "qbeneath", "qpath","madness","tmadness","discipline","exhaustion","setquestionnaire"
	], function(a) {
		var dowrite = false;
		var wa = {}; // write attributes
		log(a);
		["madness","tmadness","exhaustion"].forEach( (n) => {
			log(n); log(a[n]);
			if(typeof(a[n]) == "undefined") {
				wa[n] = 0; dowrite = true;
			}
		});
		log("discipline"); log(a["discipline"]);
		if(typeof(a["discipline"]) == "undefined" || a["discipline"] == "") {
			wa.discipline = 3; dowrite = true;
		}
		if(typeof(a["setquestionnaire"]) !== "undefined" && a["setquestionnaire"] !== "") {
			qSetup(a["setquestionnaire"]);
		}
		if(typeof(a["dryh-sheet-migrated"]) == "undefined") {
			// Then proceed!
			wa["dryh-sheet-migrated"] = "yes"; 
			dowrite = true; 
			[1,2,3,4].forEach( (n) => {
				if( typeof(a["scarbox"+n]) !== "undefined" ) {
					// Then we should create a scar row
					var boxval = a["scarbox"+n];
					var desc = "";
					if( typeof(a["scardescription"+n]) !== "undefined" ) { desc = a["scardescription"+n]; }
					var stringid = "repeating_scars_" + generateActuallyUniqueRowID();
					wa[`${stringid}_description`] = desc; 
					wa[`${stringid}_toggle_box`] = 0; // Creates our starter Scar entry
					if ( boxval == "on" ) {
						wa[`${stringid}_toggle_box`] = 1;
					}
				}
			});
			if( typeof(a["qawake"]) !== "undefined" ) {
				var stringid = "repeating_questions_" + generateActuallyUniqueRowID();
				wa[`${stringid}_query`] = gTBK("What’s been keeping you awake?")
				wa[`${stringid}_response`] = a["qawake"];
			}
			if( typeof(a["qhappening"]) !== "undefined" ) {
				var stringid = "repeating_questions_" + generateActuallyUniqueRowID();
				wa[`${stringid}_query`] = gTBK("What just happened to you?")
				wa[`${stringid}_response`] = a["qhappening"];
			}
			if( typeof(a["qsurface"]) !== "undefined" ) {
				var stringid = "repeating_questions_" + generateActuallyUniqueRowID();
				wa[`${stringid}_query`] = gTBK("What’s on the surface?")
				wa[`${stringid}_response`] = a["qsurface"];
			}
			if( typeof(a["qbeneath"]) !== "undefined" ) {
				var stringid = "repeating_questions_" + generateActuallyUniqueRowID();
				wa[`${stringid}_query`] = gTBK("What lies beneath?")
				wa[`${stringid}_response`] = a["qbeneath"];
			}
			if( typeof(a["qpath"]) !== "undefined" ) {
				var stringid = "repeating_questions_" + generateActuallyUniqueRowID();
				wa[`${stringid}_query`] = gTBK("What’s your path?")
				wa[`${stringid}_response`] = a["qpath"];
			}
		}
		// Got all the attributes to set; set em!
		log(wa);
		if ( dowrite ) { setAttrs(wa); }
	});
});

const dcap = {
	"discipline": 3,
	"madness": 3,
	"tmadness": 6,
	"exhaustion": 6,
	"pain": 15
};

on("clicked:increment clicked:decrement", function(event) {
	log(event.triggerName);
	var tn = event.triggerName;
	var what = event.htmlAttributes.value;
	getAttrs([what], function(a) {
		var val = 0; var sa = {};
		if ( typeof(a[what]) !== "undefined" ) {
			val = Number(a[what]);
		}
		if ( tn == "clicked:increment" ) {
			val++;
			if ( val > dcap[what] ) { val = dcap[what]; }
		}
		if ( tn == "clicked:decrement" ) {
			val--;
			if ( val < 0 ) { val = 0; }
		}
		sa[what] = val;
		setAttrs(sa);
		log(sa);
	});
});

on("clicked:repeating_nightmares:increment clicked:repeating_nightmares:decrement", function(event) {
	log(event.triggerName);
	var tn = event.triggerName;
	var what = event.htmlAttributes.value;
	var whatkey = what;
	var ats = {};
	var rowprefix = "";
	if ( typeof(event.sourceAttribute) !== "undefined" ) {
		rowprefix = (event.sourceAttribute).slice(0,-9); // Strips off the 'increment'
		tn = (event.sourceAttribute).slice(-9); // Leaves only the 'increment'
	}
	what = rowprefix+what;
	getAttrs([what], function(a) {
		var val = 0; var sa = {};
		if ( typeof(a[what]) !== "undefined" ) {
			val = Number(a[what]);
		}
		if ( tn == "increment" ) {
			val++;
			if ( val > dcap[whatkey] ) { val = dcap[whatkey]; }
		}
		if ( tn == "decrement" ) {
			val--;
			if ( val < 0 ) { val = 0; }
		}
		sa[what] = val;
		setAttrs(sa);
		log(sa);
	});
});

on("clicked:mark clicked:repeating_scars:mark", function(event) {
	log("clicked:mark (of some sort)");
	var what = event.htmlAttributes.value;
	var ats = {};
	var rowprefix = "";
	if ( typeof(event.sourceAttribute) !== "undefined" ) {
		rowprefix = (event.sourceAttribute).slice(0,-4); // Strips off the 'mark'
	}
	var atname = rowprefix + "toggle_" + what;
	ats[atname] = 1;
	var numfind = /[0-9]*$/;
	var numfound = numfind.exec(atname);
	var namefind = /^.*seq[^0-9]/;
	var namefound = namefind.exec(atname);
	log(namefound);
	if ( numfound[0] == "" || numfound[0] == "1" || namefound == null ) { 
		setAttrs(ats);
		log(what + " mark");
		log(numfound);
		log(event);
		log(ats);
	} else {
		log("we have a potential sequence");
		var seq = Number(numfound[0]);
		var seqs = []; var s = 0;
		while(seq > 1) {
			seq--;
			seqs[s] = namefound+seq;
			s++;
		}
		log("sequences to retrieve...")
		log(seqs);
		getAttrs(seqs,function(a) {
			for(var i = 0; i < seqs.length; i++) {
				var val = a[seqs[i]];
				if ( val == "0" ) { // We only auto-mark empty boxes, not "itched" ones (val == 2)
					ats[seqs[i]] = "1";
				}
			}
			setAttrs(ats);
			log(namefound);
			log(what + " mark");
			log(numfound);
			log(event);
			log(ats);
		});
	}
});

on("clicked:unmark clicked:repeating_scars:unmark", function(event) {
	log("clicked:unmark (of some sort)");
	var what = event.htmlAttributes.value;
	var ats = {};
	var rowprefix = "";
	if ( typeof(event.sourceAttribute) !== "undefined" ) {
		rowprefix = (event.sourceAttribute).slice(0,-6); // Strips off the 'unmark'
	}
	var atname = rowprefix + "toggle_" + what;
	ats[atname] = 0;

	var numfind = /[0-9]*$/;
	var numfound = numfind.exec(atname);
	var namefind = /^.*seq[^0-9]/;
	var namefound = namefind.exec(atname);
	log(namefound);
	if ( numfound[0] == "" || namefound == null ) { 
		setAttrs(ats);
		log(what + " unmark");
		log(numfound);
		log(event);
		log(ats);
	} else {
		log("we have a potential sequence");
		var seq = Number(numfound[0]);
		var seqs = []; var s = 0;
		while(seq < 41) {
			seq++;
			seqs[s] = namefound+seq;
			s++;
		}
		log(seqs);
		getAttrs(seqs,function(a) {
			log(a);
			for(var i = 0; i < seqs.length; i++) {
				var val = a[seqs[i]];
				if ( val == "1" ) { // We only change it to unmarked if it's normal-marked. If val == "2", then it's "itched" and requires special attention.
					ats[seqs[i]] = "0";
				}
			}
			setAttrs(ats);
			log(namefound);
			log(what + " unmark");
			log(numfound);
			log(event);
			log(ats);
		});
	}
});

on("clicked:strike clicked:repeating_scars:strike", function(event) {
	log("clicked:strike (of some sort)");
	var what = event.htmlAttributes.value;
	var ats = {};
	var rowprefix = "";
	if ( typeof(event.sourceAttribute) !== "undefined" ) {
		rowprefix = (event.sourceAttribute).slice(0,-6); // Strips off the 'strike'
	}
	var atname = rowprefix + "toggle_" + what;
	ats[atname] = 2;

	var numfind = /[0-9]*$/;
	var numfound = numfind.exec(atname);
	if ( numfound[0] == "" ) { 
		setAttrs(ats);
		log(what + " strike");
		log(numfound);
		log(event);
		log(ats);
	}
});

on("clicked:repeating_nightmares:painroll", function(event) {
	log(event.triggerName);
	var what = event.htmlAttributes.value;
	var ats = {};
	var rowprefix = "";
	if ( typeof(event.sourceAttribute) !== "undefined" ) {
		rowprefix = (event.sourceAttribute).slice(0,-8); // Strips off the 'painroll'
	}
	getAttrs([
		rowprefix+"pain",
		rowprefix+"name",
	], function(a) {
		log(a);
		var template = 'default'; // for testing
		var template = 'pcroll'; // for actual
		var rt;
		var rt = "&{template:"+template+"} {{name=^{Pain from} @{"+rowprefix+"name}}} {{pain=[[@{"+rowprefix+"pain}]]}} {{successes=[[0]]}} {{dominates=[[0]]}}";
		var pain = 0;
		if ( typeof(a[rowprefix+"pain"]) !== "undefined" ) {
			pain = Number(a[rowprefix+"pain"]);
		}
		for (let i = 0; i < pain; i++) {
			rt += " {{pain" + (i+1) + "=";
			rt += "[[d6]]";
			rt += "}}";
		}
		log(rt);
		var c = {};
		startRoll(rt, (results) => {
			c.successes = 0;
			c.dominates = 3; // code for Pain
			rv = results.results;

			// log(rv); log('vals'); log(vals);
			
			var pains = [];
			var biggest = 0;

			for (let i = 0; i < pain; i++) {
				if ( rv["pain"+(i+1)].result <= 3 ) {
					c.successes++;
				}
				pains[i] = rv["pain"+(i+1)].result;
				if ( i > biggest ) { biggest = i; }
			}

			pains.sort(function(a,b) { return b - a });
			for (let i = 0; i < pain; i++) {
				c["pain"+(i+1)] = pains[i];
			}

			finishRoll(results.rollId, c);
			log(results);
			log(c);
		});
	});
});

on("clicked:pcroll", function(event) {
	log(event.triggerName);
	getAttrs(["discipline","madness","exhaustion","tmadness","use-etalent","use-mtalent","exhaustiontal","madnesstal"], function(a) {
			var vals = {
				discipline: 0, madness: 0, exhaustion: 0, tmadness: 0
			};
			["discipline","madness","exhaustion","tmadness","use-etalent","use-mtalent"].forEach( (f) => {
				if ( typeof(a[f]) !== "undefined" ) {
					vals[f] = Number(a[f]);
				}
			});
			vals.madness = vals.madness + vals.tmadness;
			// log(vals);

			var template = 'default'; // for testing
			var template = 'pcroll'; // for actual
			var rt = "&{template:"+template+"} {{name=@{character_name} ^{rolls}}} {{successes=[[0]]}} {{dominates=[[0]]}} {{usemtal=[[@{use-mtalent}]]}} {{mtal=@{madnesstal}}} {{useetal=[[@{use-etalent}]]}} {{etal=@{exhaustiontal}}} {{exhaustion=@{exhaustion}}}";

			for (let i = 0; i < vals.discipline; i++) {
				rt += " {{discipline" + (i+1) + "=";
				rt += "[[d6]]";
				rt += "}}";
			}

			for (let i = 0; i < vals.madness; i++) {
				rt += " {{madness" + (i+1) + "=";
				rt += "[[d6]]";
				rt += "}}";
			}

			for (let i = 0; i < vals.exhaustion; i++) {
				rt += " {{exhaustion" + (i+1) + "=";
				rt += "[[d6]]";
				rt += "}}";
			}

			var c = {};
			startRoll(rt, (results) => {
				c.successes = 0;
				c.dominates = "";
				rv = results.results;

				// log(rv); log('vals'); log(vals);
				
				var discipline = [];
				var madness = [];
				var exhaustion = [];
				var biggest = 0;

				for (let i = 0; i < vals.discipline; i++) {
					if ( rv["discipline"+(i+1)].result <= 3 ) {
						c.successes++;
					}
					discipline[i] = rv["discipline"+(i+1)].result;
					if ( i > biggest ) { biggest = i; }
				}

				discipline.sort(function(a,b) { return b - a });
				for (let i = 0; i < vals.discipline; i++) {
					c["discipline"+(i+1)] = discipline[i];
					if ( i > biggest ) { biggest = i; }
				}
				// log(discipline);

				for (let i = 0; i < vals.madness; i++) {
					if ( rv["madness"+(i+1)].result <= 3 ) {
						c.successes++;
					}
					madness[i] = rv["madness"+(i+1)].result;
				}

				madness.sort(function(a,b) { return b - a });
				for (let i = 0; i < vals.madness; i++) {
					c["madness"+(i+1)] = madness[i];
					if ( i > biggest ) { biggest = i; }
				}
				// log(madness);

				for (let i = 0; i < vals.exhaustion; i++) {
					if ( rv["exhaustion"+(i+1)].result <= 3 ) {
						c.successes++;
					}
					exhaustion[i] = rv["exhaustion"+(i+1)].result;
				}

				exhaustion.sort(function(a,b) { return b - a });
				for (let i = 0; i < vals.exhaustion; i++) {
					c["exhaustion"+(i+1)] = exhaustion[i];
					if ( i > biggest ) { biggest = i; }
				}
				// log(exhaustion);

				// Larger pool wins, but if they're on equal footing, discipline beats madness; madness beats exhaustion; exhaustion beats pain
				// Override indicates that something has failed to stay in the running, so all subsequent values of the array should be taken as zero
				var doverride = false; var moverride = false; var eoverride = false;
				// Give dominates an always-wrong value
				c["dominates"] = -1;
				for (let i = 0; i < (biggest+1); i++) {
					var d = 0; m = 0; e = 0;
					if ( doverride ) {
						d = 0;
					} else if ( typeof(discipline[i]) !== "undefined") {
						d = discipline[i];
					}
					if ( moverride ) {
						m = 0;
					} else if ( typeof(madness[i]) !== "undefined") {
						m = madness[i];
					}
					if ( eoverride ) {
						e = 0;
					} else if ( typeof(exhaustion[i]) !== "undefined") {
						e = exhaustion[i];
					}
					
					log("d = "+d+" m = "+m+" e = "+e);
				 // Making this numeric will work better with the roll template. So 0 = discipline, 1 = madness, 2 = exhaustion
					if ( d > m && d > e ) {
						// Then discipline wins
						c["dominates"] = 0; break;
					} else if ( m > d && m > e ) {
						// Then madness wins
						c["dominates"] = 1; break;
					} else if ( e > d && e > m ) {
						// Then exhaustion wins
						c["dominates"] = 2; break;
					} else if ( d > m && d == e ) {
						// Then we have a two-way tie, but we need to flag that m is no longer in the fight.
						moverride = true;
					} else if ( d > e && d == m ) {
						// Then we have a two-way tie, but we need to flag that e is no longer in the fight.
						eoverride = true;
					} else if ( m > d && m == e ) {
						// Then we have a two-way tie, but we need to flag that d is no longer in the fight.
						doverride = true;
					}

				}

				// If we're here and c.dominates still = -1, then it's a tie all the way down for at least two of them, and we need to look at pool identities
				if ( c.dominates == -1 ) {
					if ( ! doverride ) {
						// Then discipline stayed in the running, and wins
						c.dominates = 0;
					} else if ( ! moverride ) {
						// Then discipline didn't stay in the running but madness did, and wins
						c.dominates = 1;
					} else if ( ! eoverride ) {
						// Then neither d or m stayed in the running but e did, and wins
						c.dominates = 2;
					}
				}

				// Also need to check in on exhaustion talent and see if it was used
				log(vals);
				if ( vals["use-etalent"] == 1 ) {
					log("Minor Use");
					// Minor use; enforce minimum value for c.successes
					if ( c.successes < vals.exhaustion ) {
						c.successes = vals.exhaustion;
					}
				} else if ( vals["use-etalent"] == 2 ) {
					// Major use; add value to c.successes
						c.successes += vals.exhaustion;
				}

				finishRoll(results.rollId, c);
				log(results);
				log(discipline);
				log(c);
			});
	});
});

on("clicked:upsort clicked:downsort", function(event) {
	var field = event.htmlAttributes.value;
	var direction = event.triggerName;
	log(event);
	getSectionIDs("repeating_nightmares", function(ids) {
		var sorted = []; var ats = [];
		log(ids); log(field);
		if ( field == "creation" ) {
			ids.sort(function(one,two) { 
				if ( direction == "clicked:upsort" ) {
					return one.localeCompare(two); 
				} else {
					return two.localeCompare(one); 
				}
			});
			log(ids);
			setSectionOrder("nightmares",ids);
		} else {
			for(i = 0; i < ids.length; i++) {
				ats[i] = "repeating_nightmares_"+ids[i]+"_"+field;
			}
			getAttrs(ats, function(a) {
				log(a);
				if ( field == "name" ) {
					ids.sort(function(one,two) { 
						var first = a["repeating_nightmares_"+one+"_"+field].toLowerCase();
						var second = a["repeating_nightmares_"+two+"_"+field].toLowerCase();
						if ( direction == "clicked:upsort" ) {
							return first.localeCompare(second); 
						} else {
							return second.localeCompare(first); 
						}
					});
					log(ids);
				} else if ( field == "pain" ) {
					ids.sort(function(one,two) {
						var first = Number(a["repeating_nightmares_"+one+"_"+field]);
						var second = Number(a["repeating_nightmares_"+two+"_"+field]);
						log(first+" vs "+second);
						if ( direction == "clicked:upsort" ) {
							return(first - second); 
						} else {
							return(second - first); 
						}
						
					});
					log(ids);
				}
				setSectionOrder("nightmares",ids);
			});
		}
	});
});
