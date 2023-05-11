import { CardBody, CardHeader, CardTitle, WrapperCard } from "./style";
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
          imgBg
        ) : (
          <ImageNotSupported size={75} color="rgba(0,0,0,0.5)" />
        )}
      </CardBody>
    </WrapperCard>
  );
}
