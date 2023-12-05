import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputText from "../InputText";

type AutoCompleteType = {
  id?: string;
  options: [];
  label: string;
  displayOption: string;
  changeFunction: (event: React.SyntheticEvent, value: any) => void;
  getSelectedOption?: () => boolean;
  value: any;
  multiple: boolean;
};

export default function AutoCompleteInput({
  id,
  options,
  label,
  displayOption,
  changeFunction,
  value,
  getSelectedOption,
  multiple = false,
}: AutoCompleteType) {
  return (
    <Autocomplete
      id={id || "combo-box-demo"}
      onChange={changeFunction}
      options={options}
      renderInput={(param) => <InputText {...param} label={label} />}
      getOptionLabel={(option: any) => {
        return option[displayOption];
      }}
      isOptionEqualToValue={(option, value) => {
        if (Array.isArray(value)) {
          const optionSelected = value.find((o: any) => o?.id === option?.id);

          if (optionSelected) {
            return true;
          }
        } else {
          return option.id === value.id;
        }

        return false;
      }}
      value={value}
      style={{ width: "100%" }}
      multiple={multiple}
    />
  );
}
