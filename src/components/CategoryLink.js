import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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

export default connect(
  null,
  { filterByCategory }
)(CategoryLink);
