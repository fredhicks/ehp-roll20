#!/usr/bin/perl

@playbooks = qw(betrayed untethered chained);
@files = qw(moves conditions cco ruinmoves bondprompts breaking remember impulse gains color);

foreach $pb ( @playbooks ) {
	foreach $f ( @files ) {
		`touch ${pb}${f}.pug`;
	}
}