import React from "react";

function SearchError(props) {
  if (props.searchError) {
    return <p className="error">Location not found.</p>;
  }
  return <p className="error invisible">Location found.</p>;
}

function Search(props) {
  return (
    <div className="city-search">
      <form onSubmit={props.handleSubmit}>
        <div className="search-bar">
          <input
            className="search-left"
            placeholder="Search City"
            name="city"
            type="text"
            value={props.searchTerm}
            onChange={props.handleChange}
          />
          <input
            className="search-right"
            type="submit"
            name="search"
            value="Search"
            onChange={props.handleChange}
          />
        </div>
        <SearchError searchError={props.searchError} />
        <div className="units" onChange={props.handleChange}>
          <label className="radio-label">
            <input type="radio" value="metric" name="units" defaultChecked />
            Metric
          </label>
          <label className="radio-label">
            <input type="radio" value="imperial" name="units" />
            Imperial
          </label>
        </div>
      </form>
    </div>
  );
}

export default Search;
