# 🚀 Landing Page do VAP-App

Landing page completa para o lançamento do aplicativo VAP-App nas lojas App Store e Google Play.

## ✨ Estrutura da Landing Page

A nova landing page foi criada com 5 seções principais:

### 1. **Hero Section** (`AppHero.tsx`)
- Título impactante com animação
- Badge "Disponível em breve"
- Botões para App Store e Google Play
- Mockup do aplicativo (placeholder)
- Stats rápidos (100% Gratuito, iOS & Android, 24/7)

### 2. **Features Section** (`AppFeatures.tsx`)
- Grid com as 6 principais funcionalidades do VAP-App:
  - Guia de Emergência
  - Vídeos Educacionais
  - Assistente Inteligente (IA)
  - Diário de Eventos
  - Comunidade Segura
  - Marketplace Integrado
- Ícones animados
- Cards com hover effects

### 3. **Screenshots Section** (`AppScreenshots.tsx`)
- Seção de vídeo demonstrativo
  - Placeholder com botão play
  - Suporte para iframe (YouTube, Vimeo)
- Carrossel de screenshots do app
  - 5 telas principais (placeholder)
  - Navegação com setas
  - Indicadores de posição
  - Animações Framer Motion

### 4. **Testimonials Section** (`AppTestimonials.tsx`)
- Estatísticas de impacto (1000+ famílias, 98% satisfação, etc.)
- Grid de depoimentos com:
  - Avaliação 5 estrelas
  - Texto do depoimento
  - Avatar e nome do autor
- 3 depoimentos de exemplo (você pode editar)

### 5. **CTA Final Section** (`AppCTA.tsx`)
- Call-to-action para download
- Botões grandes para App Store e Google Play
- Links de rodapé (Suporte, Privacidade, Contato)
- Copyright e CNPJ

## 🎨 Design

A landing page mantém o design atual do VAP-App:
- **LightRays**: Background animado WebGL mantido
- **Cores**: Gradiente #00949D → #00C9D7 (identidade visual)
- **Animações**: Framer Motion para transições suaves
- **Responsivo**: Mobile-first design
- **Glassmorphism**: Cards com blur e transparência

## 📸 Como Adicionar Seu Conteúdo

### **1. Mockup do App (Hero Section)**

Substitua o placeholder em `src/components/ui/AppHero.tsx`:

```tsx
// Linha ~88 - Adicione sua imagem
<div className={styles.mockupPlaceholder}>
  <Image
    src="/images/app-mockup.png"
    alt="VAP-App"
    width={320}
    height={650}
    className={styles.mockupImage}
  />
</div>
```

**Recomendações:**
- Mockup de iPhone ou Android com screenshot dentro
- Formato PNG com fundo transparente
- Resolução: 320x650px (ou maior, mantendo proporção)
- Ferramentas: [Mockuphone](https://mockuphone.com/), Figma, Photoshop

---

### **2. Vídeo Demonstrativo (Screenshots Section)**

Em `src/components/ui/AppScreenshots.tsx`:

**Opção A: YouTube/Vimeo**
```tsx
// Linha ~106 - Substitua VIDEO_ID_AQUI
<iframe
  src="https://www.youtube.com/embed/SEU_VIDEO_ID"
  // ou
  src="https://player.vimeo.com/video/SEU_VIDEO_ID"
  ...
/>
```

**Opção B: Vídeo Local (MP4)**
```tsx
<video
  controls
  className={styles.videoPlayer}
  poster="/images/video-thumbnail.jpg"
>
  <source src="/videos/demo.mp4" type="video/mp4" />
</video>
```

Coloque o arquivo em: `public/videos/demo.mp4`

---

### **3. Screenshots do App (Carrossel)**

Em `src/components/ui/AppScreenshots.tsx`, substitua os placeholders:

```tsx
// Linha ~11-32 - Atualize o array
const screenshots = [
  {
    id: 1,
    title: "Guia de Emergência",
    description: "Acesso rápido a procedimentos críticos",
    image: "/images/screenshots/screenshot-1.png" // Adicione esta linha
  },
  // ... outros screenshots
];

// Linha ~138 - No JSX, adicione a imagem
<div className={styles.phoneScreen}>
  <Image
    src={screenshots[currentIndex].image}
    alt={screenshots[currentIndex].title}
    fill
    className={styles.screenshot}
  />
</div>
```

**Recomendações:**
- 5-6 screenshots das principais telas
- Formato PNG ou JPG
- Resolução: 1170x2532px (iPhone 13 Pro) ou similar
- Salve em: `public/images/screenshots/`

---

### **4. Depoimentos**

Em `src/components/ui/AppTestimonials.tsx`, atualize o array (linha ~10):

```tsx
const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Mãe de Lucas, 3 anos",
    text: "Texto do depoimento real...",
    rating: 5,
    avatar: "M", // ou use foto: avatarUrl: "/images/avatars/maria.jpg"
  },
  // Adicione mais depoimentos...
];
```

**Para usar fotos reais:**
```tsx
// No JSX (linha ~93)
<div className={styles.avatar}>
  {testimonial.avatarUrl ? (
    <Image src={testimonial.avatarUrl} alt={testimonial.name} fill />
  ) : (
    testimonial.avatar
  )}
</div>
```

---

### **5. Links das Stores**

Quando os apps estiverem publicados, atualize os links:

**Em `AppHero.tsx` (linha ~46 e ~60):**
```tsx
<Button
  onClick={() => window.open('https://apps.apple.com/app/id123456789', '_blank')}
>
  <Apple /> App Store
</Button>

<Button
  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.vapapp', '_blank')}
>
  <Play /> Google Play
</Button>
```

**Ou use links diretos:**
```tsx
<a href="https://apps.apple.com/app/id123456789" target="_blank" rel="noopener">
  <Button>...</Button>
</a>
```

---

## 🎯 Checklist de Lançamento

Antes de fazer deploy, verifique:

- [ ] Mockup do app no Hero
- [ ] Vídeo demonstrativo (YouTube/MP4)
- [ ] 5-6 screenshots no carrossel
- [ ] Depoimentos reais (ou remova a seção)
- [ ] Links das stores (App Store e Google Play)
- [ ] Atualizar badge "Disponível em breve" → "Baixe agora"
- [ ] Atualizar stats (1000+ famílias, etc.) com números reais
- [ ] Testar responsividade (mobile/tablet/desktop)
- [ ] Testar todos os links

---

## 📁 Estrutura de Arquivos Recomendada

```
public/
├── images/
│   ├── app-mockup.png          # Mockup principal do Hero
│   ├── video-thumbnail.jpg     # Thumbnail do vídeo
│   ├── screenshots/
│   │   ├── screenshot-1.png
│   │   ├── screenshot-2.png
│   │   ├── screenshot-3.png
│   │   ├── screenshot-4.png
│   │   └── screenshot-5.png
│   └── avatars/                # (Opcional) Fotos dos depoimentos
│       ├── maria.jpg
│       └── joao.jpg
└── videos/
    └── demo.mp4                # (Opcional) Vídeo local
```

---

## 🎨 Personalização de Cores

Se quiser ajustar as cores, edite em `src/app/globals.css`:

```css
:root {
  --primary: #00949D;
  --primary-light: #00C9D7;
  --primary-dark: #006b73;
}
```

---

## 🚀 Como Rodar

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

Acesse: http://localhost:3000

---

## 📱 Componentes Criados

Todos os componentes estão em `src/components/ui/`:

- `AppHero.tsx` + `AppHero.module.css`
- `AppFeatures.tsx` + `AppFeatures.module.css`
- `AppScreenshots.tsx` + `AppScreenshots.module.css`
- `AppTestimonials.tsx` + `AppTestimonials.module.css`
- `AppCTA.tsx` + `AppCTA.module.css`

---

## 🔥 Features Implementadas

✅ Design responsivo (mobile-first)
✅ Animações Framer Motion
✅ Background LightRays (WebGL)
✅ Botões App Store e Google Play
✅ Carrossel de screenshots
✅ Suporte para vídeo (YouTube/Vimeo/MP4)
✅ Seção de depoimentos
✅ Grid de funcionalidades
✅ Stats e social proof
✅ Footer com links
✅ Glassmorphism design
✅ Hover effects e transições

---

## 📝 Notas Importantes

1. **Placeholders**: Todos os placeholders (mockups, screenshots, vídeos) estão prontos para você substituir.

2. **Chatbot**: O VAPChat foi mantido! Ele aparecerá no canto inferior direito da página.

3. **Páginas Antigas**: As rotas antigas (`/questionario`, `/suporte`, etc.) continuam funcionando normalmente.

4. **SEO**: Não esqueça de atualizar:
   - `src/app/layout.tsx` → metadata (title, description)
   - Adicionar `public/favicon.ico`
   - Open Graph tags para compartilhamento social

5. **Performance**: As imagens devem ser otimizadas:
   - Use Next.js Image component
   - Formato WebP quando possível
   - Compressão adequada

---

## 🆘 Suporte

Se precisar de ajuda ou quiser personalizar algo, me avise!

**Contato:** comunicacao@vap-app.com.br

---

**Desenvolvido com ❤️ para o VAP-App**
