// custom-test-environment.js
import { TextEncoder, TextDecoder } from 'util';
import { JSDOM } from 'jsdom';
import { JSDOMEnvironment } from 'jest-environment-jsdom';

// Set up TextEncoder and TextDecoder at the module level
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Create a custom test environment that extends JSDOM
class CustomTestEnvironment extends JSDOMEnvironment {
  constructor(config, context) {
    // Ensure TextEncoder and TextDecoder are available before JSDOM loads
    if (typeof global.TextEncoder === 'undefined') {
      global.TextEncoder = TextEncoder;
    }
    if (typeof global.TextDecoder === 'undefined') {
      global.TextDecoder = TextDecoder;
    }
    
    super(config, context);
  }

  async setup() {
    await super.setup();
    
    // Ensure TextEncoder and TextDecoder are available in the global scope
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
    
    // Also set them on globalThis for good measure
    if (typeof globalThis.TextEncoder === 'undefined') {
      globalThis.TextEncoder = TextEncoder;
    }
    if (typeof globalThis.TextDecoder === 'undefined') {
      globalThis.TextDecoder = TextDecoder;
    }
  }
}

export default CustomTestEnvironment;
