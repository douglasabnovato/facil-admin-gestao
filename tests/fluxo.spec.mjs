import { expect, test } from '@playwright/test';

const FORMSPREE = 'https://formspree.io/**';

const preencher = async (page) => {
  const form = page.locator('#contact-form');
  await form.locator('#name').fill('Ana Souza');
  await form.locator('#email').fill('ana@exemplo.com');
  await form.locator('#phone').fill('32999990000');
  await form.locator('#message').fill('Condomínio com 40 unidades, preciso de síndico.');
  return form;
};

test('a página mostra os ícones sem baixar fonte de ícones', async ({ page }) => {
  const fontes = [];
  page.on('request', (r) => {
    if (/font-awesome|webfonts/.test(r.url())) fontes.push(r.url());
  });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('svg.icone').first()).toBeAttached();
  expect(fontes).toEqual([]);
});

test('o menu móvel abre e fecha com Esc', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const botao = page.locator('.hamburger-menu');
  await botao.click();
  await expect(botao).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(botao).toHaveAttribute('aria-expanded', 'false');
  await expect(botao).toBeFocused();
});

test('em 375 px não há rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const largura = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(largura).toBeLessThanOrEqual(375);
});

test('o formulário vazio aponta o erro e foca o primeiro campo', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact-form .btn-submit').click();
  await expect(page.locator('#name-error')).not.toBeEmpty();
  await expect(page.locator('#name')).toBeFocused();
});

test('o envio com sucesso mostra a confirmação', async ({ page }) => {
  await page.route(FORMSPREE, (r) => r.fulfill({ status: 200, json: { ok: true } }));
  await page.goto('/');
  const form = await preencher(page);
  await form.locator('.btn-submit').click();
  await expect(page.locator('#form-feedback')).toBeVisible();
});

test('a falha no envio mostra a mensagem e mantém os dados', async ({ page }) => {
  await page.route(FORMSPREE, (r) => r.fulfill({ status: 500, json: {} }));
  await page.goto('/');
  const form = await preencher(page);
  await form.locator('.btn-submit').click();
  await expect(page.locator('#form-status')).not.toBeEmpty();
  await expect(page.locator('#name')).toHaveValue('Ana Souza');
});

test('a seção "Como contratar" mostra os 4 passos e abre as perguntas pelo teclado', async ({ page }) => {
  await page.goto('/');
  const secao = page.locator('#como-contratar');
  await expect(secao.getByRole('heading', { level: 2 })).toHaveText('Como contratar um síndico profissional');
  await expect(secao.locator('.passos > li')).toHaveCount(4);

  // Abre a última pergunta (não a primeira), para o teste não passar por acaso pela ordem
  const perguntas = secao.locator('details');
  await expect(perguntas).toHaveCount(4);
  const ultima = perguntas.last();
  await expect(ultima).not.toHaveAttribute('open', '');
  await ultima.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(ultima).toHaveAttribute('open', '');
  await expect(ultima.locator('p')).toBeVisible();

  await secao.getByRole('link', { name: 'Pedir o diagnóstico gratuito' }).click();
  await expect(page.locator('#contato')).toBeFocused();
});

test('depoimentos e o "98%" aparecem marcados como ilustrativos', async ({ page }) => {
  await page.goto('/');
  const aviso = page.locator('#depoimentos .aviso-ilustrativo');
  await expect(aviso).toBeVisible();
  await expect(aviso).toContainText('ilustrativos');
  await expect(page.locator('.stat-item', { hasText: '98%' })).toContainText('(ilustrativo)');
  await expect(page.getByRole('link', { name: 'Resultados Comprovados' })).toHaveCount(0);
});

test('o GoatCounter não carrega em localhost nem nos testes', async ({ page }) => {
  const pedidos = [];
  page.on('request', (r) => pedidos.push(r.url()));
  await page.route(FORMSPREE, (r) => r.fulfill({ status: 200, json: { ok: true } }));
  await page.goto('/');
  const form = await preencher(page);
  await form.locator('.btn-submit').click();
  await expect(page.locator('#form-feedback')).toBeVisible();
  await expect(page.locator('script[data-goatcounter]')).toHaveCount(0);
  expect(pedidos.filter((u) => /goatcounter|gc\.zgo\.at/.test(u))).toEqual([]);
});

test('no site publicado o script do GoatCounter usa o código do portfólio', async ({ page }) => {
  // Simula o navegador de um visitante: sem a marca de automação e fora de localhost.
  await page.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await page.route('https://douglasabnovato.github.io/facil-admin-gestao/**', async (r) => {
    const caminho = new URL(r.request().url()).pathname.replace('/facil-admin-gestao', '') || '/';
    const local = await page.request.get(caminho === '/' ? '/index.html' : caminho);
    await r.fulfill({ response: local });
  });
  await page.route('https://gc.zgo.at/**', (r) => r.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.goto('https://douglasabnovato.github.io/facil-admin-gestao/');
  await expect(page.locator('script[data-goatcounter]')).toHaveAttribute(
    'data-goatcounter',
    'https://douglasabnovato.goatcounter.com/count',
  );
});
