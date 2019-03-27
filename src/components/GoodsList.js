import React from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Goods from "./Goods";

const GoodsList = ({ searchInput, filteredByName, filteredByCategory }) => {
  let newList =
    filteredByName.length < 1 && searchInput === ""
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

const mapStateToProps = state => ({
  searchInput: state.searchInput,
  filteredByName: state.filteredByName,
  filteredByCategory: state.filteredByCategory
});

export default connect(mapStateToProps)(GoodsList);
