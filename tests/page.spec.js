import { test, expect } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const pageUrl = pathToFileURL(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html')).href;

const viewports = [
  { name: 'móvil', width: 375, height: 812 },
  { name: 'escritorio', width: 1280, height: 800 },
];

for (const viewport of viewports) {
  test(`se ve completa y sin scroll horizontal en ${viewport.name}`, async ({ page }) => {
    const requests = [];
    page.on('request', (request) => requests.push(request.url()));

    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(pageUrl);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Qué hace' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cómo funciona un préstamo' })).toBeVisible();

    // Nothing is wider than the screen
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    // It never talks to the API or to any other host: every request is a local file
    expect(requests.every((url) => url.startsWith('file://'))).toBe(true);
  });
}
