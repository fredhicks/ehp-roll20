#!/usr/bin/perl

@playbooks = qw(hauntbusters armyofone squareone doomedworld monsterrevs lineage thrillseekers);
@files = qw(style moves enemies allies assets);

foreach $f ( @files ) {
	foreach $pb ( @playbooks ) {
		`touch team-${f}-${pb}.pug`;
		print "include team-${f}-${pb}.pug\n";
	}
	print "\n\n";
}