import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 8,
        border: (props: any) =>
          props.isError ? "2px solid #FF3333" : "1px solid #333333",
      },
    },
  },
});
