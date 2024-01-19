// CategoryFilterContext.js
import React, { createContext, useState, useContext } from "react";

const CategoryFilterContext = createContext();

const CategoryFilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryFilterContext.Provider value={{ selectedCategory, setCategory }}>
      {children}
    </CategoryFilterContext.Provider>
  );
};

const useCategoryFilter = () => {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error(
      "useCategoryFilter must be used within a CategoryFilterProvider"
    );
  }
  return context;
};

export { CategoryFilterProvider, useCategoryFilter };
