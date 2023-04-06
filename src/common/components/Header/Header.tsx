import {
  HeaderBox,
  HeaderLeftContent,
  HeaderCenterContent,
  HeaderName,
  HeaderRightContent,
} from "../../styled/main.styled";

export default function Header() {
  return (
    <HeaderBox>
      <HeaderLeftContent></HeaderLeftContent>
      <HeaderCenterContent>
        <HeaderName>Servidor de Mapas</HeaderName>
      </HeaderCenterContent>
      <HeaderRightContent></HeaderRightContent>
    </HeaderBox>
  );
}
