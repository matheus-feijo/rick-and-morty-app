import styled from "styled-components";

export const ImageCharacter = styled.img`
  cursor: pointer;
  transition: 0.3s;
  border-radius: 8px;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 500px) {
    width: 100%;
    height: 200px;
  }
`;
