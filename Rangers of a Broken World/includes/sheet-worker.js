// Sheetworker for Rangers of a Broken World

// Data ====================================================================

// For generating new IDs for fieldsets that aren't accidentally duplicates 

var uniqueids = {}; // Need this to persist across executions per page load

// Dicelist is for helping grab all the relevant attributes when evaluating dice tallies

var dicelist = [ 
	"season", "facetroll", "skillroll", "keyroll", "bonusroll", "skill1", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8", "skill9", "Daring","Understanding","Sensitivity","Subtlety","Adaptability", "character_name", "rolldice"
];

// All the stuff available for classes

var classes = {
	"Beckoning Infiltrator": {
		"startingskills": [ "Fashion", "Humanity", "Survival (Urban/Ruins)", "Tinkering", "Weapons (Melee)" ],
		"blurnotes": "Together, Us",
		"ally": "Network",
	},
	"Enduring Legionnaire": {
		"startingskills": [ "Engineering", "Survival (Tundra)", "Tactics", "Weapons (Melee)", "Weapons (Mid-Range)" ],
		"blurnotes": "Hungry, Phantom",
		"ally": "The Fallen",
	},
	"Tidal Navigator": {
		"startingskills": [ "Athletics", "Navigation", "Performance", "Survival (Nautical)", "Weapons (Melee)" ],
		"blurnotes": "Fearless, Fleeting",
		"ally": "The Winds",
	},
	"Volcanic Tracker": {
		"startingskills": [ "Medicine", "Navigation", "Survival (Tropical)", "Tactics", "Weapons (Melee)" ],
		"blurnotes": "Life, New",
		"ally": "The Coral Spirit",
	},
	"Wailing Arcanist": {
		"startingskills": [ "Athletics", "Focus", "Spirits", "Survival (High-Altitude)", "Weapons (Long-Range)" ],
		"blurnotes": "Trick, Wicked",
		"ally": "Familiar Daemon",
	},
	"Wandering Magus": {
		"startingskills": [ "Focus", "Navigation", "Survival (Arid)", "Tracking", "Weapons (Mid-Range)" ],
		"blurnotes": "Perfect, Starlight",
		"ally": "The Watching Stars",
	},
	"Windswept Cavalier": {
		"startingskills": [ "Humanity", "Medicine", "Riding", "Survival (Boreal)", "Weapons (Long-Range)" ],
		"blurnotes": "Flight, Misty",
		"ally": "Cloud Elk",
	},

};

// NOTE TO FRED - CONSIDER JUST TOGGLING VISIBILITY FOR ANYTHING INVARIANT - WILL BE BETTER THAN A LOT OF AUTO-CREATING

// Functions ===============================================================

// For generating new IDs for fieldsets that aren't accidentally duplicates 

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

// gTBK = Generate Translation By Key, but with better failure handling

var gTBK = function(t) {
	if ( typeof t === "undefined" ) {
		return "";
	} else if ( t === "" ) {
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

// For setting starting skills upon class selection

var setStartingSkills = function(s) {
	var a = {};
	for(var i = 0; i < s.length; i++) {
		var skillkey = "skill" + (i+1);
		var skill = gTBK(s[i]);
		a[skillkey] = skill;
	}
	setAttrs(a);
};

// For updating ally text input
var updateAlly = function(aname) {
	var a = { "ally": gTBK(aname) };
	setAttrs(a);
};

// For updating blur notes
var updateBlurNotes = function(bn) {
	var a = { "blurnotes": gTBK(bn) };
	setAttrs(a);
};

// For tallying the available dice

var tallyDiceFromObject = function(a) {
	var dice = 0; var snums = [1,2,3,4,5,6,7,8,9]; 
	var season = Number(a.season); // 1 thru 5
	var keyval = Number(a.keyroll); // 0 or 2
	var facetval = 0; var skillval = 0; var bonusval = 0;
	if( typeof(a[a.facetroll]) !== "undefined" ) {
		facetval = Number(a[a.facetroll]);
	}
	if( typeof(a.bonusroll) !== "undefined" ) {
		bonusval = Number(a.bonusroll);
	}
	snums.forEach( (snum) => {
		if( 
			typeof( a["skill"+snum] ) !== "undefined" 
			&& typeof( a["skillroll"] ) !== "undefined"
		) {
			if ( String(a["skill"+snum]) !== "" && String(a["skill"+snum]) == String(a["skillroll"]) ) {
				skillval = season;
			}
		}
	});
	var dtotal = facetval + skillval + keyval + bonusval;
	log(a); log(bonusval); log(dtotal);
	return dtotal;
};

// For updating display based on tally

var updateRollNumber = function() {
	var list = dicelist;
	getAttrs(list, function(a) {
		// We should now have the value of keyroll, the value of the selected facet, the value of the selected skill: aka the total number of dice
		var dtotal = tallyDiceFromObject(a);
		setAttrs({
			"rolldice": dtotal
		});
	});
};

// For tallying the marked facets
var syncFacets = function() {
	var list =  []; var nums = [1,2,3,4,5]; 
	var facets = ["Daring","Understanding","Sensitivity","Subtlety","Adaptability"];
	var stats = {};
	facets.forEach( (facet) => { 
		nums.forEach( (n) => { 
			list.push("toggle_"+facet+"Facet"+n); 
		} );
	});
	getAttrs(list, function(a) {
		facets.forEach( (facet) => {
			stats[facet] = 0;
			nums.forEach( (n) => {
				var att = "toggle_"+facet+"Facet"+n;
				if( typeof(a[att]) !== "undefined" ) {
					if( Number(a[att]) === 1 ) {
						stats[facet]++
					}
				}
			});
		});
		setAttrs(stats);
	});
};

// For rolling the dice
var rollConfiguredDice = function() {
	var list = dicelist;
	getAttrs(list, function(a) {
		var pcname = a.character_name;
		var anatomy = "";
		var facetname = gTBK(a.facetroll);
		if ( facetname !== "" ) {
			if ( anatomy !== "" ) { anatomy = anatomy + " + "; }
			anatomy = anatomy + facetname;
		}
		var skillname = gTBK(a.skillroll);
		if ( skillname !== "" ) {
			if ( anatomy !== "" ) { anatomy = anatomy + " + "; }
			anatomy = anatomy + skillname;
		}
		if ( a.bonusroll > 0 ) {
			if ( anatomy !== "" ) { anatomy = anatomy + " + "; }
			anatomy = anatomy + String(a.bonusroll);
		}
		if ( a.keyroll > 0 ) {
			if ( anatomy !== "" ) { anatomy = anatomy + " "; }
			anatomy = anatomy + gTBK("with Key");
		}
		// we can't rely on the value of a.rolldice to not be changed out from under us mid-logic, so we need an active query which should be returned by tallyDiceFromObject
		var dice = tallyDiceFromObject(a); 
		log("tallyDiceFromObject() = " + String(dice));
		var template = 'default'; // for testing
		var template = 'pcroll'; // for actual
		var rt = "&{template:"+template+"} {{name="+pcname+"}} {{anatomy=^{rolls} "+anatomy+"}} {{successes=[[0]]}} {{edges=[[0]]}} {{rolled1=[[0]]}} {{rolled2=[[0]]}} {{rolled3=[[0]]}} {{rolled4=[[0]]}} {{rolled5=[[0]]}} {{rolled6=[[0]]}} {{rolls=[["+dice+"d6]]}}";
		log(rt);
		startRoll(rt, (results) => {
			// Array of dice results is found in results.results.rolls.dice, I think
			log(results.results.rolls.dice);
			var tallies = {
				"rolled1": 0, "rolled2": 0, "rolled3": 0, "rolled4": 0, "rolled5": 0, "rolled6": 0, "successes": 0, "edges": 0
			}; // Calculated Results, will be swapped in with [[0]] placeholders above
			results.results.rolls.dice.forEach( (die) => {
				tallies["rolled"+die]++;
				if ( die >= 5 ) {
					tallies.successes++;
				}
				else if ( die == 1 ) {
					tallies.edges++;
				}
			});
			log(tallies);
			finishRoll(results.rollId, tallies);
			// Also need to do cleanup — reset the selectors on the roll thingy, so it's not always stuck in the same place as last time. Each roll should be done freshly.
			setAttrs({
				facetroll: "", skillroll: "", 
				keyroll: 0, bonusroll: 0
			});
		});
	});
}

// Event Handlers ==========================================================

on("clicked:mark", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
	ats[atname] = 1;
	setAttrs(ats);
	if ( String(atname).includes("Facet") ) {
		syncFacets(); // always a good time to check those facet totals
	}
	log(what + " mark");
});

on("clicked:unmark", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
	ats[atname] = 0;
	setAttrs(ats);
	if ( String(atname).includes("Facet") ) {
		syncFacets(); // always a good time to check those facet totals
	}
	log(what + " unmark");
});

on("change:class", function(event) {
	var pv = ""; var nv = "";
	if(typeof(event.previousValue) !== "undefined" ) { pv = event.previousValue; }
	if(typeof(event.newValue) !== "undefined" ) { nv = event.newValue; }
	if(typeof(classes[nv]) !== "undefined") {
			log("--> "+nv);
			if (typeof(classes[nv]["startingskills"]) !== "undefined") { 
				setStartingSkills(classes[nv]["startingskills"]);
			}
			if (typeof(classes[nv]["blurnotes"]) !== "undefined") { 
				updateBlurNotes(classes[nv]["blurnotes"]);
			}
			if (typeof(classes[nv]["ally"]) !== "undefined") { 
				updateAlly(classes[nv]["ally"]);
			}
	}  
});

on("sheet:opened", function(event) {
	syncFacets();
});

on("change:facetroll change:skillroll change:keyroll change:bonusroll sheet:opened", function(event) {
	updateRollNumber();
});

on("clicked:pcroll", function(event) {
	rollConfiguredDice();
});