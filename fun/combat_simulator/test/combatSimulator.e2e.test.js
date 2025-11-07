// Import Jest's expect and test functions
import { expect, test, describe, beforeAll, afterAll, jest } from '@jest/globals';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Set up TextEncoder/TextDecoder for JSDOM
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock the global console to keep test output clean
global.console = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
};

// Mock the global window and document objects
global.window = {};
global.document = {
    createElement: jest.fn().mockReturnValue({}),
    getElementById: jest.fn().mockReturnValue({}),
    querySelector: jest.fn().mockReturnValue({}),
    querySelectorAll: jest.fn().mockReturnValue([]),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
};

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the HTML file
const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');

describe('CombatSimulator - E2E Tests', () => {
  let dom;
  let window;
  let document;
  let combatSim;
  
  beforeAll(() => {
    // Set up the DOM
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    window = dom.window;
    document = window.document;
    
    // Mock the global objects
    global.window = window;
    global.document = document;
    global.navigator = window.navigator;
    
    // Load the scripts
    require('../omni_monster');
    require('../script');
    
    // Get the combat simulator instance
    combatSim = window.combatSim;
    
    // Mock the logMessage method
    combatSim.logMessage = jest.fn();
  });
  
  afterEach(() => {
    // Reset the DOM after each test
    document.body.innerHTML = html;
    jest.clearAllMocks();
  });
  
  describe('UI Interactions', () => {
    test('should add a monster when clicking "Add Monster" button', () => {
      // Mock the monster data
      const mockMonster = {
        name: 'Test Monster',
        size: 'Medium',
        type: 'Humanoid',
        'armor class': '15',
        'hit points': '30 (4d8 + 12)',
        speed: '30 ft.',
        dex: '14',
        challenge: '2 (450 XP)',
        'number of attacks': 1,
        attacks: {
          sword: {
            'to hit': '+4',
            hit: '7 (1d8 + 3) slashing'
          }
        }
      };
      
      // Set the test monster data
      window.monsters = [mockMonster];
      
      // Simulate clicking the "Add Monster" button
      const addMonsterBtn = document.querySelector('#addMonster');
      addMonsterBtn.click();
      
      // Verify the monster modal is shown
      const monsterModal = document.querySelector('#monsterModal');
      expect(monsterModal.style.display).not.toBe('none');
      
      // Simulate selecting the test monster
      const monsterItem = document.createElement('div');
      monsterItem.className = 'monster-item';
      monsterItem.setAttribute('data-index', '0');
      document.querySelector('#monsterList').appendChild(monsterItem);
      
      // Simulate clicking on the monster
      monsterItem.click();
      
      // Verify the combatant was added
      expect(combatSim.combatants.length).toBe(1);
      expect(combatSim.combatants[0].name).toBe('Test Monster');
      expect(combatSim.combatants[0].team).toBe('Team A');
    });
    
    test('should start combat when clicking "Roll Initiative"', () => {
      // Add a test combatant
      combatSim.combatants = [{
        id: 'test-1',
        name: 'Test Fighter',
        hp: 30,
        maxHp: 30,
        ac: 16,
        initiative: 15,
        team: 'Team A',
        attacks: {}
      }];
      
      // Mock the rollInitiative method
      combatSim.rollInitiative = jest.fn(() => {
        combatSim.combatActive = true;
        combatSim.initiativeOrder = [...combatSim.combatants];
      });
      
      // Simulate clicking the "Roll Initiative" button
      const rollInitiativeBtn = document.querySelector('#rollInitiative');
      rollInitiativeBtn.click();
      
      // Verify combat started
      expect(combatSim.rollInitiative).toHaveBeenCalled();
      expect(combatSim.combatActive).toBe(true);
      expect(combatSim.initiativeOrder.length).toBe(1);
    });
    
    test('should update combat log when actions are taken', () => {
      // Add test combatants
      combatSim.combatants = [
        {
          id: 'fighter-1',
          name: 'Fighter',
          hp: 30,
          maxHp: 30,
          ac: 16,
          initiative: 15,
          team: 'Team A',
          attacks: {
            sword: {
              'to hit': '+5',
              hit: '8 (1d8 + 3) slashing',
              damageType: 'slashing'
            }
          },
          damage: '1d8+3'
        },
        {
          id: 'goblin-1',
          name: 'Goblin',
          hp: 7,
          maxHp: 7,
          ac: 15,
          initiative: 10,
          team: 'Team B',
          attacks: {
            scimitar: {
              'to hit': '+4',
              hit: '5 (1d6 + 2) slashing',
              damageType: 'slashing'
            }
          },
          damage: '1d6+2'
        }
      ];
      
      // Start combat
      combatSim.rollInitiative();
      combatSim.combatActive = true;
      combatSim.initiativeOrder = [...combatSim.combatants];
      
      // Mock the processTurn method to simulate an attack
      combatSim.processTurn = jest.fn(() => {
        combatSim.logMessage('Fighter attacks Goblin and hits for 8 damage!');
        combatSim.combatants[1].hp -= 8; // Goblin takes damage
      });
      
      // Process a turn
      combatSim.processTurn();
      
      // Verify the combat log was updated
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        'Fighter attacks Goblin and hits for 8 damage!'
      );
      
      // Verify the goblin took damage
      expect(combatSim.combatants[1].hp).toBe(-1);
    });
  });
});
