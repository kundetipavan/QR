import React from 'react';
import { Clock, CheckCircle, ArrowLeft, Printer, Mail } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function OrderTrackingPage() {
  const { dispatch } = useApp();
  
  // This would typically receive the order ID as a prop
  const order = {
    id: 'ORD-12345',
    trackingStatus: 'cooking',
    estimatedTime: '15-20 minutes',
    createdAt: new Date().toISOString()
  };

  const trackingSteps = [
    { 
      id: 'confirmed', 
      label: 'Order Confirmed', 
      description: 'Your order has been received',
      time: '9:41 AM'
    },
    { 
      id: 'preparing', 
      label: 'Preparation Started', 
      description: 'Restaurant is preparing your order',
      time: '9:42 AM'
    },
    { 
      id: 'cooking', 
      label: 'Preparing Your Order', 
      description: 'Your food is being prepared',
      time: '15-20 minutes remaining'
    },
    { 
      id: 'ready', 
      label: 'Ready for Serve', 
      description: 'Your order will be ready for serve',
      time: 'Estimated: 10:00 AM'
    }
  ];

  const currentStepIndex = trackingSteps.findIndex(step => step.id === order.trackingStatus);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
      {/* Back Button */}
      <button
        onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </button>

      {/* Order Status Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order in Progress</h1>
        <p className="text-gray-600">Order #{order.id.slice(-5)}</p>
      </div>

      {/* Tracking Timeline */}
      <div className="mb-8">
        <div className="space-y-6">
          {trackingSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    isCompleted 
                      ? 'border-red-500 bg-red-500' 
                      : 'border-gray-300 bg-white'
                  }`}>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-white" />
                    )}
                    {isCurrent && !isCompleted && (
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 ${
                      isCompleted ? 'bg-red-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
                
                <div className="flex-1 pb-6">
                  <div className={`font-semibold ${isCurrent ? 'text-red-600' : 'text-gray-900'}`}>
                    {step.label}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{step.time}</div>
                  <div className="text-sm text-gray-600 mt-1">{step.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🏪</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Table 12 Restaurant</div>
            <div className="text-sm text-gray-600">123 Restaurant Street, Foodville, FC 12345</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'orders' })}
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

        {/* Receipt Options 
        <div className="flex space-x-3 mt-6">
          <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            <Printer className="h-4 w-4" />
            <span>Print Receipt</span>
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email Receipt</span>
          </button>
        </div>*/}
      </div>
    </div>
  );
}