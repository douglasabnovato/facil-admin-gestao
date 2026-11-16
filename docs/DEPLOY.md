# Deploy · FacilAdmin Gestão

Como a landing page vai ao ar, em hospedagem gratuita. Revisto em 16/11/2026.

## 1. Estado hoje

| Item | Valor |
|---|---|
| Endereço | https://douglasabnovato.github.io/facil-admin-gestao/ (HTTP 200 em 16/11/2026) |
| Hospedagem | GitHub Pages, modo legado: **Deploy from a branch**, `main`, pasta `/ (root)` |
| O que vai ao ar | O repositório inteiro, inclusive `docs/`, `tests/` e cerca de 47 MB de imagens que a página não usa (#25) |
| Proteção | A `main` só recebe PR com os jobs `fluxo` e `links` verdes (ruleset lido em 16/11/2026) |
| Versão no ar | `index.html`, `style.css` e `script.js` com o mesmo md5 da `main` (`893d082`) em 16/11/2026 |
| Formulário | Formspree, `https://formspree.io/f/xwpqnzoa`, por `fetch` |
| Medição | GoatCounter com o código `douglasabnovato`, só no endereço publicado; a conta ainda não existe (#21) |

## 2. Próximo passo: publicar pelo Actions

O workflow [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) já está no repositório e fica desligado. Ele:

1. espera o workflow `CI` terminar verde num push na `main`;
2. roda `node scripts/montar-site.mjs`, que copia para `_site` só o que a página usa (HTML, CSS, JS, fontes, ícones e os WebP de `profile/`, cerca de 1,6 MB) e falha se faltar algum arquivo citado;
3. publica `_site` no Pages.

O `montar-site.mjs` também roda no job `links` do CI, em todo PR. Assim o pacote é conferido antes de chegar à `main`.

### Passo a passo do responsável (issue com `depende-do-responsavel`)

1. Abrir **Settings → Secrets and variables → Actions → aba Variables → New repository variable**.
2. **Name:** `PAGES_VIA_ACTIONS`. **Value:** `true`. Clicar em **Add variable**.
3. Abrir **Settings → Pages**.
4. Em **Build and deployment → Source**, trocar **Deploy from a branch** por **GitHub Actions**. A troca salva sozinha.
5. Abrir **Actions → Pages → Run workflow**, escolher `main` e clicar em **Run workflow**.
6. Esperar o run verde e abrir o endereço. Conferir:
   - `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/facil-admin-gestao/` devolve `200`;
   - `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/facil-admin-gestao/readme.md` devolve `404` (o README não vai mais ao ar).

**Para voltar atrás:** em **Settings → Pages**, escolher de novo **Deploy from a branch**, `main`, `/ (root)`, e apagar a Variable.

## 3. Conferir uma publicação

1. Comparar o que está no ar com a `main` (o Windows grava CRLF; por isso o `tr`):

   ```bash
   B=https://douglasabnovato.github.io/facil-admin-gestao
   for f in index.html style.css script.js; do
     echo "$f $(curl -s $B/$f | tr -d '\r' | md5sum | cut -c1-12) $(git show origin/main:$f | tr -d '\r' | md5sum | cut -c1-12)"
   done
   ```

2. Os dois md5 de cada linha devem ser iguais. Só então medir o LCP no site publicado (Lighthouse móvel, 3 execuções, mediana, TBT e elemento do LCP) e registrar no `docs/MVP.md` qual commit foi medido.
3. Conferir o formulário sem enviar dado: `curl -s -o /dev/null -w "%{http_code}" https://formspree.io/f/xwpqnzoa` devolve `405` (o formulário existe; um ID que não existe dá `404`).

## 4. Rodar localmente

```bash
npm ci
npx playwright install chromium
node scripts/verificar-links.mjs
node scripts/montar-site.mjs
npm test
```

Os testes sobem um servidor na porta 4173. Se ela estiver ocupada, use outra: `PORTA=4627 npm test`. O `@axe-core/playwright` 4.14 pede Node 22.12 ou mais novo.

## 5. Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages (escolhida)** | Gratuito, sem conta a mais; o site não tem build |
| Netlify ou Vercel | Também gratuitos, mas acrescentam uma conta e um painel sem ganho para um site sem build |

## 6. Pendências de conteúdo (do responsável)

- Confirmar os depoimentos e o "98%", hoje marcados como ilustrativos (#19).
- Enviar um pedido real e testar com uma pessoa de fora (#22).
- Informar os links de LinkedIn, Instagram e WhatsApp (#23).
- Confirmar que os originais das imagens estão guardados fora do repositório, para tirá-las (#25).
