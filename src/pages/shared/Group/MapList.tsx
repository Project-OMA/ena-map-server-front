import MapItem from '../../../common/components/CardItem';
import { LoadingComponent } from '../../../common/styled/LoadingComponent';
import { MapListContainer } from './style';

export default function MapList({maps = []}: any){
  return <>
    {maps.length > 0 ?
      <MapListContainer>
        {
          maps.map((map: any) => {
            return (
              <MapItem
                key={map.id_map}
                id={map.id}
                title={map.name}
                imgBg={map?.thumb_url}
              />
            );
          })
        }
      </MapListContainer>
    : 
     <LoadingComponent size={30} />
  }
  </>
}