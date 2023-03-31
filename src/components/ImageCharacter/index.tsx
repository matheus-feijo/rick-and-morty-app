import styled from "styled-components";

export const ImageCharacter = styled.img`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 400px) {
    width: 150px;
    height: 150px;
  }
`;
