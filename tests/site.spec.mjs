import { expect, test } from '@playwright/test';

// Com RAIZ=_site, prova que o pacote do Pages tem tudo o que a página pede,
// inclusive o que só o JavaScript ou o srcset carregam (#39).
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
    // Rola até o fim para carregar as imagens com loading="lazy".
    const altura = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= altura; y += 600) await page.mouse.wheel(0, 600);
    await page.waitForLoadState('networkidle');
    expect(falhas).toEqual([]);
  });
}
