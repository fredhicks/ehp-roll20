// a bunch of skill-rowX-Y attributes exist, but those 
// should be created as skill list gets populated and/or
// sheet gets opened
// 
// Similarly there are a few action-triggering attributes
// like "addskills", etc, which aren't a part of this as
// their at-rest state is empty anyway.

const attributes = [
	"character_name", "SheetOptions", "Show-Aspects", "Show-Combinable", "Show-Conditions", "Show-Consequences", "Show-Corruption", "Show-Diceprompts", "Show-Extras", "Show-FP", "Show-Logo", "Show-Modes", "Show-Notes", "Show-Packages", "Show-Powers", "Show-Refresh", "Show-Roles", "Show-RollableAspects", "Show-Skills", "Show-Skillswaps", "Show-Stress", "Show-Stunts", "Show-TempAspects", "EditAspects", "EditCombos", "EditConditions", "EditConsequences", "EditExtras", "EditModes", "EditNotes", "EditPackages", "EditPowers", "EditRoles", "EditSkills", "EditStress", "EditStunts", "EditSwaps", "EditTempAspects", "aspectlist", "combomulti", "combotally", "combotext", "corruption", "custom-aspects", "custom-conditions", "custom-consequences", "custom-skills", "custom-stress", "focused", "fp", "lastswapped", "pronouns", "refresh", "rolllist", "rolltally", "setgame", "skillcount", "SkillStyle", "specialized", "stuntcount", "theme", "uninitialized"
];

const fieldsets = {
	aspects: [
		"category","label","aspect","flags","invokes",
		"rollvalue","notes","rollthis","options",
		"check1","check2","check3","check4","check5",
		"check6","check7","check8","check9","check10"
	],
	skills: [
		"skill","rating","bonus","column","rating-word",
		"rollthis"
	],
	stunts: [
		"name","desc","skill","skillvalue","bonus","rollable"
	],
	stress: [
		"label","track","notes","options",
		"track1","track2","track3","track4","track5",
		"track6","track7","track8","track9","track10",
		"check1","check2","check3","check4","check5",
		"check6","check7","check8","check9","check10"
	],
	consequences: [
		"label","track","trackcheck","recovery","aspect"
	],
	conditions: [
		"label","track","notes","options",
		"track1","track2","track3","track4","track5",
		"track6","track7","track8","track9","track10",
		"check1","check2","check3","check4","check5",
		"check6","check7","check8","check9","check10"
	],
	tempaspects: [
		"aspect","invokes","notes","options",
		"check1","check2","check3","check4","check5",
		"check6","check7","check8","check9","check10"
	],
	modes: [
		"mode","rating","word","skills"
	],
	roles: [
		"role","skills"
	],
	swaps: [
		"label","skills"
	],
	packages: [
		"package","aspects","skills","stunts",
	],
	powers: [
		"name","desc","breakdown","sfx","sfxmenu", 
		"drawbacks","collateral","cost"
	],
	extras: [
		"element","name","label","icon","icon2","icon3",
		"skill","rating","word","rollable","bonus",
		"skillvalue","text","track",
		"track1","track2","track3","track4","track5",
		"track6","track7","track8","track9","track10",
		"check1","check2","check3","check4","check5",
		"check6","check7","check8","check9","check10"
	],
	notes: [
		"name","desc"
	]
}