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
    <div className="flex-row bg-pink-100 ">
      <CategoryFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4 bg-pink-100">
        {selected.map((product) => (
          <div key={product._id} className="p-4 bg-white rounded shadow">
            <p className="hidden">{product.category}</p>
            <h2 className="text-xl font-bold text-center pb-4">
              {product.name}
            </h2>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full object-cover my-4"
            />

            <p className="text-gray-700 mb-4">
              {truncateDescription(product.description, 40)}
            </p>

            <Link
              className="bg-pink-400 w-full mb-4 py-1.5 px-1.5 rounded-md text-white hover:bg-pink-600 transition-colors"
              to={`/product/${product._id}`}
            >
              Read more
            </Link>
            <p className="text-green-600 font-bold mt-4">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
