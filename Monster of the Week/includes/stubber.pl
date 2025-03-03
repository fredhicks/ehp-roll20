#!/usr/bin/perl

@playbooks = qw(artifactcollectors coven escapedexperiments goodmonsters medicalteam mundanemonstrosities radiostation researchlab swipetoslay);
@files = qw(style moves enemies allies assets);

foreach $f ( @files ) {
	foreach $pb ( @playbooks ) {
		`touch team-${f}-${pb}.pug`;
		print "include team-${f}-${pb}.pug\n";
	}
	print "\n\n";
}