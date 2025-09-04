import React from 'react';
import { Clock, CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function OrdersPage() {
  const { orders, dispatch } = useApp();

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8 pt-12">
        <div className="text-center py-16">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start ordering to see your orders here</p>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'menu' })}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
 
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>
      
<div className="space-y-6">
  {orders
    .filter(order => order.status !== 'paid') // 👈 hide paid orders
    .map((order) => (
      <OrderCard key={order.id} order={order} dispatch={dispatch} />
    ))}
</div>
                  <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'tracking' })}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Track Order
            </button>

    </div>
  );
}

function OrderCard({ order, dispatch }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'preparing': return 'text-yellow-600 bg-yellow-100';
      case 'cooking': return 'text-orange-600 bg-orange-100';
      case 'ready': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const trackingSteps = [
    { id: 'confirmed', label: 'Order Confirmed', description: 'Your order has been received' },
    { id: 'preparing', label: 'Preparation Started', description: 'Restaurant is preparing your order' },
    { id: 'cooking', label: 'Preparing Your Order', description: 'Your food is being prepared' },
    { id: 'ready', label: 'Ready for Serve', description: 'Your order will be ready for serve' }
  ];

  const currentStepIndex = trackingSteps.findIndex(step => step.id === order.trackingStatus);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-5)}</h3>
            <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {order.status.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Items Ordered</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.quantity}x {item.menuItem.name} ({item.size})
                </span>
                <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Tracking */}
 
        {/* Order Total */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {order.status === 'unpaid' && (
          <button
            onClick={() => {
              // Store current order for payment
              window.currentOrderForPayment = order;
              dispatch({ type: 'SET_PAGE', payload: 'payment' });
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Proceed to Pay
          </button>
        )}
      </div>
    </div>
  );
}