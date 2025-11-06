To effectively track the new spatial elements, the combat log must be updated to clearly communicate *where* combatants start and *how* they moved.

The log entries should follow this structure for clarity:

### 1\. Initial Placement Log

This entry should occur once, at the start of combat, after `calculateMapDimensions()` and `placeCombatants()` run.

**Log Format:**
`🌍 Battlefield initialized: [W] x [H] x [D] feet ([X] x [Y] x [Z] cells).`
`🟢 [Combatant Name] ([Team Name]) deployed at X:[#], Y:[#], Z:[#].`

**Example:**

```
🌍 Battlefield initialized: 120 x 120 x 120 feet (24 x 24 x 24 cells).
🟢 Ogre (Team A) deployed at X:[3], Y:[4], Z:[0].
🟢 Dragon (Team B) deployed at X:[20], Y:[18], Z:[0].
```

### 2\. Movement Log (Per Turn)

This entry should replace the simplified movement log in `moveCombatant` and must include the speed used and the full coordinate change.

**Log Format:**
`🚶 [Combatant Name] uses [Speed Type] speed, moving [Distance] ft. (From X:[#], Y:[#], Z:[#] to X:[#], Y:[#], Z:[#]).`

**Example (Ground Movement):**

```
🚶 Goblin moves 30 ft. (From X:[2], Y:[3], Z:[0] to X:[5], Y:[3], Z:[0]).
```

**Example (Flying Movement):**

```
✈️ Dragon uses Fly speed, moving 60 ft. (From X:[20], Y:[18], Z:[1] to X:[15], Y:[13], Z:[10]).
```

### 3\. Attack Distance Log

This entry should be part of the `processAttack` function to confirm the range at the time of the attack.

**Log Format:**
`🎯 [Combatant Name] targets [Target Name] at [Distance] ft.`

**Example:**

```
🎯 Ogre targets Goblin at 10 ft. (Melee range).
🎯 Elf targets Dragon at 95 ft. (Long Range, Disadvantage applied).
```