import { expect, test } from '@playwright/test';

// Com RAIZ=_site, prova que o pacote do Pages tem o que a página pede no navegador:
// HTML, CSS, fontes, manifesto e todas as imagens, inclusive as do carrossel (#39).
// As variantes do srcset que o navegador não escolhe ficam com o montar-site.mjs.
for (const largura of [1280, 375]) {
  test(`em ${largura} px nenhum pedido local falha`, async ({ page, baseURL }) => {
    const falhas = [];
    page.on('response', (r) => {
      if (r.url().startsWith(baseURL) && r.status() >= 400) falhas.push(`${r.status()} ${r.url()}`);
    });
    page.on('requestfailed', (r) => {
      if (r.url().startsWith(baseURL)) falhas.push(`falhou ${r.url()}`);
    });
    await page.setViewportSize({ width: largura, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('load');
    // Imagens com loading="lazy" fora da tela (carrossel na horizontal) só são pedidas assim.
    await page.evaluate(() => document.querySelectorAll('img').forEach((img) => (img.loading = 'eager')));
    await expect
      .poll(() => page.evaluate(() => [...document.images].filter((img) => !img.complete).length))
      .toBe(0);
    expect(await page.evaluate(() => document.images.length)).toBeGreaterThan(0);
    expect(falhas).toEqual([]);
  });
}
