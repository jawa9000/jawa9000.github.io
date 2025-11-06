## 💻 Cursor Prompts for Implementing Damage Reduction Logic

### 1\. Add `processDamageReduction` Method

**Prompt 1:**

> In the `CombatSimulator` class, add a new method called `processDamageReduction`. This method takes `target`, `rawDamage`, `damageType`, `isMagical = false`, and `isSilvered = false` as arguments. Implement the logic to first check for and apply immunity to **"Nonmagical Bludgeoning, Piercing, and Slashing from nonsilvered weapons"** if the damage is physical, not magical, and not silvered. If that specific immunity doesn't apply, proceed to check for and apply generic damage immunities, then damage resistances (halving damage), and finally damage vulnerabilities (doubling damage), ensuring the final damage is non-negative.

**Code to be inserted for reference:**

```javascript
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
```

-----

### 2\. Integrate into Attack Processing Function

**Prompt 2:**

> Locate the primary function within `CombatSimulator` that handles an attack action and applies damage (e.g., `handleAttackAction`). In this function, after calculating the `rawDamage` but before applying it to the target's HP, replace the old damage application logic with a call to the new `this.processDamageReduction` method.

**Prompt 3:**

> Before calling `this.processDamageReduction`, ensure you derive the attack properties:
>
> 1.  Determine `isAttackMagical` (e.g., based on `attack.magical` property or a default of `false`).
> 2.  Determine `isAttackSilvered` (e.g., based on `attack.silvered` property or a default of `false`).
>
> Pass these boolean values, along with `target`, `rawDamage`, and `attack['damage type']`, to `this.processDamageReduction` to get the `finalDamage`.

**Prompt 4 (Refactoring):**

> Update the line where damage is applied to the target to use the `finalDamage` returned from `this.processDamageReduction`.

**Example of the desired integration (using pseudo-code structure for context):**

```javascript
// ... inside the existing attack handling function (e.g., handleAttackAction) ...

// ... after calculating rawDamage ...

// *** NEW LOGIC TO DETERMINE ATTACK PROPERTIES ***
let isAttackMagical = attack.magical || false; 
let isAttackSilvered = attack.silvered || false;

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