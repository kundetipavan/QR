import React from 'react';
import { ShoppingCart, Utensils } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Navbar() {
  const { cart, dispatch } = useApp();
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40 block sm:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}
          >
            <Utensils className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">QR Restaurant</span>
          </div>
          
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'cart' })}
            className="relative p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
