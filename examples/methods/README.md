# PyRange Method Demonstrations

This folder contains detailed demonstrations and usage examples for various PyRange methods.

## File Structure

- `slice-demo.ts` - Detailed demonstration of the `slice()` method, showing how to create subsets of ranges

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
