import React from 'react';
import { Star, Plus } from 'lucide-react';

export function MenuCard({ item, onClick }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex space-x-1">
          {item.popular && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Popular
            </span>
          )}
          {item.new && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
        </div>

        {/* Veg/Non-veg indicator */}
        <div className="absolute top-2 right-2">
          <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
            item.isVeg ? 'border-green-500' : 'border-red-500'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              item.isVeg ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.5</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">${item.price}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}