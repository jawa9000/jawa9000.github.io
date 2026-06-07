(function ($) {
  "use strict";

  const USE_LOCAL_DATA = true;

  const ITEM_COUNTS = {
    Thorp: "1d4",
    Hamlet: "1d6",
    Village: "2d4",
    "Small Town": "3d4",
    "Large Town": "3d4",
    "Small City": "4d4",
    "Large City": "4d4",
    Metropolis: "6d4",
  };

  const ITEM_AMOUNT_MODIFIERS = {
    lower: 0.75,
    normal: 1,
    greater: 1.25,
    extreme: 1.5,
  };

  const SHOP_TYPE_FILES = {
    Trader: "items_trader",
    Armorer: "items_armorer",
    Weaponsmith: "items_weaponsmith",
    Alchemist: "items_alchemist",
    Scribe: "items_scribe",
    Wandwright: "items_wandwright",
    Jeweler: "items_jeweler",
    Tailor: "items_tailor",
  };

  const state = {
    data: {},
    shopName: "",
    keeperName: "",
    useRemote: false,
  };

  function rollDice(notation) {
    const match = /^(\d*)d(\d+)$/.exec(notation.trim());
    if (!match) {
      return 1;
    }
    const count = parseInt(match[1], 10) || 1;
    const sides = parseInt(match[2], 10);
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
  }

  function applyItemCountModifier(baseCount) {
    const key = $("#itemAmount").val() || "normal";
    const multiplier = ITEM_AMOUNT_MODIFIERS[key] || 1;
    return Math.max(1, Math.round(baseCount * multiplier));
  }

  function splitScrollItem(item) {
    const match = /^(Arcane|Divine) Scroll \((.+)\) \(total ([^)]+)\)([\s\S]*)$/.exec(item);
    if (!match) {
      return [item];
    }

    const label = `${match[1]} Scroll`;
    const flavor = match[4] || "";
    const spellPattern = /[^,]+?\(\d+ gp(?: \d+ sp)?\)/g;
    const spells = match[2].match(spellPattern);

    if (!spells || spells.length <= 1) {
      return [item];
    }

    return spells.map((spell) => {
      const trimmed = spell.trim();
      return `${label} (${trimmed})${flavor}`;
    });
  }

  function stripItemTotal(item) {
    return item.replace(/ \(total [^)]+\)/, "");
  }

  function expandItemPool(items) {
    return items.flatMap(splitScrollItem);
  }

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function pickMany(list, count) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(pickRandom(list));
    }
    return results.sort((a, b) => itemSortKey(a).localeCompare(itemSortKey(b)));
  }

  function itemSortKey(item) {
    const plain = item.replace(/<[^>]+>/g, "");
    return plain.replace(/\s+/g, " ").trim();
  }

  function fmtP(text) {
    return `<p>${text}</p>`;
  }

  function fmtOl(list) {
    const items = list.map((entry) => `<li>${stripItemTotal(entry)}</li>`).join("");
    return `<ol>${items}</ol>`;
  }

  function applyPriceAdjustment(item) {
    // Extract the stock level and calculate modifiers
    const stockLevel = $("#itemAmount").val() || "normal";
    const stockModifiers = {
      lower: 0.20,      // +20%
      normal: 0,        // 0%
      greater: -0.10,   // -10%
      extreme: -0.15    // -15%
    };
    const variance = (Math.random() * 0.30) - 0.15; // Range: -15% to +15%
    const modifier = (stockModifiers[stockLevel] || 0) + variance;

    // Extract and remove the total price if it exists (for scrolls)
    let totalMatch = / \(total ([^)]+)\)/.exec(item);
    let basePrice;
    let isTotalPrice = false;

    if (totalMatch) {
      basePrice = parseInt(totalMatch[1], 10);
      isTotalPrice = true;
      item = item.replace(/ \(total [^)]+\)/, "");
    }

    // If no total, try to extract price from the end
    if (!basePrice) {
      const priceMatch = /\((\d+)\s*gp\)\s*(?:\([^)]*\))?\s*$/.exec(item);
      if (priceMatch) {
        basePrice = parseInt(priceMatch[1], 10);
      }
    }

    if (!basePrice) {
      return item;
    }

    // Calculate adjusted price
    const adjustedPrice = Math.round(basePrice * (1 + modifier));

    // Add back the price
    if (isTotalPrice) {
      return item + ` (${adjustedPrice} gp)`;
    } else {
      // Replace the price in place
      return item.replace(/\((\d+)\s*gp\)/, `(${adjustedPrice} gp)`);
    }
  }

  function enhanceScrollsWithSpells(items) {
    if (!state.data.spells || state.data.spells.length === 0) {
      return items;
    }
    
    // Map spell level text to numeric level
    const spellLevelMap = {
      "Cantrip": 0,
      "0th level": 0,
      "1st level": 1,
      "2nd level": 2,
      "3rd level": 3,
      "4th level": 4,
      "5th level": 5,
      "6th level": 6,
      "7th level": 7,
      "8th level": 8,
      "9th level": 9
    };
    
    return items.map((item) => {
      // Check if it's a Spell scroll (for Scribe items)
      const scrollMatch = /^Spell scroll \((.+?)\)\s*\((.+?)\)$/.exec(item);
      if (!scrollMatch) {
        return item;
      }
      
      const levelText = scrollMatch[1]; // e.g., "1st level"
      const price = scrollMatch[2];     // e.g., "77 gp"
      
      // Extract numeric level from level text
      const spellLevel = spellLevelMap[levelText];
      if (spellLevel === undefined) {
        return item;
      }
      
      // Filter spells by level
      const spellsOfLevel = state.data.spells.filter(spell => spell.level === spellLevel);
      if (spellsOfLevel.length === 0) {
        return item;
      }
      
      // Pick a random spell from matching level
      const randomSpell = pickRandom(spellsOfLevel);
      
      // Return formatted scroll with spell name and price
      return `Spell scroll (${randomSpell.name}) (${price})`;
    });
  }

  function fmtOlWithPrices(list) {
    const items = list.map((entry) => {
      const adjusted = applyPriceAdjustment(entry);
      return `<li>${adjusted}</li>`;
    }).join("");
    return `<ol>${items}</ol>`;
  }

  function parseKeeperName(keeper) {
    const match = / named (.+?)[ ,.]/.exec(keeper);
    return match ? match[1] : "";
  }

  function combineShopName(baseName, keeperName) {
    if (!baseName) {
      return "Random Magic Shop";
    }
    if (!keeperName || /^The /.test(baseName)) {
      return baseName;
    }

    let match = /^.+?( and .+'s .+)/.exec(baseName);
    if (match) {
      return keeperName + match[1];
    }

    match = /^.+?('s .+)/.exec(baseName);
    if (match) {
      return keeperName + match[1];
    }

    return baseName;
  }

  function updateShopTitle() {
    $("#shopName").text(combineShopName(state.shopName, state.keeperName));
  }

  async function loadLocalData() {
    const files = [
      "location",
      "description",
      "shopkeeper",
      "name",
      ...Object.values(SHOP_TYPE_FILES),
    ];
    const loads = files.map(async (file) => {
      const response = await fetch(`data/${file}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load data/${file}.json`);
      }
      let data = await response.json();
      if (file.startsWith("items_")) {
        data = expandItemPool(data);
      }
      state.data[file] = data;
    });
    await Promise.all(loads);
    
    // Load spells for Scribe shop enhancement
    try {
      const spellResponse = await fetch("../Spells/spells.json");
      if (spellResponse.ok) {
        state.data.spells = await spellResponse.json();
      }
    } catch (error) {
      console.warn("Could not load spells.json:", error);
    }
  }



  async function getName() {
    state.shopName = pickRandom(state.data.name);
    updateShopTitle();
  }

  async function getLocation() {
    const text = pickRandom(state.data.location);
    $("#location").html(fmtP(text));
  }

  async function getDescription() {
    const text = pickRandom(state.data.description);
    $("#description").html(fmtP(text));
  }

  async function getKeeper() {
    const text = pickRandom(state.data.shopkeeper);
    state.keeperName = parseKeeperName(text);
    $("#shopkeeper").html(fmtP(text));
    updateShopTitle();
  }

  async function getItems() {
    const shopType = $("#shopType").val();
    const townSize = $("#townSize").val();
    const count = applyItemCountModifier(rollDice(ITEM_COUNTS[townSize] || "1d4"));
    
    // For Trader, combine items from all shop types
    let pool;
    if (shopType === "Trader") {
      pool = [];
      Object.values(SHOP_TYPE_FILES).forEach((fileKey) => {
        if (state.data[fileKey]) {
          pool = pool.concat(state.data[fileKey]);
        }
      });
    } else {
      pool = state.data[SHOP_TYPE_FILES[shopType]] || state.data.items_trader;
    }
    
    let list = pickMany(pool, count);
    
    // Enhance scrolls with spell names for Scribe and Trader shops
    if ((shopType === "Scribe" || shopType === "Trader") && state.data.spells) {
      list = enhanceScrollsWithSpells(list);
    }
    
    $("#items").html(fmtOlWithPrices(list));
  }

  async function changeType() {
    await Promise.all([getName(), getLocation(), getDescription(), getKeeper(), getItems()]);
  }

  function bindEvents() {
    $("#townSize, #shopType").on("change", () => {
      changeType().catch(showError);
    });
    $("#itemAmount").on("change", () => {
      getItems().catch(showError);
    });
    $("#regenerateAll").on("click", () => {
      changeType().catch(showError);
    });
    $("#newLoc").on("click", () => getLocation().catch(showError));
    $("#newDesc").on("click", () => getDescription().catch(showError));
    $("#newKeeper").on("click", () => getKeeper().catch(showError));
    $("#newItems").on("click", () => getItems().catch(showError));
  }

  function showError(error) {
    console.error(error);
    const message = error && error.message ? error.message : "Generation failed.";
    $("#items").html(fmtP(`Error: ${message}`));
  }

  async function initializeApp() {
    await loadLocalData();
  }

  $(document).ready(async function () {
    bindEvents();
    try {
      await initializeApp();
      randomizeSelects();
      await changeType();
    } catch (error) {
      showError(error);
    }
  });

  function randomizeSelects() {
    const town = document.getElementById("townSize");
    const shop = document.getElementById("shopType");
    town.selectedIndex = Math.floor(Math.random() * town.options.length);
    shop.selectedIndex = Math.floor(Math.random() * shop.options.length);
  }
})(jQuery);
