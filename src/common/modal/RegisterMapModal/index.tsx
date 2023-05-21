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
import { useMemo, useState } from "react";
import { enaConvertServices } from "../../../service/enaConvertService";
import { serverMapService } from "../../../service/axiosServer";

type IRegisterMapModal = {
  open: boolean;
  closeModal: (value: boolean) => void;
  loadMaps: () => void;
};

export default function RegisterMapModal({
  open,
  closeModal,
  loadMaps,
}: IRegisterMapModal) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
  };

  const isRegisterEnable = useMemo(() => {
    if (name.length > 0 && file) {
      return false;
    }
    return true;
  }, [name, file]);

  const createMap = async () => {
    try {
      setLoading(true);
      // const mapConverted = await enaConvertServices.convertMap(file as File);

      const data = new FormData();
      data.append("file", file as File);
      data.append("minify", "true");
      data.append("id_owner", "3");
      data.append("url", "https://teste.com");
      data.append("name", name);

      const response = await serverMapService.createMap(data);

      loadMaps();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
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
          <ModalTitle>Cadastro de Mapa</ModalTitle>
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
              placeholder="Digite o nome do mapa"
              style={{ width: "100%" }}
            />
          </WrapperInput>
          <WrapperInput>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="text/xml"
              onChange={changeFile}
            />
          </WrapperInput>
        </BodyModalWrapper>
        <FooterModalWrapper>
          <Button
            title="Salvar"
            disabled={isRegisterEnable}
            handleClick={() => createMap()}
            isLoading={loading}
          />
        </FooterModalWrapper>
      </WrapperModalRegister>
    </Modal>
  );
}
