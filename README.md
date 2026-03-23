# Assemble All FNQ Website

Marketing website for Assemble All FNQ, a local flatpack assembly business in Cairns and surrounding FNQ areas.

## Stack

- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Cloudflare Workers deployment via OpenNext](https://opennext.js.org/cloudflare)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Cloudflare Workers

1. Authenticate with Cloudflare:

```bash
npx wrangler login
```

2. Build and preview locally in Workers runtime:

```bash
npm run preview:worker
```

3. Deploy:

```bash
npm run deploy:worker
```

## Notes

- Worker name and runtime config are set in `wrangler.toml`.
- Site logo is stored at `public/assemble-all-fnq-logo.png`.
