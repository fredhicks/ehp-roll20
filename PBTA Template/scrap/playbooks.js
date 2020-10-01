	// BIG playbooks data set
	
	var playbooks = {
		"beast": { 
			name: "The Beast",
			bio: "The Beast follows their truth and their passions, which puts them in conflict with civilization and civilized norms. Unless they give up what makes them special and powerful, they cannot make themself acceptable to that civilized society. Their central conflict is living their truth versus fitting in with a dominant social order. Example Archetypes: Ranger Between Worlds, Bitten, Raised by Beasts",
			look: {
				demeanor: "wild demeanor, hungry demeanor, piercing demeanor",
				clothes: "torn clothes, practical clothes, chitinous clothes, raider's clothes",
				sword: "a cold-wrought sword, a sword of teeth, a found sword"
			},
			startstats: [
				{ daring: 1, grace: 0, heart: 1, wit: -1, spirit: 0 },
				{ daring: 1, grace: 1, heart: -1, wit: 0, spirit: 0 }
			],
			moves: [
				{
					subheader: "Feral",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Feral",
					tracklabel: "Feral",
					body: "You may walk in civilized circles, but sooner or later your feral truth will come to the fore. Your Feral score starts at 1. If it hits 4, you can't hold back the beast any longer and you Transform. If your Feral drops to 0, you lose access to all your Beast playbook moves until it increases again. On the plus side, you're fitting in. You blend. You've assimilated.",
					preamble: "Increase Feral when:",
					bullets: [
						"You express yourself in a shocking way through your appearance",
						"You display intense emotion that society wants you to conceal"
					],
					alternative: "Decrease Feral when:",
					altbullets: [
						"You feel that your bestial nature has hurt someone you care about",
						"You go along with an uncomfortable interaction to fit in"
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					instructions: "(start with the move marked and choose two more)",
					pbdefault: "yes"
				},
				{
					name: "Transform",
					body: "You have a bestial form, which you can assume at will and must assume whenever your Feral hits 4. When you do, tell everyone what the beast in you looks like, increase your Feral to 4 if it’s not there already, and roll +Daring:",
					hit: "Choose 2",
					mixed: "Choose 1",
					rolled: "yes",
					rolldefault: "daring",
					mixedbullets: [
						"You are in harmony with your beast and may clear a Condition",
						"You are magnificent and little escapes your notice; you gain leverage or an opportunity with a monster",
						"Pain is nothing to you; ignore the next time you would Stagger while transformed",
						"You can move in ways no ordinary person could"
					],
					end: "You revert to your usual form when your Feral drops below 4. While transformed, you may mark a Condition to avoid reducing your Feral, as often as you like.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Big Dyke Energy",
					body: "When you make it clear to your foes that you’re the biggest threat, then for the rest of the scene, whenever you roll a 10+, you may choose someone present to be impressed or intrigued with you. Once during the scene, when you gain a String on someone, gain an additional String on someone else who considers you an enemy"
				},
				{
					name: "Ferocious",
					body: "When you Fight, you may mark a Condition to choose an additional option, even on a 6-."
				},
				{
					name: "Shameless",
					body: "When you say aloud what you want from an NPC, you may give them a String on you to ask a question about them from the Figure Out move."
				},
				{
					name: "Tenacious Purpose",
					body: "When you commit yourself to a specific goal, you may ask the GM once per scene how you could advance that goal in a way that violates “civilized” norms. Take +1 forward to act on the answer. If you refrain, it counts as an uncomfortable situation that reduces your Feral by 1 and you must mark a Condition.",
					pbother: "no"
				},
				{
					name: "Tracker",
					body: "When you investigate a person’s living space, camp, or trail, or an object important to them, you can roll +Heart instead of +Wit to Figure Them Out, and may do so even when they’re not present. You can also ask the question, “Where did they go?” as if it were an option on the list for that move. On a 7–9, they take a String on you instead of asking a question back. Say why. Do they just smell that good or that fearsome?",
					rolled: "yes",
					rolldefault: "heart"
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Smitten Kitten",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: [
						"What have you done that you are sure they view as inappropriate?"
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "The Bloody Truth",
					body: "When you Figure Out a Person in physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: [
						"What awakens the beast inside you?", "How could I get you to kiss me?"
					],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"chosen": { 
			name: "The Chosen",
			bio: "The Chosen playbook revolves around special status, relationships across social strata, and the crushing expectations of fate, family, or the adoring public. Their central conflict is inner truth versus crushing social expectations. Example Archetypes: Magical Princess, Pop Idol, Chosen One",
			look: {
				demeanor: "Stoic demeanor, benevolent demeanor, authoritative demeanor",
				clothes: "Fancy clothes, holy vestments, clothes denoting status",
				sword: "A bejeweled sword, an ancestral sword, a holy sword"
			},
			startstats: [
				{ daring: -1, grace: 1, heart: 1, wit: 0, spirit: 0 },
				{ daring: 0, grace: 1, heart: 0, wit: 1, spirit: -1 }
			],
			moves: [
				{
					subheader: "Destiny",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Destiny",
					body: "They keep telling you that you have a Destiny, but it’s not what your heart truly desires. What is it?",
					preamble: "Destiny Examples:",
					bullets: [
						"Marry the Prince of Heteronormia",
						"Be sacrificed to appease the Horror",
						"Banish magic from the world",
						"Melt the heart of the Undying One"
					],
					alternative: "Choose two Heroic Aspects and two Tragic Aspects from the following lists. When you act in accordance with one of your Aspects, check it off and take +1 forward. If it’s a Tragic Aspect, also mark XP. When all four Aspects are checked off, describe how your Destiny grows ever nearer, then erase the check marks and begin again.",
					end: "You may fulfill your Destiny in the course of play, or reject it so firmly that you no longer feel pressure to fulfill it. This deserves a climactic scene either way, and trying to reject your Destiny draws the full wrath of your Aspects and those pressing you to fulfill it. Afterwards, choose a new Destiny, adopt a new playbook, or live happily ever after.",
					blanks: [
						{
							name: "Heroic Aspect",
							suggestions: "Portents & Prophecies, Spiritual Prowess, Heir to a Mystic Power, Prominent Suitors, Save Your World, Soother of Monsters, Help of the Masses, Chosen by a God, Legendary Skill",
							checkbox: "yes"
						},
						{
							name: "Heroic Aspect",
							suggestions: "Portents & Prophecies, Spiritual Prowess, Heir to a Mystic Power, Prominent Suitors, Save Your World, Soother of Monsters, Help of the Masses, Chosen by a God, Legendary Skill",
							checkbox: "yes"
						},
						{
							name: "Tragic Aspect",
							suggestions: "Love that Cannot Be, End of the Universe, Lose Those You Love, Arch-Nemesis, Bitter Rival, Betrayal, Seduced by Evil, Coveted Destiny, The End of Love Itself",
							checkbox: "yes"
						},
						{
							name: "Tragic Aspect",
							suggestions: "Love that Cannot Be, End of the Universe, Lose Those You Love, Arch-Nemesis, Bitter Rival, Betrayal, Seduced by Evil, Coveted Destiny, The End of Love Itself",
							checkbox: "yes"
						}
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the move marked and choose two more)"
				},
				{
					name: "The Fated Day Approaches",
					body: "Whenever you miss an opportunity to make progress towards your Destiny, choose 1:",
					bullets: [
						"Someone with power over you makes an uncomfortable demand in furtherance of your Destiny, backed by a threat",
						"The PC you care about the most receives bad news or has an accident serious enough to make them Stagger"
					],
					end: "The GM will tell you the details, inspired by your Destiny. They may wait until a lull in the action to drop the consequences on you.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Don’t You Know Who I Am?",
					body: "When you meet someone who knows you by reputation (you decide), roll +Heart:",
					hit: "Say two things they’ve heard about you",
					mixed: "You say one, the GM says one",
					rolled: "yes",
					rolldefault: "heart",
					pbdefault: "no"
				},
				{
					name: "Entourage",
					body: "You have a group of loyal attendants. Name three of them who accompany you and choose a trait for them: Dangerous, Fanatical, Resourceful, Charming",
					preamble: "Choose a basic move. Your entourage grants you a +1 on rolls for this move when present. When you would Stagger, you may choose instead for one of your named Entourage to die. If you do, your Entourage gains a String on you.",
					blanks: [
						{
							name: "Member Names"
						},
						{
							name: "Entourage Trait",
							suggestions: "Dangerous, Fanatical, Resourceful, Charming"
						},
						{
							name: "Basic Move Receiving +1",
							suggestions: "Fight, Defy Disaster, Entice, Figure Out a Person, Emotional Support, Call on a Toxic Power"
						}
					],
					pbdefault: "no"
				},
				{
					name: "Gossip",
					body: "When you seek insight about a person by spending some time gossiping with those who know them, roll +Wit:",
					hit: "You learn a dangerous secret and gain a String on the target. You may also ask a question from the Figure Out a Person move.",
					mixed: "You may ask a question from the Figure Out a Person move.",
					end: "Someone you speak to who is dangerous to you may ask a question of you from the same list.",
					rolled: "yes",
					rolldefault: "wit",
					pbdefault: "no"
				},
				{
					name: "Guidance from Above",
					body: "When you petition a superior for guidance, they give you instructions and useful information. Mark XP or clear a Condition if you do as commanded. They gain a String on you if you do otherwise.",
					pbdefault: "no"
				},
				{
					name: "Help Me~~!",
					body: "You’re a magnet for trouble and hunted by those who would use you for their own purposes. Others mark XP when they Defy Disaster that would otherwise befall you. In addition, whenever you’re captured, your captor reveals something they hope to achieve; gain a String on them and mark XP.",
					pbdefault: "no"
				},
				{
					name: "Know Your Place!",
					body: "When someone dares insult you and you deliver a scathing retort, roll +Wit",
					hit: "Word spreads of your sharp wit, take +1 forward, and they choose 1",
					mixed: "They choose 1",
					mixedbullets: [
						"Back down",
						"Make a fool of themself",
						"Attack you"
					],
					rolled: "yes",
					rolldefault: "wit",
					pbdefault: "no"
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Love Is Not My Destiny",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: [ "How do our respective stations make it impossible to be together?" ],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Inescapable Conclusions",
					body: "When you Figure Out a Person during a physical conflict, you may ask one additional question from this list, even on a 6-:",
					bullets: [
						"What do you hope for your future?", "What do you fear is your destiny?"
					],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"devoted": { 
			name: "The Devoted",
			bio: "The Devoted is a selfless protector, committed to a person or a cause. Their central conflict lies in pitting this devotion against self-care. Example Archetypes: Sidekick, Champion, Protective Friend",
			look: {
				demeanor: "Hard demeanor, affectionate demeanor, alert demeanor",
				clothes: "Armor, uniform, sturdy clothes",
				sword: "A bestowed sword, a well-worn sword, a defensive sword"
			},
			startstats: [
				{ daring: 1, grace: 0, heart: 0, wit: -1, spirit: 1 },
				{ daring: 1, grace: 1, heart: -1, wit: 0, spirit: 0 }
			],
			moves: [
				{
					subheader: "Devotion",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Devotion",
					body: "Choose a Devotion from the example lists or invent one of your own. What three tenets of your Devotion have you found yourself tempted to violate?",
					preamble: "Mark a Condition if you act contrary to your Devotion, for instance by violating its tenets or disobeying a superior.",
					end: "When you Defy Disaster, you may bring a subject of your Devotion with you safely.",
					blanks: [
						{
							name: "My Devotion",
							suggestions: "To a cause: Freedom, vengeance, justice, love, the gay agenda. To a person: A PC, a liege, an idol. To a higher power: A god, a sexy dragon, a sentient planet."
						},
						{
							name: "Tenet 1" 
						},
						{
							name: "Tenet 2" 
						},
						{
							name: "Tenet 3" 
						}
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Last Stand",
					body: "When you face a superior foe on behalf of your Devotion, you may roll +Conditions (the number of Conditions you have marked) instead of the normal stat to Fight or to Defy Disaster that’s about to befall someone else.",
					rolled: "yes",
					rolldefault: "conditions-marked",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "What’s Best for Them",
					body: "When you’re Smitten with someone, you may treat them as a subject of your Devotion. Also, when you take action to help them be romantic with someone other than you, mark XP.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the move marked and choose two more)"
				},
				{
					name: "Fanatical Self-Sacrifice",
					body: "You may mark a Condition to prevent a Condition being inflicted on another. When you do, mark XP, and you may only clear that Condition by taking the associated destructive action. Mark it with an asterisk to remind yourself. Also, your Conditions only cause a –1 penalty to the associated basic moves (instead of –2).",
					pbdefault: "yes"
				},
				{
					name: "For the Cause!",
					body: "When you Fight the enemy of your Devotion, you can suffer a Condition to choose an additional option from the Fight move, even if you roll a 6-. You can inflict a Condition a second time within a single Fight move this way.",
					pbother: "no"
				},
				{
					name: "Gallant Rescue",
					body: "When you Defy Disaster that’s about to befall someone else, you can either gain a String on them or ask one of the following questions, even if you roll a 6-. You can only gain one String per scene in this way on any given person.",
					rolled: "yes",
					bullets: [
						"How do you feel about my Devotion?",
						"What secret pain lies in your heart?"
					]
				},
				{
					name: "Power of Conviction",
					body: "When you Entice someone while extolling the virtues of your Devotion or invoking its authority, you may roll +Spirit instead of +Heart. A superior in your Devotion gains a String on you, representing your dependence.",
					rolled: "yes",
					rolldefault: "spirit",
					pbother: "no"
				},
				{
					name: "Lay on Hands",
					body: "When you touch someone as part of Emotional Support, you heal their physical ailments. Tell them how your Devotion sustains you; they mark an XP if they validate your Devotion, and you gain a String on them if they criticize it.",
					rolled: "yes",
					pbother: "no"
				},
				{
					name: "Loyal Steed",
					body: "Name your steed and detail two strengths and two weaknesses from the lists given. When riding your steed, you may roll +Spirit to Fight and may take a person with you whenever you Defy Disaster.",
					rolled: "yes",
					rolldefault: "spirit",
					blanks: [
						{
							name: "Strengths",
							suggestions: "unthreatening, fast and agile, dangerous attack, hardy, stealthy, mental bond, flying (counts as both strength choices unless flight is common)"
						},
						{
							name: "Weaknesses",
							suggestions: "unusual diet, conspicuous, plodding, harmless, stubborn, collateral damage, vulnerable to something common"
						}
					]
				},
				{
					name: "Toxic Devotion",
					body: "Once per scene, when you forgive your Devotion for abusing you or make excuses for obvious problems with your Devotion, take +1 forward or mark XP. Also, once per scene, when you learn that another PC thinks your Devotion is problematic and you don’t defend it, mark a Condition and give them a String on you.",
					pbother: "no"
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "My Heart is Not Mine to Give",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: [ "How does pursuing them conflict with your Devotion?" ],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "What Will You Fight For?",
					body: "When you Figure Out a Person during a physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: [ "What are you willing to risk death for?", "What kind of deeds earn your loyalty?" ],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"infamous": { 
			name: "The Infamous",
			bio: "The Infamous once participated in wicked deeds, but they’ve become fiercely righteous in trying to atone. Their central conflict arises from the lasting consequences of their past actions and beliefs versus their new convictions. Will they repair the harm they caused, will they seek forgiveness, or will they despair? Will they find a new place to belong? Example Archetypes: Former Villain, Escaped Henchperson, Veteran of Dishonor",
			look: {
				demeanor: "Haunted demeanor, challenging demeanor, disdainful demeanor",
				clothes: "Dangerous clothes, unremarkable clothes, transgressive clothes",
				sword: "A broken sword, a wicked sword, an enemy’s sword"
			},
			startstats: [
				{ daring: 1, grace: -1, heart: 0, wit: 0, spirit: 1 },
				{ daring: 1, grace: 0, heart: 0, wit: 1, spirit: -1 }
			],
			moves: [
				{
					subheader: "What Cannot Be Undone",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "What Cannot Be Undone",
					body: "You’ve hurt people, and they have no obligation to forgive you or engage with you.",
					preamble: "Before defining Relationships in character creation, propose a wicked past that you think could be forgiven, and ask each PC this question:",
					bullets: [
						"What circumstances or subsequent deeds could make it possible to forgive this past?"
					],
					alternative: "If anyone hesitates or can’t answer the question, revisit your past and tone it down. You can tone down the gravity of your backstory by reducing the severity of your deeds or the agency you had in enacting them. Afterwards, answer these questions:",
					altbullets: [
						"What personal growth are you proud of?",
						"What about your past causes you the most grief?",
						"You swore to never again perform certain actions that could lead to harm. What are they? Examples include: Lying, stealing, accepting someone’s love, drawing blood, or breaking a promise. If you break your vow, you Stagger. Then decide whether to keep the vow or abandon it."
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the moves marked and choose two more)"
				},
				{
					name: "Wicked Past",
					body: "When you hear about a villain for the first time, you may decide that you know them from your past. If so, give them a String on you to ask a question from the Figure Out a Person list and take +1 forward against them.",
					pbdefault: "yes"
				},
				{
					name: "Make It Right",
					body: "When you allow yourself to be vulnerable to someone you hurt during your villainous past, they choose 1",
					bullets: [
						"Decline to engage; they gain a String on you",
						"Lash out; you Stagger",
						"Guide you; they mark XP and give you a task to help make amends",
						"Show vulnerability; you take +1 forward to interact with them",
						"Forgive you; you each clear a Condition and this move no longer triggers with this person"
					],
					pbdefault: "yes"
				},
				{
					name: "Always Suspect",
					body: "When you pretend to be a villain to win a villain’s trust, they trust you enough to offer you an opportunity and you gain a String on them. You must choose one of the following options:",
					bullets: [ 
						"Someone watching comes to the worst possible conclusion",
						"The villain requires an act of villainy to prove your intentions first",
						"The villain is only pretending to trust you and the opportunity is a trap"
					]
				},
				{
					name: "Talons of the Past",
					body: "When you gain a String on someone associated with your villainous past, or vice versa, mark XP. The first time this happens for a given person, you each can define a secret or vulnerability you know about the other."
				},
				{
					name: "They Can Change, Too",
					body: "When you give up an advantage on someone dangerous because you believe they can mend their wicked ways, you can ask a question as if you’d Figured Them Out."
				},
				{
					name: "Used to Disappointment",
					body: "When you rely upon or trust someone else with something important, say how you expect them to let you down.",
					bullets: [
						"If they pleasantly surprise you, they gain a String on you",
						"If they do as you expect, choose 1: they lose a String on you, or you gain a String on them",
						"If they are somehow even worse than you expected, you have a choice: berate them and inflict a Condition, or swallow your loneliness and take a Condition yourself"
					]
				},
				{
					name: "What Makes a Home",
					body: "If every other PC in a scene has a String on you, your Conditions cause you only a –1 penalty instead of a –2 to the associated basic moves."
				},
				{
					name: "Who’s the Monster?",
					body: "When you expose the hypocrisy of someone who is supposedly virtuous, roll +Daring:",
					rolled: "yes",
					rolldefault: "daring",
					hit: "Gain a String on them and choose 1",
					mixed: "Choose 1",
					mixedbullets: [
						"The wrongness of their act is exposed to all; they mark XP if they change their mind. If they don’t, they must attack you or take a Condition.",
						"Your words sting; they take a Condition.",
						"You impress an onlooker; gain a String on them."
					]
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Undeserving",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: [
						"Why do you think they would be wrong to forgive you?"
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Your Wicked Heart",
					body: "When you Figure Out a Person during physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: [
						"What are you most ashamed of?", "How could I get you to betray your ideals?"
					],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"nature witch": { 
			name: "The Nature Witch",
			bio: "The Nature Witch is deeply connected to their environment and less experienced when it comes to people. They’re either new to socializing or are newly exploring what it feels like to socialize as their true self. Their central conflict revolves around the growth that their explorations will require from them and those who love them. Example Archetypes: Oblivious Horse Girl, Beacon of Kindness, Plant Geek Babygay",
			look: {
				demeanor: "Innocent demeanor, wise demeanor, sad demeanor",
				clothes: "Modest clothes, rough clothes, simple clothes",
				sword: "A wooden sword, a harmless sword, an elemental sword"
			},
			startstats: [
				{ daring: -1, grace: 0, heart: 1, wit: 0, spirit: 1 },
				{ daring: -1, grace: 1, heart: 0, wit: 0, spirit: 1 }
			],
			moves: [
				{
					subheader: "Curiosity",
					pbdefault: "yes"
				},
				{
					name: "Curiosity",
					body: "Dealing with people feels new to you and you might be awkward, but you want to learn. What better way to learn than by doing?",
					preamble: "Choose four Trials from the list. When you complete a chosen Trial, mark it and choose one: mark XP, clear a Condition, or take a String on someone involved. When your four chosen Trials are all fulfilled, reflect on what you’ve learned about yourself and pick four more. If you complete the entire list, choose the ones that meant the most to you and then evolve into a new form of life inspired by those experiences. Adopt a new playbook, remain a Nature Witch, or retire to live happily ever after.",
					blanks: [
						{
							name: "Trial 1",
							checkbox: "yes",
							suggestions: "Ride a fantastical creature. Win a duel. Go somewhere no person has tread before. Fall in love. Stick up for yourself, though it breaks someone’s heart. Lose someone you care about. Befriend someone very different from you. Liberate something dangerous. Receive a rare gift from someone you respect. Experience an altered state with a friend. Fail at something that means the world to you. Reject a conviction you once held. Extend kindness to someone who doesn’t deserve it. Achieve a lost cause. Throw away something comfortable to pursue a dream. Kiss someone dangerous. Forgive someone who deserves forgiveness. Trust someone with your secrets, only to be betrayed. Shock someone with an unwelcome truth. Earn forgiveness for a misdeed."
						},
						{
							name: "Trial 2",
							checkbox: "yes",
							suggestions: "Ride a fantastical creature. Win a duel. Go somewhere no person has tread before. Fall in love. Stick up for yourself, though it breaks someone’s heart. Lose someone you care about. Befriend someone very different from you. Liberate something dangerous. Receive a rare gift from someone you respect. Experience an altered state with a friend. Fail at something that means the world to you. Reject a conviction you once held. Extend kindness to someone who doesn’t deserve it. Achieve a lost cause. Throw away something comfortable to pursue a dream. Kiss someone dangerous. Forgive someone who deserves forgiveness. Trust someone with your secrets, only to be betrayed. Shock someone with an unwelcome truth. Earn forgiveness for a misdeed."
						},
						{
							name: "Trial 3",
							checkbox: "yes",
							suggestions: "Ride a fantastical creature. Win a duel. Go somewhere no person has tread before. Fall in love. Stick up for yourself, though it breaks someone’s heart. Lose someone you care about. Befriend someone very different from you. Liberate something dangerous. Receive a rare gift from someone you respect. Experience an altered state with a friend. Fail at something that means the world to you. Reject a conviction you once held. Extend kindness to someone who doesn’t deserve it. Achieve a lost cause. Throw away something comfortable to pursue a dream. Kiss someone dangerous. Forgive someone who deserves forgiveness. Trust someone with your secrets, only to be betrayed. Shock someone with an unwelcome truth. Earn forgiveness for a misdeed."
						},
						{
							name: "Trial 4",
							checkbox: "yes",
							suggestions: "Ride a fantastical creature. Win a duel. Go somewhere no person has tread before. Fall in love. Stick up for yourself, though it breaks someone’s heart. Lose someone you care about. Befriend someone very different from you. Liberate something dangerous. Receive a rare gift from someone you respect. Experience an altered state with a friend. Fail at something that means the world to you. Reject a conviction you once held. Extend kindness to someone who doesn’t deserve it. Achieve a lost cause. Throw away something comfortable to pursue a dream. Kiss someone dangerous. Forgive someone who deserves forgiveness. Trust someone with your secrets, only to be betrayed. Shock someone with an unwelcome truth. Earn forgiveness for a misdeed."
						}
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the move marked and choose two more)"
				},
				{
					name: "Wild Friends",
					body: "You can speak with animals and plants and may Influence them with Strings just like other NPCs. Near your home, or anywhere you have spent a long period of time, animal and plant friends are always nearby when you want them.",
					pbdefault: "yes"
				},
				{
					name: "Awaken the Wild",
					body: "When you are in a safe position and attempt to commune with a place or non-sentient creature, roll +Spirit:",
					rolled: "yes",
					rolldefault: "spirit",
					hit: "Choose 1",
					mixed: "Choose 1, GM will offer you a hard choice or success at a cost",
					mixedbullets: [
						"You cleanse it of hurt, corruption, or sickness",
						"You alter its behavior, ecosystem, or atmosphere to one you choose",
						"You make it dangerous to a certain person or creature, or a type of person or creature"
					],
					end: "If you attempt this move while rushed or while distressed to the point of having three or more Conditions, it works as above, briefly, but afterwards the place or creature will fall dead and barren."
				},
				{
					name: "Familiar",
					body: "You have a cute animal as your loyal familiar. You can perceive the world through its senses whenever you choose and communicate with it at any distance. In addition, choose a basic move. When the familiar helps with that basic move or with Emotional Support, take +1 to your roll.",
					blanks: [
						{ 
							name: "Basic Move",
							suggestions: "Fight, Defy Disaster, Entice, Figure Out a Person, Call on a Toxic Power"
						}
					]
				},
				{
					name: "I Ship It",
					body: "When you want to make a match between two other people and talk up one to the other, roll +Heart:",
					rolled: "yes",
					rolldefault: "heart",
					hit: "You may give the listener a String on the other person or give the other person a String on the listener",
					mixed: "As above, and the listener can either take a String on you or give the other person a String on you",
					end: "Anyone involved may mark XP if they become Smitten with anyone else involved, including the Witch (immediately or later this session, maximum of 1 XP per PC)."
				},
				{
					name: "The Magic of Love",
					body: "When you’re Smitten with someone and proudly extol the power of love, either of you may spend a String on the other to gain the use of one of their playbook moves for one scene."
				},
				{
					name: "Nature’s Touch",
					body: "When you touch someone and let the power of the natural world flow into them, roll +Spirit:",
					rolled: "yes",
					rolldefault: "spirit",
					hit: "Choose 2",
					mixed: "Choose 1",
					mixedbullets: [
						"They may give you a String on them to clear a Condition",
						"They gain the ability to speak with plants and animals for the rest of the scene",
						"They must answer one of the Figure Out a Person questions of your choice or else they take a Condition"
					]
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Love Conquers All",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: ["What is a clear challenge to being with them that you’re overlooking because of your naivete?"],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Clear-Hearted Insight",
					body: "When you Figure Out a Person during a physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: ["What makes you feel loved?","What do you hope for the future?"],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"scoundrel": { 
			name: "The Scoundrel",
			bio: "The Scoundrel is a hero of action and intense physicality. Their sword fights are punctuated by banter and flirtation and end in kisses as often as they end in bloodshed. Their central conflict lies in their urge to explore new horizons versus committing to purpose or security. Example Archetypes: Shimbo Pirate, Diva Fencing Champion, Dashing Jewel Thief",
			look: {
				demeanor: "Playful demeanor, provocative demeanor, eyes only for you",
				clothes: "Revealing clothes, flowing clothes, tight clothes, gaudy costume",
				sword: "A flashy sword, a famous sword, a delicate sword"
			},
			startstats: [
				{ daring: 1, grace: 1, heart: 0, wit: -1, spirit: 0 },
				{ daring: 1, grace: 0, heart: -1, wit: 1, spirit: 0 }
			],
			moves: [
				{
					subheader: "Living in the Moment",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Living in the Moment",
					body: "Why are you so fickle? Is there something you need to figure out about yourself, and you keep looking for it in other people instead? Are you afraid of the vulnerability that comes from investing in a relationship? Is your true love unattainable? Are you just that oblivious?",
					preamble: "Choose something that you’ll be able to grow past to give your character an emotional story arc. You don’t need to figure it out immediately, and the Scoundrel themself may not know at all.",
					blanks: [{name: "I may grow past"}],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the moves marked and choose two more)"
				},
				{
					name: "Heat of the Moment",
					body: "When you taunt someone into doing something they want to do but find unwise, roll +Daring:",
					rolled: "yes",
					rolldefault: "daring",
					preamble: "If the target is an NPC:",
					hit: "They'll do it in exchange for a small concession or reassurance",
					mixed: "They choose 1",
					mixedbullets: [
						"Create an opportunity for you or your allies",
						"They give you a String on them",
					],
					alternative: "If the target is a PC:",
					althit: "They mark XP if they do it, and must take a Condition if they don't",
					altmixed: "You choose 1",
					altmixedbullets: [
						"They mark XP if they do it",
						"They take a Condition if they don't"
					],
					end: "For either a PC or an NPC, if you aren’t already Smitten with them, you may choose to treat a 7–9 result as a 10+ by choosing to become Smitten with the target.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Lust at First Sight",
					body: "When you become Smitten with someone you barely know, declare your undying love and give them a String on you. Lose your Smitten status with anyone who has no Strings on you. Take +1 forward to any act you think might impress your new interest.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Shiny and New",
					body: "When you give or receive Emotional Support in an intimate moment with someone new, you each mark XP or clear a Condition.",
					pbdefault: "yes"
				},
				{
					name: "Better to Seek Forgiveness",
					body: "When you apologize to someone for your outrageous conduct and put yourself at their mercy, roll +Daring:",
					rolled: "yes",
					rolldefault: "daring",
					hit: "You find out what it will take for them to forgive you and you each gain a String on the other. If they forgive you, you each clear a Condition.",
					mixed: "You find out what it will take for them to forgive you. If you do it, you either take Strings on each other or they may clear a Condition, your choice."
				},
				{
					name: "Fools Rush In",
					body: "When you vault into a situation without forethought and wind up way over your head, give someone dangerous to you a String, mark XP, and take +1 forward to Defy Disaster."
				},
				{
					name: "Impressive Swordplay",
					body: "Whenever you roll a 7+ to Fight, you may gain a String on someone who is present and ask their player what it is about you that has impressed or intrigued them."
				},
				{
					name: "The Main Attraction",
					body: "When you make a dramatic entrance, roll +Grace:",
					rolled: "yes", rolldefault: "grace",
					hit: "Choose 2", mixed: "Choose 1",
					mixedbullets: [
						"All attention is focused on you for a moment",
						"You hold the attention of one person for as long as you deliver a dramatic speech",
						"Take a String on someone present",
						"You take +1 forward"
					]
				},
				{
					name: "One in Every Port",
					body: "When you return to any town you’ve been to before, name a person with whom you shared intimacy here and say how you left things. If you left on bad terms, mark XP and the GM will tell you something interesting that has changed since you were last here."
				},
				{
					name: "Rrrip!",
					body: "When you take or narrowly evade a physical blow from someone dangerous to you, you may declare that your clothes were damaged and are now practically indecent. For the remainder of the scene, when you roll a 10+ on any move against an NPC, you may declare that they have a crush on you (up to one NPC per roll and subject to GM discretion). Additionally, any PC who becomes Smitten with you during the remainder of the scene may mark XP."
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "To Love and Lose"
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: ["Why would your romance never last?"],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Repartée",
					body: "When you Figure Out a Person during a physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: ["What would make you run away with me?","Where did you learn to fight?"],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"seeker": { 
			name: "The Seeker",
			bio: "The Seeker comes from a toxic society and has found a new community in which to belong and grow. Their central conflict pits tradition and upbringing against justice and developing their personal values. Example Archetypes: Immigrant from Heteronormia, Enclave-Raised, Privileged Background",
			look: {
				demeanor: "Guarded demeanor, curious demeanor, uptight demeanor",
				clothes: "Foreigner’s clothes, old-fashioned clothes, elaborate getup",
				sword: "An ancient sword, a brand-new sword, “That’s not a sword!”"
			},
			startstats: [
				{ daring: 1, grace: 0, heart: -1, wit: 1, spirit: 0 },
				{ daring: 0, grace: 1, heart: 0, wit: -1, spirit: 1 }
			],
			moves: [
				{
					subheader: "Tradition, Commandments, Conviction",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Tradition",
					tracklabel: "Tradition",
					body: "Tradition is a measure of how you feel your Authority would judge your behavior.",
					preamble: "Your Tradition starts at 1. Gain a point of Tradition whenever you make a personal sacrifice to act in accordance with your Commandments, to a maximum of 4. When you are at 4 Tradition, you incur a Condition each time you act contrary to your Commandments.",
					end: "Spend Tradition at any time to temper the wrath of the Authority, or to take +1 forward to follow your Commandments or Call on a Toxic Power.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Commandments",
					body: "Describe the Authority that governed your upbringing and choose at least six Commandments the Authority has issued:",
					blanks: [
						{
							name: "Commandment", checkbox: "yes",
							suggestions: "Always answer an insult with a drawn sword. Never admit to your weak emotions. Always cover your sinful body. No intimacy until after a monogamous marriage. Never give when you can sell. Never let a weaker person fight their own battles. Never fight a weaker person’s battles. Always obey the Authority. Always obey a certain type of person (gender, race, class, belief, elders). Never go unchaperoned (or at all) with a certain type of person."
						},
						{
							name: "Commandment", checkbox: "yes",
							suggestions: "Always answer an insult with a drawn sword. Never admit to your weak emotions. Always cover your sinful body. No intimacy until after a monogamous marriage. Never give when you can sell. Never let a weaker person fight their own battles. Never fight a weaker person’s battles. Always obey the Authority. Always obey a certain type of person (gender, race, class, belief, elders). Never go unchaperoned (or at all) with a certain type of person."
						},
						{
							name: "Commandment", checkbox: "yes",
							suggestions: "Always answer an insult with a drawn sword. Never admit to your weak emotions. Always cover your sinful body. No intimacy until after a monogamous marriage. Never give when you can sell. Never let a weaker person fight their own battles. Never fight a weaker person’s battles. Always obey the Authority. Always obey a certain type of person (gender, race, class, belief, elders). Never go unchaperoned (or at all) with a certain type of person."
						},
						{
							name: "Commandment", checkbox: "yes",
							suggestions: "Always answer an insult with a drawn sword. Never admit to your weak emotions. Always cover your sinful body. No intimacy until after a monogamous marriage. Never give when you can sell. Never let a weaker person fight their own battles. Never fight a weaker person’s battles. Always obey the Authority. Always obey a certain type of person (gender, race, class, belief, elders). Never go unchaperoned (or at all) with a certain type of person."
						},
						{
							name: "Commandment", checkbox: "yes",
							suggestions: "Always answer an insult with a drawn sword. Never admit to your weak emotions. Always cover your sinful body. No intimacy until after a monogamous marriage. Never give when you can sell. Never let a weaker person fight their own battles. Never fight a weaker person’s battles. Always obey the Authority. Always obey a certain type of person (gender, race, class, belief, elders). Never go unchaperoned (or at all) with a certain type of person."
						},
						{
							name: "Commandment", checkbox: "yes",
							suggestions: "Always answer an insult with a drawn sword. Never admit to your weak emotions. Always cover your sinful body. No intimacy until after a monogamous marriage. Never give when you can sell. Never let a weaker person fight their own battles. Never fight a weaker person’s battles. Always obey the Authority. Always obey a certain type of person (gender, race, class, belief, elders). Never go unchaperoned (or at all) with a certain type of person."
						}
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Convictions",
					body: "When you break a Commandment and repudiate it forever, mark its checkbox and mark XP. Write a Conviction expressing your new beliefs, something that contradicts the Commandment.",
					preamble: "Each time you live up to a Conviction despite temptation or cost, reduce your Tradition by 1 and ask an onlooker if they agree with that Conviction. If they say yes, take a String on them and learn what holds them back from living up to it, if anything. If they say no, mark a Condition.",
					end: "Convictions should be bold statements that stand in contrast to the Commandments. Refer to the suggestions for each blank for ideas.",
					blanks: [
						{
							name: "Conviction",
							suggestions: "I care for myself as I would my dearest friend. Fear will not stop me from speaking the truth of my heart. I will fight for the well-being of those targeted by the Authority, if they wish it. I will atone for the harm I’ve done by liberating others from the Authority. When I see something unjust, I will educate those who can learn to do better and challenge those who must be overcome."
						},
						{
							name: "Conviction",
							suggestions: "I care for myself as I would my dearest friend. Fear will not stop me from speaking the truth of my heart. I will fight for the well-being of those targeted by the Authority, if they wish it. I will atone for the harm I’ve done by liberating others from the Authority. When I see something unjust, I will educate those who can learn to do better and challenge those who must be overcome."
						},
						{
							name: "Conviction",
							suggestions: "I care for myself as I would my dearest friend. Fear will not stop me from speaking the truth of my heart. I will fight for the well-being of those targeted by the Authority, if they wish it. I will atone for the harm I’ve done by liberating others from the Authority. When I see something unjust, I will educate those who can learn to do better and challenge those who must be overcome."
						},
						{
							name: "Conviction",
							suggestions: "I care for myself as I would my dearest friend. Fear will not stop me from speaking the truth of my heart. I will fight for the well-being of those targeted by the Authority, if they wish it. I will atone for the harm I’ve done by liberating others from the Authority. When I see something unjust, I will educate those who can learn to do better and challenge those who must be overcome."
						},
						{
							name: "Conviction",
							suggestions: "I care for myself as I would my dearest friend. Fear will not stop me from speaking the truth of my heart. I will fight for the well-being of those targeted by the Authority, if they wish it. I will atone for the harm I’ve done by liberating others from the Authority. When I see something unjust, I will educate those who can learn to do better and challenge those who must be overcome."
						},
						{
							name: "Conviction",
							suggestions: "I care for myself as I would my dearest friend. Fear will not stop me from speaking the truth of my heart. I will fight for the well-being of those targeted by the Authority, if they wish it. I will atone for the harm I’ve done by liberating others from the Authority. When I see something unjust, I will educate those who can learn to do better and challenge those who must be overcome."
						}
					],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the move marked and choose two more)"
				},
				{
					name: "People Are People",
					body: "When you talk about your home, roll +Heart:",
					rolled: "yes", rolldefault: "heart",
					hit: "Choose 2", mixed: "Choose 1",
					mixedbullets: [ "Admit a flaw about your home; gain +1 forward","Share something good about your home; clear a Condition","Lie about your home to impress a listener; take a String on them" ],
					pbdefault: "yes"
				},
				{
					name: "Hear Me!",
					body: "When you shout one of your Convictions aloud in confrontation with those who hold a contrary belief, roll +Daring:",
					rolled: "yes", rolldefault: "daring",
					hit: "Ask 2", mixed: "Ask 1",
					mixedbullets: [
						"Why do you think you have to follow that belief?","What does it cost you to follow that belief?","What do you wish for that is contrary to that belief?"
					]
				},
				{
					name: "It Wasn’t All Bad",
					body: "When you encounter someone whose perspective is different from that of your companions, share a relevant story from your home culture and roll +Spirit:",
					rolled: "yes", rolldefault: "spirit",
					hit: "Gain a String on them and either take +1 forward to interact with them or grant that +1 forward to a companion",
					mixed: "Gain a String on them",
					end: "In either case, they also tell you something interesting or useful about their upbringing."
				},
				{
					name: "Listen and Learn",
					body: "When you ask someone what you should do in an unfamiliar situation:",
					bullets: ["If you follow their advice, take +1 forward and clear a Condition","If you follow their advice and it goes poorly, mark XP"]
				},
				{
					name: "Proper Courtship",
					body: "When you’re Smitten with someone and perform an elaborate and roundabout courtship ritual…",
					bullets: ["If the recipient responds properly, you each get +1 forward to protect each other until either of you breaks a Commandment, and they gain a point of Tradition that they can spend for the same effects you can","If they don’t understand that you’re Smitten, give a String to an onlooker who does understand"],
					pbother: "no"
				},
				{
					name: "Silly Tourist",
					body: "When you Figure Out a Person or Defy Disaster by playing the fool, you may additionally ask a question from this list, even on a 6-:",
					bullets: ["What would make you laugh?","What hidden threat or opportunity am I missing?","How are you vulnerable?"]
				},
				{
					name: "Stiff Upper Lip",
					body: "You can spend a point of Tradition to ignore the -2 penalty caused by Conditions. This effect ends if you violate a Commandment or at the end of the scene. When the effect ends, take a Condition.",
					pbother: "no"
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "I Don’t Belong",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: [ "Which of your values do they openly violate or decry?" ],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Not So Different",
					body: "When you Figure Out a Person during a physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: ["What prejudice do you hold?","What tradition do you most value?"],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"spooky witch": { 
			name: "The Spooky Witch",
			bio: "The Spooky Witch is a weirdo who does their own thing while craving connection. They’ve found that many monsters are quite friendly if you give them a chance, but befriending them brands you a monster, as well. Their central conflict lies in navigating pressures to conform versus their own desires or those of their monstrous friends. Example archetypes: Spell Dancer, Nerdy Alchemist, Speaker for the Unseen",
			look: {
				demeanor: "Focused demeanor, playful demeanor, distant demeanor",
				clothes: "Wispy clothes, darker-than-black clothes, specialized clothes",
				sword: "An eldritch sword, a bone sword, a thirsty sword"
			},
			startstats: [
				{ daring: 0, grace: 0, heart: -1, wit: 1, spirit: 1 },
				{ daring: -1, grace: 1, heart: 0, wit: 0, spirit: 1 }
			],
			moves: [
				{
					subheader: "The Unseen",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "The Unseen",
					body: "The Unseen are mysterious beings most cannot perceive. Their very existence may be debated, but you know the truth, because they have spoken to you. You know that some are kind and some are dangerous, that they have abilities and limitations that differ from “normal” people, and that you find yourself in between.", 
					preamble: "Work with your GM to define what the Unseen are—or what your Spooky Witch thinks they are. They could be friendly spirits, phase-shifted aliens, psychic remnants, glitched-out nanites, angry poltergeists, or something totally other. When did you first interact with them? What do you think they want?",
					blanks: [ { name: "What the Unseen are like" } ],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the moves marked and choose two more)"
				},
				{
					name: "Commune with the Unseen",
					body: "When you perform a ritual to commune with the Unseen, give a dangerous Unseen a String on you and roll +Spirit:", 
					rolled: "yes", rolldefault: "spirit",
					hit: "Choose 2",
					hitbullets: [
						"Hide something in the Unseen world",
						"Learn something important from the Unseen",
						"Temporarily alter the Unseen nature of a place",
						"Ask a question from Figure Out a Person of anyone, anywhere, if you can name one of their deceased loved ones","Learn the recent history of an object you hold"
					],
					mixed: "Choose 2 from the 10+ list, but choose 1 thing that goes awry",
					mixedbullets: ["Restless Unseen cause a haunting","Hungry Unseen destroy all non-sentient life in a small area","Stern Unseen judge you, inflicting a Condition"],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "I Like Snails!",
					body: "When you are Smitten with someone and Figure Them Out, blurt out something weird and let them ask you a question from the list. Then ask them another question from the list, even on a 6-.",
					pbdefault: "yes"
				},
				{
					name: "Astral Dance", 
					body: "When you dance across the boundary into the realm beyond, describe it and roll +Grace:",
					rolled: "yes", rolldefault: "grace",
					hit: "You and a small number of others who dance with you arrive at a distant destination of your choice.",
					mixed: "You don’t arrive where you intend, you arrive almost too late, or you lose something important in the process. The GM will tell you which."
				},
				{
					name: "Divination", 
					body: "When you have time and safety to read the unseen truth of someone present, describe your divination process and what makes it conspicuous. The GM will tell you something interesting about the person or the obstacles they face that they don’t know. Then roll +Spirit:",
					rolled: "yes", rolldefault: "spirit",
					hit: "If you tell the truth, they clear a Condition. If you lie, gain a String on them.",
					mixed: "They learn the truth and clear a Condition."
				},
				{
					name: "Dreamwalk", 
					body: "When you touch an unconscious, sleeping, or willing subject, you can see an impression of their thoughts and appear in their dreams. You may roll +Spirit to Figure Out or Entice them in this state.",
					rolled: "yes", rolldefault: "spirit"
				},
				{
					name: "Eerie Companion",
					body: "You have a little pet monster or spirit. Choose two basic moves. The companion grants you +1 to these moves when it assists you, but its assistance is always obvious and alarming to ordinary people. In addition, you can speak with monsters.",
					blanks: [
						{
							name: "Basic Move Receiving +1",
							suggestions: "Fight, Defy Disaster, Entice, Figure Out a Person, Emotional Support, Call on a Toxic Power"
						},
						{
							name: "Basic Move Receiving +1",
							suggestions: "Fight, Defy Disaster, Entice, Figure Out a Person, Emotional Support, Call on a Toxic Power"
						}
					]
				},
				{
					name: "Friends in Weird Places", 
					body: "You are friends with some odd people. Folx that others might not consider people at all…",
					preamble: "Name three of them. For each one, write down one thing they’re good at, one reason why everyone else is afraid of them, and what you like to do together when you hang out.",
					end: "When you call on them for help, the GM tells you what they provide. Give them a String on you and mark the Favor next to their name. Whenever significant time passes, one of your friends with marked Favor will need help from you. Clear their Favor if you help, mark a Condition if you don’t.",
					blanks: [
						{ name: "1st friend", checkbox: "yes" }, { name: "Why everyone else is afraid of them" }, { name: "What we like to do together" },
						{ name: "2nd friend", checkbox: "yes" }, { name: "Why everyone else is afraid of them" }, { name: "What we like to do together" },
						{ name: "3rd friend", checkbox: "yes" }, { name: "Why everyone else is afraid of them" }, { name: "What we like to do together" }
					]
				},
				{
					name: "Talk Nerdy to Me",
					body: "You may roll +Wit instead of +Heart to Entice someone. In addition, choose an area of study that holds special interest for you. You have top-tier knowledge of this area and are always prepared with an interesting fact, and sometimes even a useful fact, when you come across something within your expertise. The GM will provide the information or invite you to make something up.",
					rolled: "yes", rolldefault: "wit"
				},
				{
					name: "Witchfire",
					body: "You may roll +Spirit instead of +Daring to Fight, but you’re very conspicuous when you do. The consequences of a 6- will be severe.",
					rolled: "yes", rolldefault: "spirit"
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Why Did I Bring up the Snails?",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: ["What obvious thing about you are you sure would make them reject you?"],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Whispered Secrets",
					body: "When you Figure Out a Person during a physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: ["What makes you insecure?","What haunts you?"],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		},
		"trickster": { 
			name: "The Trickster",
			bio: "The Trickster is devious and calculating. They fear closeness, sincerity, and vulnerability. If they show you the truth of their heart, they’ll be wearing a mask to do it. Their central conflict lies in desiring closeness while fearing vulnerability. Example Archetypes: Businesslike Spy, Endearing Charlatan, Cold Mastermind",
			look: {
				demeanor: "Harmless demeanor, suspicious demeanor, mercurial demeanor",
				clothes: "Hooded clothes, nondescript clothes, clothes to play a role",
				sword: "A concealed sword, a venomous sword, a surprising sword"
			},
			startstats: [
				{ daring: 1, grace: 0, heart: -1, wit: 1, spirit: 0 },
				{ daring: 0, grace: 1, heart: -1, wit: 1, spirit: 0 }
			],
			moves: [
				{
					subheader: "Too Many Feelings",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "Feelings", tracklabel: "Feelings",
					body: "Your heart is as passionate as any other, but you bury it beneath layers of deception—until you can’t keep your feelings in any longer.",
					preamble: "Start at 1 and increase your Feelings by 1 each time you gain a String, someone gains a String on you, or you mark a Condition. You may also choose to increase your Feelings any time you find yourself gasping or swooning over someone. Strings assigned during character creation don’t increase your Feelings.",
					alternative: "When you open up to someone whose regard matters to you, reduce your Feelings by 2. When you secretly perform a loving act for someone, reduce your Feelings by 1.",
					end: "If your Feelings track reaches 4, you can’t hold it in anymore. Tear off the mask and scream what you’ve been holding in, do what you’ve been afraid to do, and damn the consequences. You can give anyone present a String on you to gain a String on them. Stop when the consequences catch up with you, for good or ill. Afterwards, reduce your Feelings to 0 and clear a Condition. It feels good to get it out, at least in the moment.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					subheader: "Playbook Moves",
					pbdefault: "yes",
					instructions: "(start with the moves marked and choose two more)"
				},
				{
					name: "Ew, Feelings",
					body: "When someone offers you Emotional Support and you refuse to open up, increase your Feelings by 1 and choose 1 from the listed options for that move as if they rolled 7–9. If they rolled 10+, they know they got through to you; they gain the benefits of a 10+ result as if you had opened up.",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "The Mask", 
					body: "When you seek to persuade an NPC of a lie about yourself, roll +Wit:",
					rolled: "yes", rolldefault: "wit",
					hit: "Choose 2",
					mixed: "Choose 1",
					mixedbullets: ["They believe a big lie", "The lie you have chosen is unexpectedly perfect, creating a new opportunity", "They give you the benefit of the doubt and remain convinced even if there is some evidence of your lie"],
					end: "Additionally, whenever a PC Figures You Out, you can give false answers. You must increase your Feelings by 1 at the end of any scene where you do this.",
					pbdefault: "yes"
				},
				{
					name: "Center of the Web",
					body: "When someone approaches you to get something from you or threaten you. Choose 1:",
					bullets: ["Gain a String on them or they lose a String on you","Ask them a question from the Figure Out a Person move","+1 ongoing against them for the scene"]
				},
				{
					name: "Deft Fingers",
					body: "When you filch something from a person, roll +Grace:",
					rolled: "yes", rolldefault: "grace",
					hit: "Choose 2", mixed: "Choose 1",
					mixedbullets: ["The item reveals a secret love or vulnerability","The item creates an opportunity (such as a map, key, or note)","The person doesn’t know you took it"]
				},
				{
					name: "Devious Scheme",
					body: "When others go along with your cunning plan, roll +Wit:",
					rolled: "yes", rolldefault: "wit",
					hit: "Twice during your plan, you may choose 1",
					mixed: "Once during your plan, you may choose 1",
					mixedbullets: ["Produce just the right object","Describe an unexpected weakness in an obstacle","Appear right behind someone at a crucial moment"]
				},
				{
					name: "Knives behind the Mask",
					body: "When someone reveals a secret about you in your presence, you’re prepared with a damaging secret about them. If you reveal it now in retaliation, they mark a Condition. If you keep the secret for the time being, gain a String on them."
				},
				{
					name: "Play the Part",
					body: "When you use someone else’s personal item or clothing to disguise yourself as them, roll +Daring:",
					rolled: "yes", rolldefault: "daring",
					hit: "While you remain so dressed, your disguise is perfect; only your words or deeds may expose you.",
					mixed: "Someone sees through your disguise, but they don’t give you away just yet. Give them a String.",
				},
				{
					subheader: "Truths of Heart and Blade",
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "A Beautiful Lie",
					body: "When you become Smitten with someone, say why, give them a String, and answer this question:",
					bullets: ["What secret do you have that you think would make them reject you if they knew?"],
					pbdefault: "yes",
					pbother: "no"
				},
				{
					name: "I See through You",
					body: "When you Figure Out a Person during a physical conflict, you may additionally ask one of these questions, even on a 6-:",
					bullets: ["Who do you want me to be?","What are you most afraid of right now?"],
					pbdefault: "yes",
					pbother: "no"
				}
			]
		}
	};

	// end BIG playbooks data set