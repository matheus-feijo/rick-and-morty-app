import styled, { css } from "styled-components";

interface ICardCharacterProps {
  favorite?: boolean;
}

export const CardCharacter = styled.div<ICardCharacterProps>`
  background-color: #ffff;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
`;
