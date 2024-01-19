import React from "react";
import { useCategoryFilter } from "../contexts/CategoryFilterContext";

const categories = ["laptop", "TV", "mobiltelefoner", "dammsugare"];

const CategoryFilter = () => {
  const { selectedCategory, setCategory } = useCategoryFilter();

  return (
    <div className="p-4">
      <h3 className="font-bold">Choose Category</h3>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => setCategory(category)}
            style={{
              cursor: "pointer",
              fontWeight: category === selectedCategory ? "bold" : "normal",
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
