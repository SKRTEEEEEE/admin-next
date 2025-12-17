#!/bin/bash

# run-all-tests.sh
# Script to run 100% of tests including those that require the server
# Author: Agent666
# Date: 2025-10-25

set -e  # Exit on error

echo "=================================="
echo "🚀 Complete Test Suite Execution"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Step 1: Run linting
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Linting"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if npm run lint; then
    print_success "Linting passed"
else
    print_error "Linting failed"
    exit 1
fi
echo ""

# Step 2: Run unit tests (no server required)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Unit Tests (no server required)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if npm run test:unit; then
    print_success "Unit tests passed"
else
    print_error "Unit tests failed"
    exit 1
fi
echo ""

# Step 3: Check coverage on unit tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Coverage Check (minimum 80%)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if npm run test:coverage:unit; then
    print_success "Coverage requirements met (≥80%)"
else
    print_error "Coverage below 80%"
    exit 1
fi
echo ""

# Step 4: Build the application
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Building Application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if npm run build; then
    print_success "Build successful"
else
    print_error "Build failed"
    exit 1
fi
echo ""

# Step 5: Start the server and run server-dependent tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: Starting Server & Running Integration Tests"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

print_info "Starting Next.js server in background..."
npm run start &
SERVER_PID=$!

# Wait for server to be ready
print_info "Waiting for server to be ready at http://localhost:3000..."
RETRY_COUNT=0
MAX_RETRIES=30

while ! curl -s http://localhost:3000 > /dev/null; do
    RETRY_COUNT=$((RETRY_COUNT+1))
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        print_error "Server failed to start after ${MAX_RETRIES} seconds"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi
    sleep 1
    echo -n "."
done
echo ""
print_success "Server is ready!"
echo ""

# Run server-dependent tests
print_info "Running tests that require server..."
if npm run test:server; then
    print_success "Server-dependent tests passed"
    TEST_RESULT=0
else
    print_error "Server-dependent tests failed"
    TEST_RESULT=1
fi

# Kill the server
print_info "Stopping server..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true
print_success "Server stopped"
echo ""

# Exit with test result
if [ $TEST_RESULT -eq 0 ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_success "All tests completed successfully! 🎉"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    print_info "Coverage report available at: ./docs/coverage/index.html"
    exit 0
else
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    print_error "Some tests failed"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 1
fi
