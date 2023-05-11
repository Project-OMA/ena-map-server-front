import { ButtonSector, ButtonWrapper, WrapperPage } from "./style";
import iconAluno from "../../assets/images/icon_aluno.svg";
import iconGroup from "../../assets/images/icon_group.svg";
import iconMap from "../../assets/images/icon_map.svg";
import { useRoutes } from "../../hooks/useRoutes";

export default function Home() {
  const { routes } = useRoutes();

  return (
    <WrapperPage>
      <ButtonWrapper>
        <ButtonSector>
          <img src={iconAluno} />
          <p>Cadastrar Aluno</p>
        </ButtonSector>
        <ButtonSector>
          <img src={iconGroup} />
          <p>Grupos</p>
        </ButtonSector>
        <ButtonSector onClick={() => routes.map()}>
          <img src={iconMap} />
          <p>Mapas</p>
        </ButtonSector>
      </ButtonWrapper>
    </WrapperPage>
  );
}
