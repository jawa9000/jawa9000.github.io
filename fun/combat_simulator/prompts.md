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