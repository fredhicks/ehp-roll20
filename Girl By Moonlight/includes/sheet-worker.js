var playbooks = [
	"Enigma", 
	"Stranger", 
	"TimeTraveller", 
	"Harmony", 
	"Guardian", 
	"Outsider", 
	"UnlikelyHero"
];
var toggles = [
	"Toggle-Bio-Expand",
	"Toggle-Abilities-Expand",
	"Toggle-Abilities-Marked",
];
var toggleclicks = "";
var clicks = 0;

for(var i; i < 20; i++) {
	for(var pb of playbooks) {
		var field = 'Ability-' + pb + '-' + i;
		toggles.push(field);
	}
}

for(var i of toggles) {
	clicks++;
	if ( clicks > 1 )
		toggleclicks = toggleclicks + " ";
	toggleclicks = toggleclicks + "clicked:" + i;
}

on(toggleclicks, function(e) {
	log(e);
	var id = "";
	if ( typeof e.sourceAttribute !== "undefined" && e.sourceAttribute !== "" ) {
		id = e.sourceAttribute;
	} else {
		id = (e.htmlAttributes.name).substring(4); // Strips off the 'act_'
	}
	log("Toggle Handler: " + id);
	getAttrs([id], function(a) {
		if ( a[id] === "1" ) {
			a[id] = "0";
		} else {
			a[id] = "1";
		}
		log(a);
		setAttrs(a);
	});
});