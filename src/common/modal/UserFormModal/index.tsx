import Modal from "react-modal";
import InputText from "../../components/InputText";
import {
  BodyModalWrapper,
  DeleteButton,
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
import { userService } from "../../../service/axiosServer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip } from "@mui/material";
import { Delete } from "@styled-icons/fluentui-system-regular";

type IRegisterMapModal = {
  open: boolean;
  closeModal: () => void;
  userUpdateId: number | null;
};

export default function RegisterMapModal({
  open,
  closeModal,
  userUpdateId,
}: IRegisterMapModal) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(1);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (Number.isInteger(userUpdateId)) {
      loadUserData();
    }
  }, [userUpdateId]);

  const loadUserData = useCallback(async () => {
    if (userUpdateId === null) return;
    let user = (await userService.findById(userUpdateId)).data;

    setName(user.name);
    setEmail(user.email);
    setType(user.type);
  }, [userUpdateId]);

  const sendForm = async () => {
    try {
      setLoading(true);

      if (userUpdateId) {
        await userService.update({
          id: userUpdateId,
          name,
          email,
          password: password || undefined,
          type,
        });
      } else {
        await userService.create({
          name,
          email,
          password,
          type,
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
    setEmail("");
    setType(1);
    setPassword("");
    setErrorMessage("");
  };

  const handleChangeType = (e: any) => {
    setType(e.target.value);
  };

  const handleDeleteUser = async () => {
    try {
      if (userUpdateId) {
        await userService.deleteById(userUpdateId as number);
        handleCloseModal();
      }
    } catch (error) {
      console.error(error);
    }
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
          <ModalTitle>
            {userUpdateId ? "Edição" : "Cadastro"} de Usuário
          </ModalTitle>
          <button onClick={() => handleCloseModal()}>
            <Close size={25} color="#000" />
          </button>
        </HeaderModal>
        <BodyModalWrapper>
          {userUpdateId && (
            <Tooltip title="Excluir o Usuário">
              <DeleteButton onClick={() => handleDeleteUser()}>
                <Delete size={25} color="#000" />
              </DeleteButton>
            </Tooltip>
          )}
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
            <LabelInput>Email:</LabelInput>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email do usuário"
              style={{ width: "100%" }}
            />
          </WrapperInput>
          <WrapperInput>
            <LabelInput>Tipo:</LabelInput>
            <Select
              value={type}
              label="Escolha o tipo do usuário"
              sx={{ width: "100%" }}
              onChange={handleChangeType}
            >
              <MenuItem value={2}>Professor</MenuItem>
              <MenuItem value={3}>Aluno</MenuItem>
            </Select>
          </WrapperInput>
          <WrapperInput>
            <LabelInput>Senha:</LabelInput>
            <InputText
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                userUpdateId ? "Senha (opcional)" : "Digite a senha do usuário"
              }
              style={{ width: "100%" }}
            />
          </WrapperInput>
        </BodyModalWrapper>
        <div style={{ color: "red", padding: "0px 80px" }}>{errorMessage}</div>
        <FooterModalWrapper>
          <Button
            title="Salvar"
            disabled={
              name.length < 1 ||
              email.length < 1 ||
              isNaN(type) ||
              (!userUpdateId && password.length < 8) ||
              (userUpdateId !== null &&
                password.length < 8 &&
                password.length > 0)
            }
            handleClick={() => sendForm()}
            isLoading={loading}
          />
        </FooterModalWrapper>
      </WrapperModalRegister>
    </Modal>
  );
}
