# FacilAdmin — Síndico Profissional e Ecossistema de Facilities

> **Estado em 02/11/2026:** Página estática no GitHub Pages. O envio usa o Formspree. Testes: `npm ci`, `npx playwright install chromium` e `npm test`, com o Formspree simulado. O envio real não foi testado. Critérios em [docs/MVP.md](docs/MVP.md).

## Descrição e Objetivo do Projeto

O **FacilAdmin** (antes chamado Síndico TechFacil) é uma landing page institucional criada para um síndico profissional, focada em estabelecer uma forte presença online, construir credibilidade e converter visitantes em leads qualificados. O objetivo principal do projeto é apresentar os serviços de administração de condomínios de forma clara e profissional, utilizando um design moderno e estratégico para atrair e engajar potenciais clientes.

A landing page foi desenvolvida como o primeiro passo de um projeto maior que visa a criação de um **Sistema Inteligente de Gestão de Condomínios**.

---

## Detalhes do Projeto e Regras de Negócio

Este projeto segue uma abordagem de design e usabilidade centrada no usuário, com foco em:

* **Design Estratégico:** A estrutura da página guia o visitante através de uma jornada clara, partindo da identificação de um problema comum, passando pela apresentação da solução, prova social e, finalmente, uma chamada para ação para contato.
* **Design System:** A landing page foi construída seguindo os princípios do Material Design do Google, utilizando uma paleta de cores fortes e tipografia moderna para uma experiência visualmente agradável e consistente.
* **Responsividade:** O site foi desenvolvido com a abordagem *mobile-first*, garantindo que a experiência seja perfeita em qualquer dispositivo, do desktop ao smartphone.
* **Conversão de Leads:** A principal regra de negócio é facilitar a captura de informações de contato. O formulário é a peça central dessa estratégia, com validação de dados e um processo de envio assíncrono para uma experiência fluida.

### Seções da Landing Page

1.  **Hero:** Apresenta a principal proposta de valor de forma impactante.
2.  **Problema vs. Solução:** Aborda as dores do cliente e apresenta as soluções do síndico.
3.  **Serviços:** Detalha os serviços oferecidos com ícones e descrições claras.
4.  **Sobre:** Humaniza o profissional, construindo autoridade e confiança.
5.  **Depoimentos:** Usa prova social para validar a qualidade do serviço.
6.  **Contato:** Seção final com um formulário simples para captura de leads.

---

## Tecnologias Utilizadas

* **HTML5:** Para a estrutura semântica da página.
* **CSS3:** Para a estilização e responsividade, seguindo os princípios do Material Design.
* **JavaScript (ES6+):** Para a interatividade, como o menu hambúrguer, rolagem suave e envio assíncrono do formulário de contato.
* **Formspree:** Serviço de backend para receber as mensagens do formulário e enviá-las para o e-mail do síndico.
* **Font Awesome:** Biblioteca de ícones para enriquecer a interface visual.
* **Google Fonts:** Fonte *Poppins* para uma tipografia moderna e limpa.

---

## Telas do Formulário de contato

- ![Contato enviado](./.github/envio-email-1.png)
- ![Painel](./.github/envio-email-2.png)
- ![Detalhes de Recebidos](./.github/envio-email-3.png)
- ![Mensagem Corrigida](./.github/envio-email-4.png)
- ![Mensagem enviada com sucesso](./.github/envio-email-5.png)


---

## Próximos Passos do Projeto

Estado em 03/11/2026: veja [docs/MVP.md](docs/MVP.md). O plano do ciclo está em [docs/PLANO-DE-ACAO.md](docs/PLANO-DE-ACAO.md#ciclo-de-03112026).

Com o responsável:

- Confirmar depoimentos e o "98%" ([#19](https://github.com/douglasabnovato/facil-admin-gestao/issues/19)).
- Proteger a `main` com PR e CI ([#20](https://github.com/douglasabnovato/facil-admin-gestao/issues/20)).
- Medir o uso sem dados pessoais ([#21](https://github.com/douglasabnovato/facil-admin-gestao/issues/21)).
- Enviar um pedido real e testar com alguém de fora ([#22](https://github.com/douglasabnovato/facil-admin-gestao/issues/22)).
- Informar os links das redes ([#23](https://github.com/douglasabnovato/facil-admin-gestao/issues/23)).

Com o agente:

- axe-core no CI ([#24](https://github.com/douglasabnovato/facil-admin-gestao/issues/24)).
- Tirar as imagens não usadas, com aval do responsável ([#25](https://github.com/douglasabnovato/facil-admin-gestao/issues/25)).
- Página de privacidade ([#26](https://github.com/douglasabnovato/facil-admin-gestao/issues/26)).

O sistema de gestão (dashboard, API) fica na `facil-admin-plataforma`.

### Rodar os testes

```bash
node scripts/verificar-links.mjs
npm ci
npx playwright install chromium
npm test
```

---

 # 🏢 Relatório Estratégico e Documentação de Negócio: Gestão Inteligente de Condomínios

---

## 1. Visão Geral da Empresa e Posicionamento
O **FacilAdmin** é um ecossistema de gestão inteligente de condomínios que une a figura do síndico profissional especializado ao rigor técnico e tecnológico de engenharia e processos. O objetivo principal é substituir a gestão reativa por uma abordagem preditiva, transparente e baseada em dados, garantindo a valorização contínua do patrimônio.

---

## 2. Regras de Negócio e Papéis na Gestão

* **Síndico Profissional vs. Síndico Morador:** 
  * O **síndico profissional** é um especialista contratado externamente que assume a representação legal, financeira e operacional, trazendo total imparcialidade e técnica por não possuir vínculos pessoais com os moradores.
  * O **síndico orgânico (morador)** exerce a função de forma voluntária ou com remuneração simbólica, estando próximo da comunidade, mas muitas vezes sujeito a conflitos de interesse e menor disponibilidade técnica.
* **Síndico Profissional vs. Empresa Administradora:**
  * O **síndico profissional** é o representante legal eleito em assembleia que toma as decisões executivas, comanda o condomínio e responde civil e criminalmente.
  * A **empresa administradora** atua como suporte terceirizado encarregado de executar a burocracia contábil, jurídica, emissão de boletos e folha de pagamento sob a diretriz do síndico.
* **Processo de Contratação e Eleição:** Embora contratado por meio de contrato de prestação de serviços com termos de remuneração e prazos definidos, o síndico profissional precisa obrigatoriamente ser eleito em assembleia pelos condôminos, contando frequentemente com o apoio ativo de um conselho fiscal.

---

## 3. Serviços Prestados e Atribuições Operacionais

* **Gestão Financeira:** Elaboração de previsões orçamentárias assertivas, controle rigoroso da inadimplência, emissão de balancetes transparentes e controle de fluxo de caixa.
* **Manutenção Predial e Facilities:** Planejamento e acompanhamento de manutenções preventivas e corretivas em áreas comuns, vistorias periódicas de infraestrutura e gestão de equipamentos de segurança e lazer.
* **Gestão de Recursos Humanos (RH):** Seleção, contratação, treinamento e supervisão de funcionários próprios ou empresas terceirizadas (portaria, zeladoria, limpeza e manutenção).
* **Condução de Assembleias:** Convocação, organização e condução de reuniões de assembleia geral, atuando como facilitador imparcial na tomada de decisões coletivas.
* **Mediação de Conflitos:** Aplicação justa e neutra do regimento interno e da convenção do condomínio para mitigar e resolver atritos de convivência entre vizinhos.
* **Assessoria Jurídica e Compliance:** Orientação preventiva quanto ao cumprimento das normas e do Código Civil, reduzindo passivos trabalhistas e riscos de ações judiciais.

---

## 4. Problemas Enfrentados pelos Clientes (Dores do Mercado)

* **Inadimplência Descontrolada:** Falta de clareza no acompanhamento de taxas em aberto e ausência de estratégias ativas de recuperação.
* **Manutenções Corretivas Emergenciais:** Custos elevados decorrentes da falta de planos preventivos de engenharia predial.
* **Falta de Transparência Financeira:** Prestações de contas confusas e desorganizadas que geram desconfiança entre conselheiros e moradores.
* **Conflitos de Convivência e Parcialidade:** Gestões anteriores marcadas por laços de amizade ou animosidades pessoais que comprometem a aplicação imparcial das regras.
* **Resistência Tecnológica e Falta de Comunicação:** Processos burocráticos manuais e canais de atendimento ineficientes para os condôminos.

---

## 5. Soluções de Serviços e Produtos (Ecossistema FacilAdmin)

* **Auditoria Preventiva e Engenharia Aplicada:** Utilização de metodologias preditivas para monitoramento de instalações elétricas, hidráulicas e estruturais.
* **Dashboards de Monitoramento e Gestão em Tempo Real:** Ferramentas digitais integradas que permitem rastrear fluxos operacionais, manutenções e indicadores financeiros de forma automatizada.
* **Comunicação Transparente com o Morador:** Disponibilização de canais dinâmicos de atendimento, abertura de chamados e relatórios digitais acessíveis.
* **Capacitação e Rigor Operacional:** Treinamento contínuo de equipes de campo e zeladoria para assegurar padrões rígidos de qualidade na execução dos serviços.

---

## 6. Diferenciais Competitivos

* **Rigor de Engenharia na Gestão:** Aplicação de processos tecnológicos e metodologias estruturadas de auditoria (semelhantes a padrões industriais e logísticos) na administração predial.
* **Imparcialidade Absoluta:** Atuação profissional sem vínculos emocionais ou políticos com os residentes do condomínio.
* **Visão de Ecossistema Integrado:** Conexão direta entre serviços de facilities, controle de dados e transparência digital.
* **Segurança Jurídica e Financeira:** Mitigação ativa de riscos legais aliada a uma forte redução de custos operacionais por meio de eficiência preventiva.

---

## ▶️ Como executar e publicar

Site estático, sem build. Abra o `index.html` com uma extensão como Live Server. Em produção fica no **GitHub Pages** (*Settings → Pages → branch main, pasta raiz*); passo a passo em [docs/DEPLOY.md](docs/DEPLOY.md). O formulário usa o Formspree; troque o endereço em `action` do `<form>` se mudar a conta.

## 🌐 Em produção

**Demonstração:** https://douglasabnovato.github.io/facil-admin-gestao/

- GitHub Pages publicando a branch `main` (pasta raiz), sem build e sem workflow; `.nojekyll` desliga o Jekyll.
- O formulário envia pelo Formspree.
- Passo a passo completo: [docs/DEPLOY.md](docs/DEPLOY.md).

## 📊 Estado do MVP & Documentação

| Documento | Conteúdo |
|---|---|
| [docs/ANALISE.md](./docs/ANALISE.md) | Requisitos, diagnóstico, rubrica e notas |
| [docs/ARQUITETURA.md](./docs/ARQUITETURA.md) | C4, funil da página e ADRs |
| [docs/PLANO-DE-ACAO.md](./docs/PLANO-DE-ACAO.md) | Tarefas priorizadas por MoSCoW |

| Momento | Nota MVP | Situação |
|---|---|---|
| Antes (27/09/2026) | 3,94 | Reprovado — ~19 MB de imagens, carrossel quebrado e formulário sem rótulos |
| Depois (27/09/2026) | 7,98 | Aprovado — faltam confirmar depoimentos e informar as redes sociais |

Principais mudanças: imagens em WebP (−97% de peso), carrossel acessível com pausa, formulário com erro por campo e anti-spam, contraste AA e metadados de SEO.
