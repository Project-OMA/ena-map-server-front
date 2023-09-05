import { useState, useCallback, useEffect } from "react";
import CardItem from "../../common/components/CardItem";
import RegisterMapModal from "../../common/modal/RegisterMapModal";
import { HeaderMapsPage, WrapperMaps } from "./style";
import { serverMapService } from "../../service/axiosServer";
import { LoadingComponent } from "../../common/styled/LoadingComponent";
import { getBackgroundLink } from "../../consts";
import { useUser } from "../../hooks/useUser";
import MapItem from "../../common/components/CardItem";

export default function MapPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [maps, setMaps] = useState([]);
  const { user } = useUser();

  const closeModal = () => {
    setOpenModal(false);
  };

  const loadMaps = useCallback(async () => {
    try {
      const response = await serverMapService.getMaps();
      setMaps(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadMaps();
  }, []);

  const renderMapCards = useCallback(() => {
    if (maps.length > 0) {
      return maps.map((map: any) => {
        return (
          <MapItem
            key={map.id_map}
            id={map.id}
            title={map.name}
            imgBg={map?.thumb_url}
          />
        );
      });
    }
    return <LoadingComponent size={30} />;
  }, [maps]);

  return (
    <>
      <HeaderMapsPage>
        <button onClick={() => setOpenModal(true)}>Cadastrar Mapas</button>
      </HeaderMapsPage>
      <WrapperMaps>
        <RegisterMapModal
          open={openModal}
          closeModal={closeModal}
          loadMaps={loadMaps}
        />
        {renderMapCards()}
      </WrapperMaps>
    </>
  );
}
