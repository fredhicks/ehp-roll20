// Behold, the Script Worker for Streets of Jade

on("clicked:mark clicked:repeating_goals:mark clicked:repeating_favors:mark clicked:repeating_assets:mark clicked:repeating_factiongifts:mark clicked:repeating_gifts:mark clicked:repeating_command:mark clicked:repeating_officers:mark clicked:repeating_goals:mark clicked:repeating_favors:mark clicked:repeating_factionfavors:mark", function(event) {
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
	var namefind = /^.*[^0-9]/;
	var namefound = namefind.exec(atname);
	if ( numfound[0] == "" || numfound[0] == "1" ) { 
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

on("clicked:unmark clicked:repeating_goals:unmark clicked:repeating_favors:unmark clicked:repeating_assets:unmark clicked:repeating_factiongifts:unmark clicked:repeating_gifts:unmark clicked:repeating_command:unmark clicked:repeating_officers:unmark clicked:repeating_goals:unmark clicked:repeating_favors:unmark clicked:repeating_factionfavors:unmark", function(event) {
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
	var namefind = /^.*[^0-9]/;
	var namefound = namefind.exec(atname);
	if ( numfound[0] == "" ) { 
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

on("clicked:itch", function(event) {
	log("clicked:itch");
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
	ats[atname] = 2;
	setAttrs(ats);
	log(what + " itch");
});

on("change:roll-main-skill change:roll-second-skill", function(e) {
	log("change:roll-main-skill change:roll-second-skill");
	var ats = {};
	getAttrs([
		"roll-main-skill", "roll-second-skill",
		"skill-arts-oration-die", "skill-blood-valor-die",
		"skill-craft-reason-die", "skill-resolve-spirit-die"
	],function(a) {
		log(a);
		// Default to emptying out the die-value fields for setAttrs later
		ats['roll-main-skill-die'] = "";
		ats['roll-second-skill-die'] = "";
		// Can't pick the same skill twice, that's silly
		if ( a['roll-second-skill'] !== "" && a['roll-main-skill'] === a['roll-second-skill'] ) {
			a['roll-second-skill'] = "";
			ats['roll-second-skill'] = "";
		}
		if ( a['roll-main-skill'] !== "" ) {
			if ( typeof(a['skill-'+a['roll-main-skill']+'-die']) !== "undefined" ) {
				ats['roll-main-skill-die'] = a['skill-'+a['roll-main-skill']+'-die'];
			}
		}
		if ( a['roll-second-skill'] !== "" ) {
			if ( typeof(a['skill-'+a['roll-second-skill']+'-die']) !== "undefined" ) {
				ats['roll-second-skill-die'] = a['skill-'+a['roll-second-skill']+'-die'];
			}
		}
		log(ats);
		setAttrs(ats);
	});
});

on("change:roll-jade-1 change:roll-jade-2", function(e) {
	log("change:roll-jade-1 change:roll-jade-2");
	var ats = {};
	var ga = ["roll-jade-1", "roll-jade-2"];
	const jades = ["Channeling","Deflection","Lightness","Perception","Steel","Strength"];
	var gs = ga.length;
	jades.forEach( (entry) => {
		ga[gs] = "jade-"+entry+"-die-1";
		gs++;
		ga[gs] = "jade-"+entry+"-die-2";
		gs++;
		ga[gs] = "jade-"+entry+"-die-3";
		gs++;
	});
	log(ga);

	getAttrs(ga,function(a) {
		log(a);
		// Default to emptying out the die-value fields for setAttrs later
		ats['roll-jade-1-die-1'] = "";
		ats['roll-jade-1-die-2'] = "";
		ats['roll-jade-1-die-3'] = "";
		ats['roll-jade-2-die-1'] = "";
		ats['roll-jade-2-die-2'] = "";
		ats['roll-jade-2-die-3'] = "";
		// Can't pick the same skill twice, that's silly
		if ( a['roll-jade-2'] !== "" && a['roll-jade-1'] === a['roll-jade-2'] ) {
			a['roll-jade-2'] = "";
			ats['roll-jade-2'] = "";
		}
		if ( a['roll-jade-1'] !== "" ) {
			if ( typeof(a['jade-'+a['roll-jade-1']+'-die-1']) !== "undefined" ) {
				ats['roll-jade-1-die-1'] = a['jade-'+a['roll-jade-1']+'-die-1'];
			}
			if ( typeof(a['jade-'+a['roll-jade-1']+'-die-2']) !== "undefined" ) {
				ats['roll-jade-1-die-2'] = a['jade-'+a['roll-jade-1']+'-die-2'];
			}
			if ( typeof(a['jade-'+a['roll-jade-1']+'-die-3']) !== "undefined" ) {
				ats['roll-jade-1-die-3'] = a['jade-'+a['roll-jade-1']+'-die-3'];
			}
		}
		if ( a['roll-jade-2'] !== "" ) {
			if ( typeof(a['jade-'+a['roll-jade-2']+'-die-1']) !== "undefined" ) {
				ats['roll-jade-2-die-1'] = a['jade-'+a['roll-jade-2']+'-die-1'];
			}
			if ( typeof(a['jade-'+a['roll-jade-2']+'-die-2']) !== "undefined" ) {
				ats['roll-jade-2-die-2'] = a['jade-'+a['roll-jade-2']+'-die-2'];
			}
			if ( typeof(a['jade-'+a['roll-jade-2']+'-die-3']) !== "undefined" ) {
				ats['roll-jade-2-die-3'] = a['jade-'+a['roll-jade-2']+'-die-3'];
			}
		}
		log(ats);
		setAttrs(ats);
	});
});


// Command Skirmish jade -- you just pick one
on("change:repeating_command:faction-roll-jade change:repeating_officers:faction-roll-jade", function(e) {
	log("change:repeating_command:faction-roll-jade");
	rowprefix = '';
	if ( typeof(e.sourceAttribute) !== "undefined" ) {
		rowprefix = (e.sourceAttribute).slice(0,-17); // Strips off the 'faction-roll-jade'
	}
	var ats = {};
	var ga = [rowprefix+"faction-roll-jade"];
	const jades = ["Channeling","Deflection","Lightness","Perception","Steel","Strength"];
	var gs = ga.length;
	jades.forEach( (entry) => {
		ga[gs] = rowprefix+"jade-dice-"+entry;
		gs++;
	});
	
	log("\n\n\n"); log(ga);

	getAttrs(ga,function(a) {
		log("\n\n\n"); log(a);
		// Default to emptying out the die-value fields for setAttrs later
		ats[rowprefix+'roll-jade-die-1'] = "";
		ats[rowprefix+'roll-jade-die-2'] = "";
		ats[rowprefix+'roll-jade-die-3'] = "";
		if ( a[rowprefix+'faction-roll-jade'] !== "" ) {
			var id = rowprefix+'jade-dice-'+a[rowprefix+'faction-roll-jade'];
			log(id);
			if ( typeof(a[id]) !== "undefined" ) { 
				var num = Number(a[id]);
				if ( num >= 1 ) { ats[rowprefix+'roll-jade-die-1'] = 4; }
				if ( num >= 2 ) { ats[rowprefix+'roll-jade-die-2'] = 4; }
				if ( num >= 3 ) { ats[rowprefix+'roll-jade-die-3'] = 4; }
			}
		}

		log("ats ="); log(ats);
		setAttrs(ats);
	});
	
});


// Command Skirmish reset

on("clicked:repeating_command:resetskirmish clicked:repeating_officers:resetskirmish", (e) => {
	log("clicked:resetskirmish");
	rowprefix = '';
	if ( typeof(e.sourceAttribute) !== "undefined" ) {
		rowprefix = (e.sourceAttribute).slice(0,-13); // Strips off the 'resetskirmish'
	}
	var ats = {};
	ats[rowprefix+"roll-jade-die-1"] = "";
	ats[rowprefix+"roll-jade-die-2"] = "";
	ats[rowprefix+"roll-jade-die-3"] = "";
	ats[rowprefix+"faction-roll-jade"] = "";
	setAttrs(ats);
});

// Command Skirmish
on("clicked:repeating_command:skirmishroll clicked:repeating_officers:skirmishroll clicked:repeating_assets:skirmishroll", (e) => {
	log("clicked:skirmishroll");
	log("e = "); log(e);
	var ftype = "Command";
	var offcheck = /repeating_officers/;
	var asscheck = /repeating_assets/;
	var isofficer = offcheck.exec(e.triggerName);
	log("\n\nisofficer"); log(isofficer);
	if ( isofficer !== null ) {
		ftype = "Officer";
	}
	var isasset = asscheck.exec(e.triggerName);
	log("\n\nisasset"); log(isasset);
	if ( isasset !== null ) {
		ftype = "Asset";
	}

	var rowprefix = '';
	if ( typeof(e.sourceAttribute) !== "undefined" ) {
		rowprefix = (e.sourceAttribute).slice(0,-12); // Strips off the 'skirmishroll'
	}
	var template = 'default'; // for testing
	var template = 'skirmish'; // for actual
	var rt = "&{template:"+template+"} {{name=@{"+rowprefix+"name} ^{skirmishes}}} {{total=[[0]]}} {{itches=[[0]]}} {{die-total=[[0]]}} {{jadedie-total=[[0]]}} {{die-size=@{skirmish-die}}} {{jade-count}}";
	var alist = [
		rowprefix+"die1",
		rowprefix+"die2",
		rowprefix+"die3",
		rowprefix+"die4",
		rowprefix+"asset-value",
		rowprefix+"faction-roll-jade", // the discipline indicator
		rowprefix+"roll-jade-die-1", // the actual dice
		rowprefix+"roll-jade-die-2",
		rowprefix+"roll-jade-die-3"
	];
	getAttrs(alist, function(a) {

		if ( typeof(a[rowprefix+"asset-value"]) !== "undefined" && a[rowprefix+"asset-value"] !== "" ) {
			rt += " {{die-name=^{"+ftype+"}}} {{asset-size="+a[rowprefix+"asset-value"]+"}}{{asset-value=[["+a[rowprefix+"asset-value"]+"]]}}";
		}

		if ( typeof(a[rowprefix+"die1"]) !== "undefined" && a[rowprefix+"die1"] !== "" ) {
			rt += " {{die-name=^{"+ftype+"}}}";
			[1,2,3,4].forEach( (dice) => {
				if ( typeof(a[rowprefix+"die"+dice]) !== "undefined" && a[rowprefix+"die"+dice] !== "" ) {
					rt += " {{skirmish-die"+dice+"-size="+a[rowprefix+"die"+dice]+"}}";
					rt += " {{skirmish-die"+dice+"=[[d"+a[rowprefix+"die"+dice]+"]]}}";
				}
			});
		}

		var jcount = 0;
		if ( typeof(a[rowprefix+"faction-roll-jade"]) !== "undefined" && a[rowprefix+"faction-roll-jade"] !== "" ) {
			[1,2,3].forEach( (jade) => {
				if ( a[rowprefix+"roll-jade-die-"+jade] !== "" ) {
					jcount++;
					rt += " {{jade"+jade+"=[[d"+a[rowprefix+"roll-jade-die-"+jade]+"]]}}";
				}
			} );
			rt += " {{jade-name=^{"+a[rowprefix+"faction-roll-jade"]+"}}} {{jade-count="+jcount+"}}";
		}
		log(rt);

		startRoll(rt, (results) => {
			log(results);
			var ds = results.results;
			var d1 = 0; var j1 = 0; var c = { };
			c["total"] = 0; // to become computed::total in the rolltemplate

			// Splits into two parts:
			// "Normal" dice from which you select the highest;
			// Jade dice from which you add the highest.
			// Jade dice must also be checked for doubles.

			// Normal Dice
			const normaldice = ["asset-value","skirmish-die1","skirmish-die2","skirmish-die3","skirmish-die4"];

			normaldice.forEach( (dname) => {
				if ( typeof(ds[dname]) !== "undefined" ) {
					var result = ds[dname].result;
					if ( result > d1 ) {
						log("use "+dname+" in result");
						d1 = result; // New topmost
					}
				}
			});

			// Jade
			const jadedice = ["jade1","jade2","jade3"];
			var itcheck = [0,0,0,0];
			c["itches"] = 0;
			jadedice.forEach( (dname) => {
				log(dname);
				if ( typeof(ds[dname]) !== "undefined" ) {
					var result = ds[dname].result;
					if ( result > j1 ) {
						j1 = result; // New highest
					}
					itcheck[result]++;
					if ( itcheck[result] > 1 ) {
						log("itches detected on jade dice showing " + result);
						c["itches"] = 1;
					}
				}
			});

			// Tally
			c["total"] = d1+j1;
			c["die-total"] = d1;
			c["jadedie-total"] = j1;

			log(c);

			finishRoll(results.rollId, c);
		});


	});
});


// PC Skirmish jade -- you just pick one
on("change:roll-jade", function(e) {
	log("change:roll-jade");
	var ats = {};
	var ga = ["roll-jade"];
	const jades = ["Channeling","Deflection","Lightness","Perception","Steel","Strength"];
	var gs = ga.length;
	jades.forEach( (entry) => {
		ga[gs] = "jade-"+entry+"-die-1";
		gs++;
		ga[gs] = "jade-"+entry+"-die-2";
		gs++;
		ga[gs] = "jade-"+entry+"-die-3";
		gs++;
	});
	log(ga);

	getAttrs(ga,function(a) {
		log(a);
		// Default to emptying out the die-value fields for setAttrs later
		ats['roll-jade-die-1'] = "";
		ats['roll-jade-die-2'] = "";
		ats['roll-jade-die-3'] = "";
		if ( a['roll-jade'] !== "" ) {
			if ( typeof(a['jade-'+a['roll-jade']+'-die-1']) !== "undefined" ) {
				ats['roll-jade-die-1'] = a['jade-'+a['roll-jade']+'-die-1'];
			}
			if ( typeof(a['jade-'+a['roll-jade']+'-die-2']) !== "undefined" ) {
				ats['roll-jade-die-2'] = a['jade-'+a['roll-jade']+'-die-2'];
			}
			if ( typeof(a['jade-'+a['roll-jade']+'-die-3']) !== "undefined" ) {
				ats['roll-jade-die-3'] = a['jade-'+a['roll-jade']+'-die-3'];
			}
		}
		log(ats);
		setAttrs(ats);
	});
});

// PC Skirmish die choice
on("change:skirmish-die-choice", function(e) {
	log("change:skirmish-die-choice");
	log(e);
	var ats = {};
	ats["toggle_other-die-show"] = 0;
	ats["skirmish-die"] = "";
	if ( typeof(e.newValue) !== "undefined" ) {
		if ( e.newValue == "other" ) {
			// Then we need to do other stuff about die selection
			ats["toggle_other-die-show"] = 1;
			setAttrs(ats);
		} else {
			// e.newValue should contain the actual name of an attribute that contains a die value
			getAttrs([e.newValue],function(a) {
				ats["skirmish-die"] = a[e.newValue];
				setAttrs(ats);
			});
		}
	} else {
		setAttrs(ats);
	}
});

// Skirmish reset

on("clicked:resetskirmish", (info) => {
	log("clicked:resetskirmish");
	var ats = {};
	ats["toggle_other-die-show"] = 0;
	ats["skirmish-die-choice"] = "";
	ats["skirmish-die"] = "";
	ats["roll-jade"] = "";
	setAttrs(ats);
});


// Contest reset

on("clicked:rollreset", (info) => {
	log("clicked:rollreset")
	var alist = {
		"toggle_roll-family-die": 1,
		"roll-main-skill": "",
		"roll-main-skill-die": "",
		"roll-second-skill": "",
		"roll-second-skill-die": "",
		"toggle_roll-reputation": 0,
		"toggle_roll-reputation2": 0,
		"roll-advantage1": "",
		"roll-advantage2": "",
		"roll-advantage3": "",
		"roll-advantage4": "",
		"roll-advantage5": "",
		"roll-advantage6": "",
		"roll-advantage7": "",
		"roll-advantage8": "",
		"roll-advantage9": "",
		"roll-advantage10": "",
		"roll-support": "",
		"roll-backing": "",
		"roll-asset-value": "",
		"roll-jade-1": "",
		"roll-jade-1-die-1": "",
		"roll-jade-1-die-2": "",
		"roll-jade-1-die-3": "",
		"roll-jade-2": "",
		"roll-jade-2-die-1": "",
		"roll-jade-2-die-2": "",
		"roll-jade-2-die-3": "",
	};
	setAttrs(alist);
});

// PC Skirmish
on("clicked:skirmishroll", (info) => {
	log("clicked:skirmishroll");
	var template = 'default'; // for testing
	var template = 'skirmish'; // for actual
	var rt = "&{template:"+template+"} {{name=@{given-name} ^{skirmishes}}} {{total=[[0]]}} {{itches=[[0]]}} {{die-total=[[0]]}} {{jadedie-total=[[0]]}} {{die-size=@{skirmish-die}}} {{jade-count}}";
	var alist = [
		"skirmish-die-choice", // die source indicator
		"skirmish-die", // the actual die
		"roll-jade", // the discipline indicator
		"roll-jade-die-1", // the actual dice
		"roll-jade-die-2",
		"roll-jade-die-3"
	];
	getAttrs(alist, function(a) {
		if ( a["skirmish-die-choice"] !== "" ) {
			rt += " {{skirmish-die=[[d"+a["skirmish-die"]+"]]}}";
			rt += " {{die-name=^{"+a["skirmish-die-choice"]+"}}} "
		}
		var jcount = 0;
		if ( a["roll-jade"] !== "" ) {
			[1,2,3].forEach( (jade) => {
				if ( a["roll-jade-die-"+jade] !== "" ) {
					jcount++;
					rt += " {{jade"+jade+"=[[d"+a["roll-jade-die-"+jade]+"]]}}";
				}
			} );
			rt += " {{jade-name=^{"+a["roll-jade"]+"}}} {{jade-count="+jcount+"}}";
		}
		log(rt);

		startRoll(rt, (results) => {
			log(results);
			var ds = results.results;
			var d1 = 0; var j1 = 0; var c = { };
			c["total"] = 0; // to become computed::total in the rolltemplate

			// Splits into two parts:
			// "Normal" dice from which you select the highest;
			// Jade dice from which you add the highest.
			// Jade dice must also be checked for doubles.

			// Normal Dice
			const normaldice = ["skirmish-die"];

			normaldice.forEach( (dname) => {
				if ( typeof(ds[dname]) !== "undefined" ) {
					var result = ds[dname].result;
					if ( result > d1 ) {
						log("use "+dname+" in result");
						d1 = result; // New topmost
					}
				}
			});

			// Jade
			const jadedice = ["jade1","jade2","jade3"];
			var itcheck = [0,0,0,0];
			c["itches"] = 0;
			jadedice.forEach( (dname) => {
				log(dname);
				if ( typeof(ds[dname]) !== "undefined" ) {
					var result = ds[dname].result;
					if ( result > j1 ) {
						j1 = result; // New highest
					}
					itcheck[result]++;
					if ( itcheck[result] > 1 ) {
						log("itches detected on jade dice showing " + result);
						c["itches"] = 1;
					}
				}
			});

			// Tally
			c["total"] = d1+j1;
			c["die-total"] = d1;
			c["jadedie-total"] = j1;

			log(c);

			finishRoll(results.rollId, c);
		});


	});
});

// Actually roll the dice for a contest

on("clicked:jaderoll", (info) => {
	log("clicked:jaderoll");

	var template = 'default'; // for testing
	var template = 'jaderoll'; // for actual

	// Lessons in figuring out how to use startRoll/finishRoll properly:
	// - You can't access computed::<variable> in the rolltemplate if there wasn't already a {{<variable>=[[<die-or-value>]]}} in the roll text (variable designated rt in this code)

	var rt = "&{template:"+template+"} {{name=@{given-name} ^{rolls}}} {{total=[[0]]}} {{itches=[[0]]}} {{firstdie-total=[[0]]}} {{seconddie-total=[[0]]}} {{jadedie-total=[[0]]}} {{firstdie-name=[[0]]}} {{seconddie-name=[[0]]}}";
	var alist = [
		"toggle_roll-family-die", "family-name-die",
		"roll-main-skill", "roll-main-skill-die",
		"roll-second-skill", "roll-second-skill-die",
		"toggle_roll-reputation", "reputation-die",
		"toggle_roll-reputation2", "reputation-plus-die",
		"roll-advantage1", "roll-advantage2", "roll-advantage3", "roll-advantage4", "roll-advantage5", "roll-advantage6", "roll-advantage7", "roll-advantage8", "roll-advantage9", "roll-advantage10",
		"roll-support",
		"roll-backing",
		"roll-asset-value",
		"roll-jade-1", "roll-jade-1-die-1", "roll-jade-1-die-2", "roll-jade-1-die-3",
		"roll-jade-2", "roll-jade-2-die-1", "roll-jade-2-die-2", "roll-jade-2-die-3",
	];

	getAttrs(alist, function(a) {
		log(a);

		// Compose the roll bits

		// Name
		if ( a["toggle_roll-family-die"] == "1" ) {
			log("use family die");
			rt += " {{family-name=[[d"+a["family-name-die"]+"]]}} {{family-name-size="+a["family-name-die"]+"}}";
		}

		// Main Skill
		if ( a["roll-main-skill"] !== "" ) {
			log("use main skill die");
			rt += " {{main-skill=[[d"+a["roll-main-skill-die"]+"]]}} {{main-skill-size="+a["roll-main-skill-die"]+"}} {{main-skill-name=^{"+a["roll-main-skill"]+"}}}";
		}

		// Second Skill
		if ( a["roll-second-skill"] !== "" ) {
			log("use second skill die");
			rt += " {{second-skill=[[d"+a["roll-second-skill-die"]+"]]}} {{second-skill-size="+a["roll-second-skill-die"]+"}} {{second-skill-name=^{"+a["roll-second-skill"]+"}}}";
		}

		// Rep
		if ( a["toggle_roll-reputation"] == "1" ) {
			log("use rep die");
			rt += " {{reputation=[[d"+a["reputation-die"]+"]]}} {{reputation-size="+a["reputation-die"]+"}} {{reputation-name=@{reputation}}}";
		}

		// Rep2
		if ( a["toggle_roll-reputation2"] == "1" ) {
			log("use rep2 die");
			rt += " {{reputation2=[[d"+a["reputation-plus-die"]+"]]}} {{reputation2-size="+a["reputation-plus-die"]+"}} {{reputation2-name=@{reputation-plus}}}";
		}

		// Up to ten Advantage dice
		const ten = [1,2,3,4,5,6,7,8,9,10];
		ten.forEach( (entry) => {
			if ( a["roll-advantage"+entry] !== "" ) {
				log("use advantage #"+entry);
				rt += " {{advantage"+entry+"=[[d"+a["roll-advantage"+entry]+"]]}} {{advantage"+entry+"-size="+a["roll-advantage"+entry]+"}}";
			}
		} );

		// Support
		if ( a["roll-support"] !== "" ) {
			log("use Support");
			rt += " {{support=[[d"+a["roll-support"]+"]]}} {{support-size="+a["roll-support"]+"}}";
		}

		// Backing
		if ( a["roll-backing"] !== "" ) {
			log("use Backing");
			if ( a["roll-backing"] == "asset" ) {
				rt += " {{backing-asset=[["+a["roll-asset-value"]+"]]}}"; 
				rt += " {{backing-asset-size="+a["roll-asset-value"]+"}}"; 
			} else {
				rt += " {{backing=[[d"+a["roll-backing"]+"]]}} {{backing-size="+a["roll-backing"]+"}}";
			}
		}

		// Jade
		const two = [1,2]; const three = [1,2,3];
		var jades = 0;
		var jadenames = "";
		two.forEach( (jade) => {
			if ( a["roll-jade-"+jade] !== "" ) {
				var rj = false;
				three.forEach( (jd) => {
					if ( a ["roll-jade-"+jade+"-die-"+jd] !== "" ) {
						jades++;
						rj = true;
						rt += " {{jade"+jades+"=[[d4]]}}";
					}
				});
				if ( rj ) {
					if ( jadenames !== "" ) { 
						jadenames += ", ";
					}
					jadenames += "^{"+a["roll-jade-"+jade]+"}"
				}
			}
		});
		if ( jades > 0 ) {
			rt += " {{jade-names="+jadenames+"}} {{jade-count="+jades+"}}";
		}

		log(rt);

		startRoll(rt, (results) => {
			log(results);
			var ds = results.results;
			var d1 = 0; var d2 = 0; var j1 = 0; var c = { };
			c["total"] = 0; // to become computed::total in the rolltemplate

			// Splits into two parts:
			// "Normal" dice from which you add the two highest;
			// Jade dice from which you add the highest.
			// Jade dice must also be checked for doubles.

			// Normal Dice
			const normaldice = ["family-name","main-skill","second-skill","reputation","reputation2","advantage1","advantage2","advantage3","advantage4","advantage5","advantage6","advantage7","advantage8","advantage9","advantage10","support","backing","backing-asset"];

			var n1 = ""; n2 = "";
			normaldice.forEach( (dname) => {
				if ( typeof(ds[dname]) !== "undefined" ) {
					var result = ds[dname].result;
					if ( result > d1 ) {
						log("use "+dname+" in result");
						d2 = d1; // Move the topmost into the secondmost
						n2 = n1;
						d1 = result; // New topmost
						n1 = getTranslationByKey(dname);
					} else if ( result > d2 ) {
						log("use "+dname+" in result");
						d2 = result; // New secondmost
						n2 = getTranslationByKey(dname);
					}
				}
			});

			// Jade
			const jadedice = ["jade1","jade2","jade3","jade4","jade5","jade6"];
			var itcheck = [0,0,0,0,0,0,0];
			c["itches"] = 0;
			jadedice.forEach( (dname) => {
				log(dname);
				if ( typeof(ds[dname]) !== "undefined" ) {
					var result = ds[dname].result;
					if ( result > j1 ) {
						j1 = result; // New highest
					}
					itcheck[result]++;
					if ( itcheck[result] > 1 ) {
						log("itches detected on jade dice showing " + result);
						c["itches"] = 1;
					}
				}
			});

			// Tally
			c["total"] = d1+d2+j1;
			c["firstdie-total"] = d1;
			c["firstdie-name"] = n1;
			c["seconddie-total"] = d2;
			c["seconddie-name"] = n2;
			c["jadedie-total"] = j1;

			log(n1); log(n2); log(c);

			finishRoll(results.rollId, c);
		});

	});

});