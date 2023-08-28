import { FC, ReactNode } from "react";
import { useAppSelector } from "@/states/hooks";
import { useAppContext } from "@/app/hooks/useAppContext";
import { selectIsDarkMode } from "@/app/states/appState";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export const SidebarWrapper: FC<Props> = ({
  isOpen,
  handleClose,
  children,
}) => {
  const { IsFirefox } = useAppContext();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  let background: any = isDarkMode
    ? { xs: "rgba(25, 28, 31, 1)", lg: "rgba(25, 28, 31, 0.5)" }
    : "#ffffff";

  if (IsFirefox) background = isDarkMode ? "rgba(25, 28, 31, 1)" : "#ffffff";

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      ModalProps={{
        sx: {
          transition: "all .2s ease 0s",
          backdropFilter: { xs: "none", lg: "saturate(180%) blur(10px)" },
        },
      }}
      PaperProps={{
        variant: "outlined",
        elevation: 0,
        sx: {
          height: "95%",
          top: "2.5%",
          right: "2%",
          borderRadius: 4,
          backdropFilter: { xs: "none", lg: "saturate(180%) blur(20px)" },
          background,
          maxHeight: { xs: "auto", md: 1000 },
          width: { xs: "96%", md: "auto" },
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          minWidth: { xs: "auto", md: 340 },
        }}
        p={2}
        height="100%"
      >
        {children}
      </Box>
    </Drawer>
  );
};
