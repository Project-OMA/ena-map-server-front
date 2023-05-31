import Modal from "react-modal";
import {
  BodyModalWrapper,
  FooterModalWrapper,
  HeaderModal,
  ModalTitle,
  WrapperInput,
  WrapperModalRegister,
} from "./style";
import Button from "../../components/Button";
import { Close } from "@styled-icons/evil";
import { useMemo, useState } from "react";
import { userService } from "../../../service/axiosServer";

type IRegisterMapModal = {
  open: boolean;
  closeModal: (value: boolean) => void;
};

export default function UserFileModal({
  open,
  closeModal
}: IRegisterMapModal) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
  };

  const isRegisterEnable = useMemo(() => {
    return !file ? true : false;
  }, [file]);

  const createUsers = async () => {
    try {
      setLoading(true);
      await userService.createByFile(file);
      setErrorMessage("");
      handleCloseModal();
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setErrorMessage("");
    closeModal(false);
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
          <ModalTitle>Cadastrar por CSV</ModalTitle>
          <button onClick={() => handleCloseModal()}>
            <Close size={25} color="#000" />
          </button>
        </HeaderModal>
        <BodyModalWrapper>
          <WrapperInput>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="text/csv"
              onChange={changeFile}
            />
          </WrapperInput>
        </BodyModalWrapper>
        <div style={{color: "red", padding: "0px 80px"}}>{errorMessage}</div>
        <FooterModalWrapper>
          <Button
            title="Salvar"
            disabled={isRegisterEnable}
            handleClick={() => createUsers()}
            isLoading={loading}
          />
        </FooterModalWrapper>
      </WrapperModalRegister>
    </Modal>
  );
}
