echo "🔍 Running pre-push checks..."

# 1. Run Playwright tests with coverage
echo "🎭 Running Playwright tests with NYC coverage..."
npm run pw:cov || {
  echo "❌ Playwright tests failed!"
  exit 1
}

# 2. Check if server is running on port 3000
echo "🔍 Checking if server is running on port 3000..."
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo "⚠️  No server detected on port 3000"
  echo "ℹ️  Please run 'npm run dev' or 'npm run start' in another terminal"
  echo "ℹ️  Or skip LHCI with: git push --no-verify"
  exit 1
fi
echo "✅ Server is running"

# 3. Run Lighthouse CI (uses existing server)
echo "🏠 Running Lighthouse CI performance audit..."
npm run perf || {
  echo "❌ Lighthouse CI failed!"
  exit 1
}

# 4. Check performance thresholds
echo "📊 Checking performance thresholds..."
npm run perf:check || {
  echo "❌ Performance thresholds not met!"
  exit 1
}

echo "✅ All pre-push checks passed!"
