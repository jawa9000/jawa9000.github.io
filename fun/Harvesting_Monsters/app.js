(() => {
  const MONSTERS_JS_URL = "../Encounter_Builder/monsters.js";
  const HARVEST_URL = "harvest_results.json";

  let monsters = [];
  let harvestConfig = null;

  const monsterInput = document.getElementById("monster-name");
  const monsterList = document.getElementById("monster-list");
  const monsterMeta = document.getElementById("monster-meta");
  const daysInput = document.getElementById("days-since-death");
  const elemDamageInput = document.getElementById("elem-damage");
  const massiveBlowInput = document.getElementById("massive-blow");
  const harvestToolsInput = document.getElementById("harvest-tools");
  const proficiencyBonusInput = document.getElementById("proficiency-bonus");
  const proficiencyGroup = document.getElementById("proficiency-group");
  const skillSelect = document.getElementById("skill-select");
  const priceModeInputs = document.querySelectorAll("input[name='price-mode']");
  const resultsTableBody = document.querySelector("#results-table tbody");
  const summaryFlags = document.getElementById("summary-flags");
  const resultsHelper = document.getElementById("results-helper");
  const deadlyTemplate = document.getElementById("deadly-warning-template");

  async function loadMonstersFromJS() {
    // Fetch the JS file as text
    const response = await fetch(MONSTERS_JS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${MONSTERS_JS_URL}: ${response.statusText}`);
    }
    const jsContent = await response.text();
    
    // Create a function scope to evaluate the monsters array
    // We'll wrap it in a function that returns the monsters array
    const wrappedCode = `
      (function() {
        ${jsContent}
        return typeof monsters !== 'undefined' ? monsters : null;
      })()
    `;
    
    try {
      const monstersArray = eval(wrappedCode);
      if (!Array.isArray(monstersArray)) {
        throw new Error("monsters is not an array");
      }
      return monstersArray;
    } catch (err) {
      throw new Error(`Failed to parse monsters.js: ${err.message}`);
    }
  }

  async function loadData() {
    try {
      const [monstersData, harvestRes] = await Promise.all([
        loadMonstersFromJS(),
        fetch(HARVEST_URL),
      ]);

      monsters = monstersData;
      harvestConfig = await harvestRes.json();

      populateMonsterList();
    } catch (err) {
      console.error("Failed to load data:", err);
      throw err;
    }
  }

  function populateMonsterList() {
    monsterList.innerHTML = "";
    monsters.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = m.name;
      monsterList.appendChild(opt);
    });
  }

  function findMonsterByName(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    return (
      monsters.find((m) => m.name.toLowerCase() === lower) ||
      monsters.find((m) => m.name.toLowerCase().includes(lower)) ||
      null
    );
  }

  function extractAgeFromName(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    if (lower.includes("ancient")) return "ancient";
    if (lower.includes("adult")) return "adult";
    if (lower.includes("young")) return "young";
    return null;
  }

  function isDragon(monster) {
    if (!monster) return false;
    const type = (monster.type || "").toLowerCase();
    return type === "dragon";
  }

  function getPriceMode() {
    const checked = Array.from(priceModeInputs).find((i) => i.checked);
    return checked ? checked.value : "buy";
  }

  function computeBaseDCForStandardPart(part, monster) {
    const formula = part.base_dc_formula || "10 + CR";
    // Very small parser for the supported "10 + CR" / "10 + CR + 2" style.
    let base = 0;
    const tokens = formula.split("+").map((t) => t.trim());
    tokens.forEach((t) => {
      if (t.toUpperCase() === "CR") {
        base += Number(monster.cr || 0);
      } else if (!Number.isNaN(Number(t))) {
        base += Number(t);
      }
    });
    return base;
  }

  function computeFinalDC({ baseDc, days, elemDamage, massiveBlow, proficiencyBonus }) {
    const decay = Math.max(0, Number(days) || 0) * 3;
    const elemMod = elemDamage ? 5 : 0;
    const massiveMod = massiveBlow ? 10 : 0;
    const profBonus = Math.max(0, Number(proficiencyBonus) || 0);
    const finalDc = baseDc + decay + elemMod + massiveMod - profBonus;
    // DC cannot go below 1
    return Math.max(1, finalDc);
  }

  function getSizeSafe(monster) {
    return (monster && monster.size) || "medium";
  }

  function getBloodLiters(monster, isDragon) {
    const size = getSizeSafe(monster).toLowerCase();
    const map = isDragon
      ? harvestConfig.dragon_blood_liters_by_size
      : harvestConfig.standard_blood_liters_by_size;
    return map[size] || null;
  }

  function getMeatKg(monster, isDragon) {
    const size = getSizeSafe(monster).toLowerCase();
    const map = isDragon
      ? harvestConfig.dragon_meat_kg_by_size
      : harvestConfig.standard_meat_kg_by_size;
    return map[size] || null;
  }

  function formatYield(part, monster, isDragon) {
    let text = part.yield || "";

    if (/blood/i.test(part.name)) {
      const liters = getBloodLiters(monster, isDragon);
      if (liters) {
        text = `${liters} L of blood`;
      }
    }

    if (/meat/i.test(part.name)) {
      const kg = getMeatKg(monster, isDragon);
      if (kg) {
        text = `${kg} kg of meat`;
      }
    }

    return text;
  }

  function computePrice(part, priceMode, isDragonMeat) {
    const value = Number(part.value_gp || 0);
    if (priceMode === "buy") return value;
    if (isDragonMeat) return value;
    return Math.floor(value / 2);
  }

  function tierBadge(tier) {
    const lower = tier.toLowerCase();
    const span = document.createElement("span");
    span.classList.add("tier-badge");
    if (lower === "easy") span.classList.add("tier-badge--easy");
    else if (lower === "tricky") span.classList.add("tier-badge--tricky");
    else if (lower === "deadly") span.classList.add("tier-badge--deadly");
    span.textContent = tier;
    return span;
  }

  function renderSummaryFlags(monster) {
    summaryFlags.innerHTML = "";
    if (!monster) return;

    const typeFlag = document.createElement("span");
    typeFlag.className = "flag-pill flag-pill--accent";
    typeFlag.textContent =
      isDragon(monster)
        ? "Dragon: age-based DCs"
        : "Other: CR-based DCs";
    summaryFlags.appendChild(typeFlag);

    const age = monster.age || extractAgeFromName(monster.name);
    if (age) {
      const ageFlag = document.createElement("span");
      ageFlag.className = "flag-pill";
      ageFlag.textContent = `Age: ${age}`;
      summaryFlags.appendChild(ageFlag);
    }

    if (monster.size) {
      const sizeFlag = document.createElement("span");
      sizeFlag.className = "flag-pill";
      sizeFlag.textContent = `Size: ${monster.size}`;
      summaryFlags.appendChild(sizeFlag);
    }

    if (harvestToolsInput.checked) {
      const toolsFlag = document.createElement("span");
      toolsFlag.className = "flag-pill flag-pill--accent";
      const profBonus = Number(proficiencyBonusInput.value) || 0;
      if (profBonus > 0) {
        toolsFlag.textContent = `Harvesting tools: advantage, half time, -${profBonus} DC`;
      } else {
        toolsFlag.textContent = "Harvesting tools: advantage & half time";
      }
      summaryFlags.appendChild(toolsFlag);
    }
  }

  function renderMonsterMeta(monster) {
    if (!monster) {
      monsterMeta.textContent = "";
      return;
    }
    const parts = [];
    if (monster.type) {
      parts.push(isDragon(monster) ? "Dragon" : "Other");
    }
    const age = monster.age || extractAgeFromName(monster.name);
    if (age) {
      parts.push(`Age: ${age}`);
    }
    if (monster.size) {
      parts.push(`Size: ${monster.size}`);
    }
    if (monster.cr !== undefined) {
      parts.push(`CR ${monster.cr}`);
    }
    monsterMeta.textContent = parts.join(" • ");
  }

  function handleHazardClick(part) {
    const baseText = deadlyTemplate
      ? deadlyTemplate.textContent.trim()
      : "Failure may trigger a deadly effect.";
    const failure = part.failure || "";
    const message = `${baseText}\n\nPart: ${part.name}\n\nOn failure: ${failure}`;
    window.alert(message);
  }

  function renderResults() {
    const name = monsterInput.value.trim();
    const monster = findMonsterByName(name);

    renderMonsterMeta(monster);
    renderSummaryFlags(monster);

    resultsTableBody.innerHTML = "";

    if (!monster || !harvestConfig) {
      resultsHelper.textContent =
        "Select a monster from your list to see harvest options.";
      return;
    }

    const isDragonType = isDragon(monster);
    const skill = skillSelect.value;
    const days = Number(daysInput.value) || 0;
    const elemDamage = elemDamageInput.checked;
    const massiveBlow = massiveBlowInput.checked;
    const priceMode = getPriceMode();
    const proficiencyBonus = harvestToolsInput.checked
      ? Number(proficiencyBonusInput.value) || 0
      : 0;

    let helperText = `Use ${skill} checks against these DCs. Decay: +${
      days * 3
    } DC for ${days} day(s) dead.`;
    if (harvestToolsInput.checked && proficiencyBonus > 0) {
      helperText += ` Proficiency bonus: -${proficiencyBonus} DC.`;
    }
    resultsHelper.textContent = helperText;

    const parts = [];

    if (isDragonType && Array.isArray(harvestConfig.dragon_parts)) {
      harvestConfig.dragon_parts.forEach((part) => {
        const ageKey = monster.age || extractAgeFromName(monster.name) || "adult";
        const baseFromMap =
          (part.base_dc && part.base_dc[ageKey]) || part.base_dc?.adult || 10;
        const finalDc = computeFinalDC({
          baseDc: baseFromMap,
          days,
          elemDamage,
          massiveBlow,
          proficiencyBonus,
        });
        const isDragonMeat =
          /dragon meat/i.test(part.name) || part.name === "Dragon Meat";

        parts.push({
          source: "dragon",
          config: part,
          finalDc,
          baseDc: baseFromMap,
          isDragonMeat,
        });
      });
    }

    if (!isDragonType && Array.isArray(harvestConfig.standard_parts)) {
      harvestConfig.standard_parts.forEach((part) => {
        const baseFromFormula = computeBaseDCForStandardPart(part, monster);
        const finalDc = computeFinalDC({
          baseDc: baseFromFormula,
          days,
          elemDamage,
          massiveBlow,
          proficiencyBonus,
        });

        parts.push({
          source: "standard",
          config: part,
          finalDc,
          baseDc: baseFromFormula,
          isDragonMeat: false,
        });
      });
    }

    // Ensure Draconis Fundamentum appears before Heart in the table.
    parts.sort((a, b) => {
      const an = a.config.name.toLowerCase();
      const bn = b.config.name.toLowerCase();
      if (an.includes("draconis fundamentum") && bn.includes("heart")) return -1;
      if (an.includes("heart") && bn.includes("draconis fundamentum")) return 1;
      return 0;
    });

    parts.forEach((entry) => {
      const part = entry.config;
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td");
      nameTd.textContent = part.name;

      const tierTd = document.createElement("td");
      tierTd.appendChild(tierBadge(part.tier));

      const dcTd = document.createElement("td");
      const dcChip = document.createElement("span");
      dcChip.className = "dc-chip";
      dcChip.textContent = `DC ${entry.finalDc}`;
      dcTd.appendChild(dcChip);

      const yieldTd = document.createElement("td");
      yieldTd.textContent = formatYield(part, monster, isDragonType);

      const valueTd = document.createElement("td");
      const price = computePrice(part, priceMode, entry.isDragonMeat);
      valueTd.textContent = price ? `${price} gp` : "—";

      const notesTd = document.createElement("td");
      let notesClass = "notes-easy";
      if (part.tier === "tricky") notesClass = "notes-tricky";
      if (part.tier === "deadly") notesClass = "notes-deadly";
      const wrapper = document.createElement("div");
      wrapper.className = notesClass;

      if (part.tier === "deadly") {
        const warnBtn = document.createElement("button");
        warnBtn.className = "hazard-button";
        warnBtn.type = "button";
        warnBtn.textContent = "Deadly hazard";
        warnBtn.addEventListener("click", () => handleHazardClick(part));
        wrapper.appendChild(warnBtn);

        const span = document.createElement("span");
        span.textContent = " Failure may cause explosion or Dragon's Disease.";
        wrapper.appendChild(span);

        // Enforce reminder that Fundamentum must be harvested before Heart.
        if (/heart/i.test(part.name)) {
          const constraint = document.createElement("div");
          constraint.style.marginTop = "0.15rem";
          constraint.textContent =
            "Fundamentum must be harvested safely before attempting the heart.";
          wrapper.appendChild(constraint);
        }
      } else if (part.tier === "tricky") {
        const text =
          part.failure ||
          "On failure, materials are sloppy: -1 to modifier and rarity.";
        wrapper.textContent = text;
      } else {
        wrapper.textContent = part.notes || "Routine harvest for trained hands.";
      }

      notesTd.appendChild(wrapper);

      tr.appendChild(nameTd);
      tr.appendChild(tierTd);
      tr.appendChild(dcTd);
      tr.appendChild(yieldTd);
      tr.appendChild(valueTd);
      tr.appendChild(notesTd);

      resultsTableBody.appendChild(tr);
    });
  }

  function toggleProficiencyField() {
    if (harvestToolsInput.checked) {
      proficiencyGroup.style.display = "block";
    } else {
      proficiencyGroup.style.display = "none";
      proficiencyBonusInput.value = "0";
    }
    renderResults();
  }

  function registerEvents() {
    const inputs = [
      monsterInput,
      daysInput,
      elemDamageInput,
      massiveBlowInput,
      harvestToolsInput,
      proficiencyBonusInput,
      skillSelect,
      ...priceModeInputs,
    ];

    inputs.forEach((el) => {
      el.addEventListener("input", renderResults);
      el.addEventListener("change", renderResults);
    });

    // Special handling for tools checkbox to show/hide proficiency field
    harvestToolsInput.addEventListener("change", toggleProficiencyField);
  }

  loadData()
    .then(() => {
      registerEvents();
      renderResults();
    })
    .catch((err) => {
      console.error("Failed to load harvesting data:", err);
      resultsHelper.textContent =
        "Error loading data. Check that monsters.json and harvest_results.json are present.";
    });
})();


