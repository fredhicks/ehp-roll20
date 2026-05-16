#!/usr/bin/perl

print "should only be run the once\n"; # exit;

@playbooks = qw(passingthetorch);
@files = qw(style moves enemies allies assets);
%pbs = (
	'passingthetorch' => 'PassingTheTorch',
);

foreach $f ( @files ) {
	print "#", $f, "\n";
	foreach $pb ( @playbooks ) {
		print $pb, "\n";
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
