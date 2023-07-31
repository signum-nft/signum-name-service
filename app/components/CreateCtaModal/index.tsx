import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";

import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  imgUrl: string;
  imgAlt: string;
  imgSize: number;
  ctaTitle: string;
  ctaUrl: string;
  ctaPositiveActionLabel: string;
  onClose: () => void;
  persist: boolean;
}

export const CreateCtaModal = ({
  imgUrl,
  imgAlt,
  imgSize,
  ctaTitle,
  ctaUrl,
  ctaPositiveActionLabel,
  onClose,
  persist,
}: Props) => {
  const { t } = useTranslation();
  const { IsMobile } = useAppContext();

  const [canShowContent, setCanShowContent] = useState(false);
  const toggleCanShowContent = () => setCanShowContent(!canShowContent);

  if (IsMobile) return null;

  return (
    <Box position="fixed" right="1%" bottom="2%" maxWidth={385} zIndex={1}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          position: "relative",
          boxShadow: "0 0px 10px 0 rgba(0,0,0,0.1)",
        }}
      >
        <Collapse in={canShowContent}>
          <Stack direction="column" alignItems="center">
            <div>
              <Image
                src={imgUrl}
                alt={imgAlt}
                width={imgSize}
                height={imgSize}
                unoptimized
              />
            </div>

            <Typography fontWeight={500} variant="body2" align="center">
              {ctaTitle}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              my={2}
            >
              <Link href={ctaUrl} passHref>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  sx={{ color: "white" }}
                >
                  {ctaPositiveActionLabel}
                </Button>
              </Link>

              <Button
                variant="outlined"
                color="warning"
                startIcon={<ExpandMoreIcon />}
                onClick={toggleCanShowContent}
              >
                {t("hide")}
              </Button>
            </Stack>

            {!persist && (
              <Button
                startIcon={<CloseIcon />}
                color="inherit"
                onClick={onClose}
                fullWidth
              >
                {t("doNotShowAnymoreThis")}
              </Button>
            )}
          </Stack>
        </Collapse>

        <Collapse in={!canShowContent}>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<AddCircleIcon />}
            fullWidth
            onClick={toggleCanShowContent}
          >
            {ctaPositiveActionLabel}
          </Button>
        </Collapse>
      </Paper>
    </Box>
  );
};
