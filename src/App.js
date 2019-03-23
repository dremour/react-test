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
import { Route, Link, withRouter } from "react-router-dom";
import queryString from "query-string";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      goods: [],
      filteredList: [],
      filteredByCategory: [],
      searchInput: "",
      goodsCategories: [],
      currentCategory: ""
    };
    this.filterByCategory = this.filterByCategory.bind(this);
  }

  componentDidMount() {
    fetch("https://demo3907346.mockable.io/products")
      .then(res => res.json())
      .then(result => {
        let categories = result.products.map(item => item.bsr_category);
        let currentName = queryString.parse(this.props.location.search).name;
        console.log(currentName);
        this.setState({
          isLoaded: true,
          goods: result.products,
          goodsCategories: ["All", ...categories]
        });

        let { search, pathname } = this.props.location;
        const params = search.slice(1);
        pathname = pathname.slice(1);
        const param = params.split("=");

        this.setState({ searchInput: param[1], currentCategory: pathname });
        debugger;
        this.filterByCategory(pathname);
        this.filterGoods(param[1] || "");
      });
  }

  filterByCategory(category) {
    debugger;
    const currentCategory = category.split(" ").join("");
    let oldGoods = this.state.goods;
    let filteredByCategoryList =
      category !== "All"
        ? oldGoods.filter(
            item => item.bsr_category.split(" ").join("") === currentCategory
          )
        : oldGoods;
    this.setState({
      filteredByCategory: filteredByCategoryList,
      filteredList: filteredByCategoryList,
      currentCategory,
      searchInput: ""
    });
  }

  filterGoods(value) {
    let oldGoods =
      this.state.currentCategory === "All"
        ? this.state.goods
        : this.state.filteredByCategory;
    let updatedList = oldGoods.filter(
      item => item.brand.toLowerCase().search(value.toLowerCase()) !== -1
    );

    this.props.history.push({
      search:
        value.length > 0
          ? "?" + new URLSearchParams({ name: value }).toString()
          : ""
    });
    this.setState({
      filteredList: updatedList,
      searchInput: value
    });
  }

  render() {
    const {
      goods,
      isLoaded,
      filteredList,
      filteredByCategory,
      searchInput,
      goodsCategories
    } = this.state;
    let list =
      filteredList.length < 1 && searchInput === ""
        ? filteredByCategory
        : filteredList;
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
            filterGoods={e => this.filterGoods(e.target.value)}
            searchInput={searchInput}
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
        <Link
          to={{
            pathname: "/" + item.split(" ").join("")
          }}
          key={index}
          onClick={() => props.filterByCategory(item)}
        >
          {item}
        </Link>
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

export default withRouter(App);
