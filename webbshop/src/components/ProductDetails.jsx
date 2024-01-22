// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import your HTTP library (e.g., axios)
import { useProducts } from "../contexts/ProductsContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { cartItems, setcartItems } = useProducts();

  useEffect(() => {
    // Assuming you have a function like fetchProductById to get product details
    const fetchProductDetails = async () => {
      try {
        // Make an API call to fetch the product details based on the productId
        const response = await axios.get(
          `https://js2-ecommerce-api.vercel.app/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]); // Re-run the effect when productId changes

  if (!product) {
    return <div>Loading...</div>; // You might want to show a loading indicator while fetching data
  }

  // Render your product details here
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 text-center">{product.name}</h2>
      <img src={product.images[0]} alt={product.name} />
      <p className="text-gray-700 mb-2 text-xl">{product.description}</p>
      <p className="text-green-600 my-8 font-bold text-3xl text-end">
        ${product.price}
      </p>
      <button
        onClick={() => {
          setcartItems([
            ...cartItems,
            { name: product.name, price: product.price, id: product._id },
          ]);
        }}
        className="bg-blue-500 text-white p-2 mt-2 rounded"
      >
        Add to cart{" "}
      </button>
    </div>
  );
};

export default ProductDetails;
