import styled from "styled-components";

export const HeaderCSS = styled.header`
  height: 8vh;
  background-color: #000000;

  color: #82ff06;

  display: flex;
  align-items: center;
  gap: 50px;
  padding: 25px 50px;

  @media screen and (max-width: 500px) {
    justify-content: center;
    gap: 20;
  }
`;

export const NavButtonCSS = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  color: #1df301;

  font-size: 21px;
  transition: font-size 0.5s;

  :hover {
    font-size: 22px;
  }
`;
