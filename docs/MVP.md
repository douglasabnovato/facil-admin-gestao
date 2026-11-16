# MVP — critérios

> Revisão de 16/11/2026 (ciclo de 16/11, branch `feature/2026-11-16` → `developer/sprint-2026-11-19`). Cada "Atende" tem comando, data e resultado. "Não medido" significa que não há evidência, não que falhe.

**Nível:** Vitrine (N2), 12 critérios se aplicam.
**Resumo:** 10 de 12 aplicáveis atendidos; 2 parciais (5 e 9), os dois dependem do responsável (#21 e #36).
**Finalizado:** sim — o que falta é a conta do GoatCounter (#21) e ligar os alertas do Dependabot (#36), ambos com `depende-do-responsavel`.

**Hipótese:** Acreditamos que explicar o serviço de síndico profissional e pedir só 4 dados fará ao menos 1 em cada 20 visitantes vindos de indicação pedir o diagnóstico. Saberemos quando o GoatCounter mostrar, em 4 semanas, ao menos 1 evento `pedido-diagnostico` para cada 20 visitas. Meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável.

| # | Critério | Como verificar | Situação | Evidência e data |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Quem pensa em contratar um síndico profissional entende o serviço e pede um diagnóstico gratuito. `PLANO-DE-ACAO.md`, ciclos de 03/11 e 16/11/2026 |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende | Hipótese acima, com meta (1 em 20) e "saberemos quando" (GoatCounter, 4 semanas), 16/11/2026 |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador no CI | Atende | `npx playwright test`, 16/11/2026: 21 testes, 0 falhas. O envio do pedido (sucesso, falha do servidor, sem rede e espera) roda no Chromium com o Formspree simulado, no job `fluxo` do CI ([run 43834993434](https://github.com/douglasabnovato/facil-admin-gestao/actions/runs/43834993434), 16/11/2026: 21 passed). No ar, sem enviar dado: `curl` em `https://formspree.io/f/xwpqnzoa` dá 405 (o formulário existe), 16/11/2026. Envio real e pessoa de fora seguem como validação (#22) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | `PLANO-DE-ACAO.md`, "Fora do escopo", 03/11 e 16/11/2026 |
| 5 | Medição de uso | Painel com visitas | Parcial | Código pronto: GoatCounter com o código `douglasabnovato`, sem cookie, só no site publicado, e evento `pedido-diagnostico` no envio com sucesso, com testes. Falta a conta, do responsável (#21) |
| 6 | Falhas tratadas | Testes de falha de rede, vazio e espera | Atende | `tests/fluxo.spec.mjs`, 16/11/2026: formulário vazio (erro por campo e foco no primeiro), falha do servidor (500), sem rede (`route.abort`), espera (botão "Enviando" desligado, um pedido só) e sucesso. A mensagem de falha não cita mais o WhatsApp, que não existe |
| 7 | Desempenho aceitável | LCP até 2,5 s no celular, site publicado | Atende | Lighthouse 12.8.2 móvel em https://douglasabnovato.github.io/facil-admin-gestao/, 16/11/2026: LCP 1,75 / 1,71 / 1,72 s, mediana 1,72 s; TBT 100 / 155 / 17 ms; elemento do LCP `.hero-content > p`. Build medido: `main` `893d082` (md5 de `index.html`, `style.css` e `script.js` no ar igual ao da `main`). Este ciclo muda o CSS do topo, onde está o elemento do LCP: o "Atende" vale até a publicação desta sprint e a medição deve ser refeita logo depois (#38) |
| 8 | Acessibilidade básica | axe e teclado | Atende | `tests/acessibilidade.spec.mjs`, 16/11/2026: axe sem violações e sem "incomplete" de contraste no computador (1280 px), com o mouse sobre os 2 botões do topo, no celular (375 px) com o menu aberto e no formulário com erros, com as transições desligadas; roda no job `fluxo` ([run 43834993434](https://github.com/douglasabnovato/facil-admin-gestao/actions/runs/43834993434)). `tests/foco.spec.mjs`: contorno de 3:1 em todo Tab, no computador e no celular; `tests/fluxo.spec.mjs`: Esc fecha o menu e devolve o foco. O app não tem tema escuro próprio (o CSS não tem `prefers-color-scheme`), então só o claro é testado |
| 9 | Segurança e conformidade | `npm audit` e alertas do Dependabot | Parcial | `npm audit --omit=dev`, 16/11/2026: 0 vulnerabilidades (não há dependência de produção). Alertas do Dependabot desligados: a API respondeu 403 em 16/11/2026. Pela regra em decisão (douglasabnovato/engenharia#33), fica "Parcial" até ligar os alertas (#36). Sem segredo no código; o formulário coleta nome, e-mail, telefone e mensagem, enviados ao Formspree, com aviso LGPD (página de privacidade em #26). Depoimentos e o "98%" marcados como ilustrativos, com teste (decisão D4; confirmação em #19) |
| 10 | Entrega confiável | CI nos PRs e principal protegida | Atende | `gh api repos/douglasabnovato/facil-admin-gestao/rules/branches/main`, 16/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` com `fluxo` e `links`. O CI roda em PR e push para `main` e `developer/**` |
| 11 | Testes dos fluxos críticos | Testes no CI, sem `skipped` | Atende | 21 testes Playwright no job `fluxo` ([run 43834993434](https://github.com/douglasabnovato/facil-admin-gestao/actions/runs/43834993434): "21 passed", sem "skipped"); nenhum `skip` em `tests/` (`grep -rn skip tests/`, 16/11/2026) |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto | Atende | README e `docs/DEPLOY.md` com os comandos conferidos contra o `package.json` em 16/11/2026; `node scripts/verificar-links.mjs` passou a conferir também as imagens e os links do README (achou 5 capturas quebradas, tiradas neste ciclo). Link publicado com HTTP 200 em 16/11/2026 |

## Histórico

- 10/11/2026: declarado 11 de 12 (só o 5 "Parcial"). Pela régua atual, o 8 estava sem axe e o 9 contava só o `npm audit` com o Dependabot desligado. Mediana do LCP no ar: 1,60 s.
- 03/11/2026, critério 10 revisto em 10/11/2026: 9 de 12. O 3 estava "Parcial" (envio real e pessoa de fora), o 9 "Parcial" (depoimentos e "98%" sem confirmação) e o 5 "Não atende".

## Medições de 03/11/2026

Lighthouse 12.8.2 local, móvel, 3 execuções no site publicado (https://douglasabnovato.github.io/facil-admin-gestao/). Antes, o elemento do LCP era o título `h1`; depois, é o parágrafo do topo (`.hero-content > p`). A medição de depois é de 06/11/2026. A máquina tinha outras medições rodando, e o resultado varia muito.

| Versão | LCP nas 3 execuções | Mediana | CLS | Acessibilidade |
|---|---|---|---|---|
| Antes (`main` de 02/11) | 2,02 / 1,30 / 3,13 s | 2,02 s | 0,023 a 0,025 | 100 |
| Depois (`main` de 06/11, PR #30) | 1,82 / 1,66 / 1,72 s | 1,72 s | 0,001 | 100 |

**Correção da leitura de 01/11:** os "4 elementos sem contorno de foco" eram os links do menu móvel fechado. Com altura 0, eles recebiam foco sem aparecer. Agora saem da ordem do Tab. O critério 8 constava como "Atende" antes da correção; a tabela acima reflete o estado depois dela.

## Medições de 01/11/2026

Lighthouse 12.8.2 local, móvel, no site publicado. O resultado varia entre execuções.

| Versão | LCP nas 3 execuções |
|---|---|
| Antes | 4,83 / 4,94 / 4,57 s (mediana 4,83 s) |
| Fontes e ícones sem bloquear a pintura | 4,75 / 4,71 / 4,92 s (mediana 4,75 s) |

**Resultado:** a mudança simples quase não alterou o LCP, que segue acima da meta de 2,5 s. A auditoria deixou de apontar as fontes e os ícones como bloqueio, mas o título principal ainda é pintado tarde.

**CLS:** 0 a 0,025. **Acessibilidade:** 100 no Lighthouse. **Teclado:** 25 tabulações sem erro; em 4 elementos não detectei contorno de foco, e isso segue a corrigir.

## Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** Se a página explicar o serviço de síndico profissional e pedir só 4 dados, ao menos 1 em cada 20 visitantes vindos de indicação pede o diagnóstico.

**Fora do MVP (proposta):** CRUD e sistema de condomínio (ficam na `facil-admin-plataforma`), blog, área logada e WhatsApp enquanto o número não existir.

**Medição:** Lighthouse 12.8.2 local, móvel, 3 execuções no site publicado. LCP 3,22 / 2,61 / 2,76 s (mediana 2,76 s; era 4,75 s), acessibilidade 100. O resultado varia entre execuções, e não houve teste em celular real.

**Critério 5:** segue sem atender, porque nada coleta uso; depende de uma conta de medição do responsável.
