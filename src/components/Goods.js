import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Goods = ({ list }) => {
  return (
    <Row className="w-100">
      {list.map((item, index) => (
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

export default Goods;
