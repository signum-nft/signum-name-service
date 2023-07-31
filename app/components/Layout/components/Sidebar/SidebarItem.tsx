import { ReactNode } from "react";

import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

interface SidebarItemProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  url: string;
  description?: string;
}

export const SidebarItem = ({
  icon,
  title,
  onClick,
  url,
  description,
}: SidebarItemProps) => (
  <Link href={url} passHref>
    <MenuItem
      onClick={onClick}
      component="a"
      sx={{
        alignItems: "flex-start",
        py: 1.7,
        borderRadius: 2,
        mb: 1,
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        sx={{ textTransform: "capitalize" }}
        primary={title}
        secondary={description}
      />
    </MenuItem>
  </Link>
);
