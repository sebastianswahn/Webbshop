import React from "react";
import { useProducts } from "../contexts/ProductsContext";

const categories = ["all", "laptop", "TV", "mobiltelefoner", "dammsugare"];

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="py-4 flex">
      <h3 className="font-bold pb-4">Choose Category</h3>
      <ul className="flex ">
        {categories.map((category) => (
          <li
            className="px-3"
            key={category}
            onClick={() =>
              setSelectedCategory(category === "all" ? null : category)
            }
            style={{
              cursor: "pointer",
              fontWeight: category === selectedCategory ? "bold" : "normal",
              color: category === selectedCategory ? "red" : "black",
              textTransform: "capitalize",
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
