import { getBackgroundLink } from "../../../consts";
import {
  CardBody,
  CardHeader,
  CardTitle,
  ImgBackground,
  WrapperCard,
} from "./style";
import { ImageNotSupported } from "@styled-icons/material-outlined";

type ICardItem = {
  title: string;
  imgBg?: string;
};

export default function CardItem({ title, imgBg }: ICardItem) {
  return (
    <WrapperCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
