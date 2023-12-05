import styled from "@emotion/styled";

export const WrapperModalRegister = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderModal = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  padding: 20px;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  position: relative;

  button {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
`;

export const BodyModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 50px 0px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
`;

export const FooterModalWrapper = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
`;

export const ModalTitle = styled.h1`
  font-size: 25px;
  font-weight: 400;
`;

export const WrapperInput = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const LabelInput = styled.h1`
  margin-right: auto;
  font-size: 18px;
  font-weight: 400;
`;

export const DropContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  /* /* transition: height 0.2s ease; */
  background: #f2f2f2;
`;

export const DropButton = styled.button`
  border: 2px solid transparent;
  width: 150px;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;

  :hover {
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

export const MapFileCard = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #ffff;
  justify-content: space-between;

  font-size: 0.8rem;

  button {
    cursor: pointer;
  }
`;

export const DropText = styled.p`
  width: 200px;
  margin-top: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;
