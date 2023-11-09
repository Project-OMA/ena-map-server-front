import { ButtonSector, ButtonWrapper, WrapperPage } from "./style";
import iconGroup from "../../../assets/images/icon_group.svg";
import { useRoutes } from "../../../hooks/useRoutes";
import Header from "../../../common/components/Header/Header";

export default function Student_Home() {
  const { routes } = useRoutes();

  return (
    <>
      <Header title="Home" />
      <WrapperPage>
        <ButtonWrapper>
          <ButtonSector onClick={() => routes.myGroups()}>
            <img src={iconGroup} alt="Botão para a página de Meus Grupos" />
            <p>Meus Grupos</p>
          </ButtonSector>
        </ButtonWrapper>
      </WrapperPage>
    </>
  );
}
