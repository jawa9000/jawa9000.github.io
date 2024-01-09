$(document).ready(function() {
    var growsInOptions = []; // Collect unique GrowsIn values

    $.each(ingredient, function(key, value) {
        if (value.GrowsIn) {
            growsInOptions = growsInOptions.concat(value.GrowsIn);
        }
    });

    growsInOptions = Array.from(new Set(growsInOptions)).sort(); // Remove duplicates and sort

    var dropdown = $("#growsInDropdown"); // Populate the dropdown with unique GrowsIn options

    $.each(growsInOptions, function(index, value) { // Loop through the unique GrowsIn options and append them to the dropdown
        dropdown.append($("<option id='" + value.replace(/\s/g, '') +"'></option>").text(value));
    });
    

    // Change event handler for the dropdown
    dropdown.change(function() { 
        var selectedGrowsIn = $(this).val(); // Get the selected GrowsIn value

        $('span#biome').parent().removeClass('hidden');
        $('span#biome').text(selectedGrowsIn.toLowerCase());

        var namesWithRarity = []; // Collect names and rarity based on the selected GrowsIn value

        $.each(ingredient, function(key, value) {
            if (value.GrowsIn && value.GrowsIn.includes(selectedGrowsIn)) {
                namesWithRarity.push(`${value.name} (${value.rarity}): ${value.details} DC: ${value.DC}`);
            }
        });

        namesWithRarity.sort();

        var nameList = $("#name"); // Append names with rarity to the #name element

        nameList.empty(); // Clear previous names
        
        $.each(namesWithRarity, function(index, nameWithRarity) {
            nameList.append($("<li></li>").text(nameWithRarity));
        });
    });
    
});