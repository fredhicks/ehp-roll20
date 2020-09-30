	var playbooks = {
		"playbook keyname": {
			name: "The Playbook",
			bio: "The Beast follows their truth and their passions, which puts them in conflict with civilization and civilized norms. Unless they give up what makes them special and powerful, they cannot make themself acceptable to that civilized society. Their central conflict is living their truth versus fitting in with a dominant social order. Example Archetypes: Ranger Between Worlds, Bitten, Raised by Beasts",
			look: {
				label: "suggestion, suggestion, suggestion"
			},
			startstats: [
				{ statname: 0, statname2: 1, statname3: -1, statname4: 2, statname5: 0 }
			],
			moves: [
				{
					subheader: "Special Stuff Section",
					pbdefault: "yes"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes"
				},
				{
					name: "",
					body: "",
					preamble: "", // a second paragraph usually introducing a set of options
					bullets: [
						"",
						""
					],
					hit: "",
					hitbullets: [
						"",
						""
					],
					mixed: "",
					mixedbullets: [
						"",
						""
					],
					miss: "",
					missbullets: [
						"",
						""
					],
					alternative: "", // a second section introducing a second set of options
					althit: "",
					althitbullets: [
						"",
						""
					],
					altmixed: "",
					altmixedbullets: [
						"",
						""
					],
					altmiss: "",
					altmissbullets: [
						"",
						""
					],
					end: "", // a closing paragraph
					blanks: [ // fill-in-the-blank entries, with a label-name and a list of suggested values
						{ 
							name: "",
							suggestions: ""
						}
					],
					rolled: "yes|no", // default no; if yes, there will be a roll button
					rolldefault: "statkey", // e.g., daring, grace, heart, wit, spirit 
					pbdefault: "yes|no", // default no - is this move default selected for the playbook
					pbother: "yes|no" // default yes - is this move available for other playbooks
				},
				{
					subheader: "Truths of Heart ",
					pbdefault: "yes"
				},
				{} // etc
			]
		}
	};