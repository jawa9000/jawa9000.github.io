$(document).ready(function() {
    const urls = [ // update this list with new RGP tools are added.
      // "../Apothecary/index.html, Apothecary",
      "../Culinarian/index.html, Culinarian",
      "../Critical_Hit_Fumble/index.html, Criticals",
      "../Dragon_Generator/index.html, Dragon Gen",
      "../Encounter_Builder/monster_catalog.html, Monster Catalog",
      "../Encounter_Builder/index.html, Monster Encounters",
      "../Fantasy_Character_Generator/index.html, Char Gen",
      "../Monster_Sheet/index.html, Monster Sheet",
      "../Random_Weather/index.html, Weather",
      "../Bastions/index.html, Bastions",
      "../Running_Fantasy_Business/index.html, Business",
      "../Running_Fantasy_Business/mines.html, Mines",
      "../Running_Fantasy_Business/ulrye.html, Ulrye",
      "../Spell_list/index.html, Spells",
      "../Treasure_Generator/index.html, Treasure"
    ];
  
    let bannerHTML = '<div class="banner_nav">';

    $.each(urls, function(index, urlData) {
      const parts = urlData.split(',');
      const url = parts[0].trim();
      const name = parts[1].trim();
      bannerHTML += `<a href="${url}" class="rpg_link">${name}</a>`;
    });
  
    bannerHTML += '</div>';
  
    $('body').prepend(bannerHTML);
  });