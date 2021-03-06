import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SearchInput = ({ searchInputValue, handleInput }) => {
  return (
    <InputGroup size="sm" className="my-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        onChange={e => handleInput(e.target.value)}
        value={searchInputValue}
      />
    </InputGroup>
  );
};

SearchInput.propTypes = {
  searchInputValue: PropTypes.string,
  handleInput: PropTypes.func
};

const mapStateToProps = state => ({
  searchInputValue: state.searchInputValue
});

export default connect(mapStateToProps)(SearchInput);
