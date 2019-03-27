import React from "react";
import { Card, Col } from "react-bootstrap";

const Goods = ({ name, category, brand, img }) => {
  return (
    <Col md={3}>
      <Card>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{brand}</Card.Title>
          <Card.Text>{name}</Card.Text>
          <Card.Text>{category}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Goods;
