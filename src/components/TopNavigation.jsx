import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, CreditCard, ShoppingCart, Utensils } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function TopNavigation() {
  const { cart, currentPage, dispatch } = useApp();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'payment', label: 'Pay Bill', icon: CreditCard }
  ];

  return (
    <nav className="hidden md:block bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo + Company Name */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}
          >
            <Utensils className="h-7 w-7 text-red-500" />
            <span className="text-lg font-bold text-gray-900">QR Restaurant</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6 ">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: item.id })}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Cart Icon */}
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'cart' })}
              className="relative p-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
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
      </div>
    </nav>
  );
}
