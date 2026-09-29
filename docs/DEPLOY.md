# Deploy · FacilAdmin Gestão

Plano de ação para publicar a landing page em hospedagem gratuita.

## 1. Desafio

Publicar uma landing page em HTML, CSS e JavaScript puros (sem build), com formulário funcionando e sem custo, removendo cerca de 23 MB de imagens que não são usadas.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages direto da branch `main` (escolhida)** | Zero configuração: o próprio repositório é o site; atualiza a cada push |
| Netlify ou Vercel | Também gratuitos, mas acrescentam uma conta e um painel a mais sem ganho para um site sem build |

### O que foi ajustado para o deploy

| Mudança | Arquivo | Por quê |
|---|---|---|
| `.nojekyll` | `.nojekyll` | Publica os arquivos como estão, sem o processador Jekyll |
| `og:image` com endereço absoluto e `og:url` | `index.html` | Redes sociais não resolvem caminho relativo na prévia do link |
| Seção "Em produção" e instrução de publicação | `readme.md` | Link da demonstração e forma de publicar |

Já estava pronto do ciclo anterior: fotos em WebP, carrossel acessível, formulário validado com honeypot.

### Pendência de conteúdo (antes de divulgar)

- Confirmar que os 5 depoimentos e o número "98%" são reais e autorizados (CDC art. 37).
- Decidir se as fotos geradas por IA recebem uma legenda.
- Enviar os links reais de LinkedIn, Instagram e WhatsApp.

## 3. Solução (passo a passo)

### Etapa 1 · Conferir localmente

1. Abrir o `index.html` com o Live Server e testar menu, carrossel (inclusive "Pausar") e formulário.

### Etapa 2 · Subir para o GitHub (Git Bash)

1. `cd /c/ambiente-projeto/ser-mvp/facil-admin-gestao`
2. `git rm -r images/` (cerca de 23 MB sem referência no site)
3. `git rm profile/*.png` (as versões usadas agora são WebP)
4. `git status`
5. `git add -A`
6. `git commit -m "perf: WebP (19 MB→623 KB), carrossel acessível, formulário validado, SEO e publicação no GitHub Pages"`
7. `git push`

### Etapa 3 · Ativar o GitHub Pages

1. No repositório, **Settings → Pages**.
2. Em **Build and deployment → Source**, escolher **Deploy from a branch**.
3. **Branch:** `main`, pasta **/ (root)**, e **Save**.
4. Esperar 1 a 2 minutos; o endereço aparece no topo da página de configurações.

### Etapa 4 · Conferir no ar

1. `https://douglasabnovato.github.io/facil-admin-gestao/` abre com fotos e estilos.
2. Enviar o formulário e confirmar a chegada no e-mail do Formspree.
3. Colar o link numa conversa do WhatsApp e ver a prévia com imagem.

### Etapa 5 · Fechar

1. No GitHub, **About → Website**: colar a URL.
