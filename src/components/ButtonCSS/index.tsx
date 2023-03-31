import styled, { css } from "styled-components";

interface IButtonProps {
  typeCSS?: "PRIMARY" | "ICON" | "FAVORITE" | "DANGER";
  submit?: boolean;
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
    props.submit &&
    css`
      background-color: #1c5e7f;
      color: #fff;
    `}

  ${(props) =>
    props.typeCSS === "PRIMARY" &&
    css`
      background-color: #89d99d;
      color: black;
    `}

  ${(props) =>
    props.typeCSS === "FAVORITE" &&
    css`
      width: auto;
      height: auto;
      padding: 0;
      border-radius: 0px;
      background-color: transparent;
    `}

  ${(props) =>
    props.typeCSS === "ICON" &&
    css`
      height: auto;
      width: auto;
    `}
    
    ${(props) =>
    props.typeCSS === "DANGER" &&
    css`
      background-color: #bf0426;
      color: #ffff;
    `}
`;
