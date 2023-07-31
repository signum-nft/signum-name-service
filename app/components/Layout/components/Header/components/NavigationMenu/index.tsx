import { MenuLink } from "./components/MenuLink";
import Box from "@mui/material/Box";

export const NavigationMenu = () => {
  return (
    <Box
      sx={{ display: { xs: "none", lg: "flex" } }}
      alignItems="center"
      justifyContent="center"
      component="ul"
      role="navigation-menu-bar"
      p={0}
    >
      {/*<MenuLink type="trade" />*/}
      {/*<MenuLink type="pool" />*/}
      <MenuLink type="alias" url="/alias" />
      {/*<MenuLink type="extra" />*/}
    </Box>
  );
};
