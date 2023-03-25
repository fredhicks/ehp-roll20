#!/usr/bin/perl

$list = <STDIN>;

print "\n\n";

chomp $list;

$list =~ s/\. *$//;

@list = split(/, /,$list);

%gear = (
	# setting specific
	'sword', "Sword (2-harm hand)",
	'big sword', "Big sword (3-harm hand messy)",
	'axe', "Axe (2-harm hand messy)",
	'spear', "Spear (2-harm hand/close)",
	'shortbow', "Shortbow (2-harm close concealable)",
	'longbow', "Longbow (2-harm far)",
	'halberd', "Halberd (3-harm hand/close messy slow)",
	'crossbow', "Crossbow (2-harm close quick reload)",
	'dagger', "Dagger (1-harm hand/close hidden)",
	'repeating crossbow', "Repeating crossbow (2-harm close quick reload unreliable)",
	'prototype rifle', "Prototype rifle (3-harm far reload ignore-armour volatile loud)",
	'prototype pistol', "Prototype pistol (3-harm close reload ignore-armour volatile loud)",

	# inherited from sheets
	'specialist weapons for destroying your foes', "Specialist weapons for destroying your foes (e.g. wooden stakes and mallet for vampires, silver dagger for werewolves, etc.). 4-harm against the specific creatures it targets, 1-harm otherwise, and other tags by agreement with the Keeper",
	'huge sword or huge axe', "Huge sword or huge axe (3-harm hand messy heavy)",
	'fighting knife', "Fighting knife (2-harm hand quiet)",
	'folding knife', "Folding knife (1-harm hand)",
	'juju bag', "Juju bag (1-harm far magic)",
	'a boat', "A boat",
	'a horse', "A horse",
	'a mule-drawn carriage', "A mule-drawn carriage",
	'athame', "Athame (2-harm hand magic silver)",
	'big axe', "Big axe (3-harm hand messy slow heavy)",
	'big knife', "Big knife (1-harm hand)",
	'brass knuckles', "Brass knuckles (1-harm hand stealthy)",
	'cold iron sword', "Cold iron sword (2-harm hand messy iron)",
	'fighting sticks', "Fighting sticks (1-harm hand quick)",
	'flamethrower', "Flamethrower (3-harm close fire heavy volatile)",
	'folding knives', "Folding knives (1-harm hand)",
	'garrote', "Garrote (3-harm intimate)",
	'heirloom sword', "Heirloom sword (2-harm hand messy)",
	'huge sword', "Huge sword (3-harm hand heavy)",
	'mace', "Mace (2-harm hand messy)",
	'magical dagger', "Magical dagger (2-harm hand magic)",
	'martial arts training', "Martial arts training (1-harm hand innocuous)",
	'pocket knife', "Pocket knife (1-harm hand useful small)",
	'ritual knife', "Ritual knife (1-harm hand)",
	'shillelagh', "Shillelagh (1-harm hand balanced)",
	'silver knife', "Silver knife (1-harm hand silver)",
	'silver sword', "Silver sword (2-harm hand messy silver)",
	'sledge-hammer', "Sledge-hammer (3-harm hand messy)",
	'small knife', "Small knife (1-harm hand messy)",
	'staff', "Staff (1-harm hand balanced large)",
	'switchblade', "Switchblade (1-harm hand small)",
	'throwing knives', "Throwing knives (1-harm close many)",
	'walking stick', "Walking stick (1-harm hand innocuous)",
	'weighted gloves/brass knuckles', "Weighted gloves/brass knuckles (1-harm hand)",
	'enchanted dagger', "Enchanted dagger (2-harm hand magic)",
	'hand cannon', "Hand cannon (3-harm close loud)",
);

foreach $l (@list) {
	my $g = $l;
	$g =~ s/ *\(.*$//;
	if ( $gear{$g} ne '' ) {
		print $gear{$g}, "\n";
	} else {
		print qq('$g', "",);
		print "\n";
	}
}