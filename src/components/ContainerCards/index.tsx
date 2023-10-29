import styled from "styled-components";

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;

  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;
