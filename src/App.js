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
    this.props.location.pathname === "/"
      ? this.props.history.push("/All")
      : this.props.history.push({
          pathname: this.props.location.pathname,
          search: this.props.location.search
        });
    let { search, pathname } = this.props.location;
    let currentName = queryString.parse(search).name;
    let currentPath = pathname.slice(1);
    this.props.dispatch(getProducts(currentPath || "All", currentName || ""));
  }

  handleInput(value) {
    this.props.dispatch(filterByName(value));
    this.props.history.push({
      search:
        value.length > 0
          ? "?" + new URLSearchParams({ name: value }).toString()
          : ""
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

export default connect(mapStateToProps)(withRouter(App));
