import { ButtonSector, ButtonWrapper, WrapperPage } from "./style";
import iconAluno from "../../assets/images/icon_aluno.svg";
import iconGroup from "../../assets/images/icon_group.svg";
import iconMap from "../../assets/images/icon_map.svg";
import { useRoutes } from "../../hooks/useRoutes";
import Header from "../../common/components/Header/Header";
import { useUser } from '../../hooks/useUser';
import { isAdmin, isStudent, isTeacher } from '../../utils/verifyTypeFromUser';

export default function Home() {
  const { routes } = useRoutes();
  const { user } = useUser();

  return (
    <>
      <Header title="Home" />
      <WrapperPage>
        <ButtonWrapper>
          { (
              isAdmin(user?.type) || 
              isTeacher(user?.type)
            ) &&
            <>
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
            </>
          }

          { (
              isStudent(user?.type)
            ) &&
            <>
              <ButtonSector onClick={() => routes.myGroups()}>
                <img src={iconGroup} alt="Botão para a página de Meus Grupos" />
                <p>Meus Grupos</p>
              </ButtonSector>
            </>
          }

        </ButtonWrapper>
      </WrapperPage>
    </>
  );
}
