# Copiwrite marketing website

Full-stack Next.js marketing site for Copiwrite.

## Run locally

```bash
npm install
npm run dev
```

The site uses system font stacks and does not contact Google Fonts during development or builds.

## Receive contact enquiries in Telegram

The form submits to `app/api/contact/route.ts`. Every validated enquiry is sent directly to the configured Telegram chat using the Telegram Bot API.

For local development, copy `.env.example` to `.env.local` and add:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

The existing `VITE_TELEGRAM_TOKEN` and `VITE_TELEGRAM_CHAT_ID` names are supported as local fallbacks, but the server-only names above are safer and should be used going forward.

Each Telegram message contains the visitor's name, email, company, requested service, budget, and project details.

Without both Telegram values, the form tells visitors to email `info@copiwrite.com` directly. It does not pretend that an enquiry was delivered.

## Deploy with Vercel

1. Push the repository to GitHub.
2. In Vercel, select **Add New → Project** and import the repository.
3. Keep the detected framework as **Next.js** and the root directory as `./`.
4. Before deploying, add these Environment Variables for Production, Preview, and Development:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

5. Deploy. Every push to the selected production branch will create a new deployment.

The local `.env` file is not uploaded to Vercel and must remain uncommitted. Configure production values in **Project → Settings → Environment Variables**. Use `.env.local` for local development if you want to mirror Vercel's convention.

Copiwrite is a commercial website. Vercel's Hobby plan is restricted to personal, non-commercial use, so use a Pro project for the production business site. Hobby is suitable for temporary development and testing.

## Production checks

```bash
npm run typecheck
npm run lint
npm run build
```
