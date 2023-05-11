import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useStyles } from "./style";

export default function InputText({ ...params }: TextFieldProps) {
  const classes = useStyles();
  return (
    <TextField
      classes={{ root: classes.root }}
      {...params}
      variant="outlined"
    />
  );
}
