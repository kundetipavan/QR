import React from "react";
import { Utensils } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function HomePage() {
  const { dispatch } = useApp();

  return (
    <section className="flex flex-col items-center justify-center py-[10em]">
<div
  className="w-[18em] h-[20em] flex flex-col items-center justify-center bg-white 
  border border-gray-300 shadow-lg rounded-2xl p-6 
  transition-all duration-300 hover:shadow-2xl hover:border-red-400  "
>
      {/* Logo */}
      <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
        <Utensils className="w-10 h-10 text-red-500" />
      </div>

      {/* Welcome Text */}
      <p className="text-gray-500 text-sm mb-1">Welcome to</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
       QR Restaurant
      </h1>

      {/* Table Number */}
      <div className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-lg mb-8">
        You're seated at Table 12
      </div>

      {/* Button */}
      <button
        onClick={() => dispatch({ type: "SET_PAGE", payload: "menu" })}
        className="w-full max-w-xs bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
      >
        View Menu
      </button>
    </div>
    </section>
  );
}
