import React from "react";
import { Star, Plus } from "lucide-react";
import { useApp } from "../contexts/AppContext";
  
export function MenuCard({ item }) {
  const { dispatch, addToast } = useApp();

  const handleAddToCart = () => {
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
      price: item.price,
      size: item.sizes ? item.sizes[0].name : null,
      spiceLevel: 'medium'
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    addToast('Item added to cart', 'success');
    dispatch({ type: 'SET_PAGE', payload: 'orders' });
  };
 
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform overflow-hidden
                 w-full h-auto min-h-[200px] sm:min-h-[230px] md:min-h-[260px]"
     >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-24 sm:h-32 md:h-40 object-cover"
        />

       </div>

      <div className="p-2 sm:p-3 md:p-4">
        <div className="flex justify-between items-start mb-1">
          <h5 className="font-semibold text-gray-900 text-xs sm:text-xs md:text-base">
            {item.name}
          </h5>
          <div className="flex items-center text-yellow-500">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 ml-1">
              4.2
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm mb-2 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm md:text-base font-bold text-gray-900">
            ${item.price}
          </span>
          <span className="text-[8px] sm:text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded-full">
            {item.category}
          </span>
        </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium 
                     py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 md:px-4 rounded-lg 
                     transition-colors duration-200 flex items-center justify-center 
                     space-x-1 sm:space-x-2 text-[10px] sm:text-xs md:text-sm"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Add to Cart</span>
          </button>
       </div>
    </div>
  );
}