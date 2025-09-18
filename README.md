# Next.js Invoice Generator SaaS

Full-featured invoice generator application built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS. Supports real-time subtotal/tax calculations, multi-currency support, custom line items, and print-optimized PDF generation.

## Features

- **Next.js 14 App Router Architecture**: Modern React Server Components + Client interactivity.
- **Dynamic Calculations**: Real-time reactive subtotal, tax rate percentage, and discount arithmetic.
- **Multi-Currency Support**: Instant toggle between USD ($), EUR (€), and INR (₹).
- **Print Optimization**: Print stylesheet eliminating non-printable action bars for clean PDF exports.
- **REST Persistence API**: `/api/invoices` route handler for creating and retrieving saved customer invoices.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Production Build

```bash
npm run build
npm start
```
