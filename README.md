# Clube de Xadrez de Maringá — site institucional

Site institucional, responsivo e com tema de xadrez do **Clube de Xadrez de Maringá – PR**
(fundado em 1954, filiado à FEXPAR). Página única com seções de apresentação, aulas,
benefícios do xadrez, torneios/eventos, associação, galeria, depoimentos, localização e contato.

- **Site publicado:** https://axs-ai-mid.github.io/clube.de.xadrez.maringa/
- **Tecnologia:** HTML + CSS + JavaScript puros (sem frameworks, sem build, sem dependências externas em tempo de execução).
- **Hospedagem:** GitHub Pages (publicação automática via GitHub Actions). Funciona em qualquer hospedagem estática.

---

## 1. Estrutura dos arquivos

```
.
├── index.html                 Página principal (todas as seções)
├── privacidade.html           Política de privacidade (LGPD)
├── termos.html                Termos de uso
├── 404.html                   Página de erro
├── robots.txt / sitemap.xml   SEO
├── site.webmanifest           Ícones e nome para "adicionar à tela inicial"
├── .nojekyll                  Faz o GitHub Pages servir os arquivos como estão
├── assets/
│   ├── css/style.css          Todo o visual (cores, tipografia, animações, responsivo)
│   ├── js/data.js             ★ CONTEÚDO EDITÁVEL (textos, links, horários, eventos, planos, galeria…)
│   ├── js/main.js             Lógica da página (renderiza o conteúdo de data.js, menu, galeria, formulário…)
│   ├── js/icons.js            Ícones SVG inline (Lucide, Simple Icons e peças próprias)
│   ├── js/page.js             Script leve das páginas internas (privacidade/termos)
│   ├── fonts/                 Fontes Cormorant Garamond e Manrope (licença OFL incluída)
│   └── img/
│       ├── brand/             Logo (SVG), favicons, imagem de compartilhamento (og-image.jpg)
│       ├── hero/              Imagem de fundo do topo (hero-640/960/1376 .webp/.jpg)
│       ├── about/             Foto da seção "O Clube" (about-480/800/1200)
│       └── gallery/           Fotos da galeria (nome-480/800/1200 .webp/.jpg)
├── tools/otimizar-imagens.py  Script para gerar as variantes de imagem no padrão do site
└── .github/workflows/deploy-pages.yml  Publicação automática no GitHub Pages
```

> **Regra de ouro:** para atualizar o conteúdo do site, edite **somente `assets/js/data.js`**
> (e troque imagens em `assets/img/`). HTML, CSS e `main.js` só precisam ser tocados para mudar
> o design ou criar funcionalidades novas.

---

## 2. Como editar o conteúdo (`assets/js/data.js`)

O arquivo é um objeto JavaScript comentado, dividido em blocos numerados:

| Bloco | O que controla |
|---|---|
| `club` | Nome, slogan, CNPJ, e-mail, WhatsApp (número e mensagem pré-preenchida), links oficiais (Instagram, Facebook, Linktree, grupo do WhatsApp, Asaas), avaliação do Google, fundação |
| `location` | Endereço, referência ("loja ao lado da lotérica…"), coordenadas, links do Google Maps/rota, **horários de funcionamento** |
| `highlights` | Os 4 cards abaixo do topo (ícone, título, texto) |
| `classes` | Os 5 cards de "Aprenda no seu ritmo" |
| `benefits` | Os 7 benefícios da linha do tempo "Por que jogar xadrez?" |
| `events` | Cards de torneios, aulas e eventos especiais (ver abaixo) |
| `plans` | Os dois planos (Associado / Não associado): valores, benefícios e links do Asaas |
| `paymentNotice` | Aviso sobre o redirecionamento para a plataforma de pagamento |
| `gallery` / `galleryNotice` | Fotos da galeria e nota abaixo dela |
| `testimonials` | Depoimentos (hoje são placeholders marcados como editáveis) |
| `formEndpoint` / `formSubjects` | Destino do formulário de contato e lista de assuntos |

### Itens marcados com "ATUALIZAR INFORMAÇÃO"
São campos para os quais **não havia confirmação oficial** quando o site foi criado
(ex.: benefícios adicionais do plano "Não associado", depoimentos, data de alguns eventos).
Eles aparecem no site com esse rótulo de propósito — substitua pelo texto correto assim que o clube confirmar.

### Eventos (`events`)
Cada evento é um objeto como este:

```js
{
  id: "metropolitano-escolar-2026-etapa3",
  title: "3º Campeonato Metropolitano de Xadrez Escolar – 3ª Etapa",
  date: "2026-11-15",                  // AAAA-MM-DD (ou "" se ainda não definida)
  dateLabel: "15 de novembro de 2026 · 12h às 18h", // texto livre exibido no card (opcional)
  type: "torneio",                     // torneio | aula | especial  → usado pelos filtros
  status: "inscricoes",                // proximo | inscricoes | realizado | embreve
  location: "Shopping Cidade – Av. Tuiuti, 710, Maringá – PR",
  category: "Torneio · Escolar · Sub-07 a Sub-17",
  description: "Texto do card…",
  ctaLabel: "Inscrever-se no Sympla",
  ctaUrl: "https://www.sympla.com.br/evento/…" // ou "whatsapp" / "whatsapp-trial"
}
```

- Eventos com `date` futura aparecem primeiro, em ordem cronológica; eventos passados ficam por último
  com o selo **Realizado**. Eventos passados podem ser apagados quando quiser.
- `ctaUrl: "whatsapp"` abre o WhatsApp do clube; `"whatsapp-trial"` abre o WhatsApp com a mensagem de aula experimental.
- Os eventos também alimentam os dados estruturados (`Event`) para o Google.

### Horários (`location.hours`)
Um item por dia da semana, de segunda a domingo. Use `times: []` para "Fechado".
Os horários são exibidos na tabela da seção **Venha nos visitar** e nos dados estruturados do Google.

```js
{ day: "Sábado", dayCode: "Sa", times: ["10:00-12:00", "14:30-17:30"] }
```

### Planos (`plans`)
Os botões "Quero ser associado" e "Ver mensalidade" apontam para as páginas oficiais do Asaas.
Se um valor mudar, altere `price` e `priceNote`; se o link mudar, altere `ctaUrl`.

### Formulário de contato
O site é estático, então por padrão o botão **Enviar mensagem** abre o WhatsApp oficial com a
mensagem já montada (nome, e-mail, assunto e texto). Para receber por e-mail:

1. Crie um formulário gratuito em https://formspree.io (ou serviço similar);
2. Cole o endereço em `formEndpoint: "https://formspree.io/f/xxxxxxx"`.

---

## 3. Como trocar as imagens

As fotos atuais são **ilustrativas** (geradas para o projeto, livres de direitos autorais) e devem
ser substituídas pelas fotos oficiais do clube. O site usa imagens responsivas: cada foto existe em
3 larguras (480, 800 e 1200 px) e 2 formatos (`.webp` e `.jpg`), seguindo o padrão
`nome-LARGURA.extensão`.

### Opção A — automática (recomendada)
Requer Python 3 e a biblioteca Pillow (`pip install pillow`):

```bash
python3 tools/otimizar-imagens.py caminho/da/foto-original.jpg assets/img/gallery/aula-sabado
```

O script gera `aula-sabado-480.webp`, `aula-sabado-480.jpg`, `…-800…`, `…-1200…` e imprime a linha
pronta para colar em `data.js`:

```js
{ image: "assets/img/gallery/aula-sabado", widths: [480, 800, 1200], width: 1600, height: 1067,
  span: "wide", alt: "Descreva a foto para leitores de tela", caption: "Legenda curta" }
```

- `span: "wide"` ocupa 2 colunas, `"tall"` ocupa 2 linhas, `""` ocupa 1 célula.
- `width`/`height` são as dimensões reais da foto (evitam "pulos" de layout).
- `alt` é obrigatório (acessibilidade e SEO).

### Opção B — manual (um arquivo só)
Também é aceito um caminho com extensão, sem variantes:

```js
{ image: "assets/img/gallery/minha-foto.jpg", alt: "…", caption: "…" }
```

### Imagem do topo (hero) e da seção "O Clube"
- Topo: substitua `assets/img/hero/hero-640|960|1376.webp|.jpg` (paisagem, ideal 1376×768 ou maior).
- O Clube: substitua `assets/img/about/about-480|800|1200.webp|.jpg` (proporção 4:3).
- Compartilhamento em redes sociais: `assets/img/brand/og-image.jpg` (1200×630).

### Logo
`assets/img/brand/logo.svg` é um símbolo criado para o projeto. Para usar o brasão oficial, substitua
o arquivo mantendo o nome (ou troque o caminho em `index.html`, `privacidade.html`, `termos.html` e `404.html`),
e regere os favicons (`favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`, `icon-512.png`, `icon-maskable-512.png`).

---

## 4. Publicação

### GitHub Pages (configurado)
Todo push na branch `main` executa o workflow `.github/workflows/deploy-pages.yml`, que publica a
raiz do repositório em https://axs-ai-mid.github.io/clube.de.xadrez.maringa/ em cerca de 1 minuto.
Também é possível disparar manualmente em **Actions → Publicar no GitHub Pages → Run workflow**.

### Domínio próprio (opcional)
1. Em **Settings → Pages → Custom domain**, informe o domínio (ex.: `clubexadrezmaringa.com.br`) — o GitHub cria o arquivo `CNAME`.
2. No provedor do domínio, crie um registro `CNAME` apontando para `axs-ai-mid.github.io`.
3. Atualize `club.siteUrl` em `data.js`, a tag `<link rel="canonical">` e `og:url` em `index.html`, e os endereços em `sitemap.xml`/`robots.txt`.

### Outra hospedagem
Basta copiar **todos os arquivos deste repositório** (exceto `.github/` e `tools/`, que são opcionais)
para a pasta pública de qualquer servidor estático (Hostinger, Netlify, Vercel, Cloudflare Pages, cPanel…).
Não há etapa de build. Lembre-se de atualizar as URLs citadas acima.

### Testar localmente
```bash
python3 -m http.server 8080
# abra http://localhost:8080
```

---

## 5. Fontes das informações oficiais

Todos os dados factuais do site foram conferidos nos canais oficiais do clube em 02/11/2026:

- Google Maps (endereço, telefone, horários, avaliação 4,9): https://maps.app.goo.gl/NKk5LfTbypHXEa12A
- Linktree (WhatsApp, grupo, links de pagamento): https://linktr.ee/clubexadrezmaringa
- Páginas de pagamento Asaas (planos, valores, benefícios, e-mail): associado `…/c/161318923845` · mensalidade `…/c/5meuojr39gyv52c2`
- Instagram: https://www.instagram.com/clubexadrezmga/ · Facebook: https://www.facebook.com/cxmga/
- Eventos: páginas do organizador no Sympla (referência ao Shopping Cidade)
- Histórico (fundação em 08/06/1954, filiação à FEXPAR, utilidade pública municipal): Projeto de Lei 195/2025 – ALEP

Dados **não** confirmados foram deixados editáveis ou marcados como "ATUALIZAR INFORMAÇÃO".

---

## 6. Acessibilidade, desempenho e privacidade

- HTML semântico, navegação por teclado, foco visível, `alt` nas imagens, contraste alto, áreas de toque ≥ 44 px.
- Animações respeitam `prefers-reduced-motion`.
- Sem rastreadores ou cookies próprios. O mapa do Google só é carregado quando o visitante clica em
  "Carregar mapa interativo"; os pagamentos ocorrem fora do site (Asaas).
- Imagens em WebP com fallback JPG, carregamento preguiçoso (`loading="lazy"`), fontes locais.

## Licenças

Código do site: uso livre pelo Clube de Xadrez de Maringá. Fontes: SIL Open Font License (ver `assets/fonts/`).
Ícones: Lucide (ISC) e Simple Icons (CC0). Imagens atuais: ilustrativas, geradas para este projeto.
