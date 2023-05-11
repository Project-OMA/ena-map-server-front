import CardItem from "../../common/components/CardItem";
import RegisterMapModal from "../../common/modal/RegisterMapModal";
import { WrapperMaps } from "./style";

export default function MapPage() {
  return (
    <WrapperMaps>
      <RegisterMapModal />
      <CardItem title="teste 1" />
      <CardItem title="teste 3" />
      <CardItem title="teste 2" />
    </WrapperMaps>
  );
}
