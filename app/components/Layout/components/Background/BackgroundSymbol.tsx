import Box from "@mui/material/Box";
export const BackgroundSymbol = () => {
  return (
    <Box
      width="50vw"
      height="50vh"
      position="fixed"
      top={72}
      left={0}
      zIndex={-999999998}
      sx={{
        display: "block",
        opacity: 0.1,
      }}
    >
      <img src="/assets/img/signum_node_white.svg" alt="Signum Node Logo" />
    </Box>
  );
};
