import styled, { css } from "styled-components";

interface ICardCharacterProps {
  favorite?: boolean;
}

export const CardCSS = styled.div<ICardCharacterProps>`
  background-color: #000000;
  text-align: center;
  padding: 10px;
  border-radius: 8px;

`;
