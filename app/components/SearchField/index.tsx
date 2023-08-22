import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "next-i18next";
import { useTheme } from "@mui/material";
import { useRef, useState } from "react";
import debounce from "lodash/debounce";

interface Props {
  placeholder?: string;
  value?: string;
  onChange: (searchTerm: string) => void;
}

export const SearchField = ({ onChange, placeholder, value }: Props) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(value ?? "");
  const theme = useTheme();
  const debouncedOnChange = useRef(debounce((v) => onChange(v), 300)).current;
  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value);
    debouncedOnChange(e.target.value);
  };

  const handleOnClear = () => {
    setSearchTerm("");
    debouncedOnChange("");
  };

  return (
    <TextField
      value={searchTerm}
      fullWidth
      onChange={handleOnChange}
      placeholder={placeholder ?? t("searchAliasPlaceHolder")}
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
