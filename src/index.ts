import PyRange, { PyRange as PyRangeClass } from "./py-range";

// Export the class for both ES Module import styles:
// 1. Named import: import { PyRange } from 'range-pie'
// 2. Default import: import PyRange from 'range-pie'
export { PyRangeClass as PyRange };
export default PyRange;

// For CommonJS compatibility with both import styles
// This ensures `const PyRange = require('range-pie')` works
// as well as `const { PyRange } = require('range-pie')`
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  Object.defineProperty(module.exports, "__esModule", { value: true });
  // Assign PyRange to both default export and named export
  module.exports = Object.assign(PyRange, module.exports);
  // Also ensure PyRange is available as a property
  module.exports.PyRange = PyRange;
}
