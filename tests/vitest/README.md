# Vitest Tests

## Overview

This directory contains **fast unit tests** using Vitest. These tests run in Node.js with jsdom, without needing a browser or server.

## When to use Vitest vs Playwright

### ✅ Use Vitest for:
- **Pure functions** (utils, helpers)
- **React components** (with Testing Library)
- **Business logic** (use cases, services)
- **Fast unit tests** (no network, no browser)

### ✅ Use Playwright for:
- **Integration tests** (needs server running)
- **E2E tests** (full user flows)
- **Performance tests** (real browser metrics)
- **Visual regression** (screenshots)

## Running Tests

```bash
# Run tests in watch mode (interactive)
npm run test:vitest

# Run tests once (CI mode)
npm run test:vitest:run

# Run tests with UI (visual test runner)
npm run test:vitest:ui

# Run tests with coverage
npm run test:vitest:coverage
```

## Test Structure

```
tests/vitest/
├── setup.ts              # Global test setup
├── utils.test.ts         # Tests for lib/utils
├── core-utils.test.ts    # Tests for core/utils
└── button.test.tsx       # Component tests
```

## Writing Tests

### Pure Function Tests

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/lib/my-module';

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction(5)).toBe(10);
  });
});
```

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle clicks', async () => {
    const onClick = vi.fn();
    render(<MyComponent onClick={onClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Benefits of Vitest

- ⚡ **Super fast** (~2s vs ~60s for Playwright)
- 💻 **No browser needed** (runs in Node.js)
- 🔥 **Hot reload** (instant feedback)
- 📊 **Coverage built-in** (v8)
- 🎯 **Better isolation** (pure unit tests)

## Configuration

See `vitest.config.ts` in the root directory for:
- Path aliases (`@/` → `src/`)
- jsdom environment
- Coverage settings
- Test patterns

## Tips

1. **Keep tests fast** - No server, no network calls
2. **Mock external dependencies** - Use `vi.mock()`
3. **Test behavior, not implementation** - Focus on what the user sees
4. **Use Testing Library queries** - `getByRole`, `getByText`, etc.
5. **Run in watch mode** - Get instant feedback while coding

## Examples

All tests in this directory serve as examples of best practices:
- `utils.test.ts` - Pure function testing
- `core-utils.test.ts` - Mathematical operations
- `button.test.tsx` - Component testing with user events
