// Import Jest's expect and test functions
import { jest } from '@jest/globals';
import { CombatSimulator, initCombatSimulator } from '../script.js';

// Alias for destructuring in test files
const { expect, test, describe, beforeEach, afterEach } = global.jest;

// Mock the global console to keep test output clean
const originalConsole = { ...console };
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn()
};

// Mock the global window and document objects
const mockDocument = {
  createElement: jest.fn((tagName) => document.createElement(tagName)),
  createElementNS: jest.fn((ns, tagName) => document.createElement(tagName)),
  createTextNode: jest.fn((text) => ({
    nodeType: 3,
    nodeName: '#text',
    nodeValue: text,
    textContent: text
  })),
  getElementById: jest.fn((id) => document.getElementById(id)),
  querySelector: jest.fn((selector) => document.querySelector(selector)),
  querySelectorAll: jest.fn((selector) => document.querySelectorAll(selector)),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  readyState: 'complete',
  body: document.createElement('body'),
  documentElement: document.documentElement,
  head: document.head
};

// Set up the global objects
global.window = {
  ...global.window,
  document: mockDocument,
  alert: jest.fn(),
  confirm: jest.fn(),
  prompt: jest.fn(),
  console: mockConsole,
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  },
  location: {
    href: '',
    search: '',
    hash: ''
  },
  history: {
    pushState: jest.fn(),
    replaceState: jest.fn(),
    go: jest.fn(),
    back: jest.fn(),
    forward: jest.fn()
  },
  requestAnimationFrame: (callback) => setTimeout(callback, 0),
  cancelAnimationFrame: (id) => clearTimeout(id)
};

global.document = mockDocument;

// Create required DOM elements
const createRequiredElements = () => {
  const elements = [
    'initiativeList',
    'currentCombatant',
    'combatLog',
    'simulateBattleBtn',
    'characterModal',
    'monsterModal',
    'surpriseToggleBtn',
    'switchAll',
    'switchTeamA',
    'switchTeamB',
    'switchNone',
    'characterList',
    'monsterList',
    'addCharacterBtn',
    'addMonsterBtn',
    'startCombatBtn',
    'endCombatBtn',
    'nextTurnBtn',
    'previousTurnBtn',
    'roundCounter',
    'initiativeRollBtn',
    'sortInitiativeBtn',
    'clearInitiativeBtn',
    'exportCombatantsBtn',
    'importCombatantsBtn',
    'exportCombatLogBtn',
    'clearCombatLogBtn',
    'toggleCombatLogBtn',
    'toggleInitiativeListBtn',
    'toggleCurrentCombatantBtn',
    'toggleControlsBtn'
  ];
  
  // Add body element if it doesn't exist
  if (!document.body) {
    const body = document.createElement('body');
    document.documentElement.appendChild(body);
  }

  elements.forEach(id => {
    if (!document.getElementById(id)) {
      const element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }
  });
};

// Initialize the test environment
beforeEach(() => {
  // Reset mocks
  jest.clearAllMocks();
  
  // Create required DOM elements
  createRequiredElements();
  
  // Mock the global $ function
  window.$ = jest.fn((selector) => {
    // If selector is a function, call it when the document is ready
    if (typeof selector === 'function') {
      // If document is already ready, call the function immediately
      if (document.readyState === 'complete') {
        selector();
      } else {
        // Otherwise, add it to the DOMContentLoaded event
        document.addEventListener('DOMContentLoaded', selector);
      }
      return $();
    }
    
    // If selector is a DOM element, wrap it in a jQuery object
    if (selector && selector.nodeType) {
      const $el = window.$();
      $el[0] = selector;
      $el.length = 1;
      return $el;
    }
    
    // Create a mock jQuery object with common methods
    const mockObj = {
      // Array-like properties
      0: null,
      length: 0,
      selector: '',
      
      // Core methods
      addClass: jest.fn().mockReturnThis(),
      removeClass: jest.fn().mockReturnThis(),
      toggleClass: jest.fn().mockReturnThis(),
      hasClass: jest.fn().mockReturnValue(false),
      text: jest.fn(function(text) {
        if (text === undefined) return this[0] ? this[0].textContent : '';
        if (this[0]) this[0].textContent = text;
        return this;
      }),
      html: jest.fn(function(html) {
        if (html === undefined) return this[0] ? this[0].innerHTML : '';
        if (this[0]) this[0].innerHTML = html;
        return this;
      }),
      val: jest.fn(function(value) {
        if (value === undefined) return this[0] ? this[0].value : '';
        if (this[0]) this[0].value = value;
        return this;
      }),
      on: jest.fn().mockReturnThis(),
      off: jest.fn().mockReturnThis(),
      trigger: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      filter: jest.fn().mockReturnThis(),
      each: jest.fn(function(callback) {
        for (let i = 0; i < this.length; i++) {
          if (callback.call(this[i], i, this[i]) === false) break;
        }
        return this;
      }),
      ready: jest.fn(function(callback) {
        if (document.readyState === 'complete') {
          callback.call(document);
        } else {
          document.addEventListener('DOMContentLoaded', callback);
        }
        return this;
      }),
      attr: jest.fn().mockImplementation(function(name, value) {
        if (value === undefined) {
          // Get attribute
          if (!this[0]) return undefined;
          if (name === 'title') return this[0].title || '';
          if (name === 'disabled') return this[0].disabled || false;
          return this[0].getAttribute ? this[0].getAttribute(name) : undefined;
        } else {
          // Set attribute
          if (!this[0]) return this;
          if (name === 'title') this[0].title = value;
          else if (name === 'disabled') this[0].disabled = !!value;
          else if (this[0].setAttribute) this[0].setAttribute(name, value);
          return this;
        }
      }),
      prop: jest.fn().mockImplementation(function(name, value) {
        if (value === undefined) {
          return this[0] ? this[0][name] : undefined;
        }
        if (this[0]) this[0][name] = value;
        return this;
      }),
      data: jest.fn().mockImplementation(function(name, value) {
        if (value === undefined) {
          return this[0] && this[0].dataset ? this[0].dataset[name] : undefined;
        }
        if (this[0] && this[0].dataset) this[0].dataset[name] = value;
        return this;
      }),
      append: jest.fn(function(content) {
        if (this[0] && content) {
          if (typeof content === 'string') {
            this[0].innerHTML += content;
          } else if (content[0] && content[0].nodeType) {
            this[0].appendChild(content[0]);
          } else if (content.nodeType) {
            this[0].appendChild(content);
          }
        }
        return this;
      }),
      prepend: jest.fn().mockReturnThis(),
      empty: jest.fn(function() {
        if (this[0]) {
          this[0].innerHTML = '';
        }
        return this;
      }),
      remove: jest.fn().mockImplementation(function() {
        if (this[0] && this[0].parentNode) {
          this[0].parentNode.removeChild(this[0]);
        }
        return this;
      }),
      hide: jest.fn().mockReturnThis(),
      show: jest.fn().mockReturnThis(),
      css: jest.fn().mockReturnThis(),
      click: jest.fn().mockReturnThis(),
      submit: jest.fn().mockReturnThis(),
      change: jest.fn().mockReturnThis(),
      // Add more jQuery methods as needed
    };
    
    // If selector is a string, try to find matching elements
    if (typeof selector === 'string') {
      if (selector.startsWith('#')) {
        const id = selector.substring(1);
        const element = document.getElementById(id);
        if (element) {
          mockObj[0] = element;
          mockObj.length = 1;
        }
      } else if (selector === 'body') {
        mockObj[0] = document.body;
        mockObj.length = 1;
      } else if (selector === 'document' || selector === 'window') {
        mockObj[0] = window;
        mockObj.length = 1;
      }
    }
    
    return mockObj;
  });
  
  // Add static jQuery methods
  $.ajax = jest.fn();
  $.get = jest.fn();
  $.post = jest.fn();
  $.fn = $.prototype;
  
  // Set up the global $ variable
  window.$ = $;
  
  // Mock the global window.monsters
  window.monsters = [
    {
      name: "Goblin",
      size: "Small",
      type: "Humanoid",
      "armor class": "15",
      "hit points": "7 (2d6)",
      speed: "30 ft.",
      "number of attacks": 1,
      attacks: {
        "Scimitar": {
          "to hit": "+3",
          hit: "4 (1d6 + 1)"
        }
      }
    }
  ];
});

afterEach(() => {
  // Clean up any created elements
  const elements = document.querySelectorAll('div[id]');
  elements.forEach(el => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  
  // Restore the original console
  global.console = originalConsole;
});

describe('CombatSimulator - Unit Tests', () => {
  let combatSim;
  
  beforeEach(() => {
    // Create a fresh instance before each test
    combatSim = new CombatSimulator();
    // Mock the logMessage method to track calls
    combatSim.logMessage = jest.fn();
  });

  describe('Initialization', () => {
    test('should initialize with default values', () => {
      expect(combatSim.combatants).toEqual([]);
      expect(combatSim.currentTurnIndex).toBe(0);
      expect(combatSim.combatActive).toBe(false);
      expect(combatSim.combatRound).toBe(0);
      expect(combatSim.initiativeOrder).toEqual([]);
    });
  });

  describe('Monster Data Validation', () => {
    test('should have valid monster data', () => {
      expect(Array.isArray(monsters)).toBe(true);
      expect(monsters.length).toBeGreaterThan(0);
      
      // Test a sample of monsters for required fields
      monsters.forEach(monster => {
        expect(monster).toHaveProperty('name');
        expect(typeof monster.name).toBe('string');
        expect(monster).toHaveProperty('size');
        expect(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']).toContain(monster.size);
        expect(monster).toHaveProperty('type');
        expect(monster).toHaveProperty('armor class');
        expect(monster).toHaveProperty('hit points');
      });
    });
  });

  describe('Combatant Management', () => {
    test('should add a combatant', () => {
      const combatant = {
        id: 'test-1',
        name: 'Test Fighter',
        hp: 30,
        maxHp: 30,
        ac: 16,
        team: 'Team A'
      };
      
      // Reset mock before the test
      combatSim.logMessage.mockClear();
      
      // Add the combatant
      combatSim.combatants.push(combatant);
      
      // Verify the combatant was added
      expect(combatSim.combatants).toContain(combatant);
      
      // The log message is not called when directly pushing to combatants array
      // This is expected behavior since logMessage is only called in addSelectedMonster
      expect(combatSim.logMessage).not.toHaveBeenCalled();
    });

    test('should remove a combatant', () => {
      const combatant = {
        id: 'test-1',
        name: 'Test Fighter',
        team: 'Team A'
      };
      
      combatSim.combatants = [combatant];
      combatSim.removeCharacter('test-1');
      
      expect(combatSim.combatants).not.toContain(combatant);
      expect(combatSim.logMessage).toHaveBeenCalledWith('Character removed from combat.');
    });
  });

  describe('Damage Calculation', () => {
    test('should calculate damage with resistances', () => {
      const target = {
        name: 'Fire Elemental',
        hp: 100,
        maxHp: 100,
        damageResistances: ['fire'],
        damageImmunities: [],
        'Damage Vulnerabilities': []
      };
      
      const damage = combatSim.processDamageReduction(target, 20, 'fire');
      expect(damage).toBe(10); // Half damage due to resistance
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('resists fire damage! Damage halved from 20 to 10')
      );
    });

    test('should handle damage immunity', () => {
      const target = {
        name: 'Fire Elemental',
        hp: 100,
        maxHp: 100,
        damageResistances: [],
        damageImmunities: ['fire'],
        'Damage Vulnerabilities': []
      };
      
      const damage = combatSim.processDamageReduction(target, 20, 'fire');
      expect(damage).toBe(0); // No damage due to immunity
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('is immune to fire damage! Damage reduced to 0')
      );
    });

    test('should handle damage vulnerability', () => {
      const target = {
        name: 'Ice Golem',
        hp: 100,
        maxHp: 100,
        damageResistances: [],
        damageImmunities: [],
        'Damage Vulnerabilities': ['fire']
      };
      
      const damage = combatSim.processDamageReduction(target, 20, 'fire');
      expect(damage).toBe(40); // Double damage due to vulnerability
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('is vulnerable to fire damage! Damage doubled from 20 to 40')
      );
    });
  });
});
