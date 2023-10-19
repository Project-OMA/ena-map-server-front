import styled from "@emotion/styled";

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 8rem;
  gap: 0.2rem;
  font-weight: lighter;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
`;

interface ButtonHeaderI {
  isActive: boolean;
}

export const ButtonHeader = styled.button<ButtonHeaderI>`
  cursor: pointer;
  height: 100%;
  width: 100%;
  height: 3rem;
  background-color: ${({ isActive }) => (isActive ? "#c2c2c2" : "transparent")};
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.5s;

  &:hover {
    background-color: #eaeaea;
  }
  &:active {
    background-color: #c2c2c2;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  height: 100%;
  margin-left: auto;
`;
