// Set up TextEncoder and TextDecoder before anything else
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Now require JSDOM
const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');

// Create a basic HTML structure for testing
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Combat Simulator Test</title>
  </head>
  <body>
    <div id="initiativeList"></div>
    <div id="currentCombatant"></div>
    <div id="combatLog"></div>
    <button id="simulateBattleBtn"></button>
    <div id="characterModal"></div>
    <div id="monsterModal"></div>
  </body>
</html>
`;

const dom = new JSDOM(html, {
  url: 'http://localhost/',
  runScripts: 'dangerously',
  beforeParse(window) {
    // Ensure TextEncoder and TextDecoder are available in the JSDOM window
    window.TextEncoder = TextEncoder;
    window.TextDecoder = TextDecoder;
    
    // Add empty function for methods that might be called
    window.alert = () => {};
    
    // Mock jQuery
    window.$ = (selector) => {
      // Handle the case when a function is passed (like $(document).ready())
      if (typeof selector === 'function') {
        // If document is already ready, call immediately, otherwise queue it
        if (document.readyState === 'complete') {
          selector();
        } else {
          document.addEventListener('DOMContentLoaded', selector);
        }
        return $();
      }
      
      // Handle the case when a DOM element is passed
      if (selector && selector.nodeType) {
        const $el = $(`#${selector.id}`);
        if ($el.length) return $el;
        
        // If not found by ID, create a new wrapper
        const newEl = createJQueryMock();
        newEl[0] = selector;
        newEl.length = 1;
        return newEl;
      }
      
      // Handle window/document
      if (selector === document || selector === window) {
        return {
          ready: (fn) => {
            if (document.readyState === 'complete') {
              fn();
            } else {
              document.addEventListener('DOMContentLoaded', fn);
            }
            return this;
          },
          on: () => $(),
          off: () => $(),
          trigger: () => $(),
          val: () => '',
          text: () => '',
          html: () => '',
          append: () => {},
          empty: function() { 
            if (this[0]) this[0].innerHTML = ''; 
            return this; 
          },
          addClass: () => {},
          removeClass: () => {},
          toggleClass: () => {},
          hasClass: () => false,
          find: () => $(),
          closest: () => $(),
          parent: () => $(),
          children: () => [],
          each: (fn) => {
            const elements = document.querySelectorAll(selector);
            for (let i = 0; i < elements.length; i++) {
              fn.call(elements[i], i, elements[i]);
            }
            return $();
          },
          [0]: document.querySelector(selector)
        };
      }
      
      const element = selector.startsWith('#') 
        ? document.getElementById(selector.substring(1))
        : document.querySelector(selector);
      
      if (!element) {
        return {
          length: 0,
          [0]: undefined,
          on: () => {},
          off: () => {},
          trigger: () => {},
          val: () => '',
          text: () => '',
          html: () => '',
          append: () => {},
          empty: () => {},
          addClass: () => {},
          removeClass: () => {},
          toggleClass: () => {},
          hasClass: () => false,
          find: () => $(),
          closest: () => $(),
          parent: () => $(),
          children: () => [],
          each: () => $()
        };
      }
      
      return {
        0: element,
        length: 1,
        on: (event, handler) => {
          element.addEventListener(event, handler);
          return $();
        },
        off: (event, handler) => {
          element.removeEventListener(event, handler);
          return $();
        },
        trigger: (event) => {
          element.dispatchEvent(new Event(event));
          return $();
        },
        val: (value) => {
          if (value !== undefined) {
            element.value = value;
            return $();
          }
          return element.value || '';
        },
        text: (value) => {
          if (value !== undefined) {
            element.textContent = value;
            return $();
          }
          return element.textContent || '';
        },
        html: (value) => {
          if (value !== undefined) {
            element.innerHTML = value;
            return $();
          }
          return element.innerHTML || '';
        },
        append: (content) => {
          if (typeof content === 'string') {
            element.insertAdjacentHTML('beforeend', content);
          } else if (content instanceof HTMLElement) {
            element.appendChild(content);
          } else if (content && content[0] && content[0] instanceof HTMLElement) {
            element.appendChild(content[0]);
          }
          return $();
        },
        empty: () => {
          element.innerHTML = '';
          return $();
        },
        addClass: (className) => {
          if (className) {
            element.classList.add(className);
          }
          return $();
        },
        removeClass: (className) => {
          if (className) {
            element.classList.remove(className);
          }
          return $();
        },
        toggleClass: (className) => {
          if (className) {
            element.classList.toggle(className);
          }
          return $();
        },
        hasClass: (className) => className ? element.classList.contains(className) : false,
        find: (selector) => $(selector, element),
        closest: (selector) => $(element.closest(selector) || null),
        parent: () => $(element.parentElement || null),
        children: () => Array.from(element.children).map(el => $(el)),
        each: (fn) => {
          const elements = element.querySelectorAll(selector);
          for (let i = 0; i < elements.length; i++) {
            fn.call(elements[i], i, elements[i]);
          }
          return $();
        }
      };
    };
  }
});

// Set up global variables
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.self = global;
global.$ = window.$;

// Mock localStorage if not already defined
if (!global.localStorage) {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = String(value);
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();

  global.localStorage = localStorageMock;
}

// Set up console mocks
global.console = {
  log: jest.fn(),
  error: jest.fn(),
};

// Create the jQuery function
const jQuery = function(selector, context) {
  return new jQuery.fn.init(selector, context);
};

// Set up the prototype
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: '3.6.0',
  length: 0,
  elements: [],
  _data: {},
  _events: {},
  
  // Initialize the jQuery object
  init: function(selector, context) {
    // Handle empty selector
    if (!selector) {
      return this;
    }
    
    // Handle DOM element
    if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this;
    }
    
    // Handle HTML strings
    if (typeof selector === 'string' && selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
      const temp = document.createElement('div');
      temp.innerHTML = selector;
      this.elements = Array.from(temp.children);
      this.length = this.elements.length;
      return this;
    }
    
    // Handle CSS selectors
    if (typeof selector === 'string') {
      try {
        this.elements = Array.from(document.querySelectorAll(selector));
        this.length = this.elements.length;
      } catch (e) {
        console.warn(`Invalid selector: ${selector}`, e);
        this.elements = [];
      }
      return this;
    }
    
    // Handle jQuery objects
    if (selector.jquery) {
      return selector;
    }
    
    // Handle arrays and array-like objects
    if (Array.isArray(selector) || (selector.length >= 0 && selector !== window)) {
      this.elements = Array.from(selector);
      this.length = this.elements.length;
      return this;
    }
    
    // Handle functions (document ready)
    if (typeof selector === 'function') {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(selector, 1);
      } else {
        document.addEventListener('DOMContentLoaded', selector);
      }
      return this;
    }
    
    return this;
  },
  
  // Make the jQuery object array-like
  splice: [].splice,
  push: [].push,
  sort: [].sort,
  indexOf: [].indexOf,
  
  // Get the DOM element at the specified index
  get: function(index) {
    if (index < 0) {
      index += this.length;
    }
    return this.elements[index];
  },
  
  // Add jQuery methods
  addClass: jest.fn().mockImplementation(function(className) {
    if (this[0]) {
      const classes = (this[0].className || '').split(' ').filter(Boolean);
      if (!classes.includes(className)) {
        classes.push(className);
        this[0].className = classes.join(' ');
      }
    }
    return this;
  }),
  removeClass: jest.fn().mockImplementation(function(className) {
    if (this[0]) {
      const classes = (this[0].className || '').split(' ').filter(Boolean);
      const index = classes.indexOf(className);
      if (index > -1) {
        classes.splice(index, 1);
        this[0].className = classes.join(' ');
      }
    }
    return this;
  }),
  toggleClass: jest.fn().mockImplementation(function(className, state) {
    if (this[0]) {
      const classes = (this[0].className || '').split(' ').filter(Boolean);
      const index = classes.indexOf(className);
      
      if (typeof state === 'boolean') {
        // If state is explicitly provided, add or remove the class
        if (state && index === -1) {
          classes.push(className);
        } else if (!state && index > -1) {
          classes.splice(index, 1);
        }
      } else {
        // Toggle the class
        if (index === -1) {
          classes.push(className);
        } else {
          classes.splice(index, 1);
        }
      }
      
      this[0].className = classes.join(' ');
    }
    return this;
  }),
  hasClass: jest.fn().mockImplementation(function(className) {
    if (!this[0]) return false;
    return (this[0].className || '').split(' ').includes(className);
  }),
  attr: jest.fn().mockImplementation(function(name, value) {
    // Getter
    if (value === undefined) {
      if (!this[0]) return undefined;
      // Special cases for common attributes
      if (name === 'title') return this[0].title || '';
      if (name === 'disabled') return this[0].disabled || false;
      if (name === 'value') return this[0].value || '';
      // Fallback to getAttribute
      return this[0].getAttribute ? this[0].getAttribute(name) : undefined;
    }
    // Setter
    if (!this[0]) return this;
    // Special cases for common attributes
    if (name === 'title') this[0].title = value;
    else if (name === 'disabled') this[0].disabled = !!value;
    else if (name === 'value') this[0].value = value;
    else if (this[0].setAttribute) this[0].setAttribute(name, value);
    return this;
  }),
  html: jest.fn().mockImplementation(function(html) {
    // Getter
    if (html === undefined) {
      if (!this[0]) return '';
      return this[0].innerHTML || '';
    }
    // Setter
    if (this[0]) {
      this[0].innerHTML = html;
    }
    return this;
  }),
  val: jest.fn(function(value) {
    if (value === undefined) return this[0] ? this[0].value : '';
    if (this[0]) this[0].value = value;
    return this;
  }),
  on: jest.fn().mockImplementation(function(event, selector, handler) {
    // Handle both $(...).on('click', handler) and $(...).on('click', '.selector', handler)
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }
    
    if (this[0]) {
      const wrappedHandler = (e) => {
        if (!selector || (e.target && e.target.matches(selector))) {
          return handler.call(this[0], e);
        }
      };
      
      // Store the original handler so we can remove it later
      if (!this[0]._eventHandlers) this[0]._eventHandlers = {};
      if (!this[0]._eventHandlers[event]) this[0]._eventHandlers[event] = [];
      this[0]._eventHandlers[event].push({ handler, wrappedHandler });
      
      this[0].addEventListener(event, wrappedHandler);
    }
    return this;
  }),
  trigger: jest.fn().mockImplementation(function(event, data) {
    if (this[0]) {
      let evt;
      if (typeof Event === 'function') {
        evt = new Event(event, { bubbles: true, cancelable: true });
      } else {
        // Fallback for older browsers
        evt = document.createEvent('Event');
        evt.initEvent(event, true, true);
      }
      
      // Add any additional data to the event
      if (data) {
        Object.assign(evt, data);
      }
      
      this[0].dispatchEvent(evt);
    }
    return this;
  }),
  hide: jest.fn().mockReturnThis(),
  show: jest.fn().mockReturnThis(),
  css: jest.fn().mockReturnThis(),
  click: jest.fn().mockReturnThis(),
  submit: jest.fn().mockReturnThis(),
  change: jest.fn().mockReturnThis(),
  data: jest.fn().mockImplementation(function(key, value) {
    // Initialize data store if it doesn't exist
    if (!this[0]._jqueryData) {
      this[0]._jqueryData = {};
    }
    
    // Setter
    if (value !== undefined) {
      this[0]._jqueryData[key] = value;
      return this;
    }
    
    // Getter for all data
    if (key === undefined) {
      return { ...this[0]._jqueryData };
    }
    
    // Getter for specific key
    return this[0]._jqueryData[key];
  }),
  removeData: jest.fn().mockImplementation(function(key) {
    if (this[0]._jqueryData) {
      if (key === undefined) {
        delete this[0]._jqueryData;
      } else {
        delete this[0]._jqueryData[key];
      }
    }
    return this;
  }),
  is: jest.fn().mockImplementation(function(selector) {
    if (!this[0]) return false;
    
    try {
      // Handle function filter
      if (typeof selector === 'function') {
        return selector.call(this[0], 0, this[0]);
      }
      
      // Handle string selector
      if (typeof selector === 'string') {
        // Special case for :checked, :disabled, etc.
        if (selector === ':checked') {
          return this[0].checked === true;
        }
        if (selector === ':disabled') {
          return this[0].disabled === true;
        }
        if (selector === ':enabled') {
          return this[0].disabled !== true;
        }
        if (selector === ':visible') {
          return !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
        }
        if (selector === ':hidden') {
          return !(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
        }
        
        // Default to matches
        return this[0].matches(selector);
      }
      
      // Handle element or jQuery object
      const compareTo = selector.jquery ? selector[0] : selector;
      return this[0] === compareTo;
    } catch (e) {
      console.error('Error in is:', e);
      return false;
    }
  }),
  index: jest.fn().mockImplementation(function(selector) {
    if (!this[0]) return -1;
    
    // No argument: return position among element siblings
    if (selector === undefined) {
      let i = 0;
      let sibling = this[0].previousElementSibling;
      while (sibling) {
        i++;
        sibling = sibling.previousElementSibling;
      }
      return i;
    }
    
    // String selector: find position in $(selector) collection
    if (typeof selector === 'string') {
      const $matched = $(selector);
      for (let i = 0; i < $matched.length; i++) {
        if ($matched[i] === this[0]) {
          return i;
        }
      }
      return -1;
    }
    
    // jQuery object or element: find position in the collection
    const $collection = selector.jquery ? selector : $(selector);
    return Array.from($collection).indexOf(this[0]);
  }),
  closest: jest.fn().mockImplementation(function(selector) {
    if (!this[0]) return $();
    
    try {
      let el = this[0];
      while (el && el !== document) {
        if (el.matches && el.matches(selector)) {
          return $(el);
        }
        el = el.parentNode;
      }
    } catch (e) {
      console.error('Error in closest:', e);
    }
    
    return $();
  }),
  find: jest.fn().mockImplementation(function(selector) {
    if (!this[0]) return $();
    
    try {
      const elements = this[0].querySelectorAll(selector);
      if (!elements.length) return $();
      
      // Create a new jQuery-like object with all matching elements
      const $result = $();
      $result.length = elements.length;
      elements.forEach((el, i) => {
        $result[i] = el;
      });
      
      // Copy all jQuery methods to the result
      Object.assign($result, $);
      
      return $result;
    } catch (e) {
      console.error('Error in find:', e);
      return $();
    }
  }),
  append: jest.fn().mockImplementation(function(child) {
    if (!this[0]) return this;
    
    if (typeof child === 'string') {
      // Create a temporary container to parse the HTML
      const temp = document.createElement('div');
      temp.innerHTML = child;
      
      // Move all children to the target element
      while (temp.firstChild) {
        this[0].appendChild(temp.firstChild);
      }
    } else if (child.nodeType) {
      // Single DOM node
      this[0].appendChild(child);
    } else if (child.jquery || (child[0] && child[0].nodeType)) {
      // jQuery object or array-like with DOM nodes
      const nodes = child.jquery ? child.toArray() : Array.from(child);
      nodes.forEach(node => {
        if (node.nodeType) {
          this[0].appendChild(node);
        }
      });
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
};

// Set up the prototype chain
jQuery.fn.init.prototype = jQuery.fn;

// Add static methods
jQuery.extend = Object.assign;
jQuery.ajax = jest.fn().mockImplementation(() => Promise.resolve({}));
jQuery.get = jest.fn().mockImplementation(() => Promise.resolve(''));
jQuery.post = jest.fn().mockImplementation(() => Promise.resolve(''));
jQuery.getJSON = jest.fn().mockImplementation(() => Promise.resolve({}));

// Set up the global jQuery and $ variables
global.$ = global.jQuery = jQuery;

// Create a mock jQuery function
function createJQueryMock() {
  const mockJQuery = (selector) => {
    // If selector is a function, call it when the document is ready
    if (typeof selector === 'function') {
      return mockJQuery(document).ready(selector);
    }
    
    // If selector is a DOM element, wrap it in a jQuery object
    if (selector && selector.nodeType) {
      const $el = mockJQuery();
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
      addClass: jest.fn().mockImplementation(function(className) {
        if (this[0]) {
          const classes = (this[0].className || '').split(' ').filter(Boolean);
          if (!classes.includes(className)) {
            classes.push(className);
            this[0].className = classes.join(' ');
          }
        }
        return this;
      }),
      removeClass: jest.fn().mockImplementation(function(className) {
        if (this[0]) {
          const classes = (this[0].className || '').split(' ').filter(Boolean);
          const index = classes.indexOf(className);
          if (index > -1) {
            classes.splice(index, 1);
            this[0].className = classes.join(' ');
          }
        }
        return this;
      }),
      toggleClass: jest.fn().mockImplementation(function(className, state) {
        if (this[0]) {
          const classes = (this[0].className || '').split(' ').filter(Boolean);
          const index = classes.indexOf(className);
          
          if (typeof state === 'boolean') {
            // If state is explicitly provided, add or remove the class
            if (state && index === -1) {
              classes.push(className);
            } else if (!state && index > -1) {
              classes.splice(index, 1);
            }
          } else {
            // Toggle the class
            if (index === -1) {
              classes.push(className);
            } else {
              classes.splice(index, 1);
            }
          }
          
          this[0].className = classes.join(' ');
        }
        return this;
      }),
      hasClass: jest.fn().mockImplementation(function(className) {
        if (!this[0]) return false;
        return (this[0].className || '').split(' ').includes(className);
      }),
      attr: jest.fn().mockImplementation(function(name, value) {
        // Getter
        if (value === undefined) {
          if (!this[0]) return undefined;
          // Special cases for common attributes
          if (name === 'title') return this[0].title || '';
          if (name === 'disabled') return this[0].disabled || false;
          if (name === 'value') return this[0].value || '';
          // Fallback to getAttribute
          return this[0].getAttribute ? this[0].getAttribute(name) : undefined;
        }
        // Setter
        if (!this[0]) return this;
        // Special cases for common attributes
        if (name === 'title') this[0].title = value;
        else if (name === 'disabled') this[0].disabled = !!value;
        else if (name === 'value') this[0].value = value;
        else if (this[0].setAttribute) this[0].setAttribute(name, value);
        return this;
      }),
      html: jest.fn().mockImplementation(function(html) {
        // Getter
        if (html === undefined) {
          if (!this[0]) return '';
          return this[0].innerHTML || '';
        }
        // Setter
        if (this[0]) {
          this[0].innerHTML = html;
        }
        return this;
      }),
      val: jest.fn(function(value) {
        if (value === undefined) return this[0] ? this[0].value : '';
        if (this[0]) this[0].value = value;
        return this;
      }),
      on: jest.fn().mockImplementation(function(event, selector, handler) {
        // Handle both $(...).on('click', handler) and $(...).on('click', '.selector', handler)
        if (typeof selector === 'function') {
          handler = selector;
          selector = null;
        }
        
        if (this[0]) {
          const wrappedHandler = (e) => {
            if (!selector || (e.target && e.target.matches(selector))) {
              return handler.call(this[0], e);
            }
          };
          
          // Store the original handler so we can remove it later
          if (!this[0]._eventHandlers) this[0]._eventHandlers = {};
          if (!this[0]._eventHandlers[event]) this[0]._eventHandlers[event] = [];
          this[0]._eventHandlers[event].push({ handler, wrappedHandler });
          
          this[0].addEventListener(event, wrappedHandler);
        }
        return this;
      }),
      trigger: jest.fn().mockImplementation(function(event, data) {
        if (this[0]) {
          let evt;
          if (typeof Event === 'function') {
            evt = new Event(event, { bubbles: true, cancelable: true });
          } else {
            // Fallback for older browsers
            evt = document.createEvent('Event');
            evt.initEvent(event, true, true);
          }
          
          // Add any additional data to the event
          if (data) {
            Object.assign(evt, data);
          }
          
          this[0].dispatchEvent(evt);
        }
        return this;
      }),
      hide: jest.fn().mockReturnThis(),
      show: jest.fn().mockReturnThis(),
      css: jest.fn().mockReturnThis(),
      click: jest.fn().mockReturnThis(),
      submit: jest.fn().mockReturnThis(),
      change: jest.fn().mockReturnThis(),
      data: jest.fn().mockImplementation(function(key, value) {
        // Initialize data store if it doesn't exist
        if (!this[0]._jqueryData) {
          this[0]._jqueryData = {};
        }
        
        // Setter
        if (value !== undefined) {
          this[0]._jqueryData[key] = value;
          return this;
        }
        
        // Getter for all data
        if (key === undefined) {
          return { ...this[0]._jqueryData };
        }
        
        // Getter for specific key
        return this[0]._jqueryData[key];
      }),
      removeData: jest.fn().mockImplementation(function(key) {
        if (this[0]._jqueryData) {
          if (key === undefined) {
            delete this[0]._jqueryData;
          } else {
            delete this[0]._jqueryData[key];
          }
        }
        return this;
      }),
      is: jest.fn().mockImplementation(function(selector) {
        if (!this[0]) return false;
        
        try {
          // Handle function filter
          if (typeof selector === 'function') {
            return selector.call(this[0], 0, this[0]);
          }
          
          // Handle string selector
          if (typeof selector === 'string') {
            // Special case for :checked, :disabled, etc.
            if (selector === ':checked') {
              return this[0].checked === true;
            }
            if (selector === ':disabled') {
              return this[0].disabled === true;
            }
            if (selector === ':enabled') {
              return this[0].disabled !== true;
            }
            if (selector === ':visible') {
              return !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
            }
            if (selector === ':hidden') {
              return !(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
            }
            
            // Default to matches
            return this[0].matches(selector);
          }
          
          // Handle element or jQuery object
          const compareTo = selector.jquery ? selector[0] : selector;
          return this[0] === compareTo;
        } catch (e) {
          console.error('Error in is:', e);
          return false;
        }
      }),
      index: jest.fn().mockImplementation(function(selector) {
        if (!this[0]) return -1;
        
        // No argument: return position among element siblings
        if (selector === undefined) {
          let i = 0;
          let sibling = this[0].previousElementSibling;
          while (sibling) {
            i++;
            sibling = sibling.previousElementSibling;
          }
          return i;
        }
        
        // String selector: find position in $(selector) collection
        if (typeof selector === 'string') {
          const $matched = $(selector);
          for (let i = 0; i < $matched.length; i++) {
            if ($matched[i] === this[0]) {
              return i;
            }
          }
          return -1;
        }
        
        // jQuery object or element: find position in the collection
        const $collection = selector.jquery ? selector : $(selector);
        return Array.from($collection).indexOf(this[0]);
      }),
      closest: jest.fn().mockImplementation(function(selector) {
        if (!this[0]) return $();
        
        try {
          let el = this[0];
          while (el && el !== document) {
            if (el.matches && el.matches(selector)) {
              return $(el);
            }
            el = el.parentNode;
          }
        } catch (e) {
          console.error('Error in closest:', e);
        }
        
        return $();
      }),
      find: jest.fn().mockImplementation(function(selector) {
        if (!this[0]) return $();
        
        try {
          const elements = this[0].querySelectorAll(selector);
          if (!elements.length) return $();
          
          // Create a new jQuery-like object with all matching elements
          const $result = $();
          $result.length = elements.length;
          elements.forEach((el, i) => {
            $result[i] = el;
          });
          
          // Copy all jQuery methods to the result
          Object.assign($result, $);
          
          return $result;
        } catch (e) {
          console.error('Error in find:', e);
          return $();
        }
      }),
      append: jest.fn().mockImplementation(function(child) {
        if (!this[0]) return this;
        
        if (typeof child === 'string') {
          // Create a temporary container to parse the HTML
          const temp = document.createElement('div');
          temp.innerHTML = child;
          
          // Move all children to the target element
          while (temp.firstChild) {
            this[0].appendChild(temp.firstChild);
          }
        } else if (child.nodeType) {
          // Single DOM node
          this[0].appendChild(child);
        } else if (child.jquery || (child[0] && child[0].nodeType)) {
          // jQuery object or array-like with DOM nodes
          const nodes = child.jquery ? child.toArray() : Array.from(child);
          nodes.forEach(node => {
            if (node.nodeType) {
              this[0].appendChild(node);
            }
          });
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
    };
    
    // Make sure the jQuery object is array-like
    Object.defineProperty(mockObj, 'length', {
      value: 0,
      writable: true
    });
    
    // Set up the prototype chain
    Object.setPrototypeOf(mockObj, jQuery.fn);
    
    // If selector is a string, try to find matching elements
    if (typeof selector === 'string') {
      if (selector.startsWith('#')) {
        const id = selector.substring(1);
        const element = document.getElementById(id) || createMockElement('div');
        element.id = id;
        mockObj[0] = element;
        mockObj.length = 1;
      } else if (selector.startsWith('.')) {
        // For class selectors, just return a single element for simplicity
        const element = createMockElement('div');
        element.className = selector.substring(1);
        mockObj[0] = element;
        mockObj.length = 1;
      } else if (selector === 'body') {
        mockObj[0] = document.body;
        mockObj.length = 1;
      } else if (selector === 'document' || selector === 'window') {
        // Return a mock for document/window
        mockObj[0] = window;
        mockObj.length = 1;
      } else {
        // For other selectors, just return an empty jQuery object
        mockObj.length = 0;
      }
    }
    
    return mockObj;
  };

  // Add static methods
  mockJQuery.ajax = jest.fn();
  mockJQuery.get = jest.fn();
  mockJQuery.post = jest.fn();
  mockJQuery.fn = mockJQuery.prototype;

  return mockJQuery;
}

// Create a mock for the window object
const mockWindow = {
  ...global.window,
  alert: jest.fn(),
  confirm: jest.fn(),
  prompt: jest.fn(),
};

// Helper function to create a mock element
function createMockElement(tagName = 'div') {
  const element = {
    // Standard DOM properties
    tagName: tagName.toUpperCase(),
    nodeName: tagName.toUpperCase(),
    nodeType: 1, // ELEMENT_NODE
    id: '',
    className: '',
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn(),
      contains: jest.fn().mockReturnValue(false),
      [Symbol.iterator]: function*() {}
    },
    style: {},
    attributes: {},
    dataset: {},
    innerHTML: '',
    innerText: '',
    textContent: '',
    value: '',
    checked: false,
    disabled: false,
    children: [],
    childNodes: [],
    parentNode: null,
    nextSibling: null,
    previousSibling: null,
    firstChild: null,
    lastChild: null,
    // DOM manipulation methods
    appendChild: jest.fn(function(child) {
      if (child) {
        this.children.push(child);
        this.childNodes.push(child);
        child.parentNode = this;
        if (!this.firstChild) this.firstChild = child;
        this.lastChild = child;
      }
      return child;
    }),
    removeChild: jest.fn(function(child) {
      const index = this.children.indexOf(child);
      if (index > -1) {
        this.children.splice(index, 1);
        const nodeIndex = this.childNodes.indexOf(child);
        if (nodeIndex > -1) {
          this.childNodes.splice(nodeIndex, 1);
        }
        child.parentNode = null;
        
        // Update firstChild/lastChild if needed
        if (this.firstChild === child) {
          this.firstChild = this.childNodes[0] || null;
        }
        if (this.lastChild === child) {
          this.lastChild = this.childNodes[this.childNodes.length - 1] || null;
        }
      }
      return child;
    }),
    insertBefore: jest.fn(function(newNode, referenceNode) {
      if (!referenceNode) {
        return this.appendChild(newNode);
      }
      
      const index = this.children.indexOf(referenceNode);
      if (index > -1) {
        this.children.splice(index, 0, newNode);
        const nodeIndex = this.childNodes.indexOf(referenceNode);
        if (nodeIndex > -1) {
          this.childNodes.splice(nodeIndex, 0, newNode);
        } else {
          this.childNodes.push(newNode);
        }
        newNode.parentNode = this;
        
        // Update firstChild if needed
        if (this.firstChild === referenceNode) {
          this.firstChild = newNode;
        }
      } else {
        this.children.push(newNode);
        this.childNodes.push(newNode);
        newNode.parentNode = this;
      }
      return newNode;
    }),
    replaceChild: jest.fn(function(newChild, oldChild) {
      const index = this.children.indexOf(oldChild);
      if (index > -1) {
        this.children[index] = newChild;
        const nodeIndex = this.childNodes.indexOf(oldChild);
        if (nodeIndex > -1) {
          this.childNodes[nodeIndex] = newChild;
        }
        newChild.parentNode = this;
        oldChild.parentNode = null;
      }
      return oldChild;
    }),
    
    // Query methods
    querySelector: jest.fn((selector) => {
      // Simple mock - just return a new element for now
      return createMockElement('div');
    }),
    querySelectorAll: jest.fn((selector) => {
      // Return an array-like object with the items property
      const items = [];
      items.item = (i) => items[i];
      items[Symbol.iterator] = function*() {
        for (let i = 0; i < items.length; i++) {
          yield items[i];
        }
      };
      return items;
    }),
    getElementsByTagName: jest.fn(() => []),
    getElementsByClassName: jest.fn(() => []),
    getElementById: jest.fn(() => null),
    
    // Attribute methods
    getAttribute: jest.fn(function(attr) {
      return this.attributes[attr];
    }),
    setAttribute: jest.fn(function(attr, value) {
      this.attributes[attr] = String(value);
      // Special handling for certain attributes
      if (attr === 'class') {
        this.className = String(value);
      } else if (attr === 'id') {
        this.id = String(value);
      } else if (attr.startsWith('data-')) {
        const dataName = attr.replace('data-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        this.dataset[dataName] = String(value);
      }
    }),
    removeAttribute: jest.fn(function(attr) {
      delete this.attributes[attr];
    }),
    hasAttribute: jest.fn(function(attr) {
      return Object.prototype.hasOwnProperty.call(this.attributes, attr);
    }),
    getAttributeNode: jest.fn(function(attr) {
      return this.attributes[attr] ? { name: attr, value: this.attributes[attr] } : null;
    }),
    // Event methods
    addEventListener: jest.fn(function(type, listener, options) {
      this._eventListeners = this._eventListeners || {};
      this._eventListeners[type] = this._eventListeners[type] || [];
      this._eventListeners[type].push({ listener, options });
    }),
    removeEventListener: jest.fn(function(type, listener) {
      if (!this._eventListeners || !this._eventListeners[type]) return;
      
      if (listener) {
        this._eventListeners[type] = this._eventListeners[type].filter(
          item => item.listener !== listener
        );
      } else {
        delete this._eventListeners[type];
      }
    }),
    dispatchEvent: jest.fn(function(event) {
      if (!this._eventListeners || !this._eventListeners[event.type]) return true;
      
      const listeners = this._eventListeners[event.type].slice();
      for (const { listener } of listeners) {
        if (typeof listener === 'function') {
          listener.call(this, event);
        } else if (typeof listener.handleEvent === 'function') {
          listener.handleEvent(event);
        }
        
        if (event.cancelBubble) break;
      }
      
      return !event.defaultPrevented;
    }),
    
    // UI methods
    focus: jest.fn(function() {
      this.focused = true;
      const event = { type: 'focus', target: this, currentTarget: this };
      this.dispatchEvent(event);
    }),
    blur: jest.fn(function() {
      this.focused = false;
      const event = { type: 'blur', target: this, currentTarget: this };
      this.dispatchEvent(event);
    }),
    click: jest.fn(function() {
      const event = { 
        type: 'click', 
        target: this, 
        currentTarget: this,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      };
      this.dispatchEvent(event);
    }),
    
    // Selector methods
    matches: jest.fn(function(selector) {
      // Very simple implementation - just check tag name, id and class
      const parts = selector.split(/([#.])/);
      let matches = true;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === '#') {
          const id = parts[++i];
          matches = matches && this.id === id;
        } else if (part === '.') {
          const className = parts[++i];
          matches = matches && this.classList.contains(className);
        } else if (part && part !== '') {
          // Assume it's a tag name
          matches = matches && this.tagName.toLowerCase() === part.toLowerCase();
        }
      }
      
      return matches;
    }),
    closest: jest.fn(function(selector) {
      let node = this;
      while (node) {
        if (typeof node.matches === 'function' && node.matches(selector)) {
          return node;
        }
        node = node.parentNode;
      }
      return null;
    }),
    
    // jQuery compatibility methods
    empty: jest.fn(function() {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.innerHTML = '';
      return this;
    }),
    
    // Form element compatibility
    submit: jest.fn(function() {
      const event = { 
        type: 'submit', 
        target: this, 
        currentTarget: this,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      };
      this.dispatchEvent(event);
    }),
    reset: jest.fn(function() {
      const event = { 
        type: 'reset', 
        target: this, 
        currentTarget: this,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      };
      this.dispatchEvent(event);
    }),
    
    // Style compatibility
    getBoundingClientRect: jest.fn(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    })),
    
    // For debugging
    toString: function() {
      return `[object ${this.tagName || 'HTMLElement'}]`;
    }
  };

  // Make appendChild and other methods chainable
  element.appendChild.mockReturnValue(element);
  element.removeChild.mockReturnValue(element);
  element.insertBefore.mockReturnValue(element);
  
  return element;
}

// Create a mock for the document
const mockDocument = {
  createElement: jest.fn((tagName) => {
    const element = createMockElement(tagName);
    // Make sure the element has the jQuery methods
    const $element = $();
    $element[0] = element;
    $element.length = 1;
    return element;
  }),
  createElementNS: jest.fn((ns, tagName) => createMockElement(tagName)),
  createTextNode: jest.fn((text) => ({
    nodeType: 3,
    nodeName: '#text',
    nodeValue: text,
    textContent: text
  })),
  getElementById: jest.fn((id) => {
    const element = createMockElement('div');
    element.id = id;
    // Make sure the element has the jQuery methods
    const $element = $();
    $element[0] = element;
    $element.length = 1;
    return element;
  }),
  querySelector: jest.fn((selector) => {
    const element = createMockElement('div');
    // Make sure the element has the jQuery methods
    const $element = $();
    $element[0] = element;
    $element.length = 1;
    return element;
  }),
  querySelectorAll: jest.fn(() => ({
    length: 0,
    item: () => null,
    [Symbol.iterator]: function*() {}
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  body: createMockElement('body'),
  documentElement: createMockElement('html'),
  head: createMockElement('head'),
  // Add methods that might be used by the code
  createDocumentFragment: jest.fn(() => ({
    nodeType: 11,
    nodeName: '#document-fragment',
    childNodes: [],
    appendChild: jest.fn(function(node) {
      this.childNodes.push(node);
      node.parentNode = this;
      return node;
    })
  }))
};

// Set up the global objects
global.window = {
  ...mockWindow,
  document: mockDocument,
  HTMLElement: class {},
  Node: {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    DOCUMENT_FRAGMENT_NODE: 11
  },
  requestAnimationFrame: (callback) => setTimeout(callback, 0),
  cancelAnimationFrame: (id) => clearTimeout(id)
};

global.document = mockDocument;

// Initialize the mock jQuery
global.$ = global.jQuery = createJQueryMock();

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((i) => Object.keys(store)[i] || null),
    get length() {
      return Object.keys(store).length;
    },
  };
})();

global.localStorage = localStorageMock;

// Mock console methods to keep test output clean
console.error = jest.fn();
console.warn = jest.fn();
console.log = jest.fn();

// Mock the DOM elements that your tests will interact with
const mockElements = {
  'combatLog': { innerHTML: '' },
  'initiativeList': { innerHTML: '' },
  'currentTurn': { innerHTML: '' },
  'combatRound': { innerHTML: '' },
};

document.getElementById = jest.fn((id) => {
  if (!mockElements[id]) {
    mockElements[id] = { innerHTML: '' };
  }
  return mockElements[id];
});

document.querySelector = jest.fn((selector) => {
  // Simple selector matching for common cases
  if (selector.startsWith('#')) {
    const id = selector.substring(1);
    return document.getElementById(id);
  }
  // Return a mock element for other selectors
  return { innerHTML: '' };
});

// Add any additional global mocks or polyfills here
if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
}
