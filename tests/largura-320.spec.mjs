import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// A página inteira a 320 x 640 px: o menor celular comum e a régua de reflow da WCAG 1.4.10 (#51).
const SEM_TRANSICAO = '*, *::before, *::after { transition: none !important; animation: none !important; }';

test.use({ viewport: { width: 320, height: 640 } });

// Duas medidas de rolagem lateral (R19 do #56):
// 1. a largura do documento não passa da área visível;
// 2. nenhum elemento visível passa da borda direita. O html e o body têm overflow-x: hidden,
//    e por isso a 1ª medida sozinha não vê um conteúdo cortado. Um elemento recortado por um
//    ancestral com overflow (os slides do carrossel fora da vez) não conta, porque não aparece.
const semRolagemLateral = async (page, onde) => {
  const { largura, janela, fora } = await page.evaluate(() => {
    const janela = document.documentElement.clientWidth;
    const recortado = (e) => {
      for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
        const s = getComputedStyle(a);
        if (s.overflowX !== 'visible' && a.getBoundingClientRect().right <= janela + 1) return true;
      }
      return false;
    };
    const fora = [...document.querySelectorAll('body *')]
      .filter((e) => {
        const c = e.getBoundingClientRect();
        if (c.width === 0 || c.height === 0 || c.right <= janela + 1) return false;
        if (getComputedStyle(e).visibility === 'hidden') return false;
        return !recortado(e);
      })
      .slice(0, 5)
      .map((e) => e.tagName + (e.id ? `#${e.id}` : '') + (e.classList[0] ? `.${e.classList[0]}` : ''));
    return { largura: document.documentElement.scrollWidth, janela, fora };
  });
  expect(largura, `rolagem lateral ${onde}`).toBeLessThanOrEqual(janela);
  expect(fora, `elementos além da tela ${onde}`).toEqual([]);
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
  await page.waitForFunction(() => window.scrollY > 0);
  await semRolagemLateral(page, 'no fim da página');
});

test('320 px: o menu aberto aparece, sem rolagem lateral e sem violações do axe', async ({ page }) => {
  await page.locator('.hamburger-menu').click();
  await expect(page.locator('.hamburger-menu')).toHaveAttribute('aria-expanded', 'true');
  // O aria-expanded sozinho não prova que o menu apareceu: o painel e os links têm de estar na tela.
  const menu = page.locator('#menu-principal');
  await expect(menu).toBeVisible();
  await expect(menu).toBeInViewport();
  const links = menu.getByRole('link');
  expect(await links.count(), 'links no menu').toBeGreaterThan(0);
  await expect(links.first()).toBeVisible();
  await semRolagemLateral(page, 'com o menu aberto');
  await auditar(page);
});

test('320 px: axe sem violações na página inteira', async ({ page }) => {
  await auditar(page);
});

test('320 px: o Tab só passa por elementos visíveis e chega às setas e ao "Pausar" do carrossel', async ({ page }) => {
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
  // Pelo Tab, a partir do topo: cada elemento focado está visível e dentro dos 320 px (um link do
  // menu fechado com foco escondido reprova), e o foco passa pelos três botões do carrossel.
  const alcancados = new Set();
  const escondidos = [];
  for (let i = 0; i < 60 && alcancados.size < 3; i++) {
    await page.keyboard.press('Tab');
    const foco = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const c = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      const visivel = c.width > 0 && c.height > 0 && s.visibility !== 'hidden' && c.left >= -1 && c.right <= document.documentElement.clientWidth + 1;
      const nome = el.tagName + (el.id ? `#${el.id}` : '') + (el.getAttribute('href') ? `[href=${el.getAttribute('href')}]` : '');
      const carrossel = el.closest('.carousel-nav') ? el.id || `seta ${el.getAttribute('data-direction')}` : null;
      return { visivel, nome, carrossel };
    });
    if (!foco) continue;
    if (!foco.visivel) escondidos.push(foco.nome);
    if (foco.carrossel) alcancados.add(foco.carrossel);
  }
  expect(escondidos, 'foco em elemento escondido ou fora da tela').toEqual([]);
  expect([...alcancados].sort()).toEqual(['carouselPause', 'seta -1', 'seta 1']);
});
