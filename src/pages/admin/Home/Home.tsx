import { ButtonSector, ButtonWrapper } from "./style";
import iconAluno from "../../../assets/images/icon_aluno.svg";
import iconGroup from "../../../assets/images/icon_group.svg";
import iconMap from "../../../assets/images/icon_map.svg";
import { useRoutes } from "../../../hooks/useRoutes";
import Header from "../../../common/components/Header/Header";
import { WrapperPage } from "../../../common/styled/main.styled";

export default function Admin_Home() {
  const { routes } = useRoutes();

  return (
    <>
      <Header title="Home" />
      <WrapperPage>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "55rem",
          }}
        >
          <ButtonWrapper>
            <ButtonSector onClick={() => routes.users()}>
              <img src={iconAluno} alt="Botão para a página de Usuários" />
              <p>Usuários</p>
            </ButtonSector>

            <ButtonSector onClick={() => routes.groups()}>
              <img src={iconGroup} alt="Botão para a página de Grupos" />
              <p>Grupos</p>
            </ButtonSector>
            <ButtonSector onClick={() => routes.map()}>
              <img src={iconMap} alt="Botão para a página de Mapas" />
              <p>Mapas</p>
            </ButtonSector>
          </ButtonWrapper>
        </div>
      </WrapperPage>
    </>
  );
}
