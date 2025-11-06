Proposal for Developer Implementation
Based on the content of the uploaded files, omni_monster.js (monster data) and script.js (the CombatSimulator logic), a developer can implement this feature in a few steps.

The script.js snippet shows that the CombatSimulator already has a mechanism to process and decrement timed conditions (e.g., cond.duration -= 1). We can leverage this for buff effects.

Step 1: Update the Monster Data (omni_monster.js)
A new property, ally_actions, should be added to the monster object structure. This keeps all support abilities separate from attack actions.

JavaScript

// Inside a monster object in omni_monster.js:
{
    name: "Omni Warlord",
    // ... other stats ...
    ally_actions: {
        "Inspiring Rally": {
            action_type: "bonus_action", // or "action"
            range: 30, // in feet
            targets: "up_to_3_allies_in_range",
            effect: {
                // Name of the condition to apply
                condition_name: "Inspired",
                // What this effect modifies
                stat_mod: "add_d4_to_attack_save",
                // Duration in rounds, handled by CombatSimulator's processTimedConditions()
                duration: 10,
            },
            description: "The Warlord targets up to three friendly creatures within 30 feet. Each target gains a +1d4 bonus to attack rolls and saving throws for 10 rounds."
        }
    },
    // ... existing attacks property ...
}
Step 2: Implement the Action Logic (script.js - CombatSimulator Class)
A new method should be added to the CombatSimulator class to handle the execution of these buff actions.

JavaScript

// Inside CombatSimulator class in script.js

/**
 * Executes a monster's ally-boosting action and applies the resulting condition.
 */
executeAllyAction(combatant, actionName) {
    const action = combatant.ally_actions[actionName];
    if (!action) return;

    this.logMessage(`📣 ${combatant.name} uses ${actionName} on its allies!`);

    // 1. Determine all valid allies (same team, within range, and not incapacitated)
    const targets = this.initiativeOrder.filter(c =>
        c.team === combatant.team && 
        c.team_role !== 'self' && // Not self-targeted
        c.is_conscious // Assuming a status check property exists
        // (Developer would need to implement distance checking logic)
    );

    // 2. Select the final targets (e.g., up to 3)
    const finalTargets = targets.slice(0, 3); 

    // 3. Apply the new condition to each target
    for (const target of finalTargets) {
        const newCondition = {
            name: action.effect.condition_name,
            duration: action.effect.duration,
            type: 'buff', // A new type flag for buff effects
            stat_mod: action.effect.stat_mod,
            applied_by: combatant.name
        };
        
        // Ensure condition array exists and add the condition
        if (!target.conditions) target.conditions = [];
        target.conditions.push(newCondition);
        
        this.logMessage(`✨ ${target.name} is now ${newCondition.name}.`);
    }
}
Step 3: Update Roll Logic (Implicit in script.js)
The core combat logic (making attack rolls and saving throws) would need to be updated to check the combatant.conditions array before making a roll.

For a buff like the one above (stat_mod: "add_d4_to_attack_save"), the rolling function would check for an "Inspired" condition and, if found, add a 1d4 to the result of the roll.

JavaScript

// Conceptual pseudocode for a CombatSimulator roll method:
// (A developer would add this logic to the existing attack/save methods in script.js)
function makeAttackRoll(combatant) {
    let roll = Math.floor(Math.random() * 20) + 1;
    let finalRoll = roll;
    
    // Check for 'Inspired' buff
    const inspired = combatant.conditions.find(c => c.stat_mod === "add_d4_to_attack_save");
    
    if (inspired) {
        const d4_roll = Math.floor(Math.random() * 4) + 1;
        finalRoll += d4_roll;
        this.logMessage(`(+${d4_roll} from ${inspired.name})`);
    }
    
    // ... add to hit bonus, compare to AC ...
    return finalRoll;
}

New Ability for the Omni Monster
This ability is designed to be a potent, multi-target attack that also applies a debilitating condition, reflecting a complex monster in 5e.

Multidimensional Strike
Action Type: Action

Range: 60 ft.

Effect: The Omni Monster projects a rapidly shifting field of energy in a 10-foot-radius sphere centered on a point it can see within range. Each creature in that area must make a DC 16 Dexterity saving throw, taking 4d6 force damage plus 4d6 radiant damage on a failed save, or half as much damage on a successful one.

Condition: On a failed save, the creature is also afflicted with the "Disoriented" condition until the end of its next turn.

Disoriented Condition: A creature afflicted with this condition has disadvantage on the next attack roll it makes before the end of its next turn.

Implementation in omni_monster.js
You would implement this in the omni_monster.js file by adding a new entry to the attacks property (or a new actions property if the simulator is configured for it) and updating the stats to support the DC.

JavaScript

// Inside the Omni Monster object in omni_monster.js:
{
    name: "Omni Monster",
    // ... existing stats ...
    str: 12,
    dex: 12,
    con: 12,
    int: 12,
    wis: 12,
    cha: 12,
    "saving throws": "DEX +2, CON +2, WIS +2, CHA +2",
    skills: "Perception +11, Stealth +7, Intimation +10",
    
    // Assumed Proficiency Bonus: +4 (based on DC 16 = 8 + PB + CHA(12)/2 + CHA mod of +1) 
    // Let's assume a PB of +4 for a CR 9-12 equivalent monster.
    
    attacks: {
        "Claw": {
            "to hit": "+5", // PB (+4) + STR mod (+1) = +5
            hit: "7 (1d6 + 4)"
        },
        "Multidimensional Strike": {
            type: "Area of Effect (AOE)",
            range: "60 ft. (10 ft. radius sphere)",
            save_type: "DEX",
            save_dc: 16,
            damage: "4d6 force damage + 4d6 radiant damage",
            condition_on_fail: "Disoriented (disadvantage on next attack roll)",
            description: "The monster projects an energy sphere. DEX save DC 16. Fails take full damage and are Disoriented until end of their next turn."
        }
    },
    // ... existing properties ...
}