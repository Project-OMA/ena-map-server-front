import { downloadMapUrl, getBackgroundLink } from "../../../consts";
import { serverMapService } from "../../../service/axiosServer";
import {
  Button,
  CardBody,
  CardHeader,
  CardTitle,
  DownloadButton,
  ImgBackground,
  WrapperButtons,
  WrapperCard,
} from "./style";
import { ImageNotSupported } from "@styled-icons/material-outlined";
import { Download } from "@styled-icons/boxicons-regular";
import { Pencil } from "@styled-icons/boxicons-solid";

type ICardItem = {
  title: string;
  id: number;
  imgBg?: string;
  handleSelectMap?: () => void;
};

export default function MapItem({
  title,
  id,
  imgBg,
  handleSelectMap,
}: ICardItem) {
  return (
    <WrapperCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <WrapperButtons>
          <DownloadButton href={downloadMapUrl(id)}>
            <Download size={20} color="#000" />
          </DownloadButton>
          <Button>
            <Pencil onClick={handleSelectMap} size={20} color="#000" />
          </Button>
        </WrapperButtons>
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
