import React from "react";
import { Utensils } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function HomePage() {
  const { dispatch } = useApp();

  return (
    <section
      className="
        relative flex items-center justify-center h-[91vh] w-full
        bg-white sm:bg-[url('/bg1.jpeg')] sm:bg-cover sm:bg-center
      "
    >
      {/* ===== Mobile Layout (plain) ===== */}
      <div className="w-full flex flex-col items-center justify-center sm:hidden px-6">
        <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mb-6">
          <Utensils className="w-10 h-10 text-red-500" />
        </div>

        <p className="text-gray-600 text-sm mb-1">Welcome to</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          QR Restaurant
        </h1>

        <div className="bg-gray-100 text-gray-800 text-sm px-5 py-2 rounded-lg mb-10 shadow-sm">
          You’re seated at <span className="font-semibold">Table 12</span>
        </div>

        <button
          onClick={() => dispatch({ type: "SET_PAGE", payload: "menu" })}
          className="w-[80%] bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition"
        >
          View Menu
        </button>
      </div>

      {/* ===== Desktop/Tablet Layout (larger glass card) ===== */}
      <div
        className="
          hidden sm:flex relative z-10 flex-col items-center justify-center
          w-[600px] h-[500px]   /* 🔥 Increased size */
          shadow-2xl rounded-2xl
          p-10
        "
      >
        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <Utensils className="w-8 h-8 text-red-500" />
        </div>

        <p className="text-gray-700 text-base mb-1">Welcome to</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">QR Restaurant</h1>

        <div className="bg-gray-100 text-gray-800 text-base px-5 py-2 rounded-lg mb-6 shadow-sm">
          You’re seated at <span className="font-semibold">Table 12</span>
        </div>

        <button
          onClick={() => dispatch({ type: "SET_PAGE", payload: "menu" })}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 py-3 rounded-lg shadow-md transition"
        >
          View Menu
        </button>
      </div>
    </section>
  );
}