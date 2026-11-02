# MVP — critérios

> Avaliação de 31/10/2026 com os mesmos 12 critérios usados no `movies`. "Não medido" significa que não há evidência, não que falhe.

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: fluxo testado com envio simulado; envio real e pessoa de fora não testados |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não atende |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: erro por campo, falha de envio e estado de envio testados |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Parcial: 2,76 s em 02/11/2026, acima de 2,5 s |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100; Tab sem elemento sem nome; foco dos campos corrigido |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Parcial: depoimentos ainda sem confirmação |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 6 testes Playwright no CI |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README com estado e comandos conferidos |

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
