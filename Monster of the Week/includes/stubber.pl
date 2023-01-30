#!/usr/bin/perl

@playbooks = qw(agents road entourage guardians imps crisis survivors league mercenaries mysteryclub nightshift suburbanwatch band whistleblowers fugitives);
@files = qw(style moves enemies allies assets);

foreach $f ( @files ) {
	foreach $pb ( @playbooks ) {
		`touch team-${f}-${pb}.pug`;
		print "include team-${f}-${pb}.pug\n";
	}
	print "\n\n";
}