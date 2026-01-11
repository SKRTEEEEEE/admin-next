import { test, expect, type Route } from "@playwright/test";
import { getProgressiveTimeout, TIMEOUTS } from "../../../utils/timeout";

/**
 * E2E Test: Admin Workflow Complete
 * 
 * Este test simula un flujo completo de usuario administrador:
 * 1. Acceder a la página admin
 * 2. Navegar por las secciones
 * - Tiene seccion 'feed backend' - que devuelve tres proyectos 
 * 3. Verificar funcionalidades admin (template)
 *  - NO HAY AHORA MISMO
 * 4. Interactuar con múltiples componentes
 * - 'demo sistema toast': click a los tres botones (credenciales, personalizado, red) y devuelve los toast con el texto
 */

test.describe("E2E - Admin Complete Workflow", () => {
  test("should complete full admin workflow", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);

    // STEP 0: Mockear backend para asegurar datos deterministas (3 proyectos)
    await page.route("**/project", async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          { id: "1", title: "Project 1", summary: "Desc 1", keys: ["K1"], techBadges: ["T1"] },
          { id: "2", title: "Project 2", summary: "Desc 2", keys: ["K2"], techBadges: ["T2"] },
          { id: "3", title: "Project 3", summary: "Desc 3", keys: ["K3"], techBadges: ["T3"] },
        ]),
      });
    });

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

    // STEP 5: Verificar sección de proyectos (Feed Backend)
    const projectsSection = page.locator(".admin-projects");
    await expect(projectsSection).toBeVisible({ timeout });

    const projectCards = page.locator(".admin-project");
    await expect(projectCards).toHaveCount(3, { timeout });

    // STEP 6: Demo Sistema Toast
    // Probamos los 3 botones y sus respectivos toasts usando selectores de texto directos con filtro para evitar botones

    // 6.1 Toast de Credenciales
    const credentialsBtn = page.getByRole('button', { name: /Credenciales/i });
    await credentialsBtn.click();
    await expect(page.getByText(/Credenciales/i).filter({ hasNot: page.getByRole('button') }).first()).toBeVisible({ timeout });

    // 6.2 Toast Personalizado
    const customBtn = page.getByRole('button', { name: /Personalizado/i });
    await customBtn.click();
    await expect(page.getByText(/Recurso no encontrado/i).filter({ hasNot: page.getByRole('button') }).first()).toBeVisible({ timeout });

    // 6.3 Toast de Red
    const networkBtn = page.getByRole('button', { name: /Red \(meta/i });
    await networkBtn.click();
    await expect(page.getByText(/Ups, error de conexión/i).filter({ hasNot: page.getByRole('button') }).first()).toBeVisible({ timeout });

    // STEP 7: Navegar a página de gradientes
    await page.goto("http://localhost:3000/es/gradients", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });

    // STEP 8: Volver a home y verificar integridad final
    await page.goto("http://localhost:3000/es", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await expect(adminShell).toBeVisible({ timeout });
  });

  test("should navigate between locales", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);

    await page.goto("http://localhost:3000/es", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await page.waitForLoadState("networkidle", {
      timeout: getProgressiveTimeout(TIMEOUTS.NETWORK_IDLE, testInfo),
    });

    const htmlES = page.locator("html");
    await expect(htmlES).toHaveAttribute("lang", "es");

    await page.goto("http://localhost:3000/ca", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await expect(page.locator("html")).toHaveAttribute("lang", "ca");

    await page.goto("http://localhost:3000/en", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("should interact with theme toggle", async ({ page }, testInfo) => {
    const timeout = getProgressiveTimeout(TIMEOUTS.VISIBILITY, testInfo);
    await page.goto("http://localhost:3000/es", {
      timeout: getProgressiveTimeout(TIMEOUTS.NAVIGATION, testInfo),
    });

    const themeToggle = page.locator('[data-testid="theme-toggle"]').first();
    if (await themeToggle.isVisible().catch(() => false)) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      const html = page.locator("html");
      const currentTheme = await html.getAttribute("data-theme") || await html.getAttribute("class");
      expect(currentTheme).toBeTruthy();
    }
  });
});
