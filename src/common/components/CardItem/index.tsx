import { downloadMapUrl, getBackgroundLink } from "../../../consts";
import { serverMapService } from "../../../service/axiosServer";
import {
  CardBody,
  CardHeader,
  CardTitle,
  DownloadButton,
  ImgBackground,
  WrapperCard,
} from "./style";
import { ImageNotSupported } from "@styled-icons/material-outlined";
import { Download } from "@styled-icons/boxicons-regular";

type ICardItem = {
  title: string;
  id: number;
  imgBg?: string;
};

export default function MapItem({ title, id, imgBg }: ICardItem) {
  return (
    <WrapperCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <DownloadButton href={downloadMapUrl(id)}>
          <Download size={20} color="#000" />
        </DownloadButton>
      </CardHeader>
      <CardBody>
        {imgBg ? (
          <ImgBackground
            src={getBackgroundLink(imgBg)}
            alt="Thumbnail do Mapa"
            crossOrigin="anonymous"
            loading="lazy"
          />
        ) : (
          <ImageNotSupported size={75} color="rgba(0,0,0,0.5)" />
        )}
      </CardBody>
    </WrapperCard>
  );
}
