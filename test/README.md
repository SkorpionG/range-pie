# Test Structure

This directory contains tests for the PyRange class and its methods.

## Directory Structure

- `test/` - Main test directory
  - `methods/` - Individual method tests
    - `slice.test.ts` - Tests for the slice() method
  - `script.test.ts` - Comprehensive integration tests
  - `test.test.ts` - Basic constructor and property tests

## Adding New Method Tests

When adding tests for new methods, create a new test file in the `methods/` directory following this naming convention:

```typescript
test/methods/[methodName].test.ts
```

Each method test file should:

1. Import the necessary testing utilities from `@jest/globals`
2. Import `PyRange` from `range-pie`
3. Use descriptive test names that explain the functionality being tested
4. Include edge cases and error conditions
5. Test that the method doesn't unexpectedly modify the original range (when applicable)
6. Compare behavior with equivalent JavaScript Array methods (when applicable)

## Example Test Structure

```typescript
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange methodName method", () => {
  test("basic functionality", () => {
    // Test basic method behavior
  });

  test("edge cases", () => {
    // Test edge cases and boundary conditions
  });

  test("error handling", () => {
    // Test parameter validation and error conditions
  });
});
```

## Running Tests

- Run all tests: `npm test`
- Run specific test file: `npm test -- test/methods/slice.test.ts`
- Run tests in watch mode: `npm run test:watch`

## Testing/Example Standard

To ensure comprehensive test coverage of PyRange functionality, all method tests should follow this standardized sequence of test cases:

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

### 5. Additional Testing (14+)

Beyond the core 13 standardized range types, additional tests should be included to ensure comprehensive coverage:

#### Edge Cases and Boundary Conditions

- **Single element range** - `new PyRange(5, 6);` // [5]
- **Zero-based single element** - `new PyRange(0, 1);` // [0]
- **Large step sizes** - `new PyRange(0, 100, 50);` // [0, 50]
- **Very negative ranges** - `new PyRange(-100, -95);` // [-100, -99, -98, -97, -96]

#### Method-Specific Additional Tests

- **Immutability verification** - Ensure original range remains unchanged after method calls
- **Iterator protocol compliance** - Test that iterators properly implement next() and done
- **Parameter validation** - Test error handling for invalid arguments
- **Type consistency** - Verify return types match expected interfaces

#### Comparison and Compatibility Tests

- **JavaScript Array equivalence** - Compare behavior with native Array methods
- **Cross-method consistency** - Ensure methods work together as expected
- **Performance characteristics** - Verify reasonable performance for large ranges

#### Examples of Additional Tests

```typescript
test("immutability - original range unchanged", () => {
  const range = new PyRange(1, 4);
  const originalValues = [...range];
  
  // Use method under test
  const result = range.methodName();
  
  // Verify original range is unchanged
  expect([...range]).toEqual(originalValues);
});

test("iterator protocol", () => {
  const range = new PyRange(1, 4);
  const iterator = range.methodName();
  
  expect(iterator.next().value).toBe(/* expected */);
  expect(iterator.next().done).toBe(false);
  // ... continue until done is true
});

test("parameter validation", () => {
  const range = new PyRange(5);
  
  // Test invalid parameter types
  expect(() => range.methodName("invalid" as unknown as number))
    .toThrow(TypeError);
  expect(() => range.methodName(1.5))
    .toThrow(TypeError);
});

test("comparison with Array.prototype.methodName", () => {
  const range = new PyRange(0, 5);
  const array = [0, 1, 2, 3, 4];
  
  expect([...range.methodName()])
    .toEqual([...array.methodName()]);
});
```

### Test Implementation Guidelines

When implementing tests for each range type:

1. **Verify expected output**: Ensure the method produces the correct results
2. **Check immutability**: Confirm the original range is not modified (when applicable)
3. **Compare with Array methods**: Test behavioral consistency with JavaScript Array methods
4. **Validate edge cases**: Test boundary conditions and error scenarios
5. **Use descriptive test names**: Clearly describe what each test validates
6. **Include additional tests**: Add method-specific edge cases and validation tests
7. **Test iterator protocol**: Verify proper iterator implementation (when applicable)
8. **Validate parameters**: Ensure proper error handling for invalid inputs

This standard ensures systematic and comprehensive test coverage for all PyRange methods.
