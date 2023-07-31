import { useTranslation } from "next-i18next";
import { PaperContainer } from "@/app/components/PaperContainer";
import { TaskList } from "./components/TaskList";

import Link from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const RoadmapPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      px={1}
      mb={10}
      mx="auto"
      width="100%"
      maxWidth={800}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Box mt={5} mb={3} width="100%" display="flex" justifyContent="center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/animated/jim-carrey-keyboard.webp"
          alt="GIF of Jim Carrey on Keyboard"
          style={{ borderRadius: 20, maxWidth: "100%" }}
        />
      </Box>

      <Typography
        color="textSecondary"
        align="center"
        fontWeight={700}
        gutterBottom
      >
        {t("siteWorkingPreTitle")}
      </Typography>

      <Typography component="h1" variant="h4" align="center">
        {t("siteWorkingTitle")} 🏗️
      </Typography>

      <Typography
        color="textSecondary"
        align="center"
        fontWeight={700}
        gutterBottom
      >
        {t("siteWorkingDescription")}
      </Typography>

      <Box width="100%" maxWidth={600}>
        <PaperContainer>
          <List>
            <TaskList label={t("tokenSpotTrading")} checked />
            <TaskList label={t("secondDevPhase")} checked />
            <TaskList label={t("thirdDevPhase")} checked />
            <TaskList label={t("fourthDevPhase")} workInProgress />
            <TaskList label={t("fifthPhase")} />
          </List>
        </PaperContainer>

        <Box mx="auto" maxWidth={300}>
          <Link href="/" passHref>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                textTransform: "none",
                fontSize: { xs: 18, md: 14 },
                color: "white",
                mx: "auto",
              }}
            >
              {t("goHome")}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
