import React from "react";
import { useProducts } from "../contexts/ProductsContext";

const categories = ["laptop", "TV", "mobiltelefoner", "dammsugare"];

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="p-2">
      <h3 className="font-bold pb-4">Choose Category</h3>
      <ul>
        {categories.map((category) => (
          <li
            className="pb-1"
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              cursor: "pointer",
              fontWeight: category === selectedCategory ? "bold" : "normal",
              color: category === selectedCategory ? "red" : "black",
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
