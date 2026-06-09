This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sri Chaitanya AI Chatbot MVP

This project includes a floating Sri Chaitanya AI assistant powered by Google Gemini and restricted to local, approved knowledge files.

### Environment

Create `.env.local` from `env.example`:

```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
GEMINI_FALLBACK_MODEL=gemini-1.5-flash
```

### Knowledge Files

The chatbot reads plain text files from `/knowledge` before calling Gemini:

- `admissions.txt`
- `branches.txt`
- `courses.txt`
- `facilities.txt`
- `faq.txt`
- `fee-structure.txt`
- `hostel.txt`
- `transport.txt`
- `contact.txt`

Update these files with verified Sri Chaitanya information only. If the retrieval step cannot find matching verified context, the bot returns: `I could not find verified information in the Sri Chaitanya knowledge base.`

### Architecture

- `src/components/chatbot-widget.tsx` - floating responsive chat UI with streaming, history, loading, retry, and auto-scroll.
- `src/app/api/chat/route.ts` - App Router API route with validation, throttling, retrieval, and Gemini streaming.
- `src/lib/chatbot/knowledge.ts` - local knowledge loader, chunking, and keyword retrieval.
- `src/lib/chatbot/security.ts` - input sanitization, off-topic blocking, and basic abuse detection.
- `src/lib/chatbot/gemini.ts` - Google Gemini streaming adapter with fallback model support.

The MVP intentionally does not include an admin panel, analytics dashboard, user management, vector database, or enterprise features.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
