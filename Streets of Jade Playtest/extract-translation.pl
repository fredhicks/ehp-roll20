#!/usr/bin/perl

$docroot = '/Users/evilhat/Dropbox/GitHub/ehp-roll20/Streets\\ of\\ Jade\\ Playtest/';
$text = `cat $docroot/jade.html`;

$stext = $text;

$text =~ s/^.*<!--\ntranslation.json:\n//s;
$text =~ s/}\n*-->/}/s;

$htext = $stext;

print "Translation JSON extracted.\n$text\n";

$htext =~ s/<!--\ntranslation.json:\n.*}\n*-->//s;

if ( $text ne $stext ) {
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Streets\ of\ Jade\ Playtest/translation.json");
	print F $text;
	close(F);
	open(F,">/Users/evilhat/Dropbox/GitHub/ehp-roll20/Streets\ of\ Jade\ Playtest/jade.html");
	print F $htext;
	close(F);
}

print "Files written to $docroot\n";