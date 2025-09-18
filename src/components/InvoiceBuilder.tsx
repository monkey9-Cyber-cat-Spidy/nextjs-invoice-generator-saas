'use client';
import React, { useState } from 'react';
import { Plus, Trash2, Printer, Save, FileText, CheckCircle2 } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoiceBuilder() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2025-001');
  const [senderName, setSenderName] = useState('KVS Satya Manikanta - Full Stack Engineering');
  const [senderEmail, setSenderEmail] = useState('mk1343093@gmail.com');
  const [clientName, setClientName] = useState('Valeff Labs Technologies');
  const [clientEmail, setClientEmail] = useState('accounts@valefflabs.io');
  const [issueDate, setIssueDate] = useState('2025-09-15');
  const [dueDate, setDueDate] = useState('2025-10-15');
  const [currency, setCurrency] = useState('$');
  const [taxRate, setTaxRate] = useState(18);
  const [discount, setDiscount] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [items, setItems] = useState<LineItem[]>([
    { id: '1', description: 'Full-Stack Next.js 14 Web Architecture & SSR Pipeline', quantity: 40, rate: 85 },
    { id: '2', description: 'PostgreSQL Database Performance Tuning & CDC Stream', quantity: 20, rate: 95 },
    { id: '3', description: 'Ubuntu VPS Nginx Reverse Proxy & PM2 Daemon Deployment', quantity: 15, rate: 75 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: String(Date.now()), description: 'New engineering deliverable', quantity: 1, rate: 50 }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = Math.max(0, subtotal + taxAmount - discount);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    try {
      await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          issueDate,
          dueDate,
          currency,
          items,
          taxRate,
          discount
        })
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Top Action Bar */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-indigo-400" />
          <div>
            <h1 className="text-lg font-bold text-white">Next.js Invoice Generator</h1>
            <p className="text-xs text-slate-400">Generate, customize, and print client invoices</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 font-medium"
          >
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="₹">INR (₹)</option>
          </select>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition"
          >
            {savedSuccess ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
            {savedSuccess ? 'Saved!' : 'Save'}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition"
          >
            <Printer className="h-4 w-4" />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Invoice Document Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-slate-200">
        {/* Header Grid */}
        <div className="grid grid-cols-2 gap-8 border-b border-slate-800 pb-8 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">From</span>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full bg-transparent font-semibold text-white focus:outline-none focus:border-b border-indigo-500 text-base mb-1"
            />
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-400 focus:outline-none"
            />
          </div>

          <div className="text-right">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">INVOICE</h2>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Invoice #: <span className="font-mono text-slate-200 font-semibold">{invoiceNumber}</span></div>
              <div>Issue Date: <span className="text-slate-200">{issueDate}</span></div>
              <div>Due Date: <span className="text-slate-200">{dueDate}</span></div>
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">Billed To</span>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-transparent font-medium text-white focus:outline-none focus:border-b border-indigo-500 text-sm mb-1"
          />
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-400 focus:outline-none"
          />
        </div>

        {/* Line Items Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 pr-4">Description</th>
                <th className="py-3 px-4 text-right">Hours/Qty</th>
                <th className="py-3 px-4 text-right">Rate</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 pl-4 text-right no-print"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {items.map((item) => (
                <tr key={item.id} className="group">
                  <td className="py-3 pr-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-transparent text-slate-200 focus:outline-none focus:border-b border-indigo-500 font-medium"
                    />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-16 bg-transparent text-right text-slate-200 focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-20 bg-transparent text-right text-slate-200 focus:outline-none"
                    />
                  </td>
                  <td className="py-3 px-4 text-right font-semibold font-mono text-white">
                    {currency}{(item.quantity * item.rate).toFixed(2)}
                  </td>
                  <td className="py-3 pl-4 text-right no-print">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addItem}
            className="no-print mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Line Item
          </button>
        </div>

        {/* Calculation Totals */}
        <div className="border-t border-slate-800 pt-6 flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="font-mono text-slate-200">{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Tax ({taxRate}%):</span>
              <span className="font-mono text-slate-200">{currency}{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Discount:</span>
              <span className="font-mono text-slate-200">-{currency}{discount.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold text-white">
              <span>Total Due:</span>
              <span className="font-mono text-indigo-400 text-base">{currency}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
