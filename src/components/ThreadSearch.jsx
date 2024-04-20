import React from 'react';
import PropTypes from 'prop-types';

function ThreadSearch({ search, searchChange }) {
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Search by Thread Title..."
        value={search}
        onChange={(event) => searchChange(event.target.value)}
      />
    </section>
  );
}

ThreadSearch.propTypes = {
  search: PropTypes.string.isRequired,
  searchChange: PropTypes.func.isRequired,
};

export default ThreadSearch;
