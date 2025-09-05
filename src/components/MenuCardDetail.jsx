import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function MenuCardDetail({ item, onClose }) {
  const { dispatch, addToast } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(item.sizes ? item.sizes[0].name : 'Medium');
  const [spiceLevel, setSpiceLevel] = useState('Medium');

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      price: item.price,
      size: selectedSize,
      spiceLevel
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    addToast('Item added to cart', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-white rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          <p className="text-gray-600 mb-4">{item.description}</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="flex gap-2">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-full border ${
                      selectedSize === size
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Spice Level</h3>
              <div className="flex gap-2">
                {['Mild', 'Medium', 'Spicy'].map((level) => (
                  <button
                    key={level}
                    className={`px-4 py-2 rounded-full border ${
                      spiceLevel === level
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setSpiceLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 rounded-full border border-gray-300"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 rounded-full border border-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold">${(item.price * quantity).toFixed(2)}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
