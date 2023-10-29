import styled from "styled-components";

export const HeaderCSS = styled.header`
  height: 8vh;
  background-color: #000000;

  color: #82ff06;

  display: flex;
  gap: 50px;
  padding: 25px 50px;
`;

export const NavButtonCSS = styled.div`
  cursor: pointer;
  font-size: 21px;
  transition: font-size 0.5s;

  :hover {
    font-size: 22px;
    border-bottom: 2px solid #1df301;
  }
`;
