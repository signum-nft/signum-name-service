import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "next-i18next";
import { useTheme } from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (searchTerm: string) => void;
}

export const AliasSearchField = ({ onChange }: Props) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value);
    onChange(e.target.value);
  };

  const handleOnClear = () => {
    setSearchTerm("");
    onChange("");
  };

  return (
    <TextField
      value={searchTerm}
      fullWidth
      onChange={handleOnChange}
      placeholder={t("searchAliasPlaceHolder")}
      variant="outlined"
      InputProps={{
        style: { background: theme.palette.background.paper },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={handleOnClear}
            sx={{ cursor: "pointer" }}
          >
            <ClearIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
