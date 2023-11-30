/*
    https://angrygolem-games.com/dwarves-mining-4-dd-mining-guide-mining-output/
*/

var tally = 0;
var minedOutputTotal = {};
var miningResults = {};

$("button").on("click", function () {
    var days = parseInt($("input#days").val()); // number of days to simulate
    var minerCount = parseInt($("input#minerCount").val()); // number of miners
    var mineQuality = $("#mineQuality").val(); // quality of the mine
    var mineOwnerCount = $("#mineOwnerCount").val(); // number of mine owners

    if (mineOwnerCount <= 0) { // ensure there is always at least one mine owner
    mineOwnerCount = 1;
    $("#mineOwnerCount").val(1);
    }

    if (days > 365) { // limit the amount of days to simulate. When testing, I found performance problems trying to simulate more than one year.
    days = 365;
    $("input#days").val(365);
    }
    if (days <= 0 || isNaN(days)) { // ensure the value is not 0 or less
        days = 1;
        $("input#days").val(1);
    }

    if (minerCount > 1000) { // limit the number of miners. Testing showed that more than 1000 miners causes performance issues.
    minerCount = 1000;
    $("input#minerCount").val(1000);
    }
    if (minerCount <= 0 || isNaN(minerCount)) { // ensure the value is not 0 or less
        minerCount = 1;
        $("input#minerCount").val(1);
    }

    var output = "";

    for (i in minedOutput) { // set up the object to receive all material names and their worth
        minedOutputTotal[i] = {};
        minedOutputTotal[i].name = i;
        minedOutputTotal[i].worth = [];
    }

    var minerResults = {};
    minerResults.minerCount = minerCount;

    for (var i = 0; i < days; i++) { // loop through the number of selected days
        for (var j = 0; j < minerCount; j++) { // loop through the number of selected miners
            // update minerResults with the results of each miner on each day
            minerResults[i] = {}; // set up miner's results object
            minerResults[i].id = i; // miner's id (number)
            minerResults[i].days = {}; // sub object to collect all the mined items from each day

            var minedRnd = rndNum(100); // pick a random number to indicate the result of what the miner mined

            for (k in miningProducts) { // loop through the different mining categories and select one of them based on the value of minedRnd
                if (miningProducts[k].first <= minedRnd && miningProducts[k].second >= minedRnd) { // pick a mining product from the miningProducts object
                    switch (miningProducts[k].name) {
                        case 'stones':
                          minedItems(stones, mineQuality);
                          byproduct('stones');
                          minerResults[i].days[k] = j;
                          break;
                        case 'metals':
                          minedItems(metals, mineQuality);
                          byproduct('metals');
                          minerResults[i].days[k] = j;
                          break;
                        case 'exotics':
                          minedItems(exotics, mineQuality);
                          byproduct('exotic');
                          minerResults[i].days[k] = j;
                          break;
                        case 'gemstones':
                          minedItems(gemstones, mineQuality);
                          minerResults[i].days[k] = j;
                          break;
                        default: // Handle the default case if needed
                          break;
                    }
                }
            }
        }
    }

    minedOutputTotal.grandTotal = 0;

    for (i in minedOutputTotal) {if (minedOutputTotal[i] && minedOutputTotal[i].worth && minedOutputTotal[i].worth.length > 0) {
      var tally = 0;

      minedOutputTotal[i].calculated = true; // used to determine if a mined item should be tallied or not as it is used later when the user toggle a mined item on/off.

      for (k in minedOutputTotal[i].worth) { // Check if the value is a valid number before adding it to the tally
        if (!isNaN(minedOutputTotal[i].worth[k]) && minedOutputTotal[i].calculated == true) {
          tally += minedOutputTotal[i].worth[k];
        }
      }

      minedOutputTotal[i].tally = tally;

      minedOutputTotal.grandTotal += tally;

      // ** figure out the category of the mined item so that I can organize each mined item by its respective category when displaying them
      }
    }

    // get values from inputs that will be used to split the grandTotal amongst the dragon's cut, miner's cut, mine upkeep, mine expenses, and mine expansion
    minedOutputTotal.dragonsCut = parseInt($("input#percentage_dragonTip").val());
    minedOutputTotal.minersCut = parseInt($("input#percentage_minerTip").val());
    minedOutputTotal.mineUpkeep = parseInt($("input#percentage_mineUpkeep").val());
    minedOutputTotal.miscExpenses = parseInt($("input#percentage_miscExpenses").val());
    minedOutputTotal.mineExpansion = parseInt($("input#percentage_mineExpansion").val());
    minedOutputTotal.partysCut = 100 - (minedOutputTotal.dragonsCut + minedOutputTotal.minersCut + minedOutputTotal.mineUpkeep + minedOutputTotal.miscExpenses + minedOutputTotal.mineExpansion);
    minedOutputTotal.mineOwnerCount = parseInt($("input#mineOwnerCount").val());
    
    var output = ""; // hold the generated HTML output of mined items and their values

    for (i in minedOutputTotal) { // loop through minedOutputTotal object and display only the items that have been mined
      if (minedOutputTotal[i].tally) {
          // ** add back in the categories of mined items so a whole category can be toggled on/off
        if (minedOutputTotal[i].name == "blueSpinel") {
            output += '<p class="indented"><input type="checkbox" class="mined" id="blueSpinel" name="blueSpinel"  total = "' + numberWithCommas(minedOutputTotal[i].tally) + '" checked>blue spinel: <span id="' + i + '">' + numberWithCommas(minedOutputTotal[i].tally) + "</span>gp</p>";
        } else if (minedOutputTotal[i].name == "redSpinel") {
            output += '<p class="indented"><input type="checkbox" class="mined" id="redSpinel" name="redSpinel"  total = "' + numberWithCommas(minedOutputTotal[i].tally) + '" checked>red spinel: <span id="' + i + '">' + numberWithCommas(minedOutputTotal[i].tally) + "</span>gp</p>";
        } else {
            output += '<p class="indented"><input type="checkbox" class="mined" id="' + minedOutputTotal[i].name + '" name="' + minedOutputTotal[i].name + '"  total = "' + numberWithCommas(minedOutputTotal[i].tally) + '" checked><span id="' + i + '">' + minedOutputTotal[i].name + ": " + numberWithCommas(minedOutputTotal[i].tally) + "</span>gp</p>";
        }
      }
    }

  $("div#output").html(''); // reset html output
  $("div#output").append(output);

  updateSummary(days)
});

function updateSummary(days) { // display the mined shared
    $("div#summary").html('');

    $("div#summary").append('<br/><p><strong>The mine generated <span id="grandTotal">' + numberWithCommas(minedOutputTotal.grandTotal) + '</span>gp worth of materials from ' + days + ' days of labor from the miners</strong>.</p>'); 
    
    $("div#summary").append('<p>The dragon gets <span id="dragonTipInput">' + numberWithCommas(Math.round(minedOutputTotal.grandTotal * (minedOutputTotal.dragonsCut / 100))) + '</span>gp.</p><p>The miners get <span id="minersBonus">' + numberWithCommas(Math.round(minedOutputTotal.grandTotal * (minedOutputTotal.minersCut / 100))) + '</span>gp.<p>' + numberWithCommas(minedOutputTotal.mineUpkeep + minedOutputTotal.miscExpenses) + 'gp goes to mine upkeep and misc expenses.</p><p>' + numberWithCommas(minedOutputTotal.mineExpansion) + 'gp for mine expansion and facility upgrades.</p>');

    if (minedOutputTotal.mineOwnerCount == 1) {
        $("div#summary").append('<p>And the mine owner get ' + numberWithCommas(minedOutputTotal.grandTotal * (minedOutputTotal.partysCut / 100) / minedOutputTotal.mineOwnerCount) + 'gp.');
    } else {
        $("div#summary").append('<p>And the mine owners get ' + numberWithCommas(minedOutputTotal.grandTotal * (minedOutputTotal.partysCut / 100) / minedOutputTotal.mineOwnerCount) + 'gp each.');
    }
}

$("div#output").on("change", "input:checkbox", function () {
    var id = $(this).attr('id');
    var days = parseInt($("input#days").val()); // number of days to simulate
    
    for (i in minedOutputTotal) { // Update the summary based on what was enable or disabled
      if (minedOutputTotal[i].name == id && $('input#' + id).prop('checked') == false) {
        minedOutputTotal.grandTotal -= minedOutputTotal[i].tally;
      } else if (minedOutputTotal[i].name == id && $('input#' + id).prop('checked') == true) {
        minedOutputTotal.grandTotal += minedOutputTotal[i].tally;
      }
    }

    updateSummary(days);
});

function byproduct(material) {
  if (material == "stones") {
    var stoneByProductTypes = [graniteByProducts, basaltByProdcts,marbelByProducts];
    var rndStone = stoneByProductTypes[rndNum(stoneByProductTypes.length)];
    var roll100 = rndNum(100);

    for (i in rndStone) {
      if (rndStone[i].first <= roll100 && rndStone[i].second >= roll100) { // pick a random material
        if (rndStone[i].name == "nothing") { // skip; do nothing
        } else if (rndStone[i].name == "rollTwice") { // roll twice on rndStone object
          rndMaterial(rndStone);
          rndMaterial(rndStone);
        } else if (rndStone[i].name == "rollOnceGranite") { // roll one granite table
          rollOnGraniteByProducts();
        } else if (rndStone[i].name == "rollTwiceGranite") { // roll twice on granite table
          rollOnGraniteByProducts();
          rollOnGraniteByProducts();
        } else {
          rndMaterial(rndStone);
        }
      }
    }
  } else if (material == "metals") {
    var metalByProductTypes = [ironByProducts, copperByProducts];
    var rndMetal = metalByProductTypes[rndNum(metalByProductTypes.length)];
    var roll100 = rndNum(100);

    for (i in rndMetal) {
      if (rndMetal[i] != "nothing") {
        var rollRndMetalByProducts = rndNum(100);

        for (k in rndMetal) {
          if (
            rndMetal[k].first <= rollRndMetalByProducts && rndMetal[k].second >= rollRndMetalByProducts
          ) {
            rndMaterial(rndMetal);
          }
        }
      }
    }
  } else if (material == "exotic") {
    var exoticByProductTypes = ["amber", "jet", "blue calcite"];
    var rndExotic = exoticByProductTypes[rndNum(exoticByProductTypes.length)];

    for (i in minedOutput) {
      if (minedOutput[i].name == rndExotic) {
        var worth = minedOutput[i].gpOutput[rndNum(minedOutput[i].gpOutput.length)];
        minedOutputTotal[rndExotic].worth.push(worth);
      }
    }
  }
}

function rollOnGraniteByProducts() {
  var rollGraniteByProducts = rndNum(100);

  for (k in graniteByProducts) {
    if (
      graniteByProducts[k].first <= rollGraniteByProducts && graniteByProducts[k].second >= rollGraniteByProducts
    ) {
      if (
        graniteByProducts[k].name != "nothing" || graniteByProducts[k].name != "rollTwice") {
        for (l in minedOutput) {
          if (minedOutput[l].name == graniteByProducts[k].name) {
            minedOutputTotal[graniteByProducts[k].name].worth.push(minedOutput[l].gpOutput[rndNum(minedOutput[l].gpOutput.length)]);
          }
        }
      }
    }
  }
}

function rndMaterial(obj) {
  for (j in minedOutput) {
    if (minedOutput[j].name == obj[i].name) {
      var worth = minedOutput[j].gpOutput[rndNum(minedOutput[j].gpOutput.length)];

      minedOutputTotal[obj[i].name].worth.push(worth);
      break;
    }
  }
}

function minedItems(obj, mineQuality) {
    var rndNumber = rndNum(100);

    switch (mineQuality) {
        case 'dead':
          mineMultiplier = rndNum(10);
          break;
        case 'poor':
          mineMultiplier = rndNum(25);
          break;
        case 'moderate':
          mineMultiplier = rndNum(60);
          break;
        case 'excellent':
          mineMultiplier = rndNum(100);
          break;
        default:
          mineMultiplier = 100;
          break;
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) { // Check if obj has a property i
        var rndNumber = rndNum(100);

      if (rndNumber >= obj[i].first && rndNumber <= obj[i].second) {
        var worth = obj[i].gpOutput[rndNum(obj[i].gpOutput.length)];

        if (Math.floor((worth * mineMultiplier) / 100) <= 0) { // Ensure no items are valued at zero
          if (obj[i].name == 'red spinel') {
              minedOutputTotal.redSpinel.worth.push(obj[i].gpOutput[0]);
          } else if (obj[i].name == 'blue spinel') {
              minedOutputTotal.blueSpinel.worth.push(obj[i].gpOutput[0]);
          } else {
              minedOutputTotal[obj[i].name].worth.push(obj[i].gpOutput[0]);
          }
        } else { // Push the randomly selected value into the worth array
          var calculatedWorth = Math.floor((worth * mineMultiplier) / 100);

          if (obj[i].name == 'red spinel') {
              minedOutputTotal.redSpinel.worth.push(calculatedWorth);
          } else if (obj[i].name == 'blue spinel') {
              minedOutputTotal.blueSpinel.worth.push(calculatedWorth);
          } else {
              minedOutputTotal[obj[i].name].worth.push(calculatedWorth);
          }
        }
      }
    }
  }
}

function rndNum(x) {
    return Math.floor(Math.random() * x);
}

function numberWithCommas(x) {
    var parts = x.toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}