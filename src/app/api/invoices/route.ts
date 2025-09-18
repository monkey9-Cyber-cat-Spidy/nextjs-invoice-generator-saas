import { NextResponse } from 'next/server';

let INVOICES = [
  {
    id: 'INV-2025-001',
    clientName: 'CloudScale Technologies Ltd',
    clientEmail: 'billing@cloudscale.io',
    issueDate: '2025-09-15',
    dueDate: '2025-10-15',
    currency: '$',
    items: [
      { id: '1', description: 'Next.js App Router Architecture & SSR Migration', quantity: 40, rate: 85 },
      { id: '2', description: 'PostgreSQL PostGIS Geo-Indexing & Connection Pooling', quantity: 25, rate: 95 }
    ],
    taxRate: 18,
    discount: 50
  }
];

export async function GET() {
  return NextResponse.json({ invoices: INVOICES });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newInvoice = {
    ...body,
    id: `INV-2025-${String(INVOICES.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString()
  };
  INVOICES.unshift(newInvoice);
  return NextResponse.json({ message: 'Invoice saved', invoice: newInvoice }, { status: 201 });
}
