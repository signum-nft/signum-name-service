import { useTranslation } from "next-i18next";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Error500Page = () => {
  const { t } = useTranslation();

  return (
    <Box
      px={1}
      mb={10}
      mx="auto"
      width="100%"
      maxWidth="900px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Box pt={5} sx={{ width: { xs: "75%", lg: "50%" } }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/img/500.svg" alt="500 Img" />
      </Box>

      <Typography component="h1" variant="h2" align="center">
        {t("somethingWentWrong")}
      </Typography>

      <Typography
        gutterBottom
        color="textSecondary"
        variant="h6"
        align="center"
        sx={{ marginBottom: 2 }}
      >
        {t("notFoundPage")}
      </Typography>

      <Link href="/" passHref>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            maxWidth: 300,
            textTransform: "none",
            fontSize: { xs: 18, md: 14 },
            color: "white",
          }}
        >
          {t("goHome")}
        </Button>
      </Link>
    </Box>
  );
};
