import { useState } from "react";
import MapItem from "../../../common/components/CardItem";
import { LoadingComponent } from "../../../common/styled/LoadingComponent";
import { MapContainer, MapListContainer } from "./style";
import InfiniteScroll from "react-infinite-scroll-component";

type IMapList = {
  maps: any[];
  nextPage: () => void;
  hasMore: boolean;
  loading: boolean;
};

export default function MapList({
  maps = [],
  nextPage,
  hasMore,
  loading,
}: IMapList) {
  return (
    <>
      {maps.length > 0 ? (
        <MapContainer id="infinite-scroll-element">
          <InfiniteScroll
            dataLength={maps.length}
            next={() => nextPage()}
            hasMore={hasMore}
            scrollableTarget="infinite-scroll-element"
            loader={!loading && <LoadingComponent size={30} />}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4rem",
              justifyContent: "center",
            }}
          >
            {maps.map((map: any) => {
              return (
                <MapItem
                  key={map.id_map}
                  id={map.id}
                  title={map.name}
                  imgBg={map?.thumb_url}
                  inCompleted={map?.in_completed}
                />
              );
            })}
          </InfiniteScroll>
        </MapContainer>
      ) : (
        <LoadingComponent size={30} />
      )}
    </>
  );
}
