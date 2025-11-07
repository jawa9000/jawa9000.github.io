# Development Plan: Tactical Combat Map Implementation

This plan outlines the steps required to integrate a grid-based tactical map into the existing combat simulator, ensuring monsters are visually positioned on a 5'x5' grid based on their size.

## Phase 1: Data Modeling and Pre-processing

The core goal of this phase is to ensure that monster data can be reliably translated into map dimensions and that the `CombatSimulator` is ready to store position data.

### 1.1 Update Monster Data Model
**Goal:** Define a clear, reliable function to translate the monster's `size` (string) into a `grid_size` (integer or object) representing map space.

| Monster Size (Input) | Grid Size (Output) | Footprint (Squares) | Rationale |
| :--- | :--- | :--- | :--- |
| Tiny, Small, Medium | 1 | 1x1 | Occupies one 5'x5' square, centered. |
| Large | 2 | 2x2 | Occupies four 5'x5' squares (10'x10'), centered on the intersection of four squares. |
| Huge, Gargantuan | 4 | 4x4 | Occupies sixteen 5'x5' squares (20'x20'), centered on the intersection of four squares. |

**Developer Task:**
* Implement a new helper function, `getGridFootprint(size_string)`, within the `CombatSimulator` class or associated utility file that returns the required `grid_size` integer (1, 2, or 4).

### 1.2 Combatant Position Tracking
**Goal:** Add spatial awareness to each combatant object.

**Developer Task:**
* Modify the `combatants` data structure within `CombatSimulator` to include three new properties for each monster/combatant:
    * `position_x`: The x-coordinate of the top-left square the monster occupies.
    * `position_y`: The y-coordinate of the top-left square the monster occupies.
    * `grid_footprint`: The integer result from the `getGridFootprint` function (1, 2, or 4).

## Phase 2: Canvas Setup and Initialization

This phase focuses on creating the visual component (the canvas) and setting up its basic drawing environment.

### 2.1 HTML Structure Integration
**Goal:** Add the canvas element to the application's HTML structure.

**Developer Task:**
* Insert a `<canvas id="combatMap">` element into the main HTML file.
* Apply necessary CSS to make the canvas responsive and visually appealing. Define a fixed grid dimension (e.g., 20x20 squares) for the initial map size.

### 2.2 Map Initialization Logic
**Goal:** Initialize the map dimensions and drawing context.

**Developer Task:**
* Define constants for map dimensions: `GRID_SIZE_FT = 5`, `SQUARE_PIXELS = 40` (e.g., for visual scale), `MAP_WIDTH_SQUARES = 20`, `MAP_HEIGHT_SQUARES = 20`.
* Create a new method, `initializeMap()`, to get the canvas and its 2D rendering context.
* Implement a drawing function, `drawGrid()`, that draws a visible grid overlay (lines) onto the canvas based on the defined pixel size.

## Phase 3: Monster Placement Logic

This phase addresses the key requirement: automatically positioning monsters when they are assigned to a team.

### 3.1 Initial Placement Strategy
**Goal:** When a monster is added, assign it the next available, valid, un-occupied position.

**Developer Task:**
* Modify the `addMonsterToTeam()` or equivalent function in `CombatSimulator`.
* When a new combatant is created, immediately call a new function: `findAvailablePosition(footprint)`.
* The `findAvailablePosition(footprint)` logic must:
    1.  Iterate through all possible `(x, y)` coordinates on the grid.
    2.  For the current coordinate, calculate all squares covered by the monster's `footprint`.
    3.  Check if any of the squares the new monster would occupy overlap with squares occupied by an existing combatant.
    4.  If no overlap is found, return that `(x, y)` as the new monster's top-left position.
    5.  If the search fails, handle the scenario (e.g., return a default position or log a "Map Full" message).

### 3.2 Monster Drawing Logic
**Goal:** Visually represent monsters on the map, respecting their size and centering rules. 

**Developer Task:**
* Implement a new method, `drawCombatants()`, which loops through `this.combatants`.
* For each combatant:
    1.  Retrieve its `position_x`, `position_y`, and `grid_footprint`.
    2.  Calculate the pixel location of the top-left corner: `pixel_x = position_x * SQUARE_PIXELS` and `pixel_y = position_y * SQUARE_PIXELS`.
    3.  Draw a visual representation (e.g., a colored circle or square) onto the canvas.
    4.  **Centering Rule Implementation:** The drawing must be visually centered within its occupied area:
        * **Medium (1x1):** The icon/drawing should be centered at: `(pixel_x + (SQUARE_PIXELS / 2), pixel_y + (SQUARE_PIXELS / 2))`.
        * **Large (2x2):** The icon/drawing should be centered at the junction of the four squares it occupies: `(pixel_x + SQUARE_PIXELS, pixel_y + SQUARE_PIXELS)`.
        * **Huge/Gargantuan (4x4):** The icon/drawing should be centered at: `(pixel_x + (2 * SQUARE_PIXELS), pixel_y + (2 * SQUARE_PIXELS))`.

## Phase 4: Integration and User Interaction

### 4.1 Map Display Integration
**Goal:** Ensure the map updates whenever the combatant list changes.

**Developer Task:**
* Call `drawGrid()` and `drawCombatants()` from the main update/render loop of the `CombatSimulator` (`updateDisplay()` or equivalent) whenever the `combatants` list is modified.

### 4.2 Basic Movement Interaction (Optional but Recommended)
**Goal:** Allow users to reposition monsters manually.

**Developer Task:**
* Add `mousedown` and `mousemove` event listeners to the `#combatMap` canvas.
* Implement logic to detect if a mouse click targets a combatant (by checking if the click coordinates fall within the monster's occupied pixel area).
* If a combatant is selected, allow the user to drag the monster to a new, valid (non-overlapping) set of coordinates. The monster's position should snap to the grid squares based on its footprint size.
* Update the combatant's `position_x` and `position_y` in the data model and redraw the map on mouse-up to confirm the new position.