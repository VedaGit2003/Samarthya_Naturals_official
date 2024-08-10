import React from 'react';
import { Checkbox } from 'antd';
import './CategoryDropDown.css';

const CategoryDropDown = ({ categories, handleFilter }) => {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Categories
      </button>
      <ul className="dropdown-menu">
        {categories?.map((c) => (
          <li key={c._id}>
            <div className="checkbox-container"> {/* Flex container */}
              <Checkbox
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="dropdown-item"
              />
              <span className="category-name">{c.name}</span> {/* Category name */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropDown;
