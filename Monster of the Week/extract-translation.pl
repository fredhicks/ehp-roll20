#!/usr/bin/perl

$path = '/Users/evilhat/Dropbox/GitHub/ehp-roll20/Monster\\ of\\ the\\ Week/MotWHTML.html';
$text = `cat $path`;

$stext = $text;

$text =~ s/^.*<!--\ntranslation.json:\n//s;
$text =~ s/}\n\n-->/}/s;

$htext = $stext;

$htext =~ s/<!--\ntranslation.json:\n.*}\n\n-->//s;

if ( $text ne $stext ) {
	open(F,">translation.json") || die "can't open : $!";;
	print F $text;
	close(F);
	open(F,">MotWHTML.html") || die "can't open : $!";
	print F $htext;
	close(F);
}

