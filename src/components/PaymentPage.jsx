import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Banknote, ArrowLeft, Lock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function PaymentPage() {
  const { dispatch, addToast } = useApp();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    walletPin: ''
  });
  
  // Get current order (this would be passed from orders page)
  const currentOrder = window.currentOrderForPayment || {
    subtotal: 58.97,
    tax: 4.72,
    total: 63.69
  };

  const savedCards = [
    { id: 'visa', type: 'Visa', last4: '4242', expiry: '12/24' },
    { id: 'mastercard', type: 'Mastercard', last4: '8790', expiry: '09/25' }
  ];

  const otherMethods = [
    { id: 'new-card', label: 'New Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'cash', label: 'Cash', icon: Banknote }
  ];

 
  const handleContinueToPayment = () => {
    if (selectedPaymentMethod === 'cash') {
      handlePayment();
      return;
    }
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    // Simulate payment processing
    addToast('Payment Successful', 'success');
    
    // Update order status to paid and create receipt data
    if (window.currentOrderForPayment) {
      const updatedOrder = {
        ...window.currentOrderForPayment,
        status: 'paid',
        paymentMethod: getPaymentMethodName(selectedPaymentMethod)
      };
      dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
      
      // Store receipt data
      window.currentReceipt = {
        orderNumber: updatedOrder.id.slice(-5),
        table: '12',
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        items: updatedOrder.items,
        subtotal: updatedOrder.subtotal,
        tax: updatedOrder.tax,
        total: updatedOrder.total,
        paymentMethod: getPaymentMethodName(selectedPaymentMethod)
      };
      
      delete window.currentOrderForPayment;
    }
    
    setTimeout(() => {
      dispatch({ type: 'SET_PAGE', payload: 'receipt' });
    }, 1500);
  };

  const getPaymentMethodName = (methodId) => {
    if (methodId === 'visa' || methodId === 'mastercard') return 'Credit Card';
    if (methodId === 'new-card') return 'Credit Card';
    if (methodId === 'upi') return 'UPI';
    if (methodId === 'wallets') return 'Wallet';
    if (methodId === 'cash') return 'Cash';
    if (digitalWallets.find(w => w.id === methodId)) {
      return digitalWallets.find(w => w.id === methodId).label;
    }
    return 'Credit Card';
  };

  const handleInputChange = (field, value) => {
    setPaymentFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (showPaymentForm) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <button
          onClick={() => setShowPaymentForm(false)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Payment Methods
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h1>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {selectedPaymentMethod === 'new-card' || savedCards.find(c => c.id === selectedPaymentMethod) ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formatCardNumber(paymentFormData.cardNumber)}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formatExpiryDate(paymentFormData.expiryDate)}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={paymentFormData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={paymentFormData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </>
          ) : selectedPaymentMethod === 'upi' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={paymentFormData.upiId}
                onChange={(e) => handleInputChange('upiId', e.target.value)}
                placeholder="yourname@upi"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          ) : selectedPaymentMethod === 'wallets' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet PIN
              </label>
              <input
                type="password"
                value={paymentFormData.walletPin}
                onChange={(e) => handleInputChange('walletPin', e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          ) : null}

          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${currentOrder.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${currentOrder.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold text-red-600">
                <span>Total</span>
                <span>${currentOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
        >
          Pay ${currentOrder.total.toFixed(2)}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
 
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h1>
      
      {/* Saved Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Cards</h2>
        <div className="space-y-3">
          {savedCards.map((card) => (
            <label key={card.id} className="block">
              <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedPaymentMethod === card.id 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value={card.id}
                    checked={selectedPaymentMethod === card.id}
                    onChange={() => setSelectedPaymentMethod(card.id)}
                    className="text-red-500 focus:ring-red-500"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                      {card.type === 'Visa' ? 'VISA' : 'MC'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {card.type} ending in {card.last4}
                      </div>
                      <div className="text-sm text-gray-600">Expires {card.expiry}</div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Other Payment Methods */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Other Payment Methods</h2>
        <div className="grid grid-cols-4 gap-3">
          {otherMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={` border-2 rounded-lg p-2 text-center transition-all duration-200 ${
                  selectedPaymentMethod === method.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mx-auto mb-2 text-red-500" />
                <div className="font-small text-gray-900">{method.label}</div>
              </button>
            );
          })}
        </div>
      </div>

 
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${currentOrder.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${currentOrder.tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold text-red-600">
              <span>Total</span>
              <span>${currentOrder.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinueToPayment}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
      >
        Continue - ${currentOrder.total.toFixed(2)}
      </button>
    </div>
  );
}