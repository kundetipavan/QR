import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { MenuCard } from './MenuCard';
import { useApp } from '../contexts/AppContext';
import { Pizza, Sandwich, Croissant, Utensils } from "lucide-react"; 
import { useNavigate } from "react-router-dom";



export function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useApp();

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
  "/1.png",
  "/2.png",
  "/5.png",
  "/11.jpeg",
  "/12.png",
  ];
 

  // Auto-slide for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const itemsRes = await fetch('http://localhost:4000/api/m/menu');
        const itemsData = await itemsRes.json();

        const categoriesRes = await fetch('http://localhost:4000/api/cat/category');
        const categoriesData = await categoriesRes.json();

        setMenuItems(itemsData);
        setCategories(['All', ...categoriesData]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load menu data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8 pb-20 md:pb-8">
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
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:border-transparent bg-gray-50"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Mic className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Special Offers Carousel */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Offers</h2>

        <div className="relative w-full h-64 md:h-58 overflow-hidden shadow-lg rounded-lg">
          {/* Slides */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className={`absolute top-0 left-0 w-full h-full md:h-58 object-cover transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Dots (Indicators) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Browse by Category */}
<div className="mb-6">
  <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
    {[
      { name: "Pizza", icon: <Pizza className="text-2xl text-orange-600 hover:text-black-600"  /> },
      { name: "Burger", icon: <Sandwich className="text-2xl text-orange-600" /> },
      { name: "Bakery", icon: <Croissant className="text-2xl text-orange-500" /> },
      { name: "Biryani", icon: <Utensils className="text-2xl text-orange-600" /> },
    ].map((cat) => (
      <button
        key={cat.name}
        onClick={() => setSelectedCategory(cat.name)}
        className={`flex flex-col items-center justify-center flex-shrink-0 w-20 h-20  
          ${selectedCategory === cat.name ? "" : "text-gray-600"}`}
      >
        {cat.icon}
        <span className="text-xs font-medium mt-1">{cat.name}</span>
      </button>
    ))}
  </div>
</div>

      {/* Backend Data Section */}
      {loading ? (
        <div className="text-center py-12 text-gray-600">Loading menu...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </>
      )}
    </div>
  );
}
