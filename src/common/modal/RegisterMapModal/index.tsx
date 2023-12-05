import Modal from "react-modal";
import InputText from "../../components/InputText";
import {
  BodyModalWrapper,
  DropButton,
  DropContainer,
  DropText,
  FooterModalWrapper,
  HeaderModal,
  LabelInput,
  MapFileCard,
  ModalTitle,
  WrapperInput,
  WrapperModalRegister,
} from "./style";
import Button from "../../components/Button";
import { Close } from "@styled-icons/evil";
import { useEffect, useMemo, useState } from "react";
import { enaConvertServices } from "../../../service/enaConvertService";
import { serverMapService } from "../../../service/axiosServer";
import Dropzone from "react-dropzone";
import { useUser } from "../../../hooks/useUser";

type IRegisterMapModal = {
  open: boolean;
  closeModal: (value: boolean) => void;
  loadMaps: () => void;
  mapSelected?: any;
};

export default function RegisterMapModal({
  open,
  closeModal,
  loadMaps,
  mapSelected,
}: IRegisterMapModal) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");

  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileName, setFileName] = useState("");
  const [newFile, setNewFile] = useState(false);

  const [loading, setLoading] = useState(false);

  const changeFile = (file: any) => {
    setFile(file[0]);
    setFileName(file[0].name);
  };

  useEffect(() => {
    if (mapSelected) {
      setName(mapSelected.name);
      setOldName(mapSelected.name);
      setFileName(`${mapSelected.thumb_url}.xml`);
    }
  }, [mapSelected]);

  const isRegisterEnable = useMemo(() => {
    if (mapSelected) {
      if (name === oldName && !newFile) {
        return true;
      }
      return false;
    } else {
      if (name.length > 0 && file) {
        return false;
      }
      return true;
    }
  }, [name, file]);

  const handleRegisterMap = async () => {
    try {
      setLoading(true);
      // const mapConverted = await enaConvertServices.convertMap(file as File);

      const data = new FormData();
      data.append("file", file as File);
      data.append("minify", "true");
      data.append("id_owner", `${user.id}`);
      data.append("url", "https://teste.com");
      data.append("name", name);

      if (mapSelected) {
        data.append("new_file", `${newFile}`);
        data.append("last_file_name", mapSelected.thumb_url);

        await serverMapService.updateMap(mapSelected.id, data);
      } else {
        await serverMapService.createMap(data);
      }

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
    setFileName("");
    setFile(undefined);
    setName("");
    setOldName("");
    setNewFile(false);
  };

  const handleRemoveFile = () => {
    setFile(undefined);
    setFileName("");

    if (mapSelected) {
      setNewFile(true);
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
            {!file && !fileName ? (
              <Dropzone
                accept={{ "application/xml": [".xml"] }}
                onDropAccepted={changeFile}
              >
                {({ getRootProps, getInputProps }) => (
                  <DropContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    <DropButton>Adicione arquivo XML</DropButton>
                  </DropContainer>
                )}
              </Dropzone>
            ) : (
              <DropContainer>
                <MapFileCard>
                  {fileName}
                  <button onClick={() => handleRemoveFile()}>
                    <Close size={25} color="#000" />
                  </button>
                </MapFileCard>
              </DropContainer>
            )}
          </WrapperInput>
        </BodyModalWrapper>
        <FooterModalWrapper>
          <Button
            title="Salvar"
            disabled={isRegisterEnable}
            handleClick={() => handleRegisterMap()}
            isLoading={loading}
          />
        </FooterModalWrapper>
      </WrapperModalRegister>
    </Modal>
  );
}
