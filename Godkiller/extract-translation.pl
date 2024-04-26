#!/usr/bin/perl

$docroot = '/Users/evilhat/Dropbox/GitHub/ehp-roll20/Godkiller';
$text = `cat $docroot/Godkiller.html`;

$stext = $text;

$text =~ s/^.*<!--\ntranslation.json:\n//s;
$text =~ s/}\n*-->/}/s;

$htext = $stext;

print "Translation JSON extracted.\n$text\n";

$htext =~ s/<!--\ntranslation.json:\n.*}\n*-->//s;

if ( $text ne $stext ) {
	open(F,">$docroot/translation.json");
	print F $text;
	close(F);
	open(F,">$docroot/Godkiller.html");
	print F $htext;
	close(F);
}

print "Files written to $docroot\n";