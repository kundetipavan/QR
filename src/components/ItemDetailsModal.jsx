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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-[90vw] h-auto rounded-xl shadow-xl transform transition-all duration-300">
        
        {/* Header */}
        <div className="relative">
          <img 
            src={selectedMenuItem.image} 
            alt={selectedMenuItem.name}
            className="w-full h-36 object-cover rounded-t-xl"
          />
          <button
            onClick={() => dispatch({ type: 'HIDE_ITEM_MODAL' })}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Veg/Non-veg Indicator */}
          <div className="absolute top-3 left-3">
            <div className={`w-5 h-5 rounded-sm border flex items-center justify-center ${
              selectedMenuItem.isVeg ? 'border-green-500 bg-white' : 'border-red-500 bg-white'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full ${
                selectedMenuItem.isVeg ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 text-sm">
          {/* Title and Rating */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedMenuItem.name}</h2>
              <p className="text-gray-600 mt-1 text-xs">{selectedMenuItem.description}</p>
            </div>
            <div className="flex items-center text-yellow-500 ml-3">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs text-gray-600 ml-1">4.5</span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {selectedMenuItem.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  className={`p-2 rounded-md border text-center text-xs transition-all duration-200 ${
                    selectedSize === size.name
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{size.name}</div>
                  {size.price > 0 && (
                    <div className="text-[11px] text-gray-600">+${size.price}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Spice Level */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">Spice Level</h3>
            <div className="grid grid-cols-3 gap-2">
              {['mild', 'medium', 'spicy'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedSpiceLevel(level)}
                  className={`p-2 rounded-md border text-xs text-center capitalize transition-all duration-200 ${
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
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-transparent resize-none text-xs"
              rows={2}
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2 text-sm">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-base font-semibold text-gray-900 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Add to Cart Button */}
        <div className="border-t border-gray-200 p-3 bg-white">
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center text-sm"
          >
            Add to Cart - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemDetailsModal;