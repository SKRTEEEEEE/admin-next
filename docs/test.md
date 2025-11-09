# Test Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Test Structure](#test-structure)
- [Available Commands](#available-commands)
- [Running Tests](#running-tests)
- [Coverage Requirements](#coverage-requirements)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Overview

This project uses **Playwright** for testing with **NYC** for code coverage. Tests are organized by type and some require the development server to be running.

## Test Structure

```
tests/
├── unit/                    # Unit tests (✅ no server required)
│   ├── core-utils.spec.ts   # Tests for core/utils.ts
│   ├── lib-utils.spec.ts    # Tests for lib/utils.ts
│   ├── usecases/            # Use case tests
│   └── components/          # Component unit tests
│       └── button.spec.ts
├── api/                     # API tests (✅ no server required)
│   ├── tech.spec.ts
│   └── project.spec.ts
├── component/               # Component tests (⚠️ requires server)
│   ├── mode-toggle.spec.ts
│   ├── navbar.spec.ts
│   ├── slider-techs.spec.ts
│   ├── pages-performance.spec.ts
│   ├── performance-report.spec.ts
│   └── admin-components.spec.ts
├── pages/                   # Page tests (⚠️ requires server)
│   ├── portafolio.spec.ts
│   └── info.spec.ts
├── integration/             # Integration tests (⚠️ requires server)
│   ├── usecases.spec.ts
│   └── pages/
│       └── proyectos-id.spec.ts
├── e2e/                     # End-to-end tests (⚠️ requires server)
│   └── performance/
│       └── index.spec.ts
└── utils/                   # Test utilities
    └── url.ts
```
## Husky
- Husky should run test:unit when commit

## Available Commands

### Basic Test Commands

| Command | Description | Server Required |
|---------|-------------|-----------------|
| `npm test` | Run all tests without coverage | Some tests require server |
| `npm run test:unit` | Run only unit and API tests | ❌ No |
| `npm run test:server` | Run component, pages, integration, and e2e tests | ✅ Yes |
| `npm run test:all` | Run all tests | Some tests require server |

### Coverage Commands

| Command | Description | Server Required | Coverage Check |
|---------|-------------|-----------------|----------------|
| `npm run test:coverage` | Run all tests with coverage report | Some tests require server | ❌ No |
| `npm run test:coverage:unit` | Run unit tests with coverage check (min 80%) | ❌ No | ✅ Yes |

### Other Commands

| Command | Description |
|---------|-------------|
| `npm run test:prod` | Run tests against production build |
| `./run-all-tests.sh` | Execute complete test suite (includes server startup) |

## Running Tests

### Quick Start

#### 1. Run Unit Tests (No Server Required)

```bash
npm run test:unit
```

This runs:
- ✅ Unit tests (`tests/unit/**`)
- ✅ API tests (`tests/api/**`)

**Use this for:**
- Pre-commit hooks
- Quick feedback during development
- CI/CD pipelines (fast)

#### 2. Run Tests That Need Server

```bash
# Terminal 1: Start the server
npm run dev

# Terminal 2: Run server-dependent tests
npm run test:server
```

This runs:
- ⚠️ Component tests (`tests/component/**`)
- ⚠️ Page tests (`tests/pages/**`)
- ⚠️ Integration tests (`tests/integration/**`)
- ⚠️ E2E tests (`tests/e2e/**`)

#### 3. Run Complete Test Suite

Use the automated script that handles everything:

```bash
bash run-all-tests.sh
```

This script will:
1. ✅ Run linting
2. ✅ Run unit tests
3. ✅ Check coverage (minimum 80%)
4. ✅ Build the application
5. ✅ Start the server automatically
6. ✅ Run all server-dependent tests
7. ✅ Stop the server
8. ✅ Generate coverage report

**On Windows:**
```bash
# Using Git Bash
bash run-all-tests.sh

# Or using WSL
wsl bash run-all-tests.sh
```

### Coverage Testing

#### Check Coverage (Unit Tests Only)

```bash
npm run test:coverage:unit
```

This command:
- Runs unit and API tests
- Generates coverage report
- **Fails if coverage < 80%**
- Reports available at `./docs/coverage/index.html`

#### Generate Coverage Report (All Tests)

```bash
# Start server first
npm run dev

# In another terminal
npm run test:coverage
```

This generates a complete coverage report but **does not enforce** the 80% threshold.

## Coverage Requirements

### Minimum Coverage: 80%

The project enforces **minimum 80% coverage** for:
- Lines
- Statements
- Functions
- Branches

### Configuration

Coverage settings are in `.nycrc`:

```json
{
  "check-coverage": true,
  "lines": 80,
  "statements": 80,
  "functions": 80,
  "branches": 80
}
```

### Excluded from Coverage

- Test files (`*.spec.ts`, `*.test.ts`)
- Configuration files
- `node_modules/`
- `.next/` build output
- `tests/` directory

### Coverage Reports

Reports are generated in `./docs/coverage/`:
- `index.html` - Interactive HTML report
- `lcov.info` - LCOV format
- `coverage-summary.json` - JSON summary

## CI/CD Integration

### Pre-commit Hook

Husky runs these checks before each commit:

```bash
# .husky/pre-commit
1. npm run lint           # ESLint check
2. npm run test:unit      # Unit tests (no server)
3. npm run test:coverage:unit  # Coverage check (≥80%)
```

**Important:** Only unit tests run in pre-commit to keep it fast and server-independent.

### GitHub Actions

The Playwright workflow (`.github/workflows/playwright.yml`) runs:

1. Install dependencies
2. Install Playwright browsers
3. Build production version
4. Start production server
5. Run all tests
6. Upload test reports

**Triggered on:** Pull requests to `main` or `master`

### Running Locally Like CI

```bash
npm run test:prod
```

This runs tests against a production build with the same configuration as CI.

## Troubleshooting

### ❌ "ECONNREFUSED" or Connection Timeout

**Problem:** Server is not running

**Solution:**
```bash
# Start the dev server
npm run dev

# Or use the automated script
bash run-all-tests.sh
```

### ❌ Coverage Below 80%

**Problem:** Not enough code is tested

**Solution:**
1. Check which files need more tests:
   ```bash
   npm run test:coverage:unit
   ```
2. Open `./docs/coverage/index.html` to see detailed report
3. Add tests for uncovered lines/functions

### ❌ Tests Timing Out

**Problem:** Tests are slow or hanging

**Solutions:**
1. Increase timeout in `playwright.config.ts`:
   ```typescript
   timeout: 60000, // Increase from 30000
   ```
2. Close other applications
3. Check server is responding: `curl http://localhost:3000`

### ❌ "run-all-tests.sh: command not found"

**Problem:** Script doesn't have execute permissions

**Solution:**
```bash
# On Linux/Mac
chmod +x run-all-tests.sh

# On Windows (Git Bash)
bash run-all-tests.sh
```

### ❌ Pre-commit Hook Failing

**Problem:** Unit tests or coverage failing before commit

**Solutions:**
1. Run tests manually to see errors:
   ```bash
   npm run test:unit
   npm run test:coverage:unit
   ```
2. Fix failing tests
3. Ensure coverage ≥ 80%

### ⚠️ Different Results Locally vs CI

**Possible causes:**
- Different Node.js versions
- Different environment variables
- Cache issues
- Production vs development build

**Solution:**
```bash
# Test with production build locally
npm run build
npm run start &
npm run test:prod
```

## Best Practices

1. **Always run unit tests before committing** (automated by husky)
2. **Maintain ≥80% coverage** on all new code
3. **Use the complete test script** before creating a PR:
   ```bash
   bash run-all-tests.sh
   ```
4. **Run server-dependent tests** before pushing changes that affect UI/components
5. **Check coverage reports** to identify untested code:
   ```bash
   npm run test:coverage:unit
   open ./docs/coverage/index.html
   ```

## Summary

| Scenario | Command |
|----------|---------|
| Quick check during development | `npm run test:unit` |
| Pre-commit validation | Automatic via husky |
| Complete local test suite | `bash run-all-tests.sh` |
| Check coverage | `npm run test:coverage:unit` |
| Test specific component (with server) | `npm run dev` then `npm run test:server` |
| Test like CI/CD | `npm run test:prod` |

---

**Need help?** Check the [test README](../tests/README.md) for more details on individual test files.
