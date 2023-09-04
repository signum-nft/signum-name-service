import { useTranslation } from "next-i18next";
import { useState, SyntheticEvent } from "react";
import { Accordion } from "./components/Accordion";
import { AccordionDetails } from "./components/AccordionDetails";
import { AccordionSummary } from "./components/AccordionSummary";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { FAQs } from "@/features/home/sections/FAQSection/faq";

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
        {FAQs.map(({ id, question, answer }) => {
          const fid = `faq-${id}`;
          return (
            <Accordion
              key={fid}
              expanded={expanded === fid}
              onChange={handleChange(fid)}
            >
              <AccordionSummary
                aria-controls={`${fid}-content`}
                id={`${fid}-header`}
              >
                <Typography fontWeight={500}>{t(question)}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>{t(answer)}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Card>
    </Box>
  );
};
