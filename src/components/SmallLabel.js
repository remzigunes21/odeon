import styled from "styled-components";

const SmallLabel = styled.h4`
  color: ${({ color }) => color || "#FFFFFF"};
  display: block;
  font-weight: ${({ weight }) => weight || "600"};
  font-size: ${({ fontSize }) => fontSize || "15px"};
  text-align: ${({ align }) => align || "left"};
  padding: 5px 0;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
`;

export default SmallLabel;
