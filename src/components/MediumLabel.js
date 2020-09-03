import styled from "styled-components";

const MediumLabel = styled.h3`
  color: ${({ color }) => color || "#ffffff"};
  display: block;
  font-weight: ${({ weight }) => weight || "600"};
  font-size: ${({ fontSize }) => fontSize || "20px"};
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

export default MediumLabel;
