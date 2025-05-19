# range-pie

A TypeScript/JavaScript library that brings Python's range functionality to JavaScript, enhanced with familiar array methods. This lightweight utility provides a seamless way to work with numeric sequences while maintaining JavaScript's functional programming paradigm. Fully typed for TypeScript users while remaining compatible with JavaScript projects.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)

  - [JavaScript](#javascript)
  - [TypeScript](#typescript)

- [API Reference](#api-reference)

  - [Constructor Options](#constructor-options)
  - [Properties](#properties)
  - [at()](#at)
  - [toString()](#tostring)
  - [toArray()](#toarray)
  - [map()](#map)
  - [filter()](#filter)
  - [reduce()](#reduce)
  - [some()](#some)
  - [every()](#every)
  - [find()](#find)
  - [findIndex()](#findindex)
  - [findLastIndex()](#findlastindex)
  - [forEach()](#foreach)
  - [includes()](#includes)
  - [indexOf()](#indexof)
  - [lastIndexOf()](#lastindexof)
  - [reverse()](#reverse)

- [Advanced Usage](#advanced-usage)

  - [Iteration](#iteration)
  - [Proxy Access](#proxy-access)

- [Examples](#examples)

  - [Methods chaining](#methods-chaining)
  - [Using as Array-like Object](#using-as-array-like-object)
  - [Example Files](#example-files)
    - [Running the Examples](#running-the-examples)
    - [Available Examples](#available-examples)

## Installation

```bash
npm install range-pie
```

## Basic Usage

### JavaScript

```javascript
// CommonJS - Both import styles are supported
const { PyRange } = require('range-pie');  // Named import style
// OR
const PyRange = require('range-pie');     // Default import style

// Create a range from 0 to 5
const range = new PyRange(5);
console.log([...range]); // [0, 1, 2, 3, 4]

// Create a range with start and stop
const range2 = new PyRange(2, 8);
console.log([...range2]); // [2, 3, 4, 5, 6, 7]

// Create a range with step
const range3 = new PyRange(0, 10, 2);
console.log([...range3]); // [0, 2, 4, 6, 8]
```

### TypeScript

```typescript
// ES Modules - Both import styles are supported
import { PyRange } from 'range-pie';  // Named import style
// OR
import PyRange from 'range-pie';      // Default import style

// Create a range from 0 to 5
const range = new PyRange(5);
console.log([...range]); // [0, 1, 2, 3, 4]

// Type-safe operations
const doubledValues: number[] = range.map(x => x * 2);
console.log(doubledValues); // [0, 2, 4, 6, 8]

// Type inference works with generics
const stringValues: string[] = range.map(x => `Value: ${x}`);
console.log(stringValues); // ['Value: 0', 'Value: 1', 'Value: 2', 'Value: 3', 'Value: 4']
```

## API Reference

### Constructor Options

```javascript
new PyRange(stop)               // 0 to stop-1
new PyRange(start, stop)        // start to stop-1
new PyRange(start, stop, step)  // start to stop-1 with step
```

- **PyRange(stop:number)**

```javascript
console.log(PyRange(10));
// PyRange { _start: 0, _stop: 10, _step: 1, _length: 10 }

console.log(PyRange(-5));
// PyRange { _start: 0, _stop: -5, _step: -1, _length: 5 }
```

- **PyRange(start:number, stop:number)**

```javascript
console.log(PyRange(1, 10));
// PyRange { _start: 1, _stop: 10, _step: 1, _length: 9 }

console.log(PyRange(-10, 0));
// PyRange { _start: -10, _stop: 0, _step: 1, _length: 10 }
```

- **PyRange(start:number, stop:number, step:number)**

```javascript
console.log(PyRange(2, 5, 2));
// PyRange { _start: 2, _stop: 5, _step: 2, _length: 2 }

console.log(PyRange(2, -10, -1));
// PyRange { _start: 2, _stop: -10, _step: -1, _length: 12 }
```

### Properties

```javascript
const range = new PyRange(1, 10, 2);
console.log(range.start);  // 1
console.log(range.stop);   // 10
console.log(range.step);   // 2
console.log(range.length); // 5
```

### at()

The 'at' method accepts a number as argument to gets the value at the specified index in a range. Generate a RangeError if the index is out of range.

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.at(0));  // 1
console.log(range.at(2));  // 3
console.log(range.at(-1)); // RangeError
```

### toString()

Transform a PyRange object to a string representation.

```javascript
const range = new PyRange(1, 10, 2);
console.log(range.toString()); // "PyRange(1, 10, 2)"
```

### toArray()

Transform a PyRange object to an JavaScript array

```javascript
const range = new PyRange(1, 4);
console.log(range.toArray()); // [1, 2, 3]
```

### map()

It works the same as [**`Array.prototype.map`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```javascript
const range = new PyRange(1, 4);  // [1, 2, 3]
console.log(range.map(x => x * 2));  // [2, 4, 6]
```

### filter()

It works the same as [**`Array.prototype.filter`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```javascript
const range = new PyRange(1, 6);  // [1, 2, 3, 4, 5]
console.log(range.filter(x => x % 2 === 0));  // [2, 4]
```

### reduce()

It works the same as [**`Array.prototype.reduce`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```javascript
const range = new PyRange(1, 4);  // [1, 2, 3]
const sum = range.reduce((acc, curr) => acc + curr, 0);
console.log(sum);  // 6
```

### some()

It works the same as [**`Array.prototype.some`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.some(x => x > 3));  // true
console.log(range.some(x => x < 0));  // false
```

### every()

It works the same as [**`Array.prototype.every`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.every(x => x > 0));  // true
console.log(range.every(x => x > 2));  // false
```

### find()

It works the same as [**`Array.prototype.find`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.find(x => x > 2));  // 3
console.log(range.find(x => x > 5));  // undefined
```

### findIndex()

It works the same as [**`Array.prototype.findIndex`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.findIndex(x => x > 2));  // 2
console.log(range.findIndex(x => x > 5));  // -1
```

### findLastIndex()

It works the same as [**`Array.prototype.findLastIndex`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.findLastIndex(x => x > 2));  // 3
console.log(range.findLastIndex(x => x > 5));  // -1
```

### forEach()

It works the same as [**`Array.prototype.forEach`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

```javascript
const range = new PyRange(1, 4);  // [1, 2, 3]
range.forEach(x => console.log(x));  
// 1
// 2
// 3
```

### includes()

It works the same as [**`Array.prototype.includes`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.includes(3));  // true
console.log(range.includes(5));  // false
```

### indexOf()

It works the same as [**`Array.prototype.indexOf`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log(range.indexOf(3));    // 2
console.log(range.indexOf(5));    // -1
```

### lastIndexOf()

It works the same as [**`Array.prototype.lastIndexOf`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

```javascript
const range = new PyRange(1, 5, 1);  // [1, 2, 3, 4]
console.log(range.lastIndexOf(3));    // 2
console.log(range.lastIndexOf(5));    // -1
```

### reverse()

It works the same as [**`Array.prototype.reverse`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

```javascript
const range = new PyRange(1, 5);  // [1, 2, 3, 4]
console.log([...range]);          // [1, 2, 3, 4]

const reversed = range.reverse(); // [4, 3, 2, 1]
console.log([...reversed]);      // [4, 3, 2, 1]

const rangeWithStep = new PyRange(1, 10, 2);  // [1, 3, 5, 7, 9]
const reversedStep = rangeWithStep.reverse(); // [9, 7, 5, 3, 1]
console.log([...reversedStep]);
```

## Advanced Usage

### Iteration

```javascript
const range = new PyRange(3);

// For...of loop
for (const num of range) {
    console.log(num); // 0, 1, 2
}

// Spread operator
const array = [...range]; // [0, 1, 2]
```

### Proxy Access

Proxy access allows access to the array elements using bracket notation, just like a regular array.

```javascript
const range = new PyRange(5);
const proxy = range.asProxy();

console.log(proxy[0]); // 0
console.log(proxy[3]); // 3
```

### TypeScript Support

This package is written in TypeScript and provides full type definitions for all methods and properties. TypeScript users get the following benefits:

- Type checking for all method parameters and return values
- Autocompletion in IDEs
- Generic type support for methods like `map()` and `reduce()`
- Better documentation through type annotations

```typescript
// Type inference with generics
const range = new PyRange(5);

// TypeScript knows this is a number[]
const numbers = range.map(x => x * 2);

// TypeScript knows this is a string[]
const strings = range.map(x => `Number: ${x}`);

// TypeScript knows this is a boolean[]
const booleans = range.map(x => x % 2 === 0);
```

## Examples

### Methods chaining

```javascript
const range = new PyRange(1, 6);
const squares = range
    .filter(x => x % 2 === 0)
    .map(x => x * x);
console.log(squares); // [4, 16]
```

### Using as Array-like Object

```javascript
const range = new PyRange(5).asProxy();
const firstThree = [range[0], range[1], range[2]];
console.log(firstThree); // [0, 1, 2]
```

### Example Files

This package includes several example files to help you get started. You can find them in the `examples` directory after installing the package.

#### Running the Examples

If you've cloned the repository, you can run the examples using npm scripts:

```bash
# Run basic usage examples
npm run example:basic

# Run array methods examples
npm run example:array

# Run advanced usage examples
npm run example:advanced

# Run TypeScript examples (requires ts-node)
npm run example:ts
```

Or you can run them directly with Node.js:

```bash
node node_modules/range-pie/examples/basic-usage.js
node node_modules/range-pie/examples/array-methods.js
node node_modules/range-pie/examples/advanced-usage.js

# For TypeScript examples
ts-node node_modules/range-pie/examples/typescript-usage.ts
```

#### Available Examples

- **basic-usage.js**: Shows fundamental PyRange operations
- **array-methods.js**: Demonstrates all array-like methods
- **advanced-usage.js**: Covers advanced features like method chaining and proxy usage
- **typescript-usage.ts**: Shows TypeScript-specific features and type safety
