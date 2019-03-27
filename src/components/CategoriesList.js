import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { filterByCategory } from "../redux/actions/index";

const CategoriesList = ({ goodsCategories, filterByCategory }) => {
  const linkStyle = {
    whiteSpace: "nowrap"
  };
  return (
    <Nav className="flex-column mx-3">
      <h2>Categories</h2>
      {goodsCategories.map((item, index) => (
        <Link
          to={{
            pathname: "/" + item.split(" ").join("")
          }}
          key={index}
          onClick={() => filterByCategory(item)}
          style={linkStyle}
        >
          {item}
        </Link>
      ))}
    </Nav>
  );
};

const mapStateToProps = state => ({
  goodsCategories: state.goodsCategories
});

export default connect(
  mapStateToProps,
  { filterByCategory }
)(CategoriesList);
