import { useTranslation } from "next-i18next";
import { useState, SyntheticEvent } from "react";
import { Accordion } from "./components/Accordion";
import { AccordionDetails } from "./components/AccordionDetails";
import { AccordionSummary } from "./components/AccordionSummary";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const FAQSection = () => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      mb={2}
      p={2}
      width="100%"
      maxWidth={900}
      mx="auto"
    >
      <Typography fontWeight={700} align="center" variant="h4" gutterBottom>
        {t("frequentlyAskedQuestions")}
      </Typography>

      <Card
        variant="outlined"
        sx={{
          width: "100%",
          position: "relative",
          borderColor: "divider",
          p: 2,
          overflow: "visible",
          borderRadius: 2,
        }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography fontWeight={500}>
              {t("aliasFAQFirstQuestion")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{t("aliasFAQFirstAnswer")}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography fontWeight={500}>
              {t("aliasFAQSecondQuestion")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{t("aliasFAQSecondAnswer")}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography fontWeight={500}>
              {t("aliasFAQThirdQuestion")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{t("aliasFAQThirdAnswer")}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography fontWeight={500}>
              {t("aliasFAQFourthQuestion")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{t("aliasFAQFourthAnswer")}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
            <Typography fontWeight={500}>
              {t("aliasFAQFifthQuestion")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{t("aliasFAQFifthAnswer")}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
            <Typography fontWeight={500}>
              {t("aliasFAQSixthQuestion")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{t("aliasFAQSixthAnswer")}</Typography>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  );
};
