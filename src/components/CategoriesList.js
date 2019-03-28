import React from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";

import CategoryLink from "./CategoryLink";
import PropTypes from "prop-types";

const CategoriesList = ({ goodsCategories }) => {
  return (
    <Nav className="flex-column mx-3">
      <h2>Categories</h2>
      {goodsCategories.map((item, index) => (
        <CategoryLink key={index} category={item} />
      ))}
    </Nav>
  );
};

CategoriesList.propTypes = {
  goodsCategories: PropTypes.array
};

const mapStateToProps = state => ({
  goodsCategories: state.goodsCategories
});

export default connect(mapStateToProps)(CategoriesList);
