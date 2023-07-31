import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { mapValidationError } from "@/app/mapValidationError";
import { SearchAlias } from "../../../validation/types";
import { searchAliasSchema } from "../../../validation/schemas";
import { Web3Chip } from "./components/Web3Chip";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

export const TopSection = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchAlias>({
    mode: "onChange",
    resolver: yupResolver(searchAliasSchema),
    defaultValues: { searchAlias: "" },
  });

  let searchAliasFieldError = "";
  if (errors.searchAlias?.message) {
    searchAliasFieldError = t(
      mapValidationError(errors.searchAlias?.message),
      mapValidationError(errors.searchAlias?.message, true)
    );
  }

  const onSubmit: SubmitHandler<{ searchAlias: string }> = async (data) => {
    if (!data.searchAlias) return;
    router.push(`/alias/marketplace?search=${data.searchAlias}`);
  };

  const searchAlias = watch("searchAlias");
  const fieldMaxWidth = 600;

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="stretch"
      position="relative"
      mb={2}
      px={2}
      sx={{
        py: { xs: 4, md: 8, xl: 10 },
      }}
    >
      <Box
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={-2}
        sx={{
          background:
            "linear-gradient(to right, rgba(17,100,130,0.6) ,rgba(52,217,114,0.9))",
        }}
      />

      <Box
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={-1}
        sx={{
          background: "url(/assets/img/grid.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      />

      <Stack
        direction="column"
        sx={{
          textAlign: { xs: "center", lg: "left" },
          justifyContent: { xs: "center", lg: "flex-start" },
        }}
      >
        <Typography
          component="h1"
          fontWeight={700}
          color="white"
          sx={{
            fontSize: { xs: 26, md: 42 },
          }}
        >
          {t("empowerYour") + " "}
          <Typography
            component="span"
            color="success.main"
            sx={{
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
          >
            <Web3Chip />
          </Typography>

          <Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
            {t("itsYourNameOwnIt")}
          </Typography>
        </Typography>

        <Typography fontWeight={700} color="white" sx={{ mb: 2 }}>
          {t("aliasLandingTopSectionDescription")}
        </Typography>

        <form style={{ display: "flex" }} onSubmit={handleSubmit(onSubmit)}>
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

              <Controller
                name="searchAlias"
                control={control}
                render={({ field }) => (
                  <InputBase
                    {...field}
                    sx={{ ml: 1, flex: 1, py: 2 }}
                    placeholder={t("searchAliasCta")}
                  />
                )}
              />
            </Paper>

            <Button
              color="success"
              variant="contained"
              size="large"
              type="submit"
              disabled={!!searchAliasFieldError}
              sx={{ color: "white", borderRadius: "0 0.5em 0.5em 0" }}
            >
              {t("getIt")}
            </Button>
          </Stack>
        </form>

        {searchAliasFieldError && searchAlias && (
          <Alert
            severity="error"
            sx={{ width: "100%", maxWidth: fieldMaxWidth, mx: "auto" }}
          >
            {searchAliasFieldError}
          </Alert>
        )}
      </Stack>

      <Stack sx={{ ml: 10, display: { xs: "none", lg: "flex" } }}>
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/signumIdCard.webp"
          style={{
            borderRadius: "1em",
            boxShadow: "0 1em 1em rgba(0,0,0,0.4)",
            transform: "rotate(2deg)",
          }}
        />
      </Stack>
    </Box>
  );
};
