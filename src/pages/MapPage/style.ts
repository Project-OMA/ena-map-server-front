import styled from "@emotion/styled";

export const WrapperMaps = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 100px;
  width: 100%;
  padding: 100px;
`;

export const HeaderMapsPage = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.05);
  align-items: center;

  button {
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 5px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-left: auto;
    transition: all 0.5s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
