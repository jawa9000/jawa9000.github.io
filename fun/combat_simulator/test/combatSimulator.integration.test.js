// Import TextEncoder and TextDecoder from util and make them globally available
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Import Jest's expect and test functions
import { expect, test, describe, beforeEach, jest } from '@jest/globals';
import { CombatSimulator } from '../script.js';

// Mock the global console to keep test output clean
global.console = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
};

describe('CombatSimulator - Integration Tests', () => {
  let combatSim;
  
  beforeEach(() => {
    // Create a new instance before each test
    combatSim = new CombatSimulator();
    // Mock the logMessage method
    combatSim.logMessage = jest.fn();
  });

  describe('Combat Flow', () => {
    test('should run a complete combat between two combatants', () => {
      // Create test combatants
      const fighter = {
        id: 'fighter-1',
        name: 'Test Fighter',
        hp: 30,
        maxHp: 30,
        ac: 16,
        initiative: 15,
        team: 'Team A',
        attacks: {
          longsword: {
            'to hit': '+5',
            hit: '8 (1d8 + 3) slashing'
          }
        },
        damage: '1d8+3',
        damageType: 'slashing'
      };

      const goblin = {
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
            hit: '5 (1d6 + 2) slashing'
          }
        },
        damage: '1d6+2',
        damageType: 'slashing'
      };

      // Add combatants
      combatSim.combatants = [fighter, goblin];
      
      // Start combat
      combatSim.rollInitiative();
      
      // Verify initiative order (fighter should go first)
      expect(combatSim.initiativeOrder[0].name).toBe('Test Fighter');
      expect(combatSim.initiativeOrder[1].name).toBe('Goblin');
      
      // Simulate fighter's turn
      combatSim.processTurn();
      
      // Verify goblin took damage (simplified - in reality we'd mock the damage roll)
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('Test Fighter attacks Goblin')
      );
      
      // Simulate goblin's turn
      combatSim.processTurn();
      
      // Verify fighter took damage
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('Goblin attacks Test Fighter')
      );
      
      // Simulate combat until someone dies
      while (combatSim.combatActive) {
        combatSim.processTurn();
      }
      
      // Verify combat ended with a winner
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('Combat has ended!')
      );
    });
  });

  describe('Surprise Round', () => {
    test('should handle surprise round correctly', () => {
      const attacker = {
        id: 'rogue-1',
        name: 'Rogue',
        hp: 24,
        maxHp: 24,
        ac: 15,
        initiative: 18,
        team: 'Team A',
        attacks: {
          dagger: {
            'to hit': '+6',
            hit: '6 (1d4 + 4) piercing',
            damageType: 'piercing'
          }
        },
        damage: '1d4+4',
        damageType: 'piercing'
      };

      const surprised = {
        id: 'guard-1',
        name: 'Surprised Guard',
        hp: 11,
        maxHp: 11,
        ac: 16,
        initiative: 12,
        team: 'Team B',
        attacks: {
          longsword: {
            'to hit': '+3',
            hit: '5 (1d8 + 1) slashing',
            damageType: 'slashing'
          }
        },
        damage: '1d8+1',
        damageType: 'slashing',
        isSurprised: true
      };

      combatSim.combatants = [attacker, surprised];
      combatSim.surprisedTeam = 'Team B';
      
      // Start combat with surprise round
      combatSim.rollInitiative();
      
      // Process surprise round (only Team A can act)
      combatSim.processTurn();
      
      // Verify surprise round message
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('Surprise Round! Only Team A can act this round.')
      );
      
      // Verify attacker could act
      expect(combatSim.logMessage).toHaveBeenCalledWith(
        expect.stringContaining('Rogue attacks')
      );
      
      // Process next turn (should be normal round)
      combatSim.processTurn();
      
      // Verify surprise is cleared
      expect(combatSim.surprisedTeam).toBeNull();
    });
  });
});
