// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useProducts } from "../contexts/ProductsContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { cartItems, setcartItems } = useProducts();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://js2-ecommerce-api.vercel.app/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Render your product details here
  return (
    <div className="max-h-screen">
      <h2 className="text-3xl font-bold mb-2 text-center">{product.name}</h2>
      <img
        className="items-center w-1/2 mx-auto"
        src={product.images[0]}
        alt={product.name}
      />
      <p className="text-gray-700 mb-2 text-xl">{product.description}</p>
      <p className="text-green-600 my-8 font-bold text-3xl text-end">
        ${product.price}
      </p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        className="mb-2"
      />
      <button
        onClick={() => {
          setcartItems([
            ...cartItems,
            {
              name: product.name,
              price: product.price,
              id: product._id,
              quantity: quantity,
            },
          ]);
          navigate("/");
        }}
        className="bg-blue-500 text-white p-2 mt-2 rounded"
      >
        Add to cart{" "}
      </button>
    </div>
  );
};

export default ProductDetails;
