import React, { useState } from 'react';
import { Search, Mic, ArrowLeft } from 'lucide-react';
import { menuItems, categories } from '../data/menuData';
import { MenuCard } from './MenuCard';
import { useApp } from '../contexts/AppContext';

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { dispatch } = useApp();

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const specialOffers = menuItems.filter(item => item.popular || item.new).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-8">
      {/* Back Button */}
      <div className="py-4">
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Header */}
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">The Urban Kitchen</h1>
        <div className="flex items-center text-gray-600 text-sm">
          <span>📍 123 Main Street, Downtown</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search menu items, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Mic className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Special Offers */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Offers</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex-shrink-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 text-white min-w-80">
            <h3 className="font-semibold text-lg mb-1">Happy Hour Special</h3>
            <p className="text-sm opacity-90">20% OFF on Selected Items</p>
          </div>
          <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 text-white min-w-80">
            <h3 className="font-semibold text-lg mb-1">Weekend Special</h3>
            <p className="text-sm opacity-90">Special Menu Available</p>
          </div>
          <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white min-w-80">
            <h3 className="font-semibold text-lg mb-1">Family Combo</h3>
            <p className="text-sm opacity-90">Buy 2 Get 1 Free on Desserts</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      {selectedCategory === 'All' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specialOffers.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onClick={() => dispatch({ type: 'SHOW_ITEM_MODAL', payload: item })}
              />
            ))}
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <MenuCard 
            key={item.id} 
            item={item} 
            onClick={() => dispatch({ type: 'SHOW_ITEM_MODAL', payload: item })}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}