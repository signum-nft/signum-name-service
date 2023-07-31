import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

interface Props {
  label: string;
  checked?: boolean;
  workInProgress?: boolean;
}

export const TaskList = ({
  label,
  checked = false,
  workInProgress = false,
}: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          color="success"
          disableRipple
          sx={{ cursor: "auto" }}
        />
      </ListItemIcon>

      <ListItemText
        id={label}
        primary={label + ` ${workInProgress ? "🏗️" : ""}`}
      />
    </ListItem>
  );
};
