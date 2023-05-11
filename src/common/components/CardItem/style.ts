import styled from "@emotion/styled";

export const WrapperCard = styled.div`
  width: 15rem;
  background: #f8f8f8;
  border-radius: 8px;
  height: 15rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h1`
  font-size: 1.2rem;
  color: #000;
  font-weight: 400;
`;

export const CardHeader = styled.div`
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  padding: 12px;
`;

export const CardBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
