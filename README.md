# VAP-App — Landing Page

Site de apresentação e download do VAP-App, aplicativo gratuito de apoio para cuidadores de crianças com traqueostomia pediátrica.

**URL em produção:** https://vap-app.com.br

---

## Tecnologias

- [Next.js 15](https://nextjs.org) (App Router)
- TypeScript
- CSS Modules
- [Framer Motion](https://www.framer.com/motion/)
- Firebase (autenticação admin)
- Supabase (banco de dados)
- Google Analytics

---

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## Build e deploy

```bash
# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

O deploy é feito automaticamente via GitHub Actions ao fazer push na branch `main`. Consulte `docs/DEPLOY.md` para detalhes da infraestrutura.

---

## Estrutura do projeto

```
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── page.tsx            # Home (landing page)
│   ├── suporte/            # Central de suporte + FAQ
│   ├── termos-de-uso/
│   ├── politica-de-privacidade/
│   ├── exclusao-de-dados/
│   └── admin/              # Painel administrativo (protegido)
├── components/
│   ├── ui/                 # Componentes da landing page
│   ├── admin/              # Componentes do painel admin
│   ├── charts/             # Gráficos do dashboard
│   └── analytics/          # Google Analytics
├── context/                # AuthContext (Firebase)
├── hooks/                  # Hooks customizados
├── lib/                    # Firebase, Supabase, Resend
└── types/                  # Tipos TypeScript
public/
├── images/brand/           # Logo
├── images/hero/            # Mockup do app
├── screenshots/            # Screenshots do app (carrossel)
└── videos/                 # Vídeo demonstrativo
docs/                       # Documentação técnica
```

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz com as chaves necessárias (Firebase, Supabase, OpenAI, Resend). Consulte `.env.local.example` se disponível.

---

## Contato

contato@vap-app.com.br
