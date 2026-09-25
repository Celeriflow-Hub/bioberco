# BIOBERÇO — Equipe Bee Lego • SESI Sete Lagoas/MG

Site do projeto BIOBERÇO: ajude a encontrar o Faveiro-de-Wilson.

## Base atual (pronta p/ Vercel)

- Next.js 16 + TypeScript + Tailwind v4 + Lexend
- Página pública: header, barra do link oficial, hero, guia de identificação, formulário, QR Code, rodapé
- `/privacidade` com política LGPD
- `POST /api/sightings`: valida com zod e gera protocolo no servidor (`BIO-AAAA-XXXXXX`)
- Sem banco nesta base — persistência (Neon + Prisma) e upload (Vercel Blob) entram na Fase 3

## Rodar local

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deploy na Vercel

1. Push deste repo para `main`
2. Vercel → Add New → Project → Import `Celeriflow-Hub/bioberco`
3. Framework: Next.js (auto). Root: `./`
4. Env var: `NEXT_PUBLIC_SITE_URL=https://<seu-projeto>.vercel.app`
5. Deploy. Depois atualize a var com o domínio final e faça Redeploy.

## Plano de implantação

- [x] Fase 1 — Fundação (Next, tokens, conteúdo central)
- [x] Fase 2 — Interface pública + API stub com protocolo server-side
- [ ] Fase 3 — Neon + Prisma + Vercel Blob + protocolo único persistido
- [ ] Fase 4 — Privacidade/validação final + honeypot/rate-limit
- [ ] Fase 5 — `/admin` restrito
- [ ] Fase 6 — QA mobile + QR no domínio definitivo
