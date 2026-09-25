# BIOBERÇO — Equipe Bee Lego • SESI Sete Lagoas/MG

Site do projeto BIOBERÇO: ajude a encontrar o Faveiro-de-Wilson.

## Estado atual

- Next.js 16 + TypeScript + Tailwind v4 + Lexend
- Página pública: header, barra do link oficial, hero, guia de identificação, formulário, QR Code, rodapé
- `/privacidade` (LGPD) e `/admin` (lista/busca/validação de registros)
- `POST /api/sightings` (multipart): valida no servidor, gera protocolo `BIO-AAAA-XXXXXX` no servidor
- Prisma + Neon + Vercel Blob prontos no código; sem `DATABASE_URL`, a API responde com protocolo provisório (`persisted: false`)

## Rodar local

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deploy na Vercel

1. Push para `main`
2. Vercel → Add New → Project → Import `Celeriflow-Hub/bioberco`
3. Env: `NEXT_PUBLIC_SITE_URL=https://<seu-projeto>.vercel.app`
4. Deploy. Depois atualize a var com o domínio final e faça Redeploy.

## Ativar banco + upload (Fase 3)

1. Criar PostgreSQL no Neon e definir `DATABASE_URL`
2. Criar Blob Store na Vercel e definir `BLOB_READ_WRITE_TOKEN`
3. Definir `ADMIN_TOKEN` (acesso ao `/admin`)
4. `npx prisma migrate deploy`
5. Redeploy

## Plano

- [x] Fase 1 — Fundação (Next, tokens, conteúdo central)
- [x] Fase 2 — Interface pública + API com protocolo server-side
- [x] Fase 3 (código) — Prisma/Blob/admin; falta só configurar envs + migrate
- [ ] Fase 4 — honeypot/rate-limit
- [ ] Fase 6 — QA mobile + QR no domínio definitivo
