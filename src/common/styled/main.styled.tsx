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
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 3px 2px 1px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  position: relative;
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
