import React, { Component } from "react";
import "./App.css";
import {
  Card,
  Row,
  Col,
  Container,
  FormControl,
  InputGroup,
  Nav
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      goods: [],
      filteredList: [],
      searchInput: "",
      goodsCategories: []
    };
    this.filterGoods = this.filterGoods.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
  }

  componentDidMount() {
    fetch("https://demo3907346.mockable.io/products")
      .then(res => res.json())
      .then(result => {
        let categories = result.products.map(item => item.bsr_category);
        this.setState({
          isLoaded: true,
          goods: result.products,
          goodsCategories: categories
        });
      });
  }

  filterGoods(event) {
    let oldGoods = this.state.goods;
    let updatedList = oldGoods.filter(
      item =>
        item.brand.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    );
    this.setState({
      filteredList: updatedList,
      searchInput: event.target.value
    });
  }

  filterByCategory(category) {
    let oldGoods = this.state.goods;
    let filteredByCategoryList = oldGoods.filter(
      item => item.bsr_category === category
    );
    this.setState({
      filteredList: filteredByCategoryList
    });
  }

  render() {
    const {
      goods,
      isLoaded,
      filteredList,
      searchInput,
      goodsCategories
    } = this.state;
    let list =
      filteredList.length < 1 && searchInput === "" ? goods : filteredList;
    let filteredCategories = [];
    for (let item of goodsCategories) {
      if (filteredCategories.indexOf(item) === -1) {
        filteredCategories.push(item);
      }
    }

    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Container fluid={true}>
          <InputSearch
            filterGoods={this.filterGoods}
            searchInput={this.searchInput}
          />
          <Row className="flex-nowrap">
            <NavigationFilter
              filteredCategories={filteredCategories}
              filterByCategory={this.filterByCategory}
            />
            <Goods list={list} />
          </Row>
        </Container>
      );
    }
  }
}

const NavigationFilter = props => {
  return (
    <Nav className="flex-column">
      {props.filteredCategories.map((item, index) => (
        <Nav.Link key={index} onClick={() => props.filterByCategory(item)}>
          {item}
        </Nav.Link>
      ))}
    </Nav>
  );
};

const InputSearch = props => {
  return (
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        onChange={props.filterGoods}
        value={props.searchInput}
      />
    </InputGroup>
  );
};

const Goods = props => {
  return (
    <Row className="w-100">
      {props.list.map((item, index) => (
        <Col key={index} md={3}>
          <Card style={{ width: "18rem" }}>
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

export default App;
