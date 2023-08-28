import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <IconButton
    edge="start"
    color="inherit"
    sx={{
      border: 1,
      borderColor: "divider",
      borderRadius: 2,
    }}
    onClick={onClick}
  >
    <CloseIcon />
  </IconButton>
);
