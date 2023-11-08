import styled from "@emotion/styled";

export const WrapperPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  gap: 30%;
`;

export const ButtonSector = styled.div`
  width: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  p {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }
`;
