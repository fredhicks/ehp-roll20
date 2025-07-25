// Behold, the Script Worker for Streets of Jade

on("clicked:mark", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
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

on("clicked:repeating_favors:mark", function(e) {
	var what = e.htmlAttributes.value;
	var ats = {};
	var rowprefix = (e.sourceAttribute).slice(0,-4); // Strips off the 'mark'
	var atname = rowprefix + "toggle_" + what;
	ats[atname] = 1;
	setAttrs(ats);
	log(what + " mark");
	log(e);
	log(ats);
	log(rowprefix);
});

on("clicked:unmark", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
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

on("clicked:repeating_favors:unmark", function(e) {
	var what = e.htmlAttributes.value;
	var ats = {};
	var rowprefix = (e.sourceAttribute).slice(0,-6); // Strips off the 'unmark'
	var atname = rowprefix + "toggle_" + what;
	ats[atname] = 0;
	setAttrs(ats);
	log(what + " mark");
	log(e);
	log(ats);
	log(rowprefix);
});

on("clicked:itch", function(event) {
	var what = event.htmlAttributes.value;
	var atname = "toggle_" + what;
	var ats = {};
	ats[atname] = 2;
	setAttrs(ats);
	log(what + " itch");
});
