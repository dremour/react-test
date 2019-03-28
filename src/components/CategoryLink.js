import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { filterByCategory } from "../redux/actions/index";

const CategoryLink = ({ category, filterByCategory }) => {
  const linkStyle = {
    whiteSpace: "nowrap"
  };
  return (
    <Link
      to={{
        pathname: "/" + category.split(" ").join("")
      }}
      onClick={() => filterByCategory(category)}
      style={linkStyle}
    >
      {category}
    </Link>
  );
};

CategoryLink.propTypes = {
  category: PropTypes.string,
  filterByCategory: PropTypes.func
};

export default connect(
  null,
  { filterByCategory }
)(CategoryLink);
