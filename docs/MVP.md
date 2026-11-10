# MVP — critérios

> Revisão de 03/11/2026 (ciclo `feature/2026-11-03`); critério 10 revisto em 10/11/2026. Mesmos 12 critérios do `movies`. "Não medido" significa que não há evidência, não que falhe.

**Nível:** Vitrine (N2), 12 critérios se aplicam.
**Resumo:** 9 de 12 aplicáveis atendidos; 2 parciais (3, 9) e 1 não atende (5). Os 3 dependem do responsável e têm issue aberta com `depende-do-responsavel`.
**Finalizado:** sim, pela decisão 4 do processo (o que falta depende do responsável: #19, #21, #22).

| # | Critério | Como verificar | Situação | Evidência e data |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | `PLANO-DE-ACAO.md`, ciclo de 03/11 |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta | Revisão de 02/11, abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial | Envio simulado no CI; envio real e pessoa de fora pendentes (#22) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | `PLANO-DE-ACAO.md`, "Fora do escopo", 03/11 |
| 5 | Medição de uso | A métrica principal é coletada | Não atende | Depende da conta de medição (#21) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende | Testes de erro por campo, falha de envio e envio com sucesso, 03/11 |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende | Lighthouse móvel no site publicado, mediana de 1,72 s depois do PR #30, 06/11 (#28) |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende | Lighthouse 100; `tests/foco.spec.mjs` confere contorno e contraste de 3:1 em todo Tab, 03/11 (#27) |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial | Depoimentos e "98%" sem confirmação (#19) |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende | `gh api repos/douglasabnovato/facil-admin-gestao/rulesets`, 10/11/2026: ruleset `principal-protegida` ativo (exige PR, bloqueia force push e exclusão); o workflow `CI` (jobs `links` e `fluxo`) roda em PRs para `main` e `developer/**`. O Pages publica a `main`, que só recebe merge de PR (#20) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende | 10 testes Playwright no job `fluxo`, 03/11 |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende | README com comandos e próximos passos, 03/11 |

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
