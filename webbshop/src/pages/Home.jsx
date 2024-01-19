import React from "react";
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const { products } = useContext(ProductContext);

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
        {products.map((product) => (
          <div key={product._id} className="p-4 bg-white rounded shadow">
            <p className="hidden">{product.category}</p>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">
              {truncateDescription(product.description, 40)}
            </p>
            <button className="bg-blue-500 text-white p-2 mt-2 rounded">
              Read More{" "}
              <Link to={`/product/${product._id}`}>{"product/:productId"}</Link>
            </button>

            <p className="text-green-600 font-bold">${product.price}</p>

            {/* Add other product details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
