// This file runs after the test environment is set up
const { TextEncoder, TextDecoder } = require('util');

// Set up TextEncoder and TextDecoder globally
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Set up in the globalThis for good measure
if (typeof globalThis !== 'undefined') {
  if (typeof globalThis.TextEncoder === 'undefined') {
    globalThis.TextEncoder = TextEncoder;
  }
  if (typeof globalThis.TextDecoder === 'undefined') {
    globalThis.TextDecoder = TextDecoder;
  }
}
