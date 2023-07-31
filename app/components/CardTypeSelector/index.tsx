import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

interface Props {
  label: string;
  icon: any;
  type: string;
  active: string;
  onClick: () => void;
}

export const CardTypeSelector = ({
  label,
  icon,
  type,
  active,
  onClick,
}: Props) => (
  <ButtonBase
    onClick={onClick}
    sx={{
      width: "100%",
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      py: 3,
      px: 2,
      border: 1,
      borderColor: type === active ? "secondary.main" : "divider",
      color: type === active ? "secondary.main" : "",
    }}
  >
    {icon}

    <Typography align="center" fontWeight={500}>
      {label}
    </Typography>
  </ButtonBase>
);
