import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

const Goods = ({ searchInput, filteredList, filteredByCategory }) => {
  let newList =
    filteredList.length < 1 && searchInput === ""
      ? filteredByCategory
      : filteredList;
  return (
    <Row className="w-100 m-0">
      {newList.map((item, index) => (
        <Col key={index} md={3}>
          <Card>
            <Card.Img variant="top" src={item.img} />
            <Card.Body>
              <Card.Title>{item.brand}</Card.Title>
              <Card.Text>{item.name}</Card.Text>
              <Card.Text>{item.bsr_category}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const mapStateToProps = state => ({
  searchInput: state.searchInput,
  filteredList: state.filteredList,
  filteredByCategory: state.filteredByCategory
});

export default connect(mapStateToProps)(Goods);
