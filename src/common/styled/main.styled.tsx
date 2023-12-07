import styled from "@emotion/styled";

export const TitleBox = styled.div`
  padding: 10px 20px;
`;

export const Title = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

export const OppacityTitle = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
`;

export const SeparatorLine = styled.div`
  width: 100%;
  height: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const HeaderBox = styled.div`
  height: 52px;
  background-color: #fff;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 3px 2px 1px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  position: relative;
  button {
    cursor: pointer;
  }
`;

export const HeaderLeftContent = styled.div``;

export const HeaderCenterContent = styled.div``;

export const HeaderRightContent = styled.div``;

export const HeaderName = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const ButtonBox = styled.div`
  margin: 10px 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const WrapperApplication = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
`;

export const ButtonRadius = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 330px;
  background: #333333;

  border-radius: 8px;
  color: #fff;
  transition: all 0.5s;

  :disabled {
    background-color: #e5e5e5;
    color: #999999;
    cursor: auto !important;
    :hover {
      filter: brightness(1) !important;
    }
  }

  cursor: pointer;
  :hover {
    filter: brightness(0.8);
  }
`;

export const ErrorText = styled.p`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #d32f2f;
`;

export const WrapperPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 0 30px;
`;

export const H1Title = styled.h1`
  font-size: 30px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
`;

export const H2Title = styled.h1`
  font-size: 20px;
  margin-bottom: 22px;
  margin-top: 40px;
`;

export const ContainerDiv = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 1300px;
`;

export const PageContent = styled.div`
  margin: 25px 0;
`;
