import Modal from "react-modal";
import InputText from "../../components/InputText";
import {
  BodyModalWrapper,
  FooterModalWrapper,
  HeaderModal,
  LabelInput,
  ModalTitle,
  WrapperInput,
  WrapperModalRegister,
  MapWrapper,
  MapCard,
  ImgCard,
  WrapperDnD,
} from "./style";
import Button from "../../components/Button";
import { Close } from "@styled-icons/evil";
import { useCallback, useEffect, useState } from "react";
import {
  groupService,
  serverMapService as mapService,
  userService,
} from "../../../service/axiosServer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AutoCompleteInput from "../../components/AutoCompleteInput";
import { getBackgroundLink } from "../../../consts";
import { useUser } from "../../../hooks/useUser";

type IRegisterMapModal = {
  open: boolean;
  closeModal: () => void;
  groupUpdateId: number | null;
};

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/images/gary.png",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb: "/images/cato.png",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb: "/images/kvn.png",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb: "/images/mooncake.png",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb: "/images/quinn.png",
  },
];

export default function RegisterMapModal({
  open,
  closeModal,
  groupUpdateId,
}: IRegisterMapModal) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [maps, setMaps] = useState<[]>([]);
  const [users, setUsers] = useState<[]>([]);
  const [mapsSelected, setMapsSelected] = useState<[]>([]);
  const [usersSelected, setUsersSelected] = useState<[]>([]);
  const [registerPhases, setRegisterPhases] = useState({
    firstPhase: true,
    secondPhase: false,
    complete: false,
  });
  const { user } = useUser();

  useEffect(() => {
    if (Number.isInteger(groupUpdateId)) {
      loadGroupData();
    }
  }, [groupUpdateId]);

  const handleLoadMaps = useCallback(async () => {
    try {
      const response = await mapService.findAll();
      setMaps(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleLoadUsers = useCallback(async () => {
    try {
      const response = await userService.findAll();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleLoadUsers();
  }, [handleLoadUsers]);

  useEffect(() => {
    handleLoadMaps();
  }, [handleLoadMaps]);

  const handleSelectMap = (value: any) => {
    setMapsSelected(value);
  };

  const handleSelectUsers = (value: any) => {
    setUsersSelected(value);
  };

  const loadGroupData = useCallback(async () => {
    if (groupUpdateId === null) return;
    let group = (await groupService.findById(groupUpdateId)).data;

    setName(group.name);
    setMapsSelected(group.maps);
    setUsersSelected(group.users);
  }, [groupUpdateId]);

  const handleSubmitGroup = () => {
    if (registerPhases.firstPhase) {
      setRegisterPhases({
        ...registerPhases,
        firstPhase: false,
        secondPhase: true,
      });
    } else if (registerPhases.secondPhase) {
      sendForm();
    }
  };

  const handleDisableButton = () => {
    if (registerPhases.firstPhase) {
      if (
        name.length > 0 &&
        mapsSelected.length > 0 &&
        usersSelected.length > 0
      ) {
        return false;
      }
      return true;
    }

    return false;
  };

  const sendForm = async () => {
    try {
      setLoading(true);

      if (groupUpdateId) {
        await groupService.update(groupUpdateId, {
          name,
          maps: mapsSelected.map((map: any) => map.id),
          users: usersSelected.map((user: any) => user.id),
        });
      } else {
        await groupService.create({
          name,
          id_owner: user.id,
          maps: mapsSelected.map((map: any) => map.id),
          users: usersSelected.map((user: any) => user.id),
        });
      }

      setErrorMessage("");
      handleCloseModal();
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    setName("");
    setErrorMessage("");
    setMapsSelected([]);
    setUsersSelected([]);
    setRegisterPhases({
      firstPhase: true,
      secondPhase: false,
      complete: false,
    });
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(mapsSelected);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMapsSelected(items as []);
  }

  const renderForm = useCallback(() => {
    if (registerPhases.firstPhase) {
      return (
        <>
          <WrapperInput>
            <LabelInput>Nome:</LabelInput>
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do usuário"
              style={{ width: "100%" }}
            />
          </WrapperInput>
          <WrapperInput>
            <LabelInput>Selecione os mapas do grupo:</LabelInput>
            <AutoCompleteInput
              label="Mapas"
              options={maps}
              changeFunction={(_: any, value: any) => handleSelectMap(value)}
              displayOption="name"
              value={mapsSelected}
              multiple
            />
          </WrapperInput>
          <WrapperInput>
            <LabelInput>Selecione os usuários do grupo:</LabelInput>
            <AutoCompleteInput
              label="Usuários"
              options={users}
              changeFunction={(_: any, value: any) => handleSelectUsers(value)}
              displayOption="email"
              value={usersSelected}
              multiple
            />
          </WrapperInput>
        </>
      );
    }

    if (registerPhases.secondPhase) {
      return (
        <WrapperDnD>
          <LabelInput>Realize a ordenação dos mapas do grupo:</LabelInput>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="mapsSelected">
              {(provided: any) => (
                <MapWrapper
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {mapsSelected.map(({ id, name, thumb_url }, index) => {
                    return (
                      <Draggable
                        key={`${id}-${name}`}
                        draggableId={`${id}-${name}`}
                        index={index}
                      >
                        {(provided: any, snapshot) => {
                          // if (snapshot.isDragging) {
                          //   provided.draggableProps.style.left = undefined;
                          //   provided.draggableProps.style.top = undefined;
                          //   provided.draggableProps.style.bottom = undefined;
                          //   provided.draggableProps.style.right = undefined;
                          // }
                          return (
                            <MapCard
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ImgCard
                                src={getBackgroundLink(thumb_url)}
                                alt={`${name} Thumb`}
                                crossOrigin="anonymous"
                                loading="lazy"
                              />
                              <p>{name}</p>
                            </MapCard>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </MapWrapper>
              )}
            </Droppable>
          </DragDropContext>
        </WrapperDnD>
      );
    }
  }, [
    registerPhases,
    name,
    maps,
    users,
    usersSelected,
    mapsSelected,
    characters,
  ]);

  return (
    <Modal
      isOpen={open}
      closeTimeoutMS={500}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-action-group"
      onRequestClose={handleCloseModal}
    >
      <WrapperModalRegister>
        <HeaderModal>
          <ModalTitle>
            {groupUpdateId ? "Edição" : "Cadastro"} de Grupo
          </ModalTitle>
          <button onClick={() => handleCloseModal()}>
            <Close size={25} color="#000" />
          </button>
        </HeaderModal>
        <BodyModalWrapper>{renderForm()}</BodyModalWrapper>
        <div style={{ color: "red", padding: "0px 80px" }}>{errorMessage}</div>

        <FooterModalWrapper>
          <Button
            title={"Voltar"}
            disabled={registerPhases.firstPhase}
            handleClick={() =>
              setRegisterPhases({
                firstPhase: true,
                secondPhase: false,
                complete: false,
              })
            }
            isLoading={loading}
          />
          <Button
            title={registerPhases.firstPhase ? "Prosseguir" : "Salvar"}
            disabled={handleDisableButton()}
            handleClick={() => handleSubmitGroup()}
            isLoading={loading}
          />
        </FooterModalWrapper>
      </WrapperModalRegister>
    </Modal>
  );
}
