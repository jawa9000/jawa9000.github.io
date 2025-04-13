const criticalHitTable = [
      {
        "% Roll": "1-30",
        "Result": "Hard hit",
        "Slashing Weapon/Blunt Weapon": "2x damage",
        "Piercing Weapon": "2x Damage"
      },
      {
        "% Roll": "31-40",
        "Result": "Powerful hit",
        "Slashing Weapon/Blunt Weapon": "2x damage, chance shield breaks",
        "Piercing Weapon": "2x damage, roll DEX or be knocked down"
      },
      {
        "% Roll": "41-65",
        "Result": "Massive hit",
        "Slashing Weapon/Blunt Weapon": "3x Damage",
        "Piercing Weapon": "3x Damage"
      },
      {
        "% Roll": "66-69",
        "Result": "Eviscerating hit",
        "Slashing Weapon/Blunt Weapon": "3x damage, chance shield breaks",
        "Piercing Weapon": "3x damage, roll DEX or be knocked down"
      },
      {
        "% Roll": "70",
        "Result": "Hand",
        "Slashing Weapon": "Smashed, 1 to combat",
        "Blunt Weapon": "Slashed open, 1 to combat",
        "Piercing Weapon": "Punctured muscle, 1 to combat"
      },
      {
        "% Roll": "71",
        "Result": "Hand",
        "Slashing Weapon": "1d4 fingers broken, hand incapacitated",
        "Blunt Weapon": "Lose 1 finger",
        "Piercing Weapon": "Punctured muscle, 1 to combat"
      },
      {
        "% Roll": "72",
        "Result": "Hand",
        "Slashing Weapon": "Lose 1d4 fingers, hand incapacitated (shield)",
        "Blunt Weapon": "Broken, hand incapacitated (shield)",
        "Piercing Weapon": "Muscle pierced, hand incapacitated"
      },
      {
        "% Roll": "73",
        "Result": "Foot",
        "Slashing Weapon": "Slashed open, 1/2 move",
        "Blunt Weapon": "Toe crushed, 1/2 move",
        "Piercing Weapon": "Punctured muscle, 1/2 move"
      },
      {
        "% Roll": "74",
        "Result": "Foot",
        "Slashing Weapon": "Foot smashed, move",
        "Blunt Weapon": "Lose 1d2 toes, move",
        "Piercing Weapon": "Punctured muscle, 1/2 move"
      },
      {
        "% Roll": "75",
        "Result": "Leg",
        "Slashing Weapon": "Crushed thigh, roll DEX or fall, 1/2 move",
        "Blunt Weapon": "Slashed open, 1/2 move",
        "Piercing Weapon": "Punctured thigh, roll DEX or fall, 1/2 move (shield)"
      },
      {
        "% Roll": "76",
        "Result": "Leg",
        "Slashing Weapon": "Removed at ankle, opponent falls",
        "Blunt Weapon": "Broken knee, move",
        "Piercing Weapon": "Punctured thigh, roll DEX or fall, 1/4 move"
      },
      {
        "% Roll": "77",
        "Result": "Leg",
        "Slashing Weapon": "Broken hip bone, opponent falls, 1½ move (shield)",
        "Blunt Weapon": "Removed at knee, opponent falls",
        "Piercing Weapon": "Split knee, fall, 1/2 move"
      },
      {
        "% Roll": "78",
        "Result": "Leg",
        "Slashing Weapon": "Broken shin, opponent falls, 14 move",
        "Blunt Weapon": "Removed just below hip, opponent falls (shield)",
        "Piercing Weapon": "Split knee, fall, 1¼ move"
      },
      {
        "% Roll": "79",
        "Result": "Arm",
        "Slashing Weapon": "Broken wrist, drop item",
        "Blunt Weapon": "Wrist removed",
        "Piercing Weapon": "Pierced wrist, 1 to combat"
      },
      {
        "% Roll": "80",
        "Result": "Arm",
        "Slashing Weapon": "Broken elbow, drop item (shield)",
        "Blunt Weapon": "Elbow removed",
        "Piercing Weapon": "Torn shoulder, 1 to combat"
      },
      {
        "% Roll": "81",
        "Result": "Arm",
        "Slashing Weapon": "Arm removed just below shoulder (shield)",
        "Blunt Weapon": "Broken, shoulder incapacitated, drop item",
        "Piercing Weapon": "Torn, shoulder incapacitated (shield)"
      },
      {
        "% Roll": "82",
        "Result": "Abdominal",
        "Slashing Weapon": "Ripped open, guts hanging out, roll STR or fall",
        "Blunt Weapon": "Smashed guts, roll STR or fall",
        "Piercing Weapon": "Punctured guts, roll STR or fall"
      },
      {
        "% Roll": "83",
        "Result": "Abdominal",
        "Slashing Weapon": "Ripped open, guts hanging out, stunned 1 round",
        "Blunt Weapon": "Crushed guts, stunned 1 round (shield)",
        "Piercing Weapon": "Stabbed, death (shield)"
      },
      {
        "% Roll": "84",
        "Result": "Abdominal",
        "Slashing Weapon": "Ripped open, death",
        "Blunt Weapon": "Pulped guts, Death",
        "Piercing Weapon": "Stabbed, death"
      },
      {
        "% Roll": "85",
        "Result": "Chest and neck",
        "Slashing Weapon": "Shoulder smashed, -1 to combat (shield)",
        "Blunt Weapon": "Lung slashed, 1 to combat",
        "Piercing Weapon": "Lung pierced, -1 to combat (shield)"
      },
      {
        "% Roll": "86",
        "Result": "Chest and neck",
        "Slashing Weapon": "Rib broken, stunned 1 round",
        "Blunt Weapon": "Shoulder crushed, -1 to combat",
        "Piercing Weapon": "Lung pierced, stunned 1 round (shield)"
      },
      {
        "% Roll": "87",
        "Result": "Chest and neck",
        "Slashing Weapon": "Chest slashed open, death (shield)",
        "Blunt Weapon": "Rib Broken, stunned 1 round (shield)",
        "Piercing Weapon": "Lung pierced, stunned 1 round"
      },
      {
        "% Roll": "88",
        "Result": "Chest and neck",
        "Slashing Weapon": "Throat cut, no speech (helm)",
        "Blunt Weapon": "Rib broken, stunned 1 round",
        "Piercing Weapon": "Chest pierced, defender incapacitated (shield)"
      },
      {
        "% Roll": "89",
        "Result": "Chest and neck",
        "Slashing Weapon": "Rib cage broken, defender incapacitated (shield)",
        "Blunt Weapon": "Throat cut, no speech",
        "Piercing Weapon": "Heart pierced, death (shield)"
      },
      {
        "% Roll": "90",
        "Result": "Chest and neck",
        "Slashing Weapon": "Chest crushed, opponent -2 to combat",
        "Blunt Weapon": "Chest slashed, opponent -2 to combat",
        "Piercing Weapon": "Heart pierced, death"
      },
      {
        "% Roll": "91",
        "Result": "Chest and neck",
        "Slashing Weapon": "Throat cut, death (helm)",
        "Blunt Weapon": "Chest crushed, death (shield)",
        "Piercing Weapon": "Throat pierced, no speech (helm)"
      },
      {
        "% Roll": "92",
        "Result": "Chest and neck",
        "Slashing Weapon": "Throat cut, death",
        "Blunt Weapon": "Chest crushed, death",
        "Piercing Weapon": "Throat pierced, no speech"
      },
      {
        "% Roll": "93",
        "Result": "Head",
        "Slashing Weapon": "Eye removed, stunned 1 round (helm)",
        "Blunt Weapon": "Skull hit, stunned 1 round, lose 1d4 INT (helm)",
        "Piercing Weapon": "Throat pierced, death (helm)"
      },
      {
        "% Roll": "94",
        "Result": "Head",
        "Slashing Weapon": "Eye removed, stunned 1 round, helm removed",
        "Blunt Weapon": "Skull hit, stunned 1 round, lose 1d4 INT",
        "Piercing Weapon": "Throat pierced, death"
      },
      {
        "% Roll": "95",
        "Result": "Head",
        "Slashing Weapon": "Skull hit, stunned 1 round, lose 2d4 INT (helm)",
        "Blunt Weapon": "Ear removed (helm)",
        "Piercing Weapon": "Eye removed (helm)"
      },
      {
        "% Roll": "96",
        "Result": "Head",
        "Slashing Weapon": "Skull hit, stunned 1 round, lose 2d4 INT",
        "Blunt Weapon": "Ear removed, helm removed",
        "Piercing Weapon": "Eye removed, helm removed"
      },
      {
        "% Roll": "97",
        "Result": "Head",
        "Slashing Weapon": "(1-3) Nose, (4-5) teeth shattered (helm)",
        "Blunt Weapon": "(1-3) Nose, (4-5)teeth crushed (helm)",
        "Piercing Weapon": "Skull hit, stunned 1 round, lose 1-4 INT (helm)"
      },
      {
        "% Roll": "98",
        "Result": "Head",
        "Slashing Weapon": "(1-3) Nose, (4-5) teeth shattered",
        "Blunt Weapon": "(1-3) Nose, (4-5) teeth crushed",
        "Piercing Weapon": "Skull hit, stunned 1 round, lose 1-4 INT (helm)"
      },
      {
        "% Roll": "99",
        "Result": "Head",
        "Slashing Weapon": "Decapitated, death (helm)",
        "Blunt Weapon": "Skull crushed, death (helm)",
        "Piercing Weapon": "Skull pierced, death (helm)"
      },
      {
        "% Roll": "100",
        "Result": "Head",
        "Slashing Weapon": "Skull crushed, death",
        "Blunt Weapon": "Decapitated, death",
        "Piercing Weapon": "Skull pierced, death"
      }
]
const fumbleTable = [
    {
        "% Roll": "1-25",
        "Result": "Distracted",
        "Fumble Effect": "Trip, roll DEX or fall"
    },
    {
        "% Roll": "26-39",
        "Result": "Clumsy",
        "Fumble Effect": "Fall, roll DEX or drop primary weapon"
    },
    {
        "% Roll": "40-50",
        "Result": "Very clumsy",
        "Fumble Effect": "Fall and drop primary weapon, roll DEX or be stunned for 1 round"
    },
    {
        "% Roll": "51-53",
        "Result": "Useless",
        "Fumble Effect": "Fall and become stunned for 1 round"
    },
    {
        "% Roll": "54-57",
        "Result": "Dazed",
        "Fumble Effect": "Fall, drop primary weapon, and be stunned for 1 round"
    },
    {
        "% Roll": "58-59",
        "Result": "Stunned",
        "Fumble Effect": "Fall and become stunned for 1d4 rounds"
    },
    {
        "% Roll": "60",
        "Result": "Dazed and stunned",
        "Fumble Effect": "Fall, drop primary weapon, and be stunned for 1d4 rounds"
    },
    {
        "% Roll": "61",
        "Result": "Unconscious",
        "Fumble Effect": "Fall, knocked head on floor, knocked out for 1d4 rounds"
    },
    {
        "% Roll": "58-62",
        "Result": "Inept",
        "Fumble Effect": "Weapon disarmed by opponent and thrown d20 feet in random direction"
    },
    {
        "% Roll": "63-65\n\n66-67",
        "Result": "Very inept\n\nKlutz",
        "Fumble Effect": "Weapon or appendage breaks or is broken\nTwist ankle, 1/2 move"
    },
    {
        "% Roll": "68-69\n70",
        "Result": "Dangerous klutz\nUntrained",
        "Fumble Effect": "Twist knee, 1/4 move\nTwist wrist, weapon arm incapacitated, drop weapon"
    },
    {
        "% Roll": "71",
        "Result": "Vulnerable",
        "Fumble Effect": "Opponent steps on foot, go last next round"
    },
    {
        "% Roll": "72\n73-74",
        "Result": "Knocked silly\n\nPoor judgment",
        "Fumble Effect": "Helm twists, blind till end of next round, roll again if no helm\n\nWrong move, opponent's next attack is at +4 to hit"
    },
    {
        "% Roll": "75-76",
        "Result": "Blocked with hand",
        "Fumble Effect": "Knuckles hit, -4 to hit till end of next round"
    },
    {
        "% Roll": "77-79",
        "Result": "Embarrassing",
        "Fumble Effect": "Armor piece knocked off, strap cut, belt cut, clothes torn, lose 2 armor class till fixed"
    },
    {
        "% Roll": "80",
        "Result": "Staggering in pain",
        "Fumble Effect": "Opponent's parry hits groin, 1/2 move, -4 to hit for 3 rounds"
    },
    {
        "% Roll": "81",
        "Result": "Numbness",
        "Fumble Effect": "Opponent's parry hits funny bone in weapon arm, 2 damage for 3 rounds"
    },
    {
        "% Roll": "82",
        "Result": "Irritating",
        "Fumble Effect": "Dirt blinds one eye, -1 to hit till cleaned"
    },
    {
        "% Roll": "83",
        "Result": "Very irritating",
        "Fumble Effect": "Dirt blinds two eyes, -3 to hit till cleaned"
    },
    {
        "% Roll": "84-85",
        "Result": "Fool",
        "Fumble Effect": "Hit self, normal damage"
    },
    {
        "% Roll": "86",
        "Result": "Useless fool",
        "Fumble Effect": "Hit self, normal damage and stunned for 1 round"
    },
    {
        "% Roll": "87-88",
        "Result": "Moron",
        "Fumble Effect": "Hit self, double damage"
    },
    {
        "% Roll": "89",
        "Result": "Useless moron",
        "Fumble Effect": "Hit self, double damage and stunned for 1 round"
    },
    {
        "% Roll": "90",
        "Result": "Complete moron",
        "Fumble Effect": "Hit self, critical hit"
    },
    {
        "% Roll": "91-92",
        "Result": "Unaware",
        "Fumble Effect": "Hit friend, normal damage"
    },
    {
        "% Roll": "93",
        "Result": "Very unaware",
        "Fumble Effect": "Hit friend, normal damage and friend stunned for 1 round"
    },
    {
        "% Roll": "94-95",
        "Result": "Unaware moron",
        "Fumble Effect": "Hit friend, double damage"
    },
    {
        "% Roll": "96",
        "Result": "Liability",
        "Fumble Effect": "Hit friend, double damage and friend stunned for 1 round"
    },
    {
        "% Roll": "97",
        "Result": "Big liability",
        "Fumble Effect": "Hit friend, critical hit"
    },
    {
        "% Roll": "98",
        "Result": "Bad",
        "Fumble Effect": "Roll twice on fumble table, if this comes up again re-roll"
    },
    {
        "% Roll": "99",
        "Result": "Very bad",
        "Fumble Effect": "Roll three times on fumble table, if this comes up again re-roll"
    },
    {
        "% Roll": "100",
        "Result": "Disastrous",
        "Fumble Effect": "Roll three times on fumble table, if this comes up again add two more rolls"
    }
]