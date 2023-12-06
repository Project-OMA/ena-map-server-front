import Header from "../../../common/components/Header/Header";
// import {
//   ContainerDiv,
//   H1Title,
//   H2Title,
//   PageContent,
// } from "../../../common/styled/main.styled";
import { GroupCreatedBy, GroupHeader } from "./style";
import MapList from "./MapList";

const Group = () => {
  const group = {
    name: "Exploração do 1 Andar",
    owner: {
      name: "Maxwell Ebert",
    },
    created_at: "2023-10-15T10:20:00.000Z",
  };

  const members = [
    "Annie Price",
    "Ted Kovacek",
    "Brandon Jakubowski",
    "Annie Price",
    "Ted Kovacek",
    "Brandon Jakubowski",
    "Annie Price",
    "Ted Kovacek",
    "Brandon Jakubowski",
    "Annie Price",
    "Ted Kovacek",
    "Brandon Jakubowski",
  ];

  const maps = [
    {
      id: 1,
      id_map: 111,
      name: "Pavilhão 1",
      thumb_url: "",
    },
    {
      id: 2,
      id_map: 222,
      name: "Pavilhão 2",
      thumb_url: "",
    },
    {
      id: 3,
      id_map: 333,
      name: "Bloco H",
      thumb_url: "",
    },
    {
      id: 4,
      id_map: 444,
      name: "Bloco E",
      thumb_url: "",
    },
  ];

  return (
    <>
      <Header title="Grupo" />
      <main>
        {/* <ContainerDiv>
          <GroupHeader>
            <H1Title>Grupo: {group.name}</H1Title>
            <GroupCreatedBy>
              <strong>Criado em:</strong>{" "}
              {new Date(group.created_at).toLocaleDateString()}
            </GroupCreatedBy>
            <GroupCreatedBy>
              <strong>Líder:</strong> {group.owner.name}
            </GroupCreatedBy>
          </GroupHeader>

          <PageContent>
            <H2Title>Membros</H2Title>
            <p>{members.toString()}</p>

            <H2Title>Mapas</H2Title>
            <MapList maps={maps} />
          </PageContent>
        </ContainerDiv> */}
      </main>
    </>
  );
};

export default Group;
