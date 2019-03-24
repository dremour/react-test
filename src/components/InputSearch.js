import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

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

export default InputSearch;
