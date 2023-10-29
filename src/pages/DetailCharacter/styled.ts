import styled from "styled-components";

export const ImgDetailCharacter = styled.img`
  border: 15px solid #000000;
  border-radius: 8px;

  @media (max-width: 400px) {
    width: 250px;
  }
`;

export const TextDetailCharacter = styled.p`
  font-size: 28px;
  color: black;
  font-weight: 800;

  @media (max-width: 400px) {
    font-size: 21px;
  }
`;

export const ButtonDetailCharacterCSS = styled.button`
  width: 100px;
  height: 40px;

  cursor: pointer;
  border: none;

  border-radius: 8px;

  background-color: #000000;
  color: #82ff06;
  font-weight: bold;
  font-size: 16px;
`;
