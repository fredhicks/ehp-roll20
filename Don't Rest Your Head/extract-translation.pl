#!/usr/bin/perl

$docroot = "/Users/evilhat/Dropbox/GitHub/ehp-roll20/Don\\'t\\ Rest\\ Your\\ Head/";

print "Monitoring...";

$t = 0;
while ( 1 == 1 ) {
	$text = `cat $docroot/DRYH.html`;
	$stext = $text;
	$text =~ s/^.*<!--\ntranslation.json:\n//s;
	$text =~ s/}\n*-->/}/s;
	$htext = $stext;
	$t++;

	if ( $text ne $stext ) {
		print "\n";
		print "Text change detected\n";
		$htext =~ s/<!--\ntranslation.json:\n.*}\n*-->//s;
		print "Translation JSON extracted.\n$text\n";
		open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Don\'t\ Rest\ Your\ Head/translation.json");
		print F $text;
		close(F);
		open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Don\'t\ Rest\ Your\ Head/DRYH.html");
		print F $htext;
		close(F);
		print "Files written to $docroot\n";
	} else {
		print ".";
	}
	sleep 1;
}
