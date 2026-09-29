# Análise do projeto — FacilAdmin (landing page de gestão condominial)

> Data da análise: 27/09/2026 · Branch analisada: `main` · Grupo: **landing page**

## 1. Contexto de produto

| Item | Descrição |
|---|---|
| Problema | Condomínios com síndico morador sobrecarregado, inadimplência e manutenção corretiva cara. |
| Público | Conselhos e moradores que decidem contratar síndico profissional. |
| Proposta de valor | Síndico profissional independente + engenharia preventiva + ecossistema de fornecedores (FacilAdmin, parte do ecossistema learnTECH). |
| Conversão | Formulário de diagnóstico gratuito (Formspree → e-mail do síndico). |
| Métricas (propostas) | Taxa de envio do formulário por visita; tempo até o primeiro contato; LCP no celular. |

## 2. Especificação de requisitos

### 2.1 Requisitos funcionais

| ID | Requisito | Situação encontrada |
|---|---|---|
| RF01 | Apresentar proposta, serviços, especialista e prova social. | Atende, com placeholder visível "[X]+ Condomínios Atendidos" e `**negrito**` de Markdown aparecendo como asteriscos. |
| RF02 | Carrossel de serviços com navegação. | **Não atende**: os botões ← → chamam `moveCarousel` que só existe dentro do `DOMContentLoaded` (`ReferenceError`). |
| RF03 | Formulário de diagnóstico com validação e envio assíncrono. | Atende parcialmente: validação por `alert()`, sem rótulos, sem proteção anti-spam. |
| RF04 | Menu móvel. | Atende, sem `aria-expanded` inicial nem tecla Esc. |
| RF05 | Links para redes sociais. | **Não atende**: `href="#"`. |

### 2.2 Requisitos não funcionais

| ID | Característica | Requisito | Situação |
|---|---|---|---|
| RNF01 | Desempenho | Página inicial < 1,5 MB; LCP < 2,5 s em 4G. | **Não atende**: ~19 MB de PNG na primeira visita (13 imagens de ~2 MB). |
| RNF02 | Acessibilidade | WCAG 2.2 AA. | Não atende: rótulos, contraste, alt incorreto, carrossel sem pausa. |
| RNF03 | Confiabilidade de conteúdo | Números e depoimentos verificáveis. | A confirmar (D6). |
| RNF04 | SEO | `description`, Open Graph, `lang` correto. | Não atende. |

## 3. Diagnóstico

| ID | Severidade | Onde | Defeito | Referência |
|---|---|---|---|---|
| D1 | **Crítica** | `profile/*.png` | Imagens de 1024 px com 2 MB cada exibidas em ~500 px; ~19 MB baixados; 23 MB extras em `images/` sem uso no repositório. | Core Web Vitals (LCP), orçamento de performance |
| D2 | Alta | `index.html` + `script.js` | `onclick="moveCarousel()"` com função fora do escopo global: navegação quebrada. | Escopo léxico em JavaScript |
| D3 | Alta | carrossel | Troca automática a cada 4 s sem pausa; textos alternativos não descrevem as imagens ("Rastreamento FacilAdmin" numa foto de bomba). | WCAG 2.2.2 e 1.1.1 |
| D4 | Média | formulário | Só `placeholder` como rótulo; `alert()` para erros; sem honeypot. | WCAG 1.3.1/3.3.1; OWASP (spam) |
| D5 | Média | CSS | Contraste abaixo de 4,5:1 nas etiquetas vermelha/verde, no selo do bloco escuro e no botão verde. | WCAG 1.4.3 |
| D6 | Média | conteúdo | Depoimentos com nomes, "98% de satisfação" e "[X]+" sem fonte; imagens geradas por IA (marca ✦) mostrando o síndico em cenas. | CDC art. 37 (publicidade enganosa); transparência no uso de IA em publicidade |
| D7 | Baixa | `<head>` | Font Awesome 6.0.0-**beta3**; sem `description`/Open Graph; `lang="pt-br"`. | Estabilidade de dependências; SEO |
| D8 | Baixa | README | Título "Síndico TechFacil" diferente da marca FacilAdmin. | Documentação |

## 4. Critérios de MVP e nota atual

Pesos do grupo **landing page** (desempenho e acessibilidade pesam mais porque definem a conversão). Aprovação: média ≥ 7,0 e C1 e C4 ≥ 5.

| # | Critério | Peso | Nota atual | Justificativa |
|---|---|---|---|---|
| C1 | Núcleo de valor (mensagem + conversão) | 20% | 6 | Mensagem forte; carrossel quebrado e placeholder visível. |
| C2 | Estados do formulário | 10% | 4 | `alert()`; sem erro por campo. |
| C3 | Acessibilidade | 15% | 3 | D3, D4, D5. |
| C4 | Segurança / privacidade | 8% | 5 | Formspree ok; sem anti-spam; sem aviso LGPD. |
| C5 | Dados | 2% | 5 | Não se aplica além do formulário. |
| C6 | Testes | 5% | 0 | Nenhuma verificação automatizada. |
| C7 | Qualidade de código | 8% | 5 | D2; estilos inline via JS. |
| C8 | Desempenho | 17% | 1 | D1. |
| C9 | Operação | 7% | 6 | Site estático; repositório pesado. |
| C10 | Documentação | 8% | 5 | README de produto; D8. |

**Nota atual: 3,94 / 10 — REPROVADO.**

## 5. Nota depois do ciclo de melhorias (27/09/2026)

| # | Critério | Antes | Depois | O que mudou |
|---|---|---|---|---|
| C1 | Núcleo de valor | 6 | 8 | Carrossel funcionando, imagens coerentes com os textos, placeholder oculto. Sobe para 9 com os depoimentos e números confirmados. |
| C2 | Estados | 4 | 9 | Erro por campo, foco no primeiro erro, mensagem de falha de rede, confirmação focada. |
| C3 | Acessibilidade | 3 | 9 | axe-core: 0 violações (desktop, celular com menu aberto e formulário com erros); carrossel com pausa e movimento reduzido. |
| C4 | Segurança / privacidade | 5 | 7 | Honeypot `_gotcha` do Formspree, aviso LGPD, Font Awesome estável. |
| C5 | Dados | 5 | 6 | Campos com `autocomplete` e validação consistente. |
| C6 | Testes | 0 | 3 | Auditoria axe-core registrada; sem suíte automatizada no repositório. |
| C7 | Qualidade de código | 5 | 8 | Eventos no JS (sem `onclick`), estados por classe. |
| C8 | Desempenho | 1 | 9 | 11 imagens de ~19 MB para ~620 KB (WebP 900 px), `loading="lazy"`, dimensões fixas. |
| C9 | Operação | 6 | 7 | Mesma hospedagem; `images/` sem uso listado para remoção. |
| C10 | Documentação | 5 | 8 | `docs/` completo; README atualizado. |

**Nota depois: 7,98 / 10 — APROVADO.**
