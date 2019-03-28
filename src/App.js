import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";

import CategoriesList from "./components/CategoriesList";
import SearchInput from "./components/SearchInput";
import GoodsList from "./components/GoodsList";
import { getProducts, filterByName } from "./redux/actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    const { location, history, getProducts } = this.props;
    location.pathname === "/"
      ? history.push("/All")
      : history.push({
          pathname: location.pathname,
          search: location.search
        });
    let { search, pathname } = location;
    let currentName = queryString.parse(search).name;
    let currentCategory = pathname.slice(1);
    getProducts(currentCategory || "All", currentName || "");
  }

  handleInput(value) {
    const { filterByName, history } = this.props;
    filterByName(value);
    history.push({
      search: value.length > 0 ? "?" + new URLSearchParams({ name: value }) : ""
    });
  }

  render() {
    const { isLoaded } = this.props;

    if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Container fluid={true}>
          <SearchInput handleInput={this.handleInput} />
          <Row className="flex-nowrap">
            <CategoriesList />

            <GoodsList />
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoaded: state.isLoaded
});

const mapActionsToProps = {
  filterByName,
  getProducts
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(App));
