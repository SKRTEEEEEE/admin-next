name: Lighthouse Performance

on:
  pull_request:
    branches: [main,master, buildn, 11-second-template]
  push:
    branches: [main, 11-second-template]
  workflow_dispatch:

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          submodules: recursive

      # Initialize submodules explicitly (required for standalone build)
      - name: Initialize submodules
        run: git submodule update --init --recursive

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      # Build Next.js
      - name: Build Next.js
        run: npm run build
        env:
          NODE_ENV: production

      # Start Next.js server (usando npm start como en playwright.yml)
      - name: Start Next.js server
        run: |
          npm run start &
          echo $! > .next-server.pid
        env:
          NODE_ENV: production
          NEXT_PUBLIC_API_MOCKING: "enabled"
          PORT: 3000
      
      # Wait for server (igual que en playwright.yml que funciona)
      - name: Wait for server to be ready
        run: |
          echo "⏳ Waiting for Next.js server..."
          
          # Función para verificar el servidor (SIN -f para aceptar redirects)
          check_server() {
            curl -s -o /dev/null -w "%{http_code}" "$1" 2>/dev/null
          }
          
          # Esperar a que el servidor base esté listo
          MAX_ATTEMPTS=45
          for i in $(seq 1 $MAX_ATTEMPTS); do
            STATUS=$(check_server "http://localhost:3000")
            
            if [ "$STATUS" = "200" ] || [ "$STATUS" = "307" ] || [ "$STATUS" = "308" ] || [ "$STATUS" = "404" ]; then
              echo "✅ Server ready (status: $STATUS)"
              break
            fi
            
            echo "⏳ Attempt $i/$MAX_ATTEMPTS (status: $STATUS)"
            sleep 2
            
            if [ $i -eq $MAX_ATTEMPTS ]; then
              echo "❌ Server failed to start"
              exit 1
            fi
          done
          
          # Verificar locales si existen
          for LOCALE in en es ca de; do
            STATUS=$(check_server "http://localhost:3000/$LOCALE")
            echo "✅ Locale $LOCALE: $STATUS"
          done
          
          echo "🎉 Server fully ready!"
          sleep 3
        
      - name: Run Lighthouse CI
        run: npm run lhci:perf

      - name: Check performance thresholds
        run: npm run perf:check

      - name: Upload Lighthouse reports
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: lighthouse-reports
          path: docs/lighthouse-reports/perf/
          retention-days: 30

      - name: Parse Lighthouse results
        id: lighthouse
        if: always()
        run: |
          # Parse manifest and extract scores
          MANIFEST="docs/lighthouse-reports/perf/manifest.json"
          
          if [ -f "$MANIFEST" ]; then
            # Get first report (homepage)
            REPORT_PATH=$(jq -r '.[0].jsonPath' $MANIFEST)
            
            # Extract scores (0-1 to 0-100)
            PERF=$(jq -r '.categories.performance.score * 100 | floor' $REPORT_PATH)
            ACC=$(jq -r '.categories.accessibility.score * 100 | floor' $REPORT_PATH)
            SEO=$(jq -r '.categories.seo.score * 100 | floor' $REPORT_PATH)
            BP=$(jq -r '.categories["best-practices"].score * 100 | floor' $REPORT_PATH)
            
            echo "perf_score=$PERF" >> $GITHUB_OUTPUT
            echo "acc_score=$ACC" >> $GITHUB_OUTPUT
            echo "seo_score=$SEO" >> $GITHUB_OUTPUT
            echo "bp_score=$BP" >> $GITHUB_OUTPUT
            
            # All pages summary
            echo "## Lighthouse Performance Report" > lighthouse-summary.md
            echo "" >> lighthouse-summary.md
            echo "| Page | Performance | Accessibility | SEO | Best Practices |" >> lighthouse-summary.md
            echo "|------|-------------|---------------|-----|----------------|" >> lighthouse-summary.md
            
            jq -r '.[] | .url' $MANIFEST | while read url; do
              REPORT=$(jq --arg url "$url" '.[] | select(.url == $url) | .jsonPath' $MANIFEST | tr -d '"')
              P=$(jq -r '.categories.performance.score * 100 | floor' $REPORT)
              A=$(jq -r '.categories.accessibility.score * 100 | floor' $REPORT)
              S=$(jq -r '.categories.seo.score * 100 | floor' $REPORT)
              B=$(jq -r '.categories["best-practices"].score * 100 | floor' $REPORT)
              
              echo "| $url | $P% | $A% | $S% | $B% |" >> lighthouse-summary.md
            done
            
            cat lighthouse-summary.md
          fi

      - name: Comment PR with Lighthouse results
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request' && always()
        with:
          script: |
            const fs = require('fs');
            
            if (!fs.existsSync('lighthouse-summary.md')) {
              console.log('No Lighthouse summary found');
              return;
            }
            
            const summary = fs.readFileSync('lighthouse-summary.md', 'utf8');
            
            const comment = `
            ${summary}
            
            ---
            
            **Thresholds:** Performance ≥90%, Accessibility ≥95%, SEO ≥90%, Best Practices ≥95%
            
            [View detailed reports in artifacts](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})
            `;
            
            // Find existing comment
            const { data: comments } = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
            });
            
            const botComment = comments.find(comment => 
              comment.user.type === 'Bot' && 
              comment.body.includes('Lighthouse Performance Report')
            );
            
            if (botComment) {
              // Update existing comment
              await github.rest.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: botComment.id,
                body: comment,
              });
            } else {
              // Create new comment
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                body: comment,
              });
            }

      - name: Create shields.io badge data
        if: github.ref == 'refs/heads/main' && always()
        run: |
          mkdir -p docs/badges
          
          MANIFEST="docs/lighthouse-reports/perf/manifest.json"
          if [ -f "$MANIFEST" ]; then
            # Get homepage scores
            REPORT_PATH=$(jq -r '.[0].jsonPath' $MANIFEST)
            
            PERF=$(jq -r '.categories.performance.score * 100 | floor' $REPORT_PATH)
            ACC=$(jq -r '.categories.accessibility.score * 100 | floor' $REPORT_PATH)
            SEO=$(jq -r '.categories.seo.score * 100 | floor' $REPORT_PATH)
            BP=$(jq -r '.categories["best-practices"].score * 100 | floor' $REPORT_PATH)
            
            # Create JSON for shields.io endpoint
            echo "{\"schemaVersion\": 1, \"label\": \"performance\", \"message\": \"$PERF%\", \"color\": \"brightgreen\"}" > docs/badges/perf.json
            echo "{\"schemaVersion\": 1, \"label\": \"accessibility\", \"message\": \"$ACC%\", \"color\": \"brightgreen\"}" > docs/badges/acc.json
            echo "{\"schemaVersion\": 1, \"label\": \"seo\", \"message\": \"$SEO%\", \"color\": \"brightgreen\"}" > docs/badges/seo.json
            echo "{\"schemaVersion\": 1, \"label\": \"best-practices\", \"message\": \"$BP%\", \"color\": \"brightgreen\"}" > docs/badges/bp.json
          fi

      - name: Commit badge data
        if: github.ref == 'refs/heads/main' && always()
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add docs/badges/*.json || true
          git commit -m "chore: update lighthouse badges [skip ci]" || echo "No changes to commit"
          git push || echo "No changes to push"

      # Stop server
      - name: Stop Next.js server ⛔
        if: always()
        run: |
          if [ -f .next-server.pid ]; then
            PID=$(cat .next-server.pid)
            kill $PID 2>/dev/null || true
            sleep 2
            kill -9 $PID 2>/dev/null || true
            rm -f .next-server.pid
          fi
          pkill -f "next start" || true
          pkill -f "node.*server" || true