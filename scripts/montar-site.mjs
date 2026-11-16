// Monta em _site só os arquivos que a página usa (o Pages por Actions publica essa pasta)
// e falha se a página, o CSS ou o manifesto apontarem para algo que ficou de fora.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';

const SAIDA = '_site';
rmSync(SAIDA, { recursive: true, force: true });
mkdirSync(join(SAIDA, 'profile'), { recursive: true });

for (const item of ['index.html', 'style.css', 'script.js', '.nojekyll', 'fonts', 'public']) {
  cpSync(item, join(SAIDA, item), { recursive: true });
}
// Em profile/ ficam também os PNG originais, que a página não usa (#25): só os WebP vão.
for (const nome of readdirSync('profile').filter((n) => n.endsWith('.webp'))) {
  cpSync(join('profile', nome), join(SAIDA, 'profile', nome));
}

// Cada referência é resolvida a partir da pasta do arquivo que a cita.
const refs = [];
const citar = (arquivo, lista) => lista.forEach((r) => refs.push({ arquivo, r }));
const html = readFileSync(join(SAIDA, 'index.html'), 'utf8');
citar('index.html', [...html.matchAll(/(?:href|src)=["']([^"'#?]+)/gi)].map((m) => m[1]));
for (const m of html.matchAll(/srcset=["']([^"']+)/gi)) {
  citar('index.html', m[1].split(',').map((parte) => parte.trim().split(/\s+/)[0]));
}
const css = readFileSync(join(SAIDA, 'style.css'), 'utf8');
citar('style.css', [...css.matchAll(/url\(["']?([^"')]+)/gi)].map((m) => m[1]));
const manifesto = JSON.parse(readFileSync(join(SAIDA, 'public', 'site.webmanifest'), 'utf8'));
citar('public/site.webmanifest', manifesto.icons.map((i) => i.src));

const faltando = refs
  .filter(({ r }) => !/^([a-z]+:|\/\/)/i.test(r))
  .map(({ arquivo, r }) => posix.join(dirname(arquivo), decodeURIComponent(r)))
  .filter((caminho) => !existsSync(join(SAIDA, caminho)));
if (faltando.length) {
  console.error('Fora de _site:', faltando);
  process.exit(1);
}
console.log(`_site montado; ${refs.length} referências conferidas`);
