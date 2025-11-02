Use the [PDF2JSON Prompt](https://docs.google.com/document/d/1-5uHuy5nKEDAXTc-61rxaPQYgDpTNQ08-MPI6YULu-4/edit?pli=1&tab=t.0) to generate monster JSON data.

## Change Log

* 11/2/25: 0.34.18
    * Fixed badge issue when it does it should say "[DEAD]".
* 10/27/25: 0.34.17
    * Minor tweaks to remove unnecessary items from the modal for monster selection.
    * Renamed a few headings.
    * Hid the Add Character button.
* 10/26/25: 0.34.16
    * More UI fixes to align with new color scheme.
    * Implemented Intimidation action and logic.
    * Updated the UI for Team A and Team B in the div.character-panel element and the team view buttons.
* 10/25/25: 0.33.13
    * Implemented petrified, charmed, restrained, frightened, grappled, incapacitated, invisibility, confused, and exhaustion conditions.
    * Updated the monster list display to include which conditions it has.
    * Added logic that a restrained monster should decide to break free from the restraint.
    * Updated decision logic so that a monster can only make one decision per round.
    * Added a temporary keybinding (Ctrl+Shift+M) to add 3 monsters to each team, roll initiative, and start combat.
    * Updated the combat logic to allow for a draw.
    * Implemented the surprise round system.
    * Implemented the time tracking system.
    * Updated the UI to disable buttons that should not be available during combat.
    * Moved inline styling of buttons to a class and added them to the CSS file.
    * Removed the buttons that were not used.
    * Changed the color of the Team A and Team B buttons and backgrounds.
    * Set up CSS variables to ensure consistency throughout the application.
    * Made some minor color changes to the UI.
    * Implemented saving throw bonuses.
    * Fixed issue where condition effects were not showing up.
    * Added the dead and survived badges to the initiative list.
    * Adjusted the UI of the team buttons.
* 10/24/25: 0.18.0
    * Implemented the stunned, poisoned, slowed, paralyzed, blinded, deafened, and prone conditions.
* 10/23/25: 0.11.2
    * Implemented the legendary action system.
    * Implemented rechargeable monster abilities and attacks.
    * Implemented ongoing effects.
    * Fixed bug where Copy Team Info wasn't copying the contents of the combat log.
    * Fixed issue where friendly fire was allowed.
* 10/22/25: 0.7.0
    * Implemented the Legendary Resistance system.
    * Implemented the frightful presence system.
    * Implemented the regeneration system.
* 10/21/25: 0.4.1
    * Implemented damage immunities across all effect damage types and paths.
    * Made minor updates to the UI of the Combat Log.
    * Implemented damage vulnerabilities across all effect damage types and paths.
* 10/18/25: 0.2.0
    * Updated attack effect damage system as it wasn't applying acid, fire, force, necrotic, psychic, radiant, cold, lightning, thunder, and poison damage during combat.
    * Added an attack decision system. Monsters with multiple attacks choose the most effective attack—calculated by attack bonus, damage potential, and special effects—with the chance of an intelligent choice being highly dependent on their Intelligence or Wisdom score.
    * Implemented damage resistance system. I also implemented a learning system where monsters remember ineffective attacks and adapt their strategy based on their intelligence or wisdom scores.
* 10/17/25: 0.1.3
    * Added functionality that handles attack effects (i.e. acid, fire, poison, etc.).
    * Added a button to the combat log that will copy the content of that element.
    * Removed the team selector from the monster selector modal.
    * Fixed an issue where the team selector was pushing all monsters into the same team.
* 9/14/25: 0.0.8
    * Fixed issue where attack data is empty.
    * Removed delay between each action (defaulted to 1.2 seconds).
    * Added element height limit and conditional scroll bar displaying the monster list in Initiative Order.
    * Added functionality to handle damage from the attacks properties.
* 9/7/25: 0.0.4
    * Made adjustments to initiative system, added critical damage to critical hits, and added system to add multiples of the same monster.
* 9/6/25: 0.0.1
    * Started creating a monster simulation combat system.

## Active Projects

* immunity to normal and non-silvered weapon damage
https://gemini.google.com/app/60f570356046a2cc
// --- PROPOSED MODIFICATION TO script.js (INSIDE CombatSimulator CLASS) ---

### immunity to normal and non-silvered weapon damage section
// 1. Add the following function inside the CombatSimulator class.
// This function must be called by the main attack processing logic (e.g., handleAttackAction).

    /**
     * Helper to process damage against a target, checking for immunities and resistances.
     * This function should be placed inside the CombatSimulator class.
     *
     * IMPORTANT: The calling function (e.g., handleAttackAction) must now pass:
     * 1. rawDamage
     * 2. damageType (e.g., 'Slashing')
     * 3. isMagical (boolean, defaults to false)
     * 4. isSilvered (boolean, defaults to false)
     *
     * @param {object} target - The combatant receiving the damage.
     * @param {number} rawDamage - The calculated damage amount before reduction.
     * @param {string} damageType - The type of damage (e.g., 'Slashing', 'Fire').
     * @param {boolean} isMagical - True if the weapon is magical.
     * @param {boolean} isSilvered - True if the weapon is silvered.
     * @returns {number} The final, adjusted damage amount.
     */
    processDamageReduction(target, rawDamage, damageType, isMagical = false, isSilvered = false) {
        let finalDamage = rawDamage;

        // Check for the specific non-silvered/non-magical physical damage immunity
        const isPhysical = ['Bludgeoning', 'Piercing', 'Slashing'].includes(damageType);
        
        // The exact string we are looking for in the monster's data
        const nonsilveredImmunity = "Nonmagical Bludgeoning, Piercing, and Slashing from nonsilvered weapons";

        // Check if the target has damage immunities defined and if it includes the specific immunity string
        if (target['damage immunities'] && target['damage immunities'].includes(nonsilveredImmunity)) {

            // Condition for triggering the full immunity (damage reduced to 0):
            // 1. The damage type is physical (B, P, or S).
            // 2. The attack is NOT magical.
            // 3. The attack is NOT silvered.
            if (isPhysical && !isMagical && !isSilvered) {
                this.logMessage(`🛡️ ${target.name} is immune to nonmagical, nonsilvered ${damageType} damage! Damage reduced to 0.`);
                return 0; // Damage reduced to zero
            }
        }

        // Handle generic immunities (like "Poison" or "Fire")
        if (target['damage immunities'] && target['damage immunities'].includes(damageType)) {
            this.logMessage(`🛡️ ${target.name} is immune to ${damageType} damage! Damage reduced to 0.`);
            return 0;
        }

        // Handle resistances (damage halved)
        if (target['damage resistances'] && target['damage resistances'].includes(damageType)) {
            this.logMessage(`⚔️ ${target.name} resists ${damageType} damage! Damage halved.`);
            finalDamage = Math.floor(finalDamage / 2);
        }

        // Handle vulnerabilities (damage doubled)
        if (target['Damage Vulnerabilities'] && target['Damage Vulnerabilities'].includes(damageType)) {
            this.logMessage(`⚠️ ${target.name} is vulnerable to ${damageType} damage! Damage doubled.`);
            finalDamage *= 2;
        }

        // Ensure final damage is non-negative
        return Math.max(0, finalDamage);
    }

// 2. Integration Point (Developer needs to find and modify this existing function)
// The function that handles the attack (e.g., handleAttackAction or similar) must be updated.

/*
// PSEUDO-CODE: Modify the existing attack handling function (e.g., handleAttackAction)

// ... inside the existing function, after calculating rawDamage ...

// *** NEW LOGIC TO DETERMINE ATTACK PROPERTIES ***
// NOTE: This assumes player/monster attacks have 'magical' and 'silvered' properties defined.
let isAttackMagical = attack.magical || false; 
let isAttackSilvered = attack.silvered || false;

// If a monster is attacking, their own attack is typically NOT silvered/magical 
// unless explicitly stated in their 'attacks' definition.
// For example, if the monster is attacking, and it's a standard Slam attack:
// isAttackMagical = false;
// isAttackSilvered = false; 

// *** APPLY REDUCTION ***
const finalDamage = this.processDamageReduction(
    target,
    rawDamage,
    attack['damage type'], // The type of damage from the attack definition
    isAttackMagical,
    isAttackSilvered
);

// *** APPLY DAMAGE ***
target.currentHp -= finalDamage;

// ... rest of the function ...
*/


* Separate the functionality of script.js into different JavaScript files that is logical and is easier to maintain.
>> conditions seems to be broken as it the monsters never pick them. Double check this later.

### Next sprint

## Developer Instructions: Dynamic Spatial Combat

The goal is to implement a dynamic, 3D grid system where the battlefield size adapts to the total volume of combatants. We also introduce the Z-axis to account for flying/swimming.

### Phase 1: Dynamic Map Sizing and 3D Data Model

This phase modifies the `CombatSimulator` setup to calculate `MAP_WIDTH`, `MAP_HEIGHT`, and the new `MAP_DEPTH` based on the total space required by all monsters.

#### 1.1 Update Combatant Data Model (Z-Axis)

**Developer/Copilot Task:** Modify the `Combatant` structure to include a Z-coordinate and a size property for its vertical dimension.

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **Add `z` coordinate** | In `CombatSimulator.addCombatant`, initialize a new property: `combatant.z: -1`. |
| **Map vertical size** | Since a $5 \times 5$ ft cube is the default, set a new property, `combatant.size_depth`, equal to `combatant.size_cells`. (Tiny, Small, Medium = 1 cell; Large = 2 cells, etc.). |

#### 1.2 Implement Volume Calculation (Cubic Feet)

**Developer/Copilot Task:** Create a new method in `CombatSimulator` to calculate the total required cubic feet of space for a given team.

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **New Method: `calculateTotalVolume(teamCombatants)`** | This method must iterate through the `teamCombatants` array and, for each one, calculate its volume in cubic feet: <br> $$\text{Volume (ft}^3) = (5 \times \text{size\_cells}) \times (5 \times \text{size\_cells}) \times (5 \times \text{size\_depth})$$ |
| **Return Value:** | The function should return the total required volume in cubic feet for the entire team. |

#### 1.3 Dynamic Map Dimension Calculation

**Developer/Copilot Task:** Create a method to set the `MAP_WIDTH`, `MAP_HEIGHT`, and `MAP_DEPTH` based on the calculated volume.

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **New Method: `calculateMapDimensions()`** | 1. Calculate the total required volume for Team A ($\text{Vol}_A$) and Team B ($\text{Vol}_B$). <br> 2. Determine the maximum required volume: $\text{Vol}_{\text{max}} = \max(\text{Vol}_A, \text{Vol}_B)$. <br> 3. Calculate the distance unit: $\text{Dist} = \text{roundUpToNearest5}(\sqrt[3]{\text{Vol}_{\text{max}}})$ (since everything is based on $5'$ increments). <br> 4. Set the final dimensions: $\\text{Map Size} = (\\text{Dist} \\times 4) + (\\text{Team A width}) + (\\text{Team B width}) $. For simplicity, use the largest monster size on a team for Team Width. |
| **Refined Calculation:** | **Total Map Side Length (Feet):** $$L = \text{Dist} + 2 \times (1 \text{ block behind team}) + (\text{Largest Team Width}) + (\text{Dist})$$ For simplicity, use: $$L_{\text{Total}} = 4 \times \text{Dist} + 50 \text{ feet (padding/starting width)}$$ <br> **Set Grid Cells:** <br> `this.MAP_WIDTH = this.MAP_HEIGHT = this.MAP_DEPTH = L_{\text{Total}} / 5;` |
| **Integration:** | Call this new method inside `CombatSimulator.startCombat()` **before** `placeCombatants()`. |

### Phase 2: 3D Placement and Movement

This phase modifies the placement logic to use 3D coordinates and updates the core functions to utilize the Z-axis.

#### 2.1 Update 3D Cell Tracking

**Developer/Copilot Task:** Modify cell tracking to manage $x, y, z$ coordinates.

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **Update `occupiedCells`:** | The key in the `occupiedCells` map must change from `"x,y"` to **`"x,y,z"`**. |
| **Update `isCellOccupied`:** | The function must accept `x, y, z` and loop through the $x, y, z$ dimensions ($i, j, k$) up to the combatant's `size_cells` and `size_depth` respectively, checking keys like `${i},${j},${k}`. |
| **Update `register/unregisterCombatantCells`:** | Update these methods to use the new 3D coordinate keys. |

#### 2.2 3D Initial Placement

**Developer/Copilot Task:** Update `placeCombatants` to use the Z-axis. Flying/Water movement must be accounted for by the initial Z-coordinate.

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **Placement Boundaries (Z-Axis):** | Assume ground level is $Z=0$. For simplicity, place all combatants at $Z=0$. Flying/swimming monsters can be placed at $Z=0$ and move later, or placed randomly up to $Z = \text{MAP\_DEPTH} / 4$ if they have a non-zero fly/swim speed. |
| **Team Separation:** | Team A still occupies the left side (low X), Team B the right side (high X). The separation distance is now dynamically set by the map size. |
| **Update `placeTeam`:** | Modify the `while` loop within `placeTeam` to generate a random $z$ coordinate (`k`) in addition to $x$ and $y$, and use the 3D check: `!this.isCellOccupied(x, y, z, size, size, size, combatant.id)`. |

#### 2.3 3D Distance and Movement

**Developer/Copilot Task:** Update the distance calculation and movement logic to include the Z-axis.

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **Update `calculateDistance(c1, c2)`:** | This function must now use 3D Euclidean distance: $$\text{Distance (feet)} = 5 \times \sqrt{ (x_1 - x_2)^2 + (y_1 - y_2)^2 + (z_1 - z_2)^2 }$$ |
| **Update `moveCombatant`:** | 1. **Add `targetZ`** to the function arguments: `moveCombatant(combatant, targetX, targetY, targetZ)`. <br> 2. Include $\text{dz}$ and $\text{stepZ}$ in the directional vector calculation (`angle` becomes more complex, but for simple direct movement, calculate steps for all three axes). <br> 3. The `for` loop now iterates through $x, y, z$ steps, prioritizing steps that close the gap in all three axes. <br> 4. The movement check (`isCellOccupied`) must now include the $Z$ dimension. |

### Phase 3: AI Tactical Movement (Melee vs. Ranged)

This phase ensures the AI correctly uses the Z-axis and respects the optimal distance for its weapon type.

#### 3.1 Prioritize Melee/Ranged Based on Position

**Developer/Copilot Task:** Update `selectAttackForSimulation` to handle movement correctly for both melee and ranged combatants.

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **Melee Priority:** | If `hasMeleeAttack` is true and `distToTarget > 5 ft.`, the optimal target position (`targetX`, `targetY`, `targetZ`) for `moveCombatant` should be one cell away from the target in the $x, y, z$ direction. <br> **Goal:** Close to 5 ft. (or 1 cell) distance. |
| **Ranged Priority:** | If the combatant **only** has `hasRangedAttack`, and the target is at $dist < 30$ ft., the AI should move **away** from the target up to $30$ ft. to avoid disadvantage or to gain a tactical position. <br> **Goal:** Maintain 30-60 ft. distance. |
| **Mixed (Melee & Ranged):** | If both are present, prioritize closing to **Melee** range (5 ft.) as per D\&D rules, as ranged attacks would be at disadvantage in melee range. |

#### 3.2 Utilize Flying/Swim Speed

**Developer/Copilot Task:** The AI must use the most advantageous speed for movement (e.g., Fly, Swim, or Walk).

| Instruction Set | Implementation Focus |
| :--- | :--- |
| **Determine Max Speed:** | In `selectAttackForSimulation`, check for `fly_speed` and `swim_speed` properties (which must be parsed from the monster data like `speed` is). Set `maxMovementCells` based on the highest available speed (Walk, Fly, or Swim). |
| **Z-Axis Movement:** | If the monster has a non-zero `fly_speed` or the combat is simulated underwater (a flag can be added to `CombatSimulator`), the AI is free to move on the Z-axis without penalty. If the monster only has `walk_speed`, movement on the Z-axis is impossible (or limited to jumping/climbing, which can be ignored for now). |
| **Movement Logging:** | Update `moveCombatant` to log the type of movement used (e.g., "🚶 Dragon flies 60 ft. up and towards the target."). |

Here is the proposal for integrating dynamic map sizing, 3D positioning, and intelligent movement into the combat simulator, structured as detailed instructions for your development team, followed by the Combat Log proposal.

-----

## Phase 1: Dynamic 3D Map Initialization and Sizing

This phase focuses on implementing the requested map size calculation: determining monster volume to set the battlefield dimensions (X, Y, Z).

| Instruction Set | Developer Task | AI-Copilot Focus |
| :--- | :--- | :--- |
| **1. Calculate Monster Volume ($\text{ft}^3$)** | Create a new helper function, `calculateMonsterVolume(combatant)`, that uses the monster's size properties (`size_cells`, `size_depth`) to calculate its space in cubic feet. | Verify the formula: $\text{Volume} = (5 \times \text{size\_cells}) \times (5 \times \text{size\_cells}) \times (5 \times \text{size\_depth})$. Ensure `size_depth` defaults to `size_cells` (1 for Medium, 2 for Large, etc.). |
| **2. Calculate Total Team Volume** | Create `calculateTotalTeamVolume(team)` that sums the volume of all monsters on a given team. | Debugging: If any monster is missing a required size property, ensure the calculation defaults to $5 \times 5 \times 5$ feet (125 $\text{ft}^3$). |
| **3. Determine Characteristic Distance ($\text{Dist}$)** | Implement a method that finds the maximum volume between Team A and Team B, $\text{Vol}_{\text{max}}$. Then, calculate the characteristic distance: $$\text{Dist} = \text{roundUpToNearest5}(\sqrt[3]{\text{Vol}_{\text{max}}})$$ | Ensure the rounding function correctly snaps the result up to the nearest multiple of 5 (e.g., 27.5 rounds up to 30). |
| **4. Final Map Dimensions** | Update the `calculateMapDimensions()` method (called in `startCombat`) to use the $\text{Dist}$ value. Calculate total dimensions in feet using the formula: $$\text{Total Side Length} = (4 \times \text{Dist}) + (\text{Largest Team Width}) $$ Use the largest monster's size across both teams for "Largest Team Width" (e.g., if a Gargantuan is present, use 20 ft.). <br> Finally, convert feet to cells: `MAP_WIDTH = MAP_HEIGHT = MAP_DEPTH = Total Side Length / 5`. | Verification: Check edge cases. If $\text{Dist}$ is $25 \text{ ft}$ and the max width is $20 \text{ ft}$, the total side length should be $120 \text{ ft}$ ($4 \times 25 + 20$), and the map size should be $24 \times 24 \times 24$ cells. |

-----

## Phase 2: 3D Data Model and Initial Placement

This phase updates the `Combatant` object and the placement system to operate in 3D space.

| Instruction Set | Developer Task | AI-Copilot Focus |
| :--- | :--- | :--- |
| **1. Update Combatant Data Model** | Extend the `Combatant` object creation in `addCombatant` to include: <br> - `x`, `y`, `z` (coordinates) <br> - `size_depth` (vertical size in cells, default to `size_cells`) <br> - `fly_speed`, `swim_speed` (parsed from monster JSON, default to 0). | Ensure the parsing of `fly_speed` and `swim_speed` correctly extracts the numeric value in feet, similar to how `speed` is parsed. |
| **2. Update Occupied Cell Tracking** | Refactor the `occupiedCells` map and helper functions (`isCellOccupied`, `registerCombatantCells`, `unregisterCombatantCells`) to use a 3D key: **`"x,y,z"`**. All loops checking for occupancy must now iterate over $i, j, k$ (X, Y, Z) dimensions. | Refactoring Safety: Triple-check that *every* internal call to a cell tracking function is updated to pass three coordinates instead of two. |
| **3. Implement 3D Distance Formula** | Update `calculateDistance(c1, c2)` to use the **3D Euclidean Distance** formula based on the $x, y, z$ coordinates, multiplying the result by 5 to return the distance in feet. | Verify the formula: $\text{Distance} = 5 \times \sqrt{ \Delta x^2 + \Delta y^2 + \Delta z^2 }$. |
| **4. Implement 3D Initial Placement** | Refactor `placeCombatants()` to use the new $Z$ dimension. Team A placement bounds should be on the low $X$ side, Team B on the high $X$ side. All combatants should be placed at $\mathbf{Z=0}$ (ground level) initially for simplicity. The random placement must ensure no overlap in the $X, Y, Z$ cube occupied by the monster. | Ensure team placement respects the dynamic map size. Team A should be confined to the first 'block' area, and Team B to the last 'block' area, leaving the central $2 \times \text{Dist}$ zone clear. |

-----

## Phase 3: 3D Movement and AI Tactical Logic

This phase integrates the Z-axis into movement and gives the AI intelligence regarding its optimal weapon range.

| Instruction Set | Developer Task | AI-Copilot Focus |
| :--- | :--- | :--- |
| **1. Determine Max Speed (3D)** | In `selectAttackForSimulation`, identify the monster's **best speed** (`walk_speed`, `fly_speed`, or `swim_speed` if applicable) to determine `maxMovementCells`. | Note that only monsters with `fly_speed` or `swim_speed` can move on the Z-axis without penalty. Assume only $Z$ movement is possible for flying/swimming. |
| **2. Update 3D Movement (`moveCombatant`)** | Update `moveCombatant(combatant, targetX, targetY, targetZ)` to handle movement towards a target in 3D. <br> - Calculate movement steps in all three dimensions ($\text{stepX}, \text{stepY}, \text{stepZ}$) based on the vector toward the target. <br> - The movement loop must prioritize closing the 3D distance by the maximum speed in $\text{feet} \times 5$, while avoiding occupied cells in $X, Y, Z$. | Pathing logic: For simplicity, move straight toward the $X, Y, Z$ target, stopping if a cell is occupied. Ensure `unregister/registerCombatantCells` is called for every cell moved. |
| **3. AI: Optimal Range Check** | In `selectAttackForSimulation`, refine the optimal range logic: <br> - **Melee Only:** Optimal range is $\mathbf{5 \text{ ft}}$. Move to get as close as possible without ending on the target's square. <br> - **Ranged Only:** Optimal range is $\mathbf{30 \text{ ft}}$. If closer than 30 ft., the AI should attempt to use its speed to move **away** to the 30 ft. range to prevent an opponent's melee counter-attack (or to avoid a potential Disadvantage from being too close). <br> - **Mixed:** Prioritize closing to $\mathbf{5 \text{ ft}}$ for melee damage unless the target is inaccessible (e.g., flying). | Target Position Calculation: If the AI needs to move away for ranged attacks, the `targetX, targetY, targetZ` for `moveCombatant` should be calculated to increase the distance to approximately 30 ft. |

-----

## Combat Log Proposal

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

## Do-to List

In monsters.js, update the speed, skills, saving throws, senses properties to use an object instead of a string and then update script.js and Encounter_Builder/main.js to handle this change. Also, update the prompt that is used to generate monster JSON data to reflect this change.

Add the following mechanics and/or features:
* Update the prompt JSON template to include templates for legendary resistance, recharge, frightful presence, condition effects, ongoing effects, and  one-time effect.
* confused state doesn't invoke random movement as movement isn't currently implemented.
* Add functionality where a monster can use their skills as actions. They should decide if they want to use it and if it is appropriate to use it.
* Morale system for NPCs/monsters
* keep track of used reactions (e.g., opportunity attacks)
    * retaliatory strikes
    * opportunity attacks
    * area-of-effect attacks
    * teleportation
    * forced movement
    * damage mitigation
    * regeneration/healing
    * status effect application (inflict a negative status effect)
* Bonus actions (attacks)
    * pounce
    * rampage
    * trampling charge
    * aggressive (move to target)
    * Nimble escape
    * ethereal jaunt
    * spell casting
    * Battle cry
    * luring song
* Standard actions to be implemented:
  * move
  * dash
  * disengage
  * cast spell
  * dodge
  * help
  * search
  * hide
  * ready
  * use an object
  * Athletics (Grapple): As part of the Attack action, you can replace one of your attacks with a special melee attack to grapple a creature. You make a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics) check.
  * Athletics (Shove): Similar to grappling, you can replace one of your attacks with a special melee attack to shove a creature. This is a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics).
  * Stealth (Hide): When you take the Hide action, you make a Dexterity (Stealth) check to conceal yourself. The check is contested by an enemy's Perception check.
  * Investigation/Perception (Search): When you take the Search action, you use your Investigation or Perception to find something. For example, searching for a secret door or a hidden trap.
  * Performance/Intimidation (Influence): Under the Dungeons & Dragons 2024 Player's Handbook rules, monsters can use the "Influence" action, which involves Charisma (Persuasion or Intimidation) checks, to sway players who are hesitant to act. 
* AoE effects (once placement and movement have been implemented)
* Some senses could offset some effects (like darkness or magical darkeness doesn't work against blindsight; somewhat implemented)
* Advantage/Disadvantage on attack rolls
* Initiative bonuses from feats or abilities (attribute bonuses have already been implemented)
* keep track of spell slots for monsters
* keep track of effect durations (e.g., buffs, debuffs)
* keep track of effects that trigger at the start/end of turns
* keep track of saves versus spells and effects
* decision engine to choose actions for monsters/NPCs based on their spells, attacks, conditions, and abilities
* dropping to 0 HP and dying state
* opportunity attacks
* Consider how the size of the monster has a longer attack radius.
* Death saving throws
* dropping to 0 hp and regenation
* bonus actions (spells, abilities)
* effects of invisibility on combat
* effects of blindness on combat
* using aura effects
* Spellcasting (with a few example spells)
* More detailed spell effects (e.g., healing, buffs, debuffs)
* Saving throws for spells and effects
* flying movement and effects
* Ranged vs. melee attacks with range considerations
* Cover mechanics for ranged attacks?
* regeneration and healing between rounds
* Monster special abilities (e.g., breath weapons, spellcasting)
* Monster lair actions and environmental effects
* using int and/or wis to pick attack options (different spells, abilities)
* Flanking bonuses
* environment effects (e.g. water-based vs land-based monsters)
* Team-based combat with team-specific actions
* AI for monsters to choose actions based on situation
* Customizable dice roller for different dice types and modifiers
* more than two teams (up to 5?)
* if there more than two monsters, decide who attacks who and keep track of it
* Inventory and equipment for characters
* User interface improvements (e.g., better modals, animations)
* Hiding versus perception
* Save/load combat sessions
* Export combat logs (beyond copy to clipboard functionality)
* maybe use "traits" property as part of the monster's decision making process?
* Update monster picker app JS to allow for arrays to be read from the "damage immunities" property.
* Conditions (e.g., stunned, poisoned) that affect combatants
  * Unconscious - skipping this one for now.
  * Hidden - this may be difficult to implement as the encounter doesn't take into account terrain or other out of combat setup factors.
  * Surprised - this may be difficult to implement as the encounter doesn't take into account terrain or other out of combat setup factors.


  The following is the raw markdown code for the development sprint division, formatted to be copied directly into your `change_log.md` file.

## SprintsDo-to List

### Sprint 1: Core Combat Logic (Spatial & Advanced Actions)

**Goal:** Implement spatial combat mechanics and support for powerful monster abilities that require saving throws or affect multiple targets.

| Feature | Notes & Implementation Focus |
| :--- | :--- |
| **Ranged vs. melee attacks with range considerations** | Introduce a simple distance/range model (e.g., close, medium, long) to attacks. |
| **Cover mechanics for ranged attacks** | Implement basic cover rules (Half-Cover, Three-Quarters Cover) that provide AC and saving throw bonuses based on the target. |
| **Flanking bonuses** | Add logic to grant attack roll advantage (or a bonus) based on a simple positional assumption or toggle. |
| **Monster special effects (breath weapons, spellcasting)** | Develop a generic action/damage handler for Area-of-Effect (AoE) and Save-based attacks (e.g., `rollSavingThrow` is already available). |
| **Hiding versus perception** | Implement the **Hidden** condition and logic to restrict targeting based on a successful Perception check or lack of Blindsight/Tremorsense. |
| **Implement Unconscious condition** | The core conditions system is in place; this requires adding the effects (auto-fail STR/DEX saves, attacks against are at advantage, attacks from 5ft are critical hits). |

### Sprint 2: Advanced AI & Team Structure

**Goal:** Significantly improve monster intelligence and decision-making, and expand the combat model to support more than two teams.

| Feature | Notes & Implementation Focus |
| :--- | :--- |
| **AI for monsters to choose actions based on situation** | Overhaul the decision-making logic (`selectAttackForSimulation`) to choose between attack, Dodge, Help, or special monster actions/spells based on current HP, conditions, and targets. |
| **Using INT and/or WIS to pick attack options** | Incorporate the monster's **Intelligence** and **Wisdom** scores into the decision algorithm to simulate smarter choices and target prioritization. |
| **If there more than two monsters, decide who attacks who** | Improve target selection to allow monsters to focus fire, choose the most vulnerable target, or distribute damage. |
| **More than two teams (up to 5?)** | Refactor all team-related logic (`this.currentTeamFilter`, win/loss condition checks) to handle a dynamic number of teams instead of only 'Team A' and 'Team B'. |
| **Team-based combat with team-specific actions** | Allow for a team-level action (e.g., a leader's buff or coordinated movement). |
| **Environment effects / Monster lair actions** | Add logic for environmental features (e.g., difficult terrain, hazard zones) and implement a new phase in the combat round logic to process Lair Actions. |
| **Use "traits" property as part of the monster's decision making** | Incorporate passive traits (e.g., *Pack Tactics*, *Evasion*) into the AI's calculation of attack effectiveness and defense. |

### Sprint 3: System & UI Improvements

**Goal:** Focus on quality-of-life enhancements, data management, and the overall application experience.

| Feature | Notes & Implementation Focus |
| :--- | :--- |
| **Save/load combat sessions** | Implement functionality to serialize the `CombatSimulator` state (including `combatants`, `initiativeOrder`, `combatRound`, etc.) to local storage or a file. |
| **Export combat logs** | Enhance the existing `copyTeamInfoToClipboard` function to export the combat log to a more structured format (e.g., JSON or a downloadable text file). |
| **Customizable dice roller for different dice types and modifiers** | Create a separate, modular dice rolling utility that can be configured by the user. |
| **Inventory and equipment for characters** | Add data structure and UI elements to track simple character equipment that may modify AC, damage, or grant new abilities. |
| **User interface improvements (better modals, animations)** | Refine the look and feel, update modal designs for better usability, and add minor animations to turns/actions. |
| **Update monster picker app JS to allow for arrays to be read from the "damage immunities" property** | A quick fix to ensure data parsing (e.g., the `parseCommaList` method) correctly handles properties that may be stored as an array of strings. |