#!/usr/bin/perl

print "should only be run the once\n"; exit;

@playbooks = qw(hauntbusters armyofone squareone doomedworld monsterrevs lineage thrillseekers);
@files = qw(style moves enemies allies assets);
%pbs = (
	'hauntbusters' => 'Hauntbusters',
	'armyofone' => 'ArmyOfOne',
	'squareone' => 'SquareOne',
	'doomedworld' => 'DoomedWorld',
	'monsterrevs' => 'MonsterRevs',
	'lineage' => 'Lineage',
	'thrillseekers' => 'ThrillSeekers',
);

foreach $f ( @files ) {
	foreach $pb ( @playbooks ) {
		`touch team-${f}-${pb}.pug`;
		`cp team-${f}-survivors.pug team-${f}-${pb}.pug`;
		my $file = "team-${f}-${pb}.pug";
		open(F,"<$file");
		my @fc = <F>;
		close(F);
		$fc = join('',@fc);
		$fc =~ s/Survivors/$pbs{$pb}/g;
		open (F,">$file");
		print F $fc;
		close(F);
	}
}
