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

```
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
