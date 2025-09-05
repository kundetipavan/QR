import React, { useState, useEffect } from 'react';
import { Search, Mic, MapPin } from 'lucide-react';
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
  const navigate = useNavigate();

  // Voice search state
  const [listening, setListening] = useState(false);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/1.png", "/2.png", "/5.png", "/11.jpeg", "/12.png"];

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch menu + categories
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

  // Voice Search Handler
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.start();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8 pb-20 md:pb-8">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">QR Restaurant</h1>
        <div className="flex items-center text-gray-500 text-xs mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>123 Main Street, Downtown</span>
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
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:border-transparent bg-gray-50"
        />
        <button
          onClick={handleVoiceSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <Mic className={`h-5 w-5 ${listening ? "text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      {/* Special Offers Carousel */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Offers</h2>
        <div className="relative w-full h-64 md:h-40 overflow-hidden shadow-lg rounded-lg">
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

      {/* Categories */}
      <div className="mb-6">
        <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { name: "Starters", icon: <Utensils className="text-2xl text-orange-600" />, path: "/starters" },
            { name: "Main Course", icon: <Sandwich className="text-2xl text-orange-600" />, path: "/main-course" },
            { name: "Desserts", icon: <Croissant className="text-2xl text-orange-600" />, path: "/desserts" },
            { name: "Beverages", icon: <Pizza className="text-2xl text-orange-600" />, path: "/beverages" },
          ].map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className="flex flex-col items-center justify-center flex-shrink-0"
            >
              <div className="bg-orange-100 p-3 rounded-full">
                {cat.icon}
              </div>
              <span className="text-xs font-medium mt-2">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Items</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading menu...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <>
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
    </div>
  );
}
