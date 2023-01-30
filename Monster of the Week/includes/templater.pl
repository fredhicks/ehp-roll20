#!/usr/bin/perl

print "should only be run the once\n"; exit;

# @playbooks = qw(agents road entourage guardians imps crisis survivors league mercenaries mysteryclub nightshift suburbanwatch band whistleblowers fugitives);
@playbooks = qw(league mercenaries mysteryclub nightshift suburbanwatch band whistleblowers fugitives);
@files = qw(style moves enemies allies assets);
%pbs = (
	'league' => 'League',
	'mercenaries' => 'Mercenaries',
	'mysteryclub' => 'MysteryClub',
	'nightshift' => 'NightShift',
	'suburbanwatch' => 'SuburbanWatch',
	'band' => 'Band',
	'whistleblowers' => 'Whistleblowers',
	'fugitives' => 'Fugitives',
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
