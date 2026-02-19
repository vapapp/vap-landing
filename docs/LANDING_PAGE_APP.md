# Landing Page do VAP-App

Documentação técnica dos componentes e seções da landing page.

---

## Seções da Home

### 1. Hero (`AppHero.tsx`)

- Título animado com gradiente da identidade visual
- Botões para App Store e Google Play (lado a lado, responsivo)
- Mockup do aplicativo (`/public/images/hero/app-dashboard.png`)
- Stats: 100% Gratuito | iOS & Android | 24/7
  - Em mobile: anima em marquee/ticker automático

### 2. Vídeo Demo (`AppVideoDemo.tsx`)

- Vídeo local: `/public/videos/criadores-vap-app.mp4`
- Player customizado com controles nativos

### 3. Features (`AppFeatures.tsx`)

Grid com as 6 funcionalidades principais do VAP-App:
- Quizzes Educativos
- Assistente Dr. VAP (IA)
- Diário de Eventos
- Comunidade Segura
- E-books
- Via Aérea Pediátrica

### 4. Screenshots (`AppScreenshots.tsx`)

- 7 screenshots reais em `/public/screenshots/`
- Carrossel com autoplay (4s por slide)
- Animação direction-aware (Framer Motion)
- Pausa automática ao passar o mouse
- Navegação manual por setas (lado a lado em mobile via CSS Grid)

### 5. CTA (`AppCTA.tsx`)

- Call-to-action para download
- Botões App Store e Google Play (lado a lado, responsivo)

---

## Layout e Design

- **Background animado**: LightRays WebGL (`LightRays.tsx`) — cor `#00949D`
- **Cores**: gradiente `#00949D → #00C9D7`
- **Animações**: Framer Motion
- **Responsivo**: mobile-first, breakpoints em 640px, 768px, 968px
- **Glassmorphism**: cards com `backdrop-filter: blur`

### Grid do Hero (mobile-first)

```
Desktop:  "text  phone"
          "stats phone"   (phone em 2 linhas)

Mobile:   "text"
          "phone"
          "stats"         (phone aparece primeiro)
```

---

## Rotas públicas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `app/page.tsx` | Landing page |
| `/suporte` | `app/suporte/` | Central de suporte + FAQ interativo |
| `/termos-de-uso` | `app/termos-de-uso/` | Termos de uso |
| `/politica-de-privacidade` | `app/politica-de-privacidade/` | Política LGPD |
| `/exclusao-de-dados` | `app/exclusao-de-dados/` | Solicitação de exclusão |

### Rotas ocultas (retornam 404 via `notFound()`)

- `/questionario` e `/questionario/iniciar` — formulário interno desativado
- `/termos-de-pesquisa` — removido da navegação pública

---

## Footer

Componente `Footer.tsx` injetado via `FooterWrapper.tsx` no `layout.tsx`.

- Logo: `/public/images/brand/logo.png`
- Links: Suporte, Termos de Uso, Política de Privacidade, Exclusão de Dados
- Contato: contato@vap-app.com.br
- CNPJ: 61.674.924/0001-68

---

## SEO

Configuração completa em `src/app/layout.tsx`:
- `metadataBase` para resolução de URLs relativas
- Title template: `%s | VAP-App`
- OpenGraph com imagem (`/images/brand/logo.png`)
- Twitter Card (`summary_large_image`)
- Robots com `googleBot` config
- Canonical em cada página

---

## Assets

```
public/
├── images/
│   ├── brand/logo.png          # Logo VAP-App (PNG transparente)
│   └── hero/app-dashboard.png  # Mockup principal
├── screenshots/
│   ├── screenshot-1.png até screenshot-7.png
└── videos/
    └── criadores-vap-app.mp4
```
