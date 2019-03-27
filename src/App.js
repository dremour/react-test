import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";

import NavigationFilter from "./components/Navigation";
import InputSearch from "./components/InputSearch";
import Goods from "./components/Goods";
import { getProducts, filterGoods } from "./redux/actions/index";

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
    this.props.dispatch(filterGoods(value));
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
          <InputSearch handleInput={this.handleInput} />
          <Row className="flex-nowrap">
            <NavigationFilter />

            <Goods />
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
