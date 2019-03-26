import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeCategory } from "../redux/actions/index";

const NavigationFilter = ({ filteredCategories, changeCategory }) => {
  return (
    <Nav className="flex-column">
      {filteredCategories.map((item, index) => (
        <Link
          to={{
            pathname: "/" + item.split(" ").join("")
          }}
          key={index}
          onClick={() => changeCategory(item)}
        >
          {item}
        </Link>
      ))}
    </Nav>
  );
};

export default connect(
  null,
  { changeCategory }
)(NavigationFilter);
