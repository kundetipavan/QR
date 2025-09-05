import React from 'react';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function CartPage() {
  const { cart, dispatch, addToast } = useApp();

  const subtotal = cart.reduce((total, item) => total + (Number(item.price) || 0), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      addToast('Item removed from cart', 'info');
      return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
      const updatedItem = {
        ...item,
        quantity: newQuantity,
        price: (item.menuItem.price + (item.menuItem.sizes.find(s => s.name === item.size)?.price || 0)) * newQuantity
      };
      dispatch({ type: 'UPDATE_CART_ITEM', payload: updatedItem });
    }
  };

  const handleConfirmOrder = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cart,
      subtotal,
      tax,
      total,
      status: 'unpaid',
      trackingStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedTime: '15-20 minutes'
    };
    
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    dispatch({ type: 'CLEAR_CART' });
    addToast('Order confirmed successfully!', 'success');
    dispatch({ type: 'SET_PAGE', payload: 'orders' });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    addToast('Cart cleared', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <div className="text-center py-16">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started</p>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'menu' })}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>
      
      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start space-x-4">
              {item.menuItem?.image && (
                <img 
                  src={item.menuItem.image} 
                  alt={item.menuItem?.name || 'Menu Item'}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.menuItem?.name || 'Unknown Item'}</h3>
                <div className="text-sm text-gray-600 space-y-1 mt-1">
                  {item.size && <p>Size: {item.size}</p>}
                  {item.spiceLevel && <p>Spice Level: {item.spiceLevel}</p>}
                  {item.specialInstructions && (
                    <p>Instructions: {item.specialInstructions}</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 mb-2">
                  ${(Number(item.price) || 0).toFixed(2)}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  
                  <span className="font-medium text-gray-900 w-8 text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => {
                  dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
                  addToast('Item removed from cart', 'info');
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'menu' })}
          className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Add More Items
        </button>
        
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
        >
          Confirm Order
        </button>
        
        <button
          onClick={handleClearCart}
          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}