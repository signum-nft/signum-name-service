import { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

type Link = { icon?: any; label: string; onClick: any; disabled?: boolean };

interface MenuOptionsProps {
  links: Link[];
  children?: any;
}

export const MenuOptions = ({ links, children }: MenuOptionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <Grid container ref={containerRef}>
      <Grid item container onClick={handleClick}>
        {children}
      </Grid>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {links.map((item) => (
          <MenuItem
            key={item.label}
            sx={{ minWidth: containerRef?.current?.offsetWidth || "auto" }}
            disabled={item.disabled}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
          >
            {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};
