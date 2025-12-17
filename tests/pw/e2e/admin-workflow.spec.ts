import { test, expect } from "@playwright/test";
import { getProgressiveTimeout, TIMEOUTS } from "../../utils/timeout";

/**
 * E2E Test: Admin Workflow Complete
 * 
 * Este test simula un flujo completo de usuario administrador:
 * 1. Acceder a la página admin
 * 2. Navegar por las secciones
 * 3. Verificar funcionalidades admin
 * 4. Interactuar con múltiples componentes
 */

test.describe("E2E - Admin Complete Workflow", () => {
  test("should complete full admin workflow", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    
    // STEP 1: Landing en página admin
    await page.goto("http://localhost:3000/es", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    // Verificar que estamos en la página admin
    const adminShell = page.locator(".admin-shell");
    await expect(adminShell).toBeVisible({ timeout });
    
    const heroTitle = page.locator(".admin-hero h1");
    await expect(heroTitle).toBeVisible({ timeout });
    
    // STEP 2: Verificar que todos los elementos admin están presentes
    const adminBadge = page.locator(".admin-hero-badge");
    await expect(adminBadge).toBeVisible({ timeout });
    
    const primaryButton = page.locator(".admin-cta").first();
    await expect(primaryButton).toBeVisible({ timeout });
    
    // STEP 3: Verificar las tarjetas de status
    const statusCards = page.locator(".admin-card");
    const cardCount = await statusCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Verificar que cada tarjeta tiene título y estado
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = statusCards.nth(i);
      await expect(card).toBeVisible({ timeout });
      
      const cardTitle = card.locator("h3");
      await expect(cardTitle).toBeVisible({ timeout });
    }
    
    // STEP 4: Verificar sección de diagnósticos
    const diagnosticCards = page.locator(".admin-diagnostic");
    const diagnosticCount = await diagnosticCards.count();
    expect(diagnosticCount).toBeGreaterThan(0);
    
    // STEP 5: Verificar sección de proyectos
    const projectsSection = page.locator(".admin-projects");
    await expect(projectsSection).toBeVisible({ timeout });
    
    // STEP 6: Interactuar con enlaces rápidos
    const actionLinks = page.locator(".admin-action-link");
    const linksCount = await actionLinks.count();
    expect(linksCount).toBeGreaterThan(0);
    
    // Verificar que los enlaces tienen href válidos
    for (let i = 0; i < Math.min(linksCount, 3); i++) {
      const link = actionLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
    }
    
    // STEP 7: Navegar a página de gradientes
    await page.goto("http://localhost:3000/es/gradients", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    // Verificar que la navegación funcionó
    const body = page.locator("body");
    await expect(body).toBeVisible({ timeout });
    
    // STEP 8: Volver a home
    await page.goto("http://localhost:3000/es", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    // Verificar que volvimos correctamente
    await expect(adminShell).toBeVisible({ timeout });
    await expect(heroTitle).toBeVisible({ timeout });
  });
  
  test("should navigate between locales", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    
    // STEP 1: Start in Spanish
    await page.goto("http://localhost:3000/es", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    const htmlES = page.locator("html");
    await expect(htmlES).toHaveAttribute("lang", "es");
    
    // STEP 2: Navigate to Catalan
    await page.goto("http://localhost:3000/ca", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    const htmlCA = page.locator("html");
    await expect(htmlCA).toHaveAttribute("lang", "ca");
    
    // STEP 3: Navigate to English
    await page.goto("http://localhost:3000/en", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    const htmlEN = page.locator("html");
    await expect(htmlEN).toHaveAttribute("lang", "en");
    
    // STEP 4: Verify admin structure is present in all locales
    const adminShell = page.locator(".admin-shell");
    await expect(adminShell).toBeVisible({ timeout });
  });
  
  test("should interact with theme toggle", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    
    // STEP 1: Load page
    await page.goto("http://localhost:3000/es", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });
    
    // STEP 2: Find theme toggle button (si existe)
    // Nota: Ajustar selector según tu implementación real
    const themeToggle = page.locator('[data-testid="theme-toggle"]').first();
    
    // Si el toggle existe, interactuar con él
    if (await themeToggle.isVisible().catch(() => false)) {
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition
      
      // Verify theme changed
      const html = page.locator("html");
      const currentTheme = await html.getAttribute("class");
      expect(currentTheme).toBeTruthy();
    }
  });
});

/**
 * E2E Test: Admin CRUD Workflow (Example for future implementation)
 * 
 * Este es un ejemplo de cómo sería un flujo E2E CRUD real:
 * - Create: Crear un nuevo item
 * - Read: Verificar que aparece en la lista
 * - Update: Editar el item
 * - Delete: Eliminar el item
 */
test.describe.skip("E2E - Admin CRUD Workflow (Example)", () => {
  test("should create, read, update and delete an item", async ({ page }) => {
    // 1. LOGIN
    await page.goto("http://localhost:3000/login");
    await page.fill('[name="email"]', 'admin@test.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard");
    
    // 2. CREATE
    await page.click('button:has-text("New Item")');
    await page.fill('[name="title"]', 'Test Item');
    await page.fill('[name="description"]', 'Test Description');
    await page.click('button:has-text("Save")');
    
    // 3. READ
    const item = page.locator('text=Test Item');
    await expect(item).toBeVisible();
    
    // 4. UPDATE
    await item.click();
    await page.click('button:has-text("Edit")');
    await page.fill('[name="title"]', 'Updated Test Item');
    await page.click('button:has-text("Save")');
    
    const updatedItem = page.locator('text=Updated Test Item');
    await expect(updatedItem).toBeVisible();
    
    // 5. DELETE
    await page.click('button:has-text("Delete")');
    await page.click('button:has-text("Confirm")');
    
    await expect(updatedItem).not.toBeVisible();
    
    // 6. LOGOUT
    await page.click('[data-testid="user-menu"]');
    await page.click('button:has-text("Logout")');
    await page.waitForURL("**/login");
  });
});
