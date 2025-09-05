import React, { useState } from "react";
import { X, Minus, Plus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ItemDetailsModal({ item }) {
  const [size, setSize] = useState("Medium");
  const [spice, setSpice] = useState("Mild");
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showCartBar, setShowCartBar] = useState(false);

  const navigate = useNavigate();

  const basePrice = 12.99;
  const sizePrice = size === "Small" ? 0 : size === "Medium" ? 2 : 4;

  const extras = [
    { id: 1, name: "Cheese Slice", price: 1.5 },
    { id: 2, name: "French Fries", price: 2.99 },
    { id: 3, name: "Coke", price: 1.99 },
  ];

  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const extra = extras.find((e) => e.id === id);
    return sum + (extra ? extra.price : 0);
  }, 0);

  const totalPrice = (basePrice + sizePrice + extrasTotal) * quantity;

  const toggleExtra = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    // ✅ Just show bottom bar
    setShowCartBar(true);
  };

  const handleClose = () => {
    // ✅ Close and go to Menu page
    navigate("/menu");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-[100vh]  ">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-y-auto relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main Image */}
        <img
          src={item?.image || "/1.png"}
          alt={item?.name || "Item"}
          className="w-full h-44 object-cover rounded-t-2xl"
        />

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">
              {item?.name || "Classic Burger"}
            </h2>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium">4.5</span>
            </div>
          </div>

          <p className="text-gray-600 mb-3 text-sm">
            {item?.description ||
              "Juicy beef patty with lettuce, tomato, onion, and our special sauce"}
          </p>

          {/* Size Options */}
          <div className="mb-3">
            <h3 className="text-xs font-semibold mb-1">Size</h3>
            <div className="flex space-x-2">
              {["Small", "Medium", "Large"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 text-xs rounded-md border ${
                    size === s
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {s} {s === "Medium" ? "+$2" : s === "Large" ? "+$4" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Spice Level */}
          <div className="mb-3">
            <h3 className="text-xs font-semibold mb-1">Spice Level</h3>
            <div className="flex space-x-2">
              {["Mild", "Medium", "Spicy"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpice(s)}
                  className={`px-3 py-1.5 text-xs rounded-md border ${
                    spice === s
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-3">
            <h3 className="text-xs font-semibold mb-1">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests..."
              className="w-full border border-gray-300 rounded-md p-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
              rows={2}
            />
          </div>

          {/* Extras */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold mb-1">Add Extra Items</h3>
            <div className="space-y-2">
              {extras.map((extra) => (
                <label
                  key={extra.id}
                  className="flex items-center justify-between border p-2 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra.id)}
                      onChange={() => toggleExtra(extra.id)}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-xs">{extra.name}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    +${extra.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold text-sm"
          >
            Add to Cart – ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>

      {/* ✅ Bottom bar */}
      {showCartBar && (
        <div className="fixed bottom-0  left-0 right-0 bg-green-500   text-white px-4 py-3 flex items-center justify-between z-50">
          <span className="text-sm font-medium">1 item added</span>
          <button
            onClick={() => navigate("/cart")}
            className="bg-white text-green-600 font-semibold text-sm px-3 py-1 rounded-md"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
