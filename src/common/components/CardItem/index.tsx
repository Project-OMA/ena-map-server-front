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
import { isStudent } from "../../../utils/verifyTypeFromUser";
import { useUser } from "../../../hooks/useUser";
import { CheckCircleFill } from "@styled-icons/bootstrap";
import Tooltip from "@mui/material/Tooltip";

type ICardItem = {
  title: string;
  id: number;
  imgBg?: string;
  handleSelectMap?: () => void;
  inCompleted?: boolean;
};

export default function MapItem({
  title,
  id,
  imgBg,
  handleSelectMap,
  inCompleted = false,
}: ICardItem) {
  const { user } = useUser();

  return (
    <WrapperCard>
      <CardHeader
        style={{
          background: inCompleted ? "rgba(0,0,0,0.1)" : "",
          borderRadius: 4,
        }}
      >
        <CardTitle>{title}</CardTitle>
        <WrapperButtons>
          {!isStudent(user.type) && (
            <DownloadButton href={downloadMapUrl(id)}>
              <Download size={20} color="#000" />
            </DownloadButton>
          )}
          {!isStudent(user.type) && (
            <Button onClick={handleSelectMap}>
              <Pencil size={20} color="#000" />
            </Button>
          )}
          {inCompleted == true && (
            <Tooltip title="Concluído">
              <Button style={{ marginLeft: "auto" }}>
                <CheckCircleFill size={25} color="#00C851" />
              </Button>
            </Tooltip>
          )}
        </WrapperButtons>
      </CardHeader>
      <CardBody
        style={{
          opacity: inCompleted ? 0.8 : 1,
        }}
      >
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
