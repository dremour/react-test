import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeCategory } from "../redux/actions/index";

const NavigationFilter = ({ goodsCategories, changeCategory }) => {
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
          onClick={() => changeCategory(item)}
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
  { changeCategory }
)(NavigationFilter);
