import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 8,
        border: "1px solid #333333",
      },
    },
  },
});
