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

## Testing/Example Standard

To ensure comprehensive coverage of PyRange functionality, all method demonstrations should follow this standardized sequence of test cases:

### 1. Positive Range Types (1-4)

1. **Positive range** - `const positiveRange = new PyRange(1, 5);`
2. **Positive reverse range** - `const positiveReverseRange = new PyRange(5, 0, -1);`
3. **Positive range with steps** - `const positiveStepRange = new PyRange(0, 10, 2);`
4. **Positive reverse range with steps** - `const positiveReverseStepRange = new PyRange(10, 0, -3);`

### 2. Negative Range Types (5-8)

5. **Negative range** - `const negativeRange = new PyRange(-5, -1);`
6. **Negative reverse range** - `const negativeReverseRange = new PyRange(-1, -6, -1);`
7. **Negative range with steps** - `const negativeStepRange = new PyRange(-10, -2, 3);`
8. **Negative reverse range with steps** - `const negativeReverseStepRange = new PyRange(-2, -12, -4);`

### 3. Cross-Zero Range Types (9-12)

9. **Negative to positive range** - `const negToPositiveRange = new PyRange(-3, 4);`
10. **Positive to negative range** - `const posToNegativeRange = new PyRange(3, -4, -1);`
11. **Negative to positive range with step** - `const negToPositiveStepRange = new PyRange(-6, 6, 3);`
12. **Positive to negative range with step** - `const posToNegativeStepRange = new PyRange(5, -8, -4);`

### 4. Special Cases (13)

13. **Empty range** - `const emptyRange = new PyRange(5, 2, 1);`

This standard ensures that all possible range scenarios are covered systematically, from simple to complex cases.
