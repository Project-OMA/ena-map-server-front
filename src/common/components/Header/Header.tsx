import { useRoutes } from "../../../hooks/useRoutes";
import {
  HeaderBox,
  HeaderLeftContent,
  HeaderCenterContent,
  HeaderName,
  HeaderRightContent,
} from "../../styled/main.styled";
import { ButtonHeader, WrapperButton } from "./style";
import { ArrowLeft } from "@styled-icons/fluentui-system-regular";

export default function Header() {
  const { routes } = useRoutes();

  return (
    <HeaderBox>
      {window.location.pathname.includes("map") && (
        <button onClick={() => routes.goBack()}>
          <ArrowLeft size={20} color="#000" />
        </button>
      )}
      <HeaderName><ButtonHeader onClick={() => routes.home()}>Home</ButtonHeader></HeaderName>
      <WrapperButton>
        <ButtonHeader onClick={() => routes.map()}>Grupos</ButtonHeader>
        <ButtonHeader onClick={() => routes.map()}>Mapas</ButtonHeader>
        <ButtonHeader onClick={() => routes.users()}>Usuários</ButtonHeader>
      </WrapperButton>
    </HeaderBox>
  );
}
