import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectIsOpenShareModal, appActions } from "@/app/states/appState";
import { isClientSide } from "@/app/isClientSide";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PublicIcon from "@mui/icons-material/Public";
import copy from "copy-to-clipboard";

export const ShareModal = () => {
  const { t } = useTranslation();
  const { setIsOpenShareModal } = appActions;
  const dispatch = useAppDispatch();
  const isOpenShareModal = useAppSelector(selectIsOpenShareModal);
  const closeModal = () => dispatch(setIsOpenShareModal(false));

  let platforms: any = [];

  const handleListItemClick = (url: string, copyUrl: boolean = false) => {
    if (copyUrl) {
      copy(url);
      alert("Link copied successfully!");
      closeModal();
      return;
    }

    window.open(url);
  };

  if (isClientSide()) {
    const url = window.location.href;

    platforms = [
      {
        label: "Twitter",
        icon: <TwitterIcon />,
        url: `https://twitter.com/intent/tweet?text=Check%20out%20this%20Smart%20Token%20on%20SignumSwap%20%F0%9F%94%A5%0A${url}%0A%23SignumSwap%20%23Signum%20%23SIGNA`,
      },
      {
        label: "Facebook",
        icon: <FacebookIcon />,
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      },
      {
        label: "Telegram",
        icon: <TelegramIcon />,
        url: `https://t.me/share/url?url=${url}&text=Check out this Smart Token on SignumSwap`,
      },
      {
        label: "WhatsApp",
        icon: <WhatsAppIcon />,
        url: `https://api.whatsapp.com/send/?text=Check out this Smart Token on SignumSwap, ${url}`,
      },
      {
        label: "Copy Link",
        icon: <PublicIcon />,
        url,
        copyUrl: true,
      },
    ];
  }

  return (
    <Dialog
      onClose={closeModal}
      open={isOpenShareModal}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          {t("shareDialogTitle")}

          <IconButton aria-label="close" onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <List>
          {platforms.map((item: any) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item.url, item.copyUrl)}
              key={item.label}
              sx={{ borderRadius: 2 }}
            >
              <ListItemAvatar>
                <Avatar sx={{ color: "#ffffff", bgcolor: "primary.main" }}>
                  {item.icon}
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
