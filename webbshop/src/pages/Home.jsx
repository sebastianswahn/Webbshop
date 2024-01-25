import React from "react";

import { Link } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import { useProducts } from "../contexts/ProductsContext";

const Home = () => {
  const { products, selectedCategory } = useProducts();
  const selected = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.split(" ").slice(0, maxLength).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="flex">
      <CategoryFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Render products here */}
        {selected.map((product) => (
          <div key={product._id} className="p-4 bg-white rounded shadow">
            <p className="hidden">{product.category}</p>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">
              {truncateDescription(product.description, 40)}
            </p>

            <Link
              className="bg-emerald-700 w-full mb-4 py-1.5 px-1.5 rounded-md text-white hover:bg-emerald-600 transition-colors"
              to={`/product/${product._id}`}
            >
              Read more
            </Link>
            <p className="text-green-600 font-bold mt-4">${product.price}</p>
            {/* Add other product details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
