# Copiwrite marketing website

Full-stack Next.js marketing site for Copiwrite.

## Run locally

```bash
npm install
npm run dev
```

The site uses system font stacks and does not contact Google Fonts during development or builds.

## WhatsApp Views-to-Sales landing page

The product page is available at `/sell-on-whatsapp`. Its final commercial details are configured with public environment variables so the same build works locally and on Vercel:

```env
NEXT_PUBLIC_WHATSAPP_PRODUCT_NAME=WhatsApp Views-to-Sales
NEXT_PUBLIC_WHATSAPP_PRODUCT_PRICE=5000
NEXT_PUBLIC_WHATSAPP_PRODUCT_ORIGINAL_VALUE=
NEXT_PUBLIC_WHATSAPP_VIDEO_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
NEXT_PUBLIC_WHATSAPP_CHECKOUT_URL=https://your-checkout-link.example
NEXT_PUBLIC_WHATSAPP_IMPLEMENTATION_URL=
```

The product defaults to ₦5,000. The price accepts a plain number such as `5000` and displays it as Nigerian naira, so the environment variable can override the default later. The original value and premium implementation URL are optional. When `NEXT_PUBLIC_WHATSAPP_CHECKOUT_URL` is blank, purchase buttons use the built-in Paystack checkout at `/sell-on-whatsapp/checkout`. The premium service button stays hidden until its URL is configured.

Add `PAYSTACK_PUBLIC_KEY`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_CALLBACK_URL`, `RESEND_API_KEY`, `CONTACT_FROM`, and optionally `DELIVERY_ACCESS_SECRET` to `.env.local` and to the Vercel project environment variables. Use `https://your-domain.com/payment/verify` as the callback URL. The server fixes the product price at ₦5,000 (500,000 kobo), initializes payment with the secret key, and verifies status, amount and currency after Paystack redirects the buyer back.

After verification, each buyer is redirected to a signed private access page where the included `whatsapp-views-to-sales-video-slides.pdf` file can be downloaded. The verified callback also emails the access link through Resend and sends the purchase to Telegram. Set `DELIVERY_ACCESS_SECRET` to a long random value in production; when omitted, the Paystack secret is used to sign access links.

This product uses the live callback only. After Paystack redirects the buyer to `/payment/verify`, the server verifies the transaction, emails the private guide link and sends Telegram the buyer's name, email, WhatsApp number, Paystack reference, a direct WhatsApp contact button and the buyer's access page. No webhook route is used by this product, leaving the Paystack account webhook available for the other application.

Because these values use `NEXT_PUBLIC_`, they are intentionally visible in the browser. Never put a Telegram token or other secret in these fields.

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
