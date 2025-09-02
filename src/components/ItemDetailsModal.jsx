import React, { useState } from 'react';
import { X, Minus, Plus, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function ItemDetailsModal() {
  const { selectedMenuItem, showItemModal, dispatch } = useApp();
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState('mild');
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!showItemModal || !selectedMenuItem) return null;

  const sizePrice = selectedMenuItem.sizes.find(size => size.name === selectedSize)?.price || 0;
  const totalPrice = (selectedMenuItem.price + sizePrice) * quantity;

  const handleAddToCart = () => {
    dispatch({ type: 'HIDE_ITEM_MODAL' });
    dispatch({ type: 'SHOW_OTP_MODAL' });
    
    // Store the item details temporarily for after OTP verification
    window.tempCartItem = {
      id: `${selectedMenuItem.id}-${Date.now()}`,
      menuItem: selectedMenuItem,
      size: selectedSize,
      spiceLevel: selectedSpiceLevel,
      quantity,
      specialInstructions,
      price: totalPrice
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-2xl md:rounded-lg overflow-hidden transform transition-all duration-300">
        {/* Header */}
        <div className="relative">
          <img 
            src={selectedMenuItem.image} 
            alt={selectedMenuItem.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={() => dispatch({ type: 'HIDE_ITEM_MODAL' })}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Veg/Non-veg indicator */}
          <div className="absolute top-4 left-4">
            <div className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center ${
              selectedMenuItem.isVeg ? 'border-green-500 bg-white' : 'border-red-500 bg-white'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                selectedMenuItem.isVeg ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {/* Title and Rating */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedMenuItem.name}</h2>
              <p className="text-gray-600 mt-1">{selectedMenuItem.description}</p>
            </div>
            <div className="flex items-center text-yellow-500 ml-4">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-sm text-gray-600 ml-1">4.5</span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedMenuItem.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                    selectedSize === size.name
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{size.name}</div>
                  {size.price > 0 && (
                    <div className="text-sm text-gray-600">+${size.price}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Spice Level */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Spice Level</h3>
            <div className="grid grid-cols-3 gap-2">
              {['mild', 'medium', 'spicy'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedSpiceLevel(level)}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 capitalize ${
                    selectedSpiceLevel === level
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests or allergies..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-semibold text-gray-900 w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Add to Cart Button */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            Add to Cart - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}