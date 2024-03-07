#!/usr/bin/perl

$path = '/Users/evilhat/Dropbox/GitHub/ehp-roll20/Monster\\ of\\ the\\ Week/';
$file = $path . 'MotWHTML.html';
$text = `cat $file`;
$fpath = '/Users/evilhat/Dropbox/GitHub/ehp-roll20/Monster of the Week/';

$stext = $text;

$text =~ s/^.*<!--\ntranslation.json:\n//s;
$text =~ s/}\n\n-->/}/s;

$htext = $stext;

$htext =~ s/<!--\ntranslation.json:\n.*}\n\n-->//s;

if ( $text ne $stext ) {
	print ">${fpath}translation.json\n";
	open(F,">${fpath}translation.json") || die "can't open : $!";;
	print F $text;
	close(F);
	open(F,">${fpath}MotWHTML.html") || die "can't open : $!";
	print F $htext;
	close(F);
}

