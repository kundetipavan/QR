import React from 'react';
import { ArrowLeft, Download, Receipt as ReceiptIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function ReceiptPage() {
  const { dispatch } = useApp();
  
  const receipt = window.currentReceipt || {
    orderNumber: '12345',
    table: '12',
    date: 'Jan 15, 2024',
    time: '14:30',
    items: [
      { menuItem: { name: 'Margherita Pizza' }, quantity: 1, price: 12.99 },
      { menuItem: { name: 'Caesar Salad' }, quantity: 1, price: 8.99 },
      { menuItem: { name: 'Iced Tea' }, quantity: 2, price: 7.98 }
    ],
    subtotal: 29.96,
    tax: 3.00,
    total: 32.96,
    paymentMethod: 'Credit Card'
  };

  const handleDownloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
RECEIPT
The Urban Kitchen
123 Main Street, Downtown

Order Number: #${receipt.orderNumber}
Table: ${receipt.table}
Date: ${receipt.date}
Time: ${receipt.time}

ITEMS:
${receipt.items.map(item => 
  `${item.menuItem.name} x${item.quantity} - $${item.price.toFixed(2)}`
).join('\n')}

Subtotal: $${receipt.subtotal.toFixed(2)}
Tax (10%): $${receipt.tax.toFixed(2)}
Total: $${receipt.total.toFixed(2)}

Payment Method: ${receipt.paymentMethod}

Thank you for dining with us!
    `;

    // Create and download file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receipt.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 pb-20 md:pb-8 min-h-screen bg-gray-50">
      <button
        onClick={() => dispatch({ type: 'SET_PAGE', payload: 'orders' })}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="text-center py-8 bg-white">
          <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ReceiptIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Receipt</h1>
        </div>

        {/* Receipt Details */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-semibold text-gray-900">#{receipt.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Table</span>
                <span className="font-semibold text-gray-900">{receipt.table}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">{receipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold text-gray-900">{receipt.time}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            {receipt.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{item.menuItem.name}</div>
                  <div className="text-sm text-gray-600">x{item.quantity}</div>
                </div>
                <div className="font-semibold text-gray-900">${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%)</span>
              <span>${receipt.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${receipt.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-600 pt-2">
              <span>Payment Method</span>
              <span>{receipt.paymentMethod}</span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadReceipt}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mb-4"
          >
            <Download className="h-4 w-4" />
            <span>Download Receipt</span>
          </button>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'tracking' })}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
            >
              Track Order
            </button>
            
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'menu' })}
              className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Back to Menu
            </button>
          </div>

          {/* Restaurant Info */}
          <div className="mt-8 text-center text-gray-600">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-lg">🏪</span>
              <span className="font-semibold">Table 12 Restaurant</span>
            </div>
            <div className="text-sm">123 Restaurant Street, Foodville, FC 12345</div>
          </div>
        </div>
      </div>
    </div>
  );
}