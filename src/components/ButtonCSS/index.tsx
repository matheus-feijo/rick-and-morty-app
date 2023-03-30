import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface IButtonProps {
  typeCSS?: "PRIMARY" | "SECUNDARY" | "DANGER" | "FAVORITE";
  heigth?: string;
  width?: string;
  children: ReactNode;
}

export const ButtonCSS = styled.button<IButtonProps>`
  cursor: pointer;
  background-color: #ffff;
  color: black;
  padding: 5px;
  height: 35px;
  width: 100px;
  border: none;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) =>
    props.typeCSS === "PRIMARY" &&
    css`
      background-color: #89d99d;
      color: #fff;
    `}

  ${(props) =>
    props.typeCSS === "FAVORITE" &&
    css`
      width: auto;
      height: auto;
      padding: 0;
      border-radius: 0px;
    `}

  ${(props) =>
    props.heigth &&
    css`
      height: props.heigth;
    `}
`;
