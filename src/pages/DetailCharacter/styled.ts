import styled from "styled-components";

export const ImgDetailCharacter = styled.img`
  border: 10px solid #ffff;
  border-radius: 8px;

  @media (max-width: 350px) {
    width: 250px;
  }
`;

export const TextDetailCharacter = styled.p`
  font-size: 28px;
  color: #ffff;

  @media (max-width: 350px) {
    font-size: 21px;
  }
`;
