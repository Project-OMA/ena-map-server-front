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
} from "./style";
import Button from "../../components/Button";
import { Close } from "@styled-icons/evil";
import { useCallback, useEffect, useState } from "react";
import { groupService } from "../../../service/axiosServer";

type IRegisterMapModal = {
  open: boolean;
  closeModal: () => void;
  groupUpdateId: number | null;
};

export default function RegisterMapModal({
  open,
  closeModal,
  groupUpdateId
}: IRegisterMapModal) {
  const [name, setName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(Number.isInteger(groupUpdateId)){
      loadGroupData();
    }
  }, [groupUpdateId]);

  const loadGroupData =  useCallback(async () => {
    if(groupUpdateId === null) return;
    let group = (await groupService.findById(groupUpdateId)).data;
    
    setName(group.name);
    setOwnerId(group.id_owner);
  }, [groupUpdateId]);

  const sendForm = async () => {
    try {
      setLoading(true);

      if(groupUpdateId){
        await groupService.update({
          id: groupUpdateId,
          name,
          id_owner: ownerId
        });
      } else {
        await groupService.create({
          name,
          id_owner: ownerId
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
    setOwnerId("");
    setErrorMessage("");
  };

  return (
    <Modal
      isOpen={open}
      closeTimeoutMS={500}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-action"
      onRequestClose={handleCloseModal}
    >
      <WrapperModalRegister>
        <HeaderModal>
          <ModalTitle>{groupUpdateId ? "Edição" : "Cadastro"} de Grupo</ModalTitle>
          <button onClick={() => handleCloseModal()}>
            <Close size={25} color="#000" />
          </button>
        </HeaderModal>
        <BodyModalWrapper>
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
            <LabelInput>Id do Proprietário:</LabelInput>
            <InputText
              value={ownerId}
              type='number'
              onChange={(e) => setOwnerId(e.target.value)}
              placeholder="Digite o Id do Proprietário"
              style={{ width: "100%" }}
            />
          </WrapperInput>
        </BodyModalWrapper>
        <div style={{color: "red", padding: "0px 80px"}}>{errorMessage}</div>
        <FooterModalWrapper>
          <Button
            title="Salvar"
            disabled={name.length < 1 || !ownerId}
            handleClick={() => sendForm()}
            isLoading={loading}
          />
        </FooterModalWrapper>
      </WrapperModalRegister>
    </Modal>
  );
}
