import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// O axe lê a cor no meio de uma transição: desligadas, ele mede a cor final.
const SEM_TRANSICAO = '*, *::before, *::after { transition: none !important; animation: none !important; }';

// O app não tem tema escuro próprio (o CSS não tem prefers-color-scheme): só o claro é testado.
const auditar = async (page) => {
  const { violations, incomplete } = await new AxeBuilder({ page }).analyze();
  const resumo = (lista) => lista.flatMap((r) => r.nodes.map((n) => `${r.id}: ${n.target.join(' ')}`));
  // Sem cor de fundo medível (gradiente, fundo translúcido, elemento sobreposto), o axe devolve
  // "incomplete" e não reprova: aqui isso também reprova, para nenhum texto ficar sem medida.
  const contrasteSemMedida = incomplete.filter((r) => r.id === 'color-contrast');
  expect(resumo(violations), 'violações do axe').toEqual([]);
  expect(resumo(contrasteSemMedida), 'contraste que o axe não conseguiu medir').toEqual([]);
};

test('axe no computador: página inteira sem violações', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.addStyleTag({ content: SEM_TRANSICAO });
  await auditar(page);
});

// O contraste do hover só aparece com o mouse em cima.
for (const botao of ['.hero-btns .btn-primary', '.hero-btns .btn-secondary']) {
  test(`axe no computador com o mouse sobre ${botao}`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.addStyleTag({ content: SEM_TRANSICAO });
    await page.locator(botao).hover();
    await auditar(page);
  });
}

test('axe no celular com o menu aberto', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.addStyleTag({ content: SEM_TRANSICAO });
  await page.locator('.hamburger-menu').click();
  await expect(page.locator('.hamburger-menu')).toHaveAttribute('aria-expanded', 'true');
  await auditar(page);
});

test('axe no formulário com os erros na tela', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.addStyleTag({ content: SEM_TRANSICAO });
  await page.locator('#contact-form .btn-submit').click();
  await expect(page.locator('#name-error')).not.toBeEmpty();
  await auditar(page);
});
