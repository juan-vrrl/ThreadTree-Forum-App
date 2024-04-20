import React from 'react';
import PropTypes from 'prop-types';

function ThreadFilter({ categories, filter, filterChange }) {
  return (
    <section className="search-bar">
      <p>Filter by Categories</p>
      <select name="category" id="category" value={filter} onChange={filterChange}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  );
}

ThreadFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
};

export default ThreadFilter;
