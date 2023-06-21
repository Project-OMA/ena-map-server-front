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
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  gap: 10px;
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

export const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  width: 90%;
  gap: 15px;
`;

export const MapCard = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  align-items: center;
  border-radius: 10px;
  z-index: 10;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-right: 1.5rem;
`;

export const ImgCard = styled.img`
  height: 95%;
  width: 40%;
  object-fit: cover;
  z-index: 1;
  background-color: #fff;
`;

export const WrapperDnD = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 5rem;
  gap: 3rem;
  height: 100%;
  h1 {
    font-size: 1.5rem;
  }
`;
