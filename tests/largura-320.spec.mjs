import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// A página inteira a 320 x 640 px: o menor celular comum e a régua de reflow da WCAG 1.4.10 (#51).
const SEM_TRANSICAO = '*, *::before, *::after { transition: none !important; animation: none !important; }';

test.use({ viewport: { width: 320, height: 640 } });

// Mede a rolagem lateral: a largura do documento não passa da janela.
const semRolagemLateral = async (page, onde) => {
  const { largura, janela } = await page.evaluate(() => ({
    largura: document.documentElement.scrollWidth,
    janela: window.innerWidth,
  }));
  expect(largura, `rolagem lateral ${onde}`).toBeLessThanOrEqual(janela);
};

// Mesma regra de acessibilidade.spec.mjs: violações e contraste sem medida reprovam.
const auditar = async (page) => {
  const { violations, incomplete } = await new AxeBuilder({ page }).analyze();
  const resumo = (lista) => lista.flatMap((r) => r.nodes.map((n) => `${r.id}: ${n.target.join(' ')}`));
  expect(resumo(violations), 'violações do axe').toEqual([]);
  expect(resumo(incomplete.filter((r) => r.id === 'color-contrast')), 'contraste que o axe não conseguiu medir').toEqual([]);
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: SEM_TRANSICAO });
});

test('320 px: sem rolagem lateral no topo e com a página rolada até o fim', async ({ page }) => {
  await semRolagemLateral(page, 'no topo');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await semRolagemLateral(page, 'no fim da página');
});

test('320 px: sem rolagem lateral e sem violações do axe com o menu aberto', async ({ page }) => {
  await page.locator('.hamburger-menu').click();
  await expect(page.locator('.hamburger-menu')).toHaveAttribute('aria-expanded', 'true');
  await semRolagemLateral(page, 'com o menu aberto');
  await auditar(page);
});

test('320 px: axe sem violações na página inteira', async ({ page }) => {
  await auditar(page);
});

test('320 px: as setas e o "Pausar" do carrossel aparecem e são alcançados pelo Tab', async ({ page }) => {
  const botoes = [
    page.locator('#carouselPause'),
    page.locator('.carousel-nav button[data-direction="-1"]'),
    page.locator('.carousel-nav button[data-direction="1"]'),
  ];
  for (const botao of botoes) {
    await botao.scrollIntoViewIfNeeded();
    await expect(botao).toBeVisible();
    const caixa = await botao.boundingBox();
    expect(caixa.x, 'o botão começa dentro da tela').toBeGreaterThanOrEqual(0);
    expect(caixa.x + caixa.width, 'o botão termina dentro da tela').toBeLessThanOrEqual(320);
  }
  // Pelo Tab, a partir do topo, o foco passa pelos três botões.
  const alcancados = new Set();
  for (let i = 0; i < 60 && alcancados.size < 3; i++) {
    await page.keyboard.press('Tab');
    const id = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || !el.closest('.carousel-nav')) return null;
      return el.id || `seta ${el.getAttribute('data-direction')}`;
    });
    if (id) alcancados.add(id);
  }
  expect([...alcancados].sort()).toEqual(['carouselPause', 'seta -1', 'seta 1']);
});
