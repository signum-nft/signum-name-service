import Button from "@mui/material/Button";

interface Props {
  label?: string;
  onClick: any;
  disabled?: boolean;
}

export const SubmitButton = ({ label, onClick, disabled = false }: Props) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      fullWidth
      variant="outlined"
      color="inherit"
      sx={{
        textTransform: "none",
        borderRadius: 4,
        borderColor: "divider",
        py: 1,
        fontSize: { xs: 16, md: 15 },
      }}
    >
      {label}
    </Button>
  );
};
