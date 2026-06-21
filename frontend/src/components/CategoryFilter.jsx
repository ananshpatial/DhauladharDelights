import React from "react";
import { categories } from "../utils/sampleData";

const CategoryFilter = ({ activeCategory, onChange }) => (
  <div className="category-filter" aria-label="Food categories">
    {categories.map((category) => (
      <button
        className={activeCategory === category ? "chip active" : "chip"}
        key={category}
        type="button"
        onClick={() => onChange(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
