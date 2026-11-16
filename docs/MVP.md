# MVP — critérios

> Revisão de 10/11/2026 (ciclo da faixa de 90%, decisões D1 a D7 do repositório `engenharia`). Mesmos 12 critérios do `movies`. "Não medido" significa que não há evidência, não que falhe.

**Nível:** Vitrine (N2), 12 critérios se aplicam.
**Resumo:** 11 de 12 aplicáveis atendidos; 1 parcial (5), que depende da conta do responsável.
**Finalizado:** sim — falta só a conta do GoatCounter, do responsável (#21, com `depende-do-responsavel`).

| # | Critério | Como verificar | Situação | Evidência e data |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | `PLANO-DE-ACAO.md`, ciclo de 03/11 |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende | Meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável. Aposta em "Revisão de 02/11/2026", abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende | Decisão D2. `npx playwright test`, 10/11/2026: 13 testes, 0 falhas; o envio do pedido (sucesso e falha) roda no navegador com o Formspree simulado. No ar, sem enviar dado: a página publicada usa `action="https://formspree.io/f/xwpqnzoa"`; `curl` no endereço dá 405 (o formulário existe; um ID inexistente dá 404 `FORM_NOT_FOUND`) e o preflight responde `Access-Control-Allow-Origin: https://douglasabnovato.github.io`, 10/11/2026. Conferir a chegada no e-mail e o teste com pessoa de fora viraram validação (#22) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | `PLANO-DE-ACAO.md`, "Fora do escopo", 03/11 |
| 5 | Medição de uso | A métrica principal é coletada | Parcial | Código pronto; falta a conta (decisão D5, #21). GoatCounter com o código `douglasabnovato`, sem cookie, só no site publicado; evento `pedido-diagnostico` no envio com sucesso, sem o que foi digitado. Testes conferem que o script não carrega em localhost nem nos testes e que usa o código certo no endereço publicado |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende | Testes de erro por campo, falha de envio e envio com sucesso, 03/11 |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende | Lighthouse 12.8.2 móvel no site publicado, 10/11/2026: 1,83 / 1,60 / 1,55 s, mediana 1,60 s, TBT 100 ms, elemento do LCP `.hero-content > p` |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende | Lighthouse 100; `tests/foco.spec.mjs` confere contorno e contraste de 3:1 em todo Tab, 03/11 (#27) |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Atende | Decisão D4: depoimentos e o "98%" aparecem como ilustrativos na tela, com teste (`depoimentos e o "98%" aparecem marcados como ilustrativos`), 10/11/2026; a confirmação real segue na #19. `npm audit --omit=dev`: 0 vulnerabilidades; Dependabot desligado no repositório (API 403), 10/11/2026 |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende | `gh api repos/douglasabnovato/facil-admin-gestao/rules/branches/main`, 10/11/2026: `required_status_checks` com `fluxo` e `links`, além de PR obrigatório e bloqueio de force push e exclusão. O Pages publica a `main`, que só recebe o que passou no CI (#20) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende | 13 testes Playwright no job `fluxo`, 10/11/2026 |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende | README com comandos conferidos contra o `package.json` e próximos passos, 10/11/2026 |

## Histórico

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
