import Box from "@mui/material/Box";

interface Props {
  label: string;
}

export const Stamp = ({ label }: Props) => (
  <Box
    color="#d23"
    border="0.4rem double #d23"
    display="inline-block"
    textTransform="uppercase"
    padding="0.1rem 1rem"
    borderRadius="1rem"
    fontWeight={700}
    sx={{
      transform: "rotate(-5deg)",
      opacity: 0.8,
      fontSize: "2rem",
      fontFamily: "Courier New, Courier, monospace, serif",
      userSelect: "none",
    }}
  >
    {label}
  </Box>
);
