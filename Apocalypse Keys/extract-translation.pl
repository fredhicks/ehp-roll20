#!/usr/bin/perl

$text = `cat /Users/evilhat/Dropbox/GitHub/ehp-roll20/Apocalypse\\ Keys/ApocalypseKeys.html`;

$stext = $text;

$text =~ s/^.*<!--\ntranslation.json:\n//s;
$text =~ s/}\n\n-->/}/s;

$htext = $stext;

$htext =~ s/<!--\ntranslation.json:\n.*}\n\n-->//s;

if ( $text ne $stext ) {
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Apocalypse\ Keys/translation.json") || die $!;
	print F $text;
	close(F);
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Apocalypse\ Keys/ApocalypseKeys.html") || die $!;
	print F $htext;
	close(F);
}