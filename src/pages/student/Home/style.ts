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
  width: 80%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

export const ButtonSector = styled.div`
  width: 25rem;
  background-color: #fefefefe;
  padding: 2rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: relative;
  box-shadow: 0px 10px 13px 10px rgba(0, 0, 0, 0.07);

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

  @media (max-width: 768px) {
    width: 90%;
  }
`;
