import Header from "../../../common/components/Header/Header";
import {
  ContainerDiv,
  H1Title,
  H2Title,
  PageContent,
} from "../../../common/styled/main.styled";
import { GroupCreatedBy, GroupHeader } from "./style";
import MapList from "./MapList";
import { groupService } from "../../../service/axiosServer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";

const Group = () => {
  const [groupSelected, setGroupSelected] = useState<any>(null);
  const [maps, setMaps] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useUser();
  const { id } = useParams();
  const LIMIT_MAPS_PAGE = 9;

  useEffect(() => {
    handleLoadGroup();
  }, []);

  const handleLoadGroup = async () => {
    try {
      const group = await groupService.findById(parseInt(id as string));
      setGroupSelected(group.data);

      const maps = await groupService.getMapsByGroupAndUser(
        parseInt(id as string),
        user.id,
        LIMIT_MAPS_PAGE,
        0
      );

      setMaps(maps.data.maps);

      if (maps.data.maps.length >= maps.data.count) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadNextMaps = async () => {
    try {
      setLoading(true);

      let newPage: number = page + 1;
      let newOffset = page * LIMIT_MAPS_PAGE;
      let newMaps = [...maps];

      const newMapsResponse = await groupService.getMapsByGroupAndUser(
        parseInt(id as string),
        user.id,
        LIMIT_MAPS_PAGE,
        newOffset
      );

      if (newMapsResponse.data.maps.length > 0) {
        newMaps = [...newMaps, ...newMapsResponse.data.maps];
        setMaps(newMaps);
      }
      setPage(newPage);

      if (newMaps.length >= newMapsResponse.data.count) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Grupo" />
      {groupSelected && (
        <main>
          <ContainerDiv>
            <GroupHeader>
              <H1Title>Grupo: {groupSelected.name}</H1Title>
              <GroupCreatedBy>
                <strong>Criado em:</strong>{" "}
                {new Date(groupSelected.created_at).toLocaleDateString()}
              </GroupCreatedBy>
            </GroupHeader>
            <PageContent>
              <H2Title>Mapas</H2Title>
              <MapList
                maps={maps}
                nextPage={handleLoadNextMaps}
                hasMore={hasMore}
                loading={loading}
              />
            </PageContent>
          </ContainerDiv>
        </main>
      )}
    </>
  );
};

export default Group;
