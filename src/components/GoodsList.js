import React from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Goods from "./Goods";
import PropTypes from "prop-types";

const GoodsList = ({
  searchInputValue,
  filteredByName,
  filteredByCategory
}) => {
  let newList =
    filteredByName.length < 1 && searchInputValue === ""
      ? filteredByCategory
      : filteredByName;
  return (
    <Row className="w-100 m-0">
      {newList.map((item, index) => (
        <Goods
          key={index}
          name={item.name}
          brand={item.brand}
          category={item.bsr_category}
          img={item.img}
        />
      ))}
    </Row>
  );
};

GoodsList.propTypes = {
  searchInputValue: PropTypes.string,
  filteredByName: PropTypes.array,
  filteredByCategory: PropTypes.array
};

const mapStateToProps = state => ({
  searchInputValue: state.searchInputValue,
  filteredByName: state.filteredByName,
  filteredByCategory: state.filteredByCategory
});

export default connect(mapStateToProps)(GoodsList);
