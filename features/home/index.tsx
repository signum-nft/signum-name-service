import type { NextPage } from "next";
import { TopSection } from "./sections/TopSection";
import { AliasSection } from "./sections/AliasSection";
import { HowToSection } from "./sections/HowToSection";
import { FAQSection } from "./sections/FAQSection";
import { Slide } from "react-awesome-reveal";
import Box from "@mui/material/Box";

export const Home: NextPage = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TopSection />
      <AliasSection />
      <Slide triggerOnce direction="up">
        <HowToSection />
        <FAQSection />
      </Slide>
    </Box>
  );
};
