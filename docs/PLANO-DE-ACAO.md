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
