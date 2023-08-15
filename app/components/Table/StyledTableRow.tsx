import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "0.3s all ease",
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.action.hover
        : "rgba(255,255,255,0.1)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
