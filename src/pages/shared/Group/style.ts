import styled from "@emotion/styled";

export const GroupCreatedBy = styled.p`
  margin-top: 10px;
`;

export const GroupHeader = styled.div``;

export const MapListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  flex-wrap: wrap;

  & .infinite-scroll {
    display: flex !important;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
    padding: 0 0.8rem;
  }
`;

export const MapContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-height: 40rem;
  gap: 20px;
  flex-wrap: wrap;
  overflow-y: scroll;
`;
