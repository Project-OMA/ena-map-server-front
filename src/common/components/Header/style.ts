import styled from "@emotion/styled";

export const ButtonHeader = styled.button`
  cursor: pointer;
  height: 100%;
  width: 7rem;
  background: transparent;

  &:hover {
    border-bottom: 2px solid #000;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  height: 100%;
  margin-left: auto;
`;
