	on("change:repeating_modifiers:rollmod change:repeating_modifiers:modifier remove:repeating_modifiers", function() {
		log("Either a modifier was checked or unchecked, or a modifier row was removed");
		getSectionIDs("repeating_modifiers", function(idarray) {
			var mlist = [];
			for(var i=0; i < idarray.length; i++ ) {
				var rowid = "repeating_modifiers_"+idarray[i];
				var rowpre = rowid + "_";
				mlist[i*2] = rowpre + "rollmod";
				mlist[i*2+1] = rowpre + "modifier";
			}
			log(mlist);
			getAttrs(mlist,function(m) {
				log(m);
				var tally = 0;
				for(var i=0; i < idarray.length; i++ ) {
					var rowid = "repeating_modifiers_"+idarray[i];
					var rowpre = rowid + "_";
					var checkid = rowpre + "rollmod"; var check = m[checkid];
					if ( typeof check !== "undefined" && check === "yes" ) {
						var modid = rowpre + "modifier"; var mod = 0;
						if ( typeof m[modid] !== "undefined" ) {
							mod = parseInt(m[modid]);
							if ( isNaN(mod) ) {
								mod = 0;
							}
							tally = tally + mod;
						}
					}
				}
				log("this is the tally: "+tally);
				setAttrs({"modifier-tally": tally});
			});
		});
	});

	on("change:repeating_modifiers:rollmod change:repeating_modifiers:modifier remove:repeating_modifiers", function() { // this had a blanket change:repeating_modifiers originally, don't think that's right
		log("change detected in repeating_modifiers");
		// We need to examine whether any entries count as unused, and if there are multiples, remove them, and if there are none, add one.
		var mlist = []; var mflist = [];
		getSectionIDs("repeating_modifiers", function(idarray) {
			log("got the ID list");
			log(idarray);
			for(var i=0; i < idarray.length; i++ ) {
				mlist[i] = "repeating_modifiers_"+idarray[i];
				mflist[i*4] = mlist[i] + "_used";
				mflist[i*4+1] = mlist[i] + "_rollmod";
				mflist[i*4+2] = mlist[i] + "_target"; 
				mflist[i*4+3] = mlist[i] + "_modifier"; 
			}
			log("assembled list");
			log(mlist);
			var sattrs = {};
			if ( mlist.length > 0 ) {
				log("list is not empty, so we parse");
				getAttrs(mflist, function(mf) {
					var keeper = false;
					for(var i=0; i < mlist.length; i++ ) {
						var usedid = mlist[i] + "_used"; var used = mf[usedid];
						var rollmodid = mlist[i] + "_rollmod"; var rollmod = mf[rollmodid];
						var targetid = mlist[i] + "_target"; var target = mf[targetid];
						var modifierid = mlist[i] + "_modifier"; var modifier = mf[modifierid];
						if ( used === "delete" ) {
							removeRepeatingRow(mlist[i],{silent:true}); 
						} else if (
							( typeof target === "undefined" || target === "" ) 
							&& ( typeof rollmod === "undefined" || rollmod !== "yes" ) 
							&& ( typeof modifier === "undefined" || modifier === "0" ) 
						) {
							if ( i < (mlist.length - 1) ) {
								// Then it's a blank, no checkmark, 0 modifier, blank target; we only need one of those, and they're interchangeable, so we'll delete these
								removeRepeatingRow(mlist[i],{silent:true}); // We don't need to trigger a bunch of runs through of this handler just because we're removing rows because we are already in this handler
							} else {
								// The exception is if it's the very last one in the list. We don't need to delete that one only to create another every time.
								keeper = true;
								sattrs[usedid] = "no"; 
							}
						} else {
							sattrs[usedid] = "yes";
						}
					}
					// At this point if keeper = true, we don't need to create a new row; if false, we do.
					// Or, if there are no entries, we need to create one, because there always needs to be at least one.
					if ( ! keeper || mlist.length === 0 ) {
						var modifierid = "repeating_modifiers_" + generateActuallyUniqueRowID();
						sattrs[`${modifierid}_used`] = "no"; // Creates our a new modifier entry
					}
					log("Setting attributes for modifiers");
					log(sattrs);
					setAttrs(sattrs,{silent:true}); // We don't need to trigger a bunch of runs through this handler because we're setting attributes *with* this handler.
				});
			} else { // I suspect if there's no array, getAttrs doesn't bother to fire off its callback, which is a shame because I expected it to.
				log("list is empty, so we create");
				var modifierid = "repeating_modifiers_" + generateActuallyUniqueRowID();
				sattrs[`${modifierid}_used`] = "no"; // Creates our a new modifier entry
				log(sattrs);
				setAttrs(sattrs,{silent:true}); // We don't need to trigger a bunch of runs through this handler because we're setting attributes *with* this handler.
			}
		});
	});
