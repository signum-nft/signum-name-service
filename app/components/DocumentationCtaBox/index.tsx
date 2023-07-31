import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";
import { PaperCard } from "@/app/components/PaperCard";

import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface Props {
  title: string;
  url: string;
}

export const DocumentationCtaBox = ({ title, url }: Props) => {
  const { t } = useTranslation();
  const {
    Platform: { DocumentationUrl },
  } = useAppContext();

  return (
    <PaperCard>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
      >
        <Image
          src="/assets/img/signaToken.svg"
          alt="Token creation"
          width={76}
          height={80}
          unoptimized
        />

        <Typography
          fontWeight={500}
          variant="body2"
          gutterBottom
          align="center"
        >
          {title}
        </Typography>

        <Button
          href={DocumentationUrl + url}
          target="_blank"
          color="secondary"
          fullWidth
          startIcon={<OpenInNewIcon />}
        >
          {t("learnMore")}
        </Button>
      </Box>
    </PaperCard>
  );
};
