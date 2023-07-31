import { DiscordIcon } from "@/app/components/CustomIcons";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PublicIcon from "@mui/icons-material/Public";

export const SocialLinks = () => {
  return (
    <Grid
      item
      container
      alignItems="center"
      flexDirection="row"
      sx={{
        justifyContent: { xs: "space-around", md: "flex-end" },
      }}
    >
      <IconButton
        rel="nofollow"
        aria-label="Signum official page"
        href="https://www.signum.network"
        target="_blank"
      >
        <PublicIcon />
      </IconButton>

      <IconButton
        rel="nofollow"
        aria-label="Twitter"
        href="https://twitter.com/signum_official"
        target="_blank"
      >
        <TwitterIcon />
      </IconButton>

      <IconButton
        rel="nofollow"
        aria-label="Telegram"
        href="https://t.me/signumnetwork"
        target="_blank"
      >
        <TelegramIcon />
      </IconButton>

      <IconButton
        rel="nofollow"
        aria-label="Reddit"
        href="https://www.reddit.com/r/Signum"
        target="_blank"
      >
        <RedditIcon />
      </IconButton>

      <IconButton
        rel="nofollow"
        aria-label="Reddit"
        href="https://discord.gg/psCkePs4Aq"
        target="_blank"
      >
        <DiscordIcon />
      </IconButton>

      <IconButton
        rel="nofollow"
        aria-label="Youtube"
        href="https://www.youtube.com/c/SignumNetwork/featured"
        target="_blank"
      >
        <YouTubeIcon />
      </IconButton>
    </Grid>
  );
};
