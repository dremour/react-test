import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";

const InputSearch = ({ searchInput, handleInput }) => {
  return (
    <InputGroup size="sm" className="my-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        onChange={e => handleInput(e.target.value)}
        value={searchInput}
      />
    </InputGroup>
  );
};

const mapStateToProps = state => ({
  searchInput: state.searchInput
});

export default connect(mapStateToProps)(InputSearch);
