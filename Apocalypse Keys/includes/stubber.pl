#!/usr/bin/perl

@playbooks = qw(summoned surge found shade last fallen hungry);
@files = qw(moves conditions cco ruinmoves bondprompts breaking remember impulse gains color);

foreach $pb ( @playbooks ) {
	foreach $f ( @files ) {
		`touch ${pb}${f}.pug`;
	}
}