import { ButtonRadius, ErrorText } from "../../styled/main.styled";
import { LoadingComponent } from "../../styled/LoadingComponent";

export type ButtonType = {
  title: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  errorText?: string;
  isLoading?: boolean;
  style?: {};
};

export default function Button({
  title,
  handleClick,
  disabled,
  errorText,
  isLoading,
  style,
}: ButtonType) {
  return (
    <>
      <ButtonRadius
        onClick={handleClick}
        disabled={disabled}
        style={style ? style : { width: "60%" }}
      >
        {isLoading ? <LoadingComponent color="#fff" size={20} /> : title}
      </ButtonRadius>
      <ErrorText>{errorText}</ErrorText>
    </>
  );
}
