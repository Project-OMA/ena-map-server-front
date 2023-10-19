import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useStyles } from "./style";

interface InputTextI {
  isError?: boolean;
}

type InputTextType = TextFieldProps & InputTextI;

export default function InputText(props: InputTextType) {
  const classes = useStyles({ isError: props.isError });
  return (
    <TextField classes={{ root: classes.root }} {...props} variant="outlined" />
  );
}
