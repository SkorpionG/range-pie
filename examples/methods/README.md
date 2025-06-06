# PyRange Method Demonstrations

This folder contains detailed demonstrations and usage examples for various PyRange methods.

## File Structure

- `slice-demo.ts` - Detailed demonstration of the `slice()` method, showing how to create subsets of ranges
- `entries-demo.ts` - Demonstrates the `entries()` method
- `keys-demo.ts` - Demonstrates the `keys()` method
- `values-demo.ts` - Demonstrates the `values()` method

## Running Demonstrations

To run any demonstration file, first ensure the project is built:

```bash
npm run build
```

Then run the method demonstrations:

```bash
# Run all method demonstrations
npm run example:methods

# Or run a specific demonstration file individually
npx ts-node examples/methods/slice-demo.ts

# Or build first and then run
npm run build
node dist/examples/methods/slice-demo.js
```

## Method Documentation

### slice()

- **Purpose**: Create a subset of the range without modifying the original range
- **Behavior**: Similar to JavaScript's `Array.prototype.slice()`
- **Return Value**: New PyRange instance
- **Demo File**: `slice-demo.ts`

### entries()

- **Purpose**: Iterate over `[index, value]` pairs
- **Behavior**: Similar to JavaScript's `Array.prototype.entries()`
- **Return Value**: Iterable iterator of pairs
- **Demo File**: `entries-demo.ts`

### keys()

- **Purpose**: Iterate over the indices of the range
- **Behavior**: Mirrors `Array.prototype.keys()`
- **Return Value**: Iterable iterator of indices
- **Demo File**: `keys-demo.ts`

### values()

- **Purpose**: Iterate over the values of the range
- **Behavior**: Equivalent to `Array.prototype.values()`
- **Return Value**: Iterator of values
- **Demo File**: `values-demo.ts`
