import { useTranslation } from "next-i18next";
import { Web3Chip } from "./components/Web3Chip";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useAppContext } from "@/app/hooks/useAppContext";
import Link from "next/link";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import { useState } from "react";
import { JackInTheBox, Fade } from "react-awesome-reveal";

const CheckAliasRegex = /^\w{1,100}$/;
export const AliasSection = () => {
  const { t } = useTranslation();
  const { SignumSwap } = useAppContext();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const [searchAlias, setSearchAlias] = useState("");
  const isValidAlias = CheckAliasRegex.test(searchAlias);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="center"
      alignItems="stretch"
      position="relative"
      px={2}
      mb={2}
      sx={{ py: { xs: 8, sm: 4 } }}
    >
      <Stack sx={{ mx: { xs: "auto", sm: 8 } }}>
        <JackInTheBox delay={250} triggerOnce>
          <Box
            width={{ xs: "200px", sm: "240px" }}
            top={{ xs: "-2em", sm: 0 }}
            position="relative"
          >
            {/* // eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/signumIdCard.webp"
              style={{
                width: "100%",
                borderRadius: "1em",
                boxShadow: `0.5em 0.4em 0.5em ${
                  isDarkMode ? "rgba(250,250,250,0.4)" : "rgba(0,0,0,0.4)"
                }`,
                transform: "rotate(-23deg)",
              }}
              alt={"Signum Web3 ID Card"}
            />
          </Box>
        </JackInTheBox>
      </Stack>
      <Stack
        direction="column"
        sx={{
          textAlign: { xs: "center", sm: "left" },
          justifyContent: "center",
        }}
      >
        <Fade delay={500} triggerOnce>
          <Typography
            component="h1"
            color={isDarkMode ? "#ec38bc" : "secondary"}
            fontWeight={700}
            sx={{
              fontSize: { xs: 20, md: 32 },
            }}
          >
            {t("aliasLandingTopSectionTitle") + " "}
          </Typography>

          <Typography
            component="h1"
            fontWeight={700}
            sx={{
              fontSize: { xs: 18, md: 28 },
            }}
          >
            {t("aliasLandingTopSectionTitle2")}
          </Typography>

          <Typography component="div" fontWeight={600} sx={{ mb: 2 }}>
            {t("aliasLandingTopSectionDescription")}
            <Web3Chip />
          </Typography>

          <Stack
            direction="row"
            flexWrap="nowrap"
            alignItems="stretch"
            mb={2}
            width="100%"
          >
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: { xs: "50%", lg: 500 },
                borderRadius: "0.5em 0 0 0.5em",
                px: 1,
                flex: { xs: 1, lg: 0 },
              }}
            >
              <SearchIcon sx={{ mx: 1 }} />
              <InputBase
                value={searchAlias}
                onChange={(e) => setSearchAlias(e.target.value)}
                sx={{ ml: 1, flex: 1, py: 2 }}
                placeholder={t("searchAliasCta")}
              />
            </Paper>

            <Link
              href={`${SignumSwap}alias/marketplace?search=${searchAlias}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                color="success"
                variant="contained"
                disabled={!isValidAlias}
                sx={{
                  color: "white",
                  borderRadius: "0 0.5em 0.5em 0",
                  height: "100%",
                }}
              >
                {t("getIt")}
              </Button>
            </Link>
          </Stack>
        </Fade>
      </Stack>
    </Box>
  );
};
