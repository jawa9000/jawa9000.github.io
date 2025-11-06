## Developer Instructions: Dynamic Spatial Combat

The goal is to implement a dynamic, 3D grid system where the battlefield size adapts to the total volume of combatants. We also introduce the Z-axis to account for flying/swimming.

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