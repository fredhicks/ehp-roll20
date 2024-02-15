#!/usr/bin/perl

$text = `cat /Users/evilhat/Dropbox/GitHub/ehp-roll20/Girl\\ By\\ Moonlight/GBM.html`;

$stext = $text;

$text =~ s/^.*<!--\ntranslation.json:\n//s;
$text =~ s/}\nEND_TRANSLATIONS\n*-->/}/s;

$htext = $stext;

$htext =~ s/<!--\ntranslation.json:\n.*\n}\nEND_TRANSLATIONS\n*-->//s;

if ( $text ne $stext ) {
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Girl\ By\ Moonlight/translation.json");
	print F $text;
	close(F);
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Girl\ By\ Moonlight/GBM.html");
	print F $htext;
	close(F);
}