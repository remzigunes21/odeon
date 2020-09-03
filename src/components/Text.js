import styled from "styled-components";

const Text = styled.span`
  color: ${({ color }) => color || "#000000"};
  display: block;
  font-size: ${({ fontSize }) => fontSize || "12px"};
  text-align: ${({ align }) => align || "left"};

  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
`;

export default Text;
