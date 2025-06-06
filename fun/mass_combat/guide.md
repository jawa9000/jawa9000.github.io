You're a web developer tasked with creating an army combat simulator. Using e5 rules, create a modern web app using jQuery with the following features in mind:

Use jQuery, HTML, and CSS to build this app.

Core Simulation Logic
 * Unit Representation:
   * Stat Blocks: use full 5e stat blocks for every individual.
   * Scaling: use "mob rules" from the DMG.
   * Traits and Abilities: incorporate racial traits, class features, and special abilities of creatures and characters into the simulation by abstracting them.
 * Initiative and Turns:
   * use a single initiative order for all units.
   * resolve events sequentially
   * Automation: once the user clicks the “start combat” button, the simulation will run until the battle is done or the user clicks the “pause battle” button.
 * Combat Resolution:
   * attack rolls, damage rolls, and saving throws are handled individually.
   * Area of Effect (AoE): AoE spells and abilities affect multiple units individually. 
   * Conditions: conditions (prone, restrained, etc.) are applied and tracked individually.
   * Morale: incorporate morale checks  to represent unit cohesion and potential routs.
 * Movement and Positioning:
   * units move on an abstract battlefield representation 
   * Formations: units maintain formations, and that will that affect their movement and combat effectiveness (e.g., flanking bonuses, cover).
 * Damage and Healing:
   * HP Tracking: track HP for numerous units individually HP.
   * Casualties: represent units being reduced in size.


Web App Architecture and Design
 * Frontend (User Interface):
   * Visualization: visually represent the battlefield and units with simple text/tables.
   * Controls: the user has no control over combat simulation with the exception of starting, pausing, and ending the simulation.
      * Orders: the selected general can issue orders to units (move, attack, hold, use ability).
     * Scenario Setup: Interface for defining armies, units, terrain, and starting conditions.
   * Real-time Updates:  the UI update as the simulation by each unit’s turn.    * Responsiveness: Design for desktop screen.
   * Simulation Engine: This is where the core 5e rules and combat resolution logic will reside.
   * Database: To store:
     * Pre-defined Units/Creatures: Stat blocks for common 5e monsters and creatures can be found in ../monsters.js.
     * User-created Scenarios/Armies: Allow users to save and load their battles using local storage (in browser).
     * Simulation Logs: For post-battle analysis.
Gameplay and User Experience
 * Scenario Editor:
   * Army Builder: Allow users to define their armies, selecting units, assigning leadership, and setting starting positions.
   * Terrain Editor: Simple tools to define terrain features (hills, forests, rivers) and their effects on combat.
   * Objectives: Can users define victory conditions (e.g., destroy enemy, capture objective)?
 * Simulation Control:
   * Pause/Resume/End: Allow users to pause the simulation to analyze the situation or give new orders.
 * Reporting and Analysis:
   * Battle Log: A detailed log of all actions, attacks, damage, and effects.
   * Statistics: Post-battle statistics (casualties, damage dealt, units remaining, unit performance).
   * Graphs/Charts: Visual representation of battle flow.

Simple Morale System
This system is easy to implement and provides a quick, general indication of unit morale.
Core Mechanic: Unit makes a DC 10 Wisdom saving throw.
Modifiers:
 * +2 per friendly unit within 60 ft. (representing support)
 * -2 per friendly unit routed/destroyed within 60 ft. (representing a demoralizing loss)
 * -5 if enemy commander is within 60 ft. (intimidating presence)
 * +2 if friendly commander is within 60 ft. (inspiring presence)
 * -2 if unit is below 50% HP/strength.
 * -5 if unit is below 25% HP/strength.
Consequences of Failure:
 * Fail by 1-4: Unit is Shaken. Disadvantage on attack rolls and saving throws until the start of its next turn.
 * Fail by 5+: Unit is Broken. Attempts to move away from the nearest enemy. Cannot make attacks or use abilities. It will continue to move away until it is out of enemy sight or reaches a friendly commander who can rally it (requires an action from the commander and a successful DC 15 Persuasion check).
Rallying: A unit can attempt to rally at the start of its turn if it is Shaken by making another DC 10 Wisdom save (with applicable modifiers). A Broken unit can only be rallied by a commander.
Moderate Morale System
This system introduces more granularity and considers the dynamic nature of a battle.
Morale Score: Each unit has a starting Morale Score equal to its Wisdom score (or average Wisdom if a squad). This score fluctuates during combat.
Triggers for Morale Checks:
 * Start of turn, if unit took significant damage last turn: (e.g., lost 25% or more of its HP/strength). DC 10 Wisdom (Morale) check.
 * Start of turn, if a friendly unit within 60 ft. was destroyed/routed last turn: DC 12 Wisdom (Morale) check.
 * When directly charged by a significantly stronger enemy unit: DC 13 Wisdom (Morale) check.
 * When targeted by a fear effect or demoralizing ability: (Use the ability's DC or a standard DC 13).
 * When a friendly commander is defeated/routed: DC 15 Wisdom (Morale) check for all units within 120 ft.
Modifiers to Morale Checks:
 * +2 for each tier of "Advantageous Position": (e.g., fortified, high ground, defending a choke point).
 * -2 for each tier of "Disadvantageous Position": (e.g., flanked, surrounded, exposed to overwhelming ranged fire).
 * +/- Morale Bonus/Penalty from nearby commanders/leaders: A charismatic commander might grant a +1 to +3 bonus to units within 60 ft. A cruel or incompetent leader might impose a penalty.
 * +Morale Score for "Elite" units: (e.g., Veterans, Guards) start with a higher Morale Score or gain a flat bonus to all checks.
 * -Morale Score for "Green" units: (e.g., Conscripts, Militia) start with a lower Morale Score or suffer a flat penalty.
Consequences of Failed Morale Checks (Cumulative):
 * Failed by 1-3: Unit's Morale Score decreases by 1d4. Unit suffers Disadvantage on its next attack roll or ability check.
 * Failed by 4-6: Unit's Morale Score decreases by 1d6. Unit suffers Disadvantage on attack rolls and saving throws until the start of its next turn.
 * Failed by 7-9: Unit's Morale Score decreases by 1d8. Unit becomes Shaken. It must use its action to Disengage and its movement to move away from the nearest enemy. It can still attack but with Disadvantage.
 * Failed by 10+: Unit's Morale Score decreases by 1d10. Unit becomes Broken. It immediately drops any objectives and uses all its movement to move away from the nearest enemy. It cannot attack or use abilities.
Recovery:
 * Rallying: A unit can recover Morale Score if it's not engaged in combat for a turn or if a nearby commander successfully rallies it (Action, DC 15 Persuasion or Intimidation check, restores 1d6 Morale Score).
 * Positive Events: Defeating a strong enemy, capturing an objective, or a friendly commander performing a heroic act might grant a temporary +1d4 to Morale Score.
Advanced Morale System (with Morale States)
This system uses a more abstract "Morale State" that units move between, providing clear behavioral changes.
Morale States (from highest to lowest):
 * Inspired: (Temporary, usually from commander abilities/spells) Advantage on next attack roll, or +5 ft. movement for a turn.
 * Steady: Default state. No modifiers.
 * Wavering: Disadvantage on the next saving throw.
 * Shaken: Disadvantage on all attack rolls and saving throws. Must use bonus action to Disengage if possible.
 * Broken: Cannot attack or use abilities. Must use all movement to retreat away from the nearest enemy. Drops any held objectives.
 * Rout: Unit is removed from combat. It has completely fled the field.
Morale Checks: All units make a DC 12 Wisdom (Morale) saving throw when a triggering event occurs.
Key Triggers for Morale Checks:
 * Major Casualty Event: Unit or an adjacent friendly unit loses 30%+ of its total HP/strength in one turn.
 * Commander Down: A friendly commander within 120 ft. is defeated.
 * Flanked/Surrounded: Unit is flanked by 2+ enemy units or entirely surrounded.
 * Overwhelming Force: Unit is engaged by an enemy force twice its size or more.
 * Fear Effect: Targeted by a spell like Fear or similar demoralizing ability.
 * Objective Lost: A critical objective the unit was defending is captured by the enemy.
Result of Failed Morale Check:
 * Fail by 1-3: Unit's Morale State drops by one level (e.g., Steady to Wavering, Wavering to Shaken).
 * Fail by 4-6: Unit's Morale State drops by two levels.
 * Fail by 7+: Unit's Morale State drops by three levels.
Modifiers to Morale Checks:
 * +2 if adjacent to a friendly unit in a higher Morale State.
 * -2 if adjacent to a friendly unit in a lower Morale State (Shaken/Broken).
 * +2 for each point of Charisma bonus of a friendly commander within 60 ft.
 * -2 for each point of Charisma modifier of an enemy commander within 60 ft. (if negative).
 * Unit Type Modifiers:
   * "Fearless" (e.g., Undead, Constructs): Immune to Morale Checks.
   * "Disciplined" (e.g., Guards, Knights): +2 to all Morale Checks.
   * "Fanatic" (e.g., Cultists, Berserkers): Advantage on Morale Checks, but if they fail, they might become Reckless instead of retreating, gaining advantage on attacks but taking more damage.
   * "Skittish" (e.g., Goblins, Conscripts): Disadvantage on all Morale Checks.
Recovery:
 * Stabilize: If a unit is not engaged in combat for a full turn, its Morale State improves by one level (max Steady).
 * Rallying Command (Commander Action): A commander can use an action to make a DC 15 Persuasion (Charisma) check. On success, all friendly units within 60 ft. improve their Morale State by one level (max Steady).
 * Inspiring Event: A critical hit from a friendly hero, routing an enemy unit, or securing an objective might allow specific units to make a Morale check to improve their state.
Implementation Considerations for a Web App
 * State Machine: For the Advanced system, you can implement Morale States as a finite state machine, making transitions clear and manageable in your code.
 * Visual Cues: Use icons, color changes, or subtle animations on unit tokens to indicate their current morale state.
 * Battle Log Integration: Log every morale check, its modifiers, and its outcome in the battle log for transparency.
 * Configuration: Allow users to tweak morale rules or even disable the system if they prefer.
 * Unit Data: Ensure your unit data structure includes fields for moraleState, wisdomScore, and any specific morale modifiers (e.g., isDisciplined: true).
Choose the system that best balances complexity with the desired level of realism and impact on your simulation. The Moderate or Advanced systems will provide a much richer and more dynamic battle simulation, where units react realistically to the ebb and flow of combat.

Incorporating formations into a D&D 5e mass combat simulator adds a crucial layer of tactical depth and realism. It moves beyond simply clashing units and allows for strategic choices that impact combat outcomes. Here's a breakdown of options and their impact:
Core Concepts for Formations
 * Unit Cohesion: Formations imply that units maintain a certain shape and proximity. Breaking formation (due to movement, damage, or morale) should have penalties.
 * Frontage: The number of combatants that can engage the enemy at once. Formations define this.
 * Depth: The number of ranks in a formation. This impacts resilience and how quickly casualties affect the fighting line.
 * Interactions: How do different formations interact with each other? (e.g., a spear wall against cavalry).
 * Command: Commanders should play a significant role in maintaining or changing formations.
Formation Options and Their Impact
Here are some common military formations and how they could be translated into 5e mass combat mechanics, along with their impact:
1. Line Formation (Skirmish Line / Battle Line)
 * Description: A wide, shallow formation, maximizing frontage. Skirmish lines are looser, battle lines are more disciplined.
 * Mechanics:
   * Increased Attack Rolls: Unit gains advantage on attack rolls if targeting a unit that is not in a formation (representing overwhelming frontage).
   * Vulnerability to Flanking/AoE: Disadvantage on saving throws against AoE spells/abilities, and easier to flank.
   * Movement: Standard movement speed.
 * Impact:
   * Offensive Power: Excellent for maximizing damage output against a less organized foe.
   * Vulnerability: Highly susceptible to area attacks, flanking maneuvers, and charges from dense formations.
   * Ideal For: Ranged units (archers, crossbows) to maximize volleys, or light infantry trying to overwhelm a disorganized enemy.
2. Column Formation (Marching Column / Attack Column)
 * Description: A narrow, deep formation, prioritizing movement and penetration.
 * Mechanics:
   * Increased Movement: Unit's movement speed increases by 5-10 ft. (representing ease of movement).
   * Charge Bonus: When making a "charge" action (moving at least 20-30 ft. straight towards an enemy and attacking), the unit gains a bonus to attack rolls or damage (+2 or +1d4).
   * Reduced Frontage: Disadvantage on attack rolls when engaged by multiple enemy units simultaneously (representing only a few soldiers can engage at a time).
   * Resilience: Advantage on saving throws against AoE effects (fewer units affected per square).
 * Impact:
   * Maneuverability: Excellent for rapid movement across the battlefield, bypassing obstacles, or executing flanking maneuvers.
   * Penetration: Good for breaking through thin lines or weak points in an enemy formation.
   * Vulnerability: Suffers in prolonged direct melee combat against wider formations due to limited engagement.
   * Ideal For: Cavalry charges, shock troops, or units trying to rapidly advance and seize an objective.
3. Shield Wall / Phalanx Formation
 * Description: A dense, disciplined formation where units are tightly packed, often using shields to create a defensive barrier. Phalanxes typically incorporate spears or pikes extending beyond the shield line.
 * Mechanics:
   * Increased AC: Unit gains +1 to +2 AC against melee attacks from the front.
   * Resilience to Shoves/Pushes: Advantage on Strength saving throws to resist being moved or shoved.
   * Disadvantage to Charger: Charging units have disadvantage on their attack rolls against a unit in Shield Wall/Phalanx.
   * Reduced Movement: Movement speed reduced by 5-10 ft. (due to tight packing).
   * Vulnerability to Flanking/Rear: Loses AC bonus if attacked from the flank or rear.
   * Pike Specific (Phalanx): Units armed with spears/pikes can make opportunity attacks at 10 ft. (instead of 5 ft.) or gain a bonus to damage against mounted units.
 * Impact:
   * Defensive Stronghold: Extremely effective at holding ground, resisting charges, and protecting units behind them.
   * Slow but Steady: Not ideal for rapid advances, but highly resistant to frontal assaults.
   * Vulnerability: Susceptible to being outmaneuvered, flanked, or targeted by concentrated ranged fire/AoE spells that can bypass their frontal defense.
   * Ideal For: Holding strategic chokepoints, protecting archers or spellcasters, or absorbing the brunt of an enemy charge.
4. Wedge Formation (Boar's Snout)
 * Description: A triangular formation designed to penetrate enemy lines.
 * Mechanics:
   * Charge Bonus: When making a successful charge, the unit gains a significant bonus to its attack roll (+3 to +5) or damage (+1d6 to +1d8), and can attempt to shove or push the target unit back 5-10 ft. on a hit.
   * Disadvantage to Engaged Enemies: Engaged enemies facing the "point" of the wedge might have disadvantage on their attack rolls due to overwhelming force.
   * Vulnerability to Flanking: Similar to a column, can be vulnerable if flanked or surrounded.
   * Slightly Reduced Speed: Might have a minor speed penalty to maintain cohesion during the charge.
 * Impact:
   * Breaching Power: Excellent for breaking enemy formations and creating gaps.
   * Momentum-Based: Relies on a successful charge; less effective in sustained melee once the initial impact is absorbed.
   * Ideal For: Elite heavy infantry or cavalry aiming to punch through enemy lines.
5. Orb / Square Formation
 * Description: A dense, multi-directional defensive formation, often used when surrounded or expecting attacks from all sides.
 * Mechanics:
   * All-Around Defense: Does not suffer penalties for being flanked (or penalties are reduced).
   * Increased AC: Might gain a minor AC bonus (e.g., +1) due to mutual support.
   * Significantly Reduced Movement: Movement speed is heavily reduced (e.g., by half) or the unit can only take the Dodge action.
   * Reduced Offense: Disadvantage on all attack rolls (unless a specific internal unit breaks off to attack).
 * Impact:
   * Last Stand/Survival: Designed for units trying to hold out against overwhelming odds or when surrounded.
   * Sacrifices Offense for Defense: Highly defensive, but lacks offensive punch.
   * Ideal For: Units that are cut off, guarding a key objective when surrounded, or buying time for allies to arrive.
General Formation Rules/Impacts for the Web App
 * Formation Changing:
   * Action Cost: Changing formation should require an action (or a bonus action if a commander is present and assists).
   * Time Cost: It might take a full turn or even two turns to change formation effectively.
   * Commander Check: May require a successful Charisma (Leadership) check from the unit's commander to execute a complex formation change under pressure. Failure might result in the unit becoming Disorganized (see below).
 * Disorganized State:
   * Trigger: If a unit takes massive damage, fails a morale check badly, is forced to move significantly out of position, or attempts to change formation poorly, it can become Disorganized.
   * Impact: Disadvantage on attack rolls, AC penalty, or movement speed penalty until it spends a turn to "Reform" (often an action and/or a successful check).
 * Terrain Interaction:
   * Rough Terrain: Difficult terrain might prevent units from maintaining formations or impose penalties to movement/checks.
   * Choke Points: Narrow passages might force units into column formations, negating benefits of line/phalanx.
   * High Ground: Formations on high ground might get bonuses to ranged attacks or resistance to charges.
 * Commander Influence:
   * Formation Bonus: Units within a commander's aura might gain additional benefits for maintaining formation (e.g., a higher AC bonus, or advantage on the check to change formation).
   * Rallying: Commanders can help Disorganized units reform more quickly or negate penalties.
 * AoE Spells:
   * Formations directly impact the number of creatures affected by AoE spells. A tightly packed formation (Shield Wall, Orb) will suffer more casualties from a single Fireball than a skirmish line. Your simulation needs to account for this.
 * Visual Representation:
   * On your map, formations should be visually distinct (e.g., different outlines, unit grouping, or slight visual changes to the unit tokens themselves).
   * When a unit enters a formation, its "footprint" on the map might change (e.g., a wide line vs. a narrow column).
Implementing formations adds a layer of strategic decision-making that makes mass combat feel more like a battle and less like a chaotic brawl. It allows players to leverage different unit types and commanders more effectively.

