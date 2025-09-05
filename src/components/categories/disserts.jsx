import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuCard } from "../MenuCard"; 

function Disserts() {
    const [selectedCategory, setSelectedCategory] = useState('biryani');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get("http://localhost:4000/api/m/menu"),
                    axios.get("http://localhost:4000/api/cat/category"),
                ]);

                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error("Error fetching data from backend:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    if (loading) {
        return <p className="p-8 text-center text-lg">Loading...</p>;
    }

    return (
        <div className="bg-white min-h-screen p-6 hidden">
            {/* Header */}
            <div
                className="w-full h-[200px] flex items-center justify-center relative rounded-2xl mb-8"
                style={{
                    backgroundImage: "url('/1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-white bg-opacity-60 rounded-2xl" />
                {/*<h2 className="relative z-10 text-2xl font-bold text-left w-full sm:text-center sm:text-xl xs:text-center">
                    <em>Delight in Every Bite</em>
                </h2>*/}
            </div>

            {/* Main Content */}
            <div className="flex gap-8 px-1">
                {/* Sidebar */}
                <aside
                    className="w-1/4 bg-white shadow-lg rounded-xl p-4 hidden lg:block"
                    style={{ left: "10rem", top: "16rem", zIndex: 20, height: "fit-content" }}
                >
                    {/* Categories */}
                    <div className="mb-8">
                        <h3 className="font-bold text-sm mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`flex justify-between items-center rounded px-3 py-2 cursor-pointer font-semibold transition 
                    ${selectedCategory === cat.name
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-50 hover:bg-gray-300"
                                        }`}
                                >
                                    <span>{cat.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div
                        className="
                            grid grid-cols-2
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-4
                        "
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, idx) => (
                                <MenuCard
                                    key={idx}
                                    item={{
                                        image: product.img, // ✅ matches your MenuCard prop
                                        name: product.name,
                                        description: product.description || "Tasty and fresh!",
                                        price: product.price,
                                        category: product.category,
                                    }}
                                    onClick={() => console.log("Clicked:", product.name)}
                                />
                            ))
                        ) : (
                            <p>No products found for selected category.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Disserts;
