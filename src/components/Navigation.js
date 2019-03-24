import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

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

export default NavigationFilter;
