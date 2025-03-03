
on("change:skinname", function() {
	console.log("SkinName change event detected.");
	console.log("Set SkinCheck = SkinName if not already equal.")
	getAttrs(["SkinName","SkinCheck"], function(values) {
		if (values.SkinCheck !== values.SkinName) {
		console.log("Values are not equal. Changing SkinCheck.");
			setAttrs({ SkinCheck: values.SkinName });
		};
	});
	console.log("SkinName change event ends.");
});

on("change:teamname", function() {
	console.log("TeamName change event detected.");
	console.log("Set TeamCheck = TeamName if not already equal.")
	getAttrs(["TeamName","TeamCheck"], function(values) {
		if (values.TeamCheck !== values.TeamName) {
		console.log("Values are not equal. Changing TeamCheck.");
			setAttrs({ TeamCheck: values.TeamName });
		};
	});
	console.log("TeamName change event ends.");
});

on("change:startingstats", function() {
	console.log("StartingStats changed");
		getAttrs(["StartingStats"], function(values) {
			if ( values.StartingStats !== "" ) {
				var stats = values.StartingStats.split(" ");
				console.log("StartingStats not set to null, so we need to make a change.");
				console.log(stats);
				setAttrs({
					Charm: stats[0],
					Cool: stats[1],
					Sharp: stats[2],
					Tough: stats[3],
					Weird: stats[4]
				});
			}
		});
});

on("sheet:opened change:harm1 change:harm2 change:harm3 change:harm4 change:harm5 change:harm6 change:harm7 change:moves-constructed1 change:constructed-harm1 change:constructed-harm2 change:constructed-harm3 change:imp-dying change:extra-harm1 change:advimp-dying change:extra-harm2 change:extra-okayharm1", function() {
	const alist = [ "Harm1", "Harm2", "Harm3", "Harm4", "Harm5", "Harm6", "Harm7", "Moves-Constructed1", "Constructed-Harm1", "Constructed-Harm2", "Constructed-Harm3", "Imp-Dying", "Extra-Harm1", "AdvImp-Dying", "Extra-Harm2", "Extra-OkayHarm1", "Imp-OkayHarm" ];
	getAttrs(alist,function(a) {

		// Values are "0" if not checked, "on" if checked. First we must adapt for this, as we want them numeric, 0 or 1.
		for(var i = 0; i < alist.length; i++) {
			var val = a[alist[i]];
			if ( val == "on" || val == "1" || val == "true" || val === true ) {
				val = 1;
			} else {
				val = 0;
			}
			a[alist[i]] = val;
		}

		var atts = {};
		var capacity = 7;
		var constructed = false; if ( a["Moves-Constructed1"] == 1 ) { constructed = true; capacity += 3; }
		var dying = false; if ( a["Imp-Dying"] == 1 ) { dying = true; capacity += 1; }
		var advdying = false; if ( a["AdvImp-Dying"] == 1 ) { advdying = true; capacity += 1; }
		var okay = false; if ( a["Imp-OkayHarm"] == 1 ) { okay = true; capacity += 1; }
		var taken = a["Harm1"] + a["Harm2"] + a["Harm3"] + a["Harm4"] + a["Harm5"] + a["Harm6"] + a["Harm7"];
		if ( constructed ) { taken += a["Constructed-Harm1"] + a["Constructed-Harm2"] + a["Constructed-Harm3"]; }
		if ( dying ) { taken += a["Extra-Harm1"]; }
		if ( okay ) { taken += a["Extra-OkayHarm1"]; }
		if ( advdying ) { taken += a["Extra-Harm2"]; }
		var remaining = capacity - taken;

		atts["Harm-TotalCapacity"] = capacity;
		atts["Harm-Remaining"] = remaining;
		atts["Harm-Taken"] = taken;

		setAttrs(atts);

	});
});

// Needed for SkinMoves because that call to +custommoves has the rollable flag set to true; you'll need to add any other repeating_XXXes where that flag is set to true for it to work right.
on("change:repeating_skinmoves:rollable", function(e) {
	var rollable = e.sourceAttribute;
	var rowid = (e.sourceAttribute).slice(0,-8); // strips off 'rollable'
	var atts = {};
	atts[rowid+'RollableStat'] = '@{'+e.newValue+'}';
	setAttrs(atts);
});

on("change:repeating_comfolk:preload", function(e) {
	log(e);
	var example = {
    "sourceAttribute": "repeating_comfolk_-nr4clqsrzvspkemmtq6_preload",
    "sourceType": "player",
    "triggerName": "repeating_comfolk_-nr4clqsrzvspkemmtq6_preload",
    "previousValue": "---------------------------",
    "newValue": "Resource Collector|Provides a common material for a single hunter’s crafting needs between mysteries.|Provides a common or uncommon material. Enough for two hunters’ crafting needs between mysteries.|Additionally provides one rare or special material (ivory, jade, obsidian, ebony, etc.). Pick the material when you gain this benefit."
	}
	var test = new RegExp('[|]');
	// log(test.test(e.newValue));
	if ( test.test(e.newValue) ) {
		var atts = {};
		var preload = e.sourceAttribute;
		atts[e.sourceAttribute] = '';
		var rowid = (e.sourceAttribute).slice(0,-7); // strips off 'preload';\
		var loadtext = String(e.newValue);
		var loadparts = loadtext.split("|");
		atts[rowid+'specialty'] = loadparts[0];
		atts[rowid+'benefit-standard'] = loadparts[1];
		atts[rowid+'benefit-improved'] = loadparts[2];
		atts[rowid+'benefit-special'] = loadparts[3];
		log(loadparts);
		setAttrs(atts);
	} else if ( e.newValue !== "" ) {
		var atts = {};
		atts[e.sourceAttribute] = '';
		setAttrs(atts);
	}
});