$(document).ready(function () {
  // Counter to create unique ids
  var formCounter = 0;

  // Event listener for the button click
  $('#addForm').on('click', function () {
    createForm();
  });

  function createForm() {
    formCounter++;

    // Create input elements within the form with unique ids
    var output = '<tr id="row_' + formCounter + '"><td><select><option value="monster">Monster</option><option value="hero">Hero</option></select></td>';
    output += '<td><input type="text" placeholder="name" title="Name of individual(s)" id="name_' + formCounter + '" /></td>';
    output += '<td><input type="number" min="0" step="1" placeholder="1" title="Number of individuals" id="count_' + formCounter + '" /></td>';
    output += '<td><input type="number" min="1" step="1" placeholder="1" title="Armor class" id="armorClass_' + formCounter + '" /></td>';
    output += '<td><input type="number" min="1" step="1" placeholder="1" title="Health of each individual" id="health_' + formCounter + '" /></td>';
    output += '<td><input type="number" min="0" step="1" placeholder="0" title="Initiative bonus" id="initiative_' + formCounter + '" /></td>';
    output += '<td><input type="number" min="5" step="1" placeholder="5" title="Speed" id="speed_' + formCounter + '" /></td>';
    output += '<td><input type="number" min="5" step="1" placeholder="5" title="Distance from target" id="distance_' + formCounter + '" /></td>';
    output += '<td><input type="number" min="1" step="1" placeholder="1" title="Number of attacks" id="attacks_' + formCounter + '" /></td>';
    output += '<td><input type="text" placeholder="Weapon(s)" title="Name of each weapon. Use a comma separated list." id="weapons_' + formCounter + '" /></td>';
    output += '<td><input type="text" placeholder="Weapon(s) damage" title="Damge of each weapon. Use a comma separated list." id="weaponsDamage_' + formCounter + '" /></td></tr>';
    
    $('table#formContainer').append(output); // Append input elements to the form
  }
});
