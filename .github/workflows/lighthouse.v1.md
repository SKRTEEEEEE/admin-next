name: '🐢 Lighthouse CI'

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛬
        uses: actions/checkout@v4

      - name: Setup Node ⚙️
        uses: actions/setup-node@v4
        with:
          node-version: 22.5

      - name: Install dependencies 📩
        run: npm ci

      - name: Setup Playwright / Chrome 🧪
        run: npx playwright install --with-deps

      - name: Run Lighthouse CI 🔦
        run: npm run lhci
        env:
          TEST_URL: http://localhost:3000

      - name: Upload Lighthouse reports 📄
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-reports
          path: ./lighthouse-reports

      - name: Deploy Lighthouse reports to GitHub Pages 🌐
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./lighthouse-reports
