// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import your HTTP library (e.g., axios)

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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
      <h2>{product.name}</h2>
      <img src={product.images[0]} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default ProductDetails;