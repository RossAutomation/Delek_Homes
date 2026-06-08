# Delek Homes — E2E Test Automation

A robust end-to-end (E2E) test automation framework built with **Playwright** and **JavaScript** for testing critical user-facing flows on [dev.delekhomes.com](https://dev.delekhomes.com).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)
- [Page Object Model](#page-object-model)
- [API Utilities](#api-utilities)
- [Test Data](#test-data)
- [Environment Variables](#environment-variables)

---

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

---

## Getting Started

**Clone the repository:**

```bash
git clone <your-repository-url>
cd delek_homes
```

**Install dependencies:**

```bash
npm install
```

**Install Playwright browsers and dependencies:**

```bash
npx playwright install --with-deps
```

---

## Project Structure

```text
├── api/
│   ├── listingApi.js           # API helper for estate listing CRUD operations
│   └── userApi.js              # API helper for user authentication
├── page_objects/
│   ├── HomePage.js             # Locators and actions for the homepage
│   ├── LoginPage.js            # Locators and actions for the login page
│   ├── RegisterPage.js         # Locators and actions for the registration page
│   ├── DashBoardPage.js        # Locators and actions for the user dashboard
│   ├── featuredListingsPage.js # Locators and actions for the featured listings page
│   └── helpers/
│       └── SearchComponent.js  # Reusable search component (keyword, city, bedrooms, price)
├── tests/
│   ├── apiListing/
│   │   └── searchListing.spec.js   # API tests for listing creation and retrieval
│   ├── login/
│   │   ├── login.spec.js           # UI tests for login and logout flows
│   │   └── apiLogin.spec.js        # API-level login tests
│   ├── registration/
│   │   └── registration.spec.js    # UI tests for user registration
│   └── search/
│       ├── search.homePage.spec.js      # Search tests on the homepage
│       └── search.listingsPage.spec.js  # Search tests on the listings page
├── testsData/
│   ├── listing.json            # Fixture data for listing search tests
│   └── userCredentials.json    # Test user credentials (admin, user, realtor roles)
├── playwright-report/          # Generated HTML test reports (git-ignored)
├── playwright.config.js        # Global Playwright configuration
└── package.json                # Project dependencies and CLI scripts
```

---

## Running Tests

**Run all tests (headless mode):**

```bash
npx playwright test
```

**Run tests in UI mode (interactive — highly recommended during development):**

```bash
npx playwright test --ui
```

**Run a specific test file:**

```bash
npx playwright test tests/login/login.spec.js
```

**Run a specific test suite folder:**

```bash
npx playwright test tests/search/
```

**Run tests in a specific browser:**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Debug tests with Playwright Inspector:**

```bash
npx playwright test --debug
```

---

## Configuration

Playwright is configured via [`playwright.config.js`](playwright.config.js).

| Setting                | Value                             |
| ---------------------- | --------------------------------- |
| **Test directory**     | `./tests`                         |
| **Base URL**           | `https://dev.delekhomes.com/`     |
| **Parallel execution** | Disabled (`fullyParallel: false`) |
| **Retries**            | 2 on CI, 0 locally                |
| **Workers**            | 1 on CI, auto locally             |
| **Reporter**           | HTML                              |
| **Trace**              | Captured on first retry           |
| **Browsers**           | Chromium, Firefox, WebKit         |

---

## Reporting

After test execution, view the detailed HTML report locally:

```bash
npx playwright show-report
```

The report is saved to `playwright-report/index.html` and includes step-by-step traces, screenshots on failure, and timeline breakdowns.

---

## CI/CD Integration

This framework is designed to run seamlessly in CI pipelines.

**GitHub Actions:** Add a workflow file at `.github/workflows/playwright.yml`. A minimal example:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

**Docker:** Use the official Playwright Docker image to run tests in isolated containers:

```bash
docker run --rm -v $(pwd):/work/ -w /work/ mcr.microsoft.com/playwright:v1.58.0-noble npx playwright test
```

---

## Page Object Model

This project uses the **Page Object Model (POM)** pattern to keep test logic clean and maintainable. All page classes live in [`page_objects/`](page_objects/).

| File                                                                    | Responsibility                                                |
| ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| [`HomePage.js`](page_objects/HomePage.js)                               | Locators and actions for the homepage listing cards           |
| [`LoginPage.js`](page_objects/LoginPage.js)                             | Locators and actions for the sign-in page                     |
| [`RegisterPage.js`](page_objects/RegisterPage.js)                       | Locators and actions for the registration form                |
| [`DashBoardPage.js`](page_objects/DashBoardPage.js)                     | Locators and actions for the authenticated dashboard          |
| [`featuredListingsPage.js`](page_objects/featuredListingsPage.js)       | Locators and actions for the featured listings view           |
| [`helpers/SearchComponent.js`](page_objects/helpers/SearchComponent.js) | Reusable search actions: keyword, city, bedrooms, price range |

When adding tests for a new page, create a corresponding class in `page_objects/` before writing the spec file.

---

## API Utilities

API helper classes live in [`api/`](api/) and use Playwright's built-in `request` fixture for direct HTTP calls — no browser required.

| File                                     | Responsibility                               |
| ---------------------------------------- | -------------------------------------------- |
| [`api/userApi.js`](api/userApi.js)       | Login and token retrieval                    |
| [`api/listingApi.js`](api/listingApi.js) | Create, retrieve, and delete estate listings |

API helpers are used both for standalone API tests and as setup/teardown utilities in UI test suites (e.g., seeding a listing before a search test).

---

## Test Data

Static fixtures live in [`testsData/`](testsData/).

| File                                                               | Contents                                                                                   |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [`testsData/listing.json`](testsData/listing.json)                 | Title, city, bedrooms, price range, and other listing attributes used in search assertions |
| [`testsData/userCredentials.json`](testsData/userCredentials.json) | Credentials for `admin`, `user`, and `realtor` test accounts                               |

> **Note:** `userCredentials.json` contains test environment credentials only. Never store production secrets in this file or commit real credentials to version control.

---

## Environment Variables

The `playwright.config.js` includes a commented-out block for [dotenv](https://github.com/motdotla/dotenv) support. If the project requires environment-specific credentials or URLs, follow these steps:

1. Create a `.env` file at the project root (never commit this file):

```env
BASE_URL=https://dev.delekhomes.com/
# Add other secrets here
```

2. Create a `.env.example` file to document required variables for your team:

```env
BASE_URL=
```

3. Uncomment the dotenv lines in `playwright.config.js`:

```js
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
```

4. Add `.env` to `.gitignore`.
