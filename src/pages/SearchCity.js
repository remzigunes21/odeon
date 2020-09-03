import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = styled.form`
  display: flex;
  flex-direction: row;
  top: ${({ showResult }) => (showResult ? "0%" : "30%")};
  position: relative;
  margin: 0 auto;
  max-width: 1000px;
  transition: 0.8s 0.5s;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: grey;
      opacity: 0.5; /* Firefox */
    }
  }
`;

const SearchIcon = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
`;

const Button = styled.button`
  /* This renders the buttons above... Edit me! */

  border-radius: 10px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 50%;
  background: aqua;
  color: white;
  border: 2px solid white;
`;
const SearchCity = ({ submit, value, change, showResult }) => {
  return (
    <>
      <SearchBar showResult={showResult} onSubmit={submit}>
        <SearchInput
          type="text"
          value={value}
          placeholder="Lütfen Bir Şehir Giriniz"
          onChange={change}
        />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        <Button onClick={submit}>Search</Button>
      </SearchBar>
    </>
  );
};

SearchCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
};

export default SearchCity;
