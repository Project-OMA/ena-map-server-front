import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputText from "../InputText";

type AutoCompleteType = {
  options: [];
  label: string;
  displayOption: string;
  changeFunction: (event: React.SyntheticEvent, value: any) => void;
  value: any;
  multiple: boolean;
};

export default function AutoCompleteInput({
  options,
  label,
  displayOption,
  changeFunction,
  value,
  multiple = false,
}: AutoCompleteType) {
  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={changeFunction}
      options={options}
      renderInput={(param) => <InputText {...param} label={label} />}
      getOptionLabel={(option: any) => {
        return option[displayOption];
      }}
      value={value}
      style={{ width: "100%" }}
      multiple={multiple}
    />
  );
}
