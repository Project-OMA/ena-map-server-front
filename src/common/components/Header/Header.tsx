import {
  HeaderBox,
  HeaderLeftContent,
  HeaderCenterContent,
  HeaderName,
  HeaderRightContent,
} from "../../styled/main.styled";
import { ButtonHeader, WrapperButton } from "./style";

export default function Header() {
  return (
    <HeaderBox>
      <div></div>
      <HeaderName>Home</HeaderName>
      <WrapperButton>
        <ButtonHeader>Grupos</ButtonHeader>
        <ButtonHeader>Mapas</ButtonHeader>
        <ButtonHeader>Alunos</ButtonHeader>
      </WrapperButton>
    </HeaderBox>
  );
}
