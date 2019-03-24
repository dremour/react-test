import React, { Component } from "react";
import "./App.css";
import { Row, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavigationFilter from "./components/Navigation";
import InputSearch from "./components/InputSearch";
import Goods from "./components/Goods";
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

  componentWillMount() {
    this.props.location.pathname === "/"
      ? this.props.history.push("/All")
      : this.props.history.push({
          pathname: this.props.location.pathname,
          search: this.props.location.search
        });
  }

  componentDidMount() {
    fetch("https://demo3907346.mockable.io/products")
      .then(res => res.json())
      .then(result => {
        let categories = result.products.map(item => item.bsr_category);
        let { search, pathname } = this.props.location;
        let currentName = queryString.parse(search).name;
        let currentPath = pathname.slice(1);
        this.setState({
          isLoaded: true,
          goods: result.products,
          goodsCategories: ["All", ...categories],
          searchInput: currentName,
          currentCategory: currentPath
        });
        this.filterByCategory(currentPath);
        this.filterGoods(currentName || "");
      });
  }

  filterByCategory(category) {
    const currentCategory = category.split(" ").join("");
    let { goods } = this.state;
    let filteredByCategoryList =
      category !== "All"
        ? goods.filter(
            item => item.bsr_category.split(" ").join("") === currentCategory
          )
        : goods;
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
    let filteredByNameList = oldGoods.filter(
      item => item.brand.toLowerCase().search(value.toLowerCase()) !== -1
    );
    this.props.history.push({
      search:
        value.length > 0
          ? "?" + new URLSearchParams({ name: value }).toString()
          : ""
    });
    this.setState({
      filteredList: filteredByNameList,
      searchInput: value
    });
  }

  render() {
    const {
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

export default withRouter(App);
