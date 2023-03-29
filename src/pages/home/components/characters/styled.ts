import styled from "styled-components";

export const CardCharacter = styled.div`
  background-color: #ffff;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

export const ButtonPagination = styled.button`
  width: 100px;
  height: 35px;
  padding: 5px;
  cursor: pointer;
`;

export const ImageCharacter = styled.img`
  cursor: pointer;
  @media (max-width: 400px) {
    width: 150px;
    height: 150px;
  }
`;
