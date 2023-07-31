import type { NextPage } from "next";
import { TopSection } from "./sections/TopSection";
import { AliasPerksSection } from "./sections/AliasPerksSection";
import { HowToSection } from "./sections/HowToSection";
import { WhySignumSection } from "./sections/WhySignumSection";
import { FAQSection } from "./sections/FAQSection";

import Box from "@mui/material/Box";

export const Alias: NextPage = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TopSection />
      <AliasPerksSection />
      <HowToSection />
      <WhySignumSection />
      <FAQSection />
    </Box>
  );
};
