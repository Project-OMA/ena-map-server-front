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
  gap: 20%;
`;

export const ButtonSector = styled.div`
  width: 40rem;
  background-color: #fefefefe;
  padding: 2rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: relative;
  p {
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
  }
  img {
    object-fit: contain;
    width: 20rem;
    height: 20rem;
  }

  transition: all ease-out 0.5s;
  &:hover {
    filter: brightness(0.9);
    p {
      font-weight: 600;
    }
  }
`;
