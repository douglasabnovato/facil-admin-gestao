# Plano de ação — FacilAdmin (landing page)

| # | Prioridade | Tarefa | Defeito | Critério | Esforço | Status |
|---|---|---|---|---|---|---|
| T01 | Must | Converter as 11 imagens usadas para WebP 900 px e referenciar no HTML | D1 | C8 | 1 | ✅ Feito |
| T02 | Must | Corrigir o carrossel (eventos no JS) | D2 | C1, C7 | 1 | ✅ Feito |
| T03 | Must | Carrossel acessível com pausa e textos alternativos fiéis | D3 | C3 | 1 | ✅ Feito |
| T04 | Must | Formulário com rótulos, erro por campo, honeypot e aviso LGPD | D4 | C2, C3, C4 | 1 | ✅ Feito |
| T05 | Should | Contraste AA (etiquetas, selo, botão verde) | D5 | C3 | 1 | ✅ Feito |
| T06 | Should | `description`, Open Graph, `lang`, Font Awesome 6.5.2, skip link | D7 | C1, C3 | 1 | ✅ Feito |
| T07 | Should | Negrito correto e placeholder "[X]+" oculto | RF01 | C1 | 1 | ✅ Feito |
| T08 | Should | Documentação | D8 | C10 | 1 | ✅ Feito |
| T09 | Must (usuário) | Confirmar depoimentos (reais e autorizados) e o "98%"; decidir como sinalizar imagens geradas por IA | D6 | C1, C4 | 1 | ⏳ Com você |
| T10 | Must (usuário) | Informar os links de LinkedIn, Instagram e WhatsApp | RF05 | C1 | 1 | ⏳ Com você |
| T11 | Must (usuário) | Apagar `images/` inteira e os PNG de `profile/` | D1 | C9 | 1 | ⏳ Com você |
| T12 | Could | Teste automatizado com Playwright + axe no CI | — | C6 | 2 | Roadmap |

## Definição de pronto

- axe-core sem violações em desktop, celular com menu aberto e formulário com erros.
- Nenhuma imagem acima de 150 KB carregada pela página.

## Ciclo de 03/11/2026

> Branch `feature/2026-11-03` → `developer/sprint-2026-11-05` → `main`. Nível: Vitrine (N2), 12 critérios. Publicação: GitHub Pages (`main`, pasta raiz).

### Produto

**Problema e público.** Síndicos, conselheiros e moradores que pensam em trocar a gestão do condomínio precisam entender, em poucos minutos, o que um síndico profissional faz e como contratá-lo. A página explica o serviço e pede um diagnóstico gratuito.

**Hipótese e meta.** Se a página explicar o serviço e pedir só 4 dados, ao menos 1 em cada 20 visitantes vindos de indicação pede o diagnóstico. A meta segue proposta. Medir depende da ferramenta (#21).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| A assembleia escolhe o síndico, que pode não ser condômino, por até 2 anos, renovável | Passo 3 da nova seção "Como contratar" | [Código Civil, art. 1.347](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm) |
| Na entrevista, perguntar sobre fundo de reserva, usar casos reais do prédio (garagem, barulho, animais) e checar formação e referências | Quatro perguntas em `<details>` na seção "Como contratar" | [Sindiconet: entrevistando o síndico profissional](https://www.sindiconet.com.br/informese/entrevistando-o-sindico-profissional-administracao-sindico-profissional/amp), [Sindiconet: o melhor candidato](https://www.sindiconet.com.br/informese/melhor-candidato-noticias-administracao/amp) |
| Honorários variam com o número de unidades e a carga horária; não há piso | O passo 2 diz que o valor depende do tamanho e da carga, sem citar preço | [Sindiconet: contratação do síndico profissional](https://www.sindiconet.com.br/informese/sindico-profissional-contratacao-noticias-administracao) |
| Foco: indicador com contraste de 3:1 contra o que está ao lado; WCAG 2.2 numerou de novo os critérios de foco | Teste que mede o contraste do contorno com o fundo de cada elemento; contorno claro nos fundos escuros | [W3C: What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), [WebAIM: WCAG 2.2](https://webaim.org/standards/wcag/wcag22) |
| Fonte servida pelo próprio site, com preload e fonte de reserva com as mesmas medidas, reduz atraso do texto e deslocamento | Poppins em `fonts/`, preload da 700 e `@font-face` "Poppins Fallback" com `size-adjust` | [web performance guide](https://devutilstools.pages.dev/guides/web-performance-guide), [DEV: images, fonts, LCP e CLS](https://dev.to/helloashish99/images-fonts-third-party-scripts-lcp-and-cls-idc) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Foco visível com contraste (critério 8) | Alto | Baixo | Este ciclo (#27) |
| 2 | LCP com folga: fonte local e `srcset` (critério 7) | Alto | Baixo | Este ciclo (#28) |
| 3 | CI também nos PRs para a `developer` | Alto | Baixo | Este ciclo |
| 4 | Seção "Como contratar" | Médio | Baixo | Este ciclo |
| 5 | Confirmar depoimentos e o "98%" | Alto | Baixo | Responsável (#19) |
| 6 | Proteger a `main` | Alto | Baixo | Responsável (#20) |
| 7 | Envio real e pessoa de fora | Alto | Baixo | Responsável (#22) |
| 8 | Medição de uso | Médio | Médio | Responsável (#21) |
| 9 | axe-core no CI | Médio | Baixo | Issue (#24) |
| 10 | Página de privacidade | Médio | Baixo | Issue (#26) |
| 11 | Links das redes | Baixo | Baixo | Responsável (#23) |
| 12 | Tirar imagens não usadas | Baixo | Baixo | Issue com aval do responsável (#25) |

**Fora do escopo.** Sistema de gestão do condomínio (fica na `facil-admin-plataforma`), blog, área logada, preço na página.

### Engenharia

**Arquitetura.** Página estática (`index.html`, `style.css`, `script.js`), sem build, publicada pelo GitHub Pages a partir da `main`. O formulário envia ao Formspree por `fetch`. Ícones em SVG embutido; fonte Poppins em `fonts/`; fotos WebP em 480, 640 e 900 px escolhidas por `srcset`.

**Riscos.**
- O Pages publica a `main` sem esperar o CI (#20).
- Depoimentos e "98%" sem confirmação (#19).
- O Lighthouse local varia muito entre execuções e com outra carga na máquina (aqui, de 1,3 s a 3,1 s na mesma versão). Por isso a mediana de 3 execuções.

**Qualidade.**
- Testes: 10 no Playwright (fluxo do formulário, menu, rolagem lateral, foco no computador e no celular, "Como contratar"). O teste de foco falha com o CSS antigo e passa com o novo.
- CI: `links` e `fluxo`, agora também em PRs e pushes de `developer/**`.
- `verificar-links` passou a conferir `srcset` e `url()` do CSS.
- Acessibilidade: contorno de 3 px, contraste de pelo menos 3:1 em todos os elementos, menu fechado fora do Tab.
- Segurança: nenhum dado novo coletado; fonte sem chamada a terceiros.

**Definição de pronto.** `node scripts/verificar-links.mjs` e `npm test` passam; CI verde no PR; `docs/MVP.md` e README atualizados; LCP medido no site publicado.

### Plano de ação

**Este ciclo executa.**
1. CI nos PRs da `developer`.
2. Foco visível com contraste, com teste (#27).
3. Fonte local, `srcset` e fonte de reserva com as medidas da Poppins (#28).
4. Seção "Como contratar", com teste.
5. `docs/MVP.md` e README.

**Vira issue.** #19, #20, #21, #22, #23 (responsável); #24, #26 (agente); #25 (agente, com aval do responsável).


## Ciclo de 16/11/2026

> Branch `feature/2026-11-16` → `developer/sprint-2026-11-19` → `main`. Nível: Vitrine (N2), 12 critérios. Publicação: GitHub Pages no modo legado (`main`, pasta raiz). O site no ar é o mesmo da `main` (`index.html`, `style.css` e `script.js` com o mesmo md5 da `main` em 16/11/2026).

### Produto

**Problema e público.** Os mesmos do ciclo de 03/11: quem pensa em contratar um síndico profissional entende o serviço e pede um diagnóstico gratuito.

**Hipótese e meta.** Acreditamos que explicar o serviço e pedir só 4 dados fará ao menos 1 em cada 20 visitantes vindos de indicação pedir o diagnóstico. Saberemos quando o GoatCounter mostrar, em 4 semanas, a razão entre eventos `pedido-diagnostico` e visitas. Medir depende da conta do responsável (#21).

**O que a análise achou.**
- No celular (375 px), o formulário de contato passa da tela: campos e botão vão até 445 px. O botão de envio não quebra a linha e alarga a grade. O teste de rolagem lateral passava porque `html` e `body` escondem o excesso com `overflow-x: hidden`.
- O critério 8 dizia "Atende" com o Lighthouse e o teste de foco, sem axe. A régua pede axe no navegador.
- O axe não mede o contraste de 13 textos no topo e no cabeçalho, porque há gradiente ou fundo translúcido atrás deles. Ele devolve "incomplete", e um teste que olha só "violations" passa sem medir.
- O critério 9 dizia "Atende" com o Dependabot desligado (API 403). Pela regra em decisão (engenharia#33), fica "Parcial".
- O README mostra 5 capturas em `.github/` que saíram do repositório em 29/09/2026.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Em 320 px de largura, o conteúdo não pode exigir rolagem lateral nem ficar cortado | Grade do formulário com `minmax(0, 1fr)`, botão que quebra a linha e teste que mede a largura com o `overflow-x` liberado | [W3C: Understanding SC 1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| Texto sobre gradiente ou imagem precisa ter contraste em todos os pontos; ferramentas automáticas não decidem esse caso | Fundos sólidos atrás do texto do topo e do cabeçalho, e o teste falha também com "incomplete" de `color-contrast` | [W3C: Understanding SC 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [axe-core: API, objeto de resultados](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#results-object) |
| O `@axe-core/playwright` roda o axe na página do teste, e os resultados se filtram por regra | Teste com axe no computador, no celular com o menu aberto e no formulário com erros | [Playwright: Accessibility testing](https://playwright.dev/docs/accessibility-testing) |
| O Pages pode publicar por um workflow, que envia só os arquivos escolhidos e roda depois dos testes | Workflow `pages.yml` pronto e desligado por uma Variable, até o responsável trocar a fonte do Pages | [GitHub Docs: Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Formulário que cabe no celular, com teste | Alto | Baixo | Este ciclo |
| 2 | axe no Playwright, com "incomplete" de contraste (critério 8) | Alto | Baixo | Este ciclo (#24) |
| 3 | Critério 9 honesto e issue de ligar os alertas do Dependabot | Médio | Baixo | Este ciclo e responsável |
| 4 | README sem imagens quebradas, com `verificar-links` olhando o README | Médio | Baixo | Este ciclo |
| 5 | Pages por workflow, só com os arquivos do site | Médio | Baixo | Este ciclo (código) e responsável (fonte do Pages) |
| 6 | LCP medido de novo no site publicado | Médio | Baixo | Este ciclo |
| 7 | Página de privacidade | Médio | Baixo | Issue (#26), espera o canal do responsável |

**Fora do escopo.** Os mesmos de 03/11, e trocar a identidade visual. Os fundos que viram sólidos usam a cor mais escura do gradiente antigo.

### Engenharia

**Arquitetura.** Sem mudança: página estática sem build, Formspree por `fetch`, GitHub Pages. Novo: um workflow `pages.yml` que copia só os arquivos do site para `_site` e publica pelo Actions, desligado até a Variable `PAGES_VIA_ACTIONS` valer `true`.

**Riscos.**
- Os fundos sólidos mudam um pouco o visual do topo. A cor é a do início do gradiente antigo.
- O Lighthouse local varia com a carga da máquina; vale a mediana de 3 execuções válidas.
- O workflow do Pages só vale depois que o responsável trocar a fonte para "GitHub Actions".

**Qualidade.**
- Testes: axe no computador, no celular com o menu aberto e no formulário com erros, com as transições desligadas; o teste falha com qualquer violação e com "incomplete" de `color-contrast`.
- O teste de rolagem lateral passa a medir com o `overflow-x` liberado.
- `verificar-links` passa a conferir as imagens e os links relativos do README.
- Segurança: `npm audit --omit=dev` (o projeto não tem dependência de produção); nenhum dado novo coletado.

**Definição de pronto.** `node scripts/verificar-links.mjs` e `npm test` passam; CI verde no PR; revisão independente feita; `docs/MVP.md`, README e `docs/DEPLOY.md` atualizados; LCP medido no site publicado com o build citado.

### Plano de ação

**Este ciclo executa.**
1. Formulário que cabe no celular, com teste que falha sem a correção.
2. axe no Playwright e no CI, com os fundos sólidos e as setas do carrossel em SVG (#24).
3. README sem as capturas quebradas e `verificar-links` olhando o README.
4. Workflow do Pages pronto e desligado, com `docs/DEPLOY.md`.
5. `docs/MVP.md` e README com os critérios revistos e o LCP medido.

**Vira issue.** Ligar os alertas do Dependabot e trocar a fonte do Pages (responsável). #19, #21, #22, #23 e #25 seguem com o responsável; #26 segue com o agente, à espera do canal de contato.
