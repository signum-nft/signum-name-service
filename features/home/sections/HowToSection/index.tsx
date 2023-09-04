import { useTranslation } from "next-i18next";
import { Step } from "./components/Step";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import Image from "next/image";
import { useAppContext } from "@/app/hooks/useAppContext";
import Link from "next/link";
export const HowToSection = () => {
  const { t } = useTranslation();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const { SignumSwap } = useAppContext();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      mb={2}
      px={2}
      py={4}
      sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
    >
      <Typography fontWeight={700} align="center" variant="h4" gutterBottom>
        {t("howItWorks")}
      </Typography>

      <Stack
        direction="column"
        spacing={2}
        sx={{ width: "100%", maxWidth: 700, px: 2, mb: 2 }}
      >
        <Stack direction="row" alignItems="center">
          <Step
            counter={1}
            label={
              <Stack direction={"row"}>
                {t("aliasFirstStep")}
                <Link
                  href={`${SignumSwap}/alias/marketplace`}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Typography fontWeight={500} fontSize={18} ml={1}>
                    SignumSwap
                  </Typography>
                </Link>
              </Stack>
            }
            caption={t("aliasFirstStepExample")}
          />
        </Stack>
        <Step
          counter={2}
          label={t("aliasSecondStep")}
          caption={t("aliasSecondStepExample")}
        />
        <Step
          counter={3}
          label={t("aliasThirdStep")}
          caption={t("aliasThirdStepExample")}
        />
        <Step counter={4} label={t("aliasFourthStep")} />
      </Stack>
      <Box
        sx={{
          position: "relative",
          padding: "2rem",
          height: "188px",
          width: "800px",
          display: { xs: "none", md: "block" },
        }}
      >
        {isDarkMode ? (
          <Image
            src="/assets/img/sns-image-light.png"
            alt="SNS Working Schema"
            fill={true}
          />
        ) : (
          <Image
            src="/assets/img/sns-image-black.png"
            alt="SNS Working Schema"
            fill={true}
          />
        )}
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Typography fontSize={10} color="text.secondary">
          {t("chooseOutOfTLDs")}
        </Typography>
      </Box>
    </Box>
  );
};
