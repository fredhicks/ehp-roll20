#!/usr/bin/perl

$text = `cat /Users/evilhat/Dropbox/GitHub/ehp-roll20/Rangers\\ of\\ a\\ Broken\\ World/RoaBW.html`;

$stext = $text;

$text =~ s/^.*<!--\ntranslation.json:\n//s;
$text =~ s/}\n*-->/}/s;

$htext = $stext;

print "Translation JSON extracted.\n$text\n";

$htext =~ s/<!--\ntranslation.json:\n.*}\n*-->//s;

if ( $text ne $stext ) {
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Rangers\ of\ a\ Broken\ World/translation.json") || die $!;
	print F $text;
	close(F);
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Rangers\ of\ a\ Broken\ World/RoaBW.html") || die $!;
	print F $htext;
	close(F);
}

print "Files written\n";

