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
      // "../Spell_list/index.html, Spells", // This functionality is now in the Spell Catalog, so this link is redundant.
      "../Treasure_Generator/index.html, Treasure",
      "../Spells/index.html, Spell Catalog",
      "../Harvesting_Monsters/index.html, Monster Harvesting"
    ];

    const hamburgerStyles = `
      .banner_nav {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.05);
        padding: 10px;
        margin-bottom: 10px;
        position: relative;
        display: flex;
        justify-content: flex-end;
      }
      .rpg_hamburger_btn {
        width: 44px;
        height: 44px;
        padding: 0;
        display: block;
        line-height: 44px;
        text-align: center;
        border: 1px solid rgba(139, 69, 19, 0.4);
        border-radius: 6px;
        background: #f2ce9e;
        color: #8b4513;
        cursor: pointer;
        font-size: 1.5rem;
      }
      .rpg_hamburger_btn:hover {
        background: #e6c08a;
        color: #5b3d0c;
      }
      .rpg_nav_wrapper {
        position: relative;
        display: inline-block;
      }
      .rpg_nav_menu {
        display: none;
        position: absolute;
        top: 0;
        right: 100%;
        width: max-content;
        margin-right: 4px;
        padding: 8px 0;
        background: #f2ce9e;
        border: 1px solid rgba(139, 69, 19, 0.3);
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-height: 70vh;
        overflow-y: auto;
        z-index: 1000;
      }
      .rpg_nav_menu.is_open {
        display: block;
      }
      .rpg_link {
        text-align: left;
      }
      .rpg_nav_menu .rpg_link {
        display: block;
        margin: 0;
        padding: 10px 16px;
        text-decoration: none;
        color: #8b4513;
        border-bottom: 1px solid rgba(139, 69, 19, 0.15);
      }
      .rpg_nav_menu .rpg_link:last-child {
        border-bottom: none;
      }
      .rpg_nav_menu .rpg_link:hover {
        background: rgba(139, 69, 19, 0.1);
        text-decoration: none;
        color: #5b3d0c;
      }
    `;

    $('head').append('<style class="rpg_nav_styles">' + hamburgerStyles + '</style>');

    let bannerHTML = '<div class="banner_nav"><div class="rpg_nav_wrapper">';
    bannerHTML += '<button type="button" class="rpg_hamburger_btn" aria-label="Open menu" aria-expanded="false">&#9776;</button>';
    bannerHTML += '<div class="rpg_nav_menu" role="navigation" aria-label="RPG tools">';

    $.each(urls, function(index, urlData) {
      const parts = urlData.split(',');
      const url = parts[0].trim();
      const name = parts[1].trim();
      bannerHTML += '<a href="' + url + '" class="rpg_link">' + name + '</a>';
    });

    bannerHTML += '</div></div></div>';

    $('body').prepend(bannerHTML);

    const $btn = $('.rpg_hamburger_btn');
    const $menu = $('.rpg_nav_menu');

    $btn.on('click', function() {
      const open = $menu.hasClass('is_open');
      $menu.toggleClass('is_open', !open);
      $btn.attr('aria-expanded', !open);
      $btn.attr('aria-label', open ? 'Open menu' : 'Close menu');
    });

    $menu.find('.rpg_link').on('click', function() {
      $menu.removeClass('is_open');
      $btn.attr('aria-expanded', 'false');
      $btn.attr('aria-label', 'Open menu');
    });

    $(document).on('click', function(e) {
      if ($menu.hasClass('is_open') && !$.contains($('.banner_nav')[0], e.target)) {
        $menu.removeClass('is_open');
        $btn.attr('aria-expanded', 'false');
        $btn.attr('aria-label', 'Open menu');
      }
    });
  });
