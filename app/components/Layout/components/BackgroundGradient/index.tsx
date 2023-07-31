import { useFeatureBackgroundImage } from "@/app/hooks/useFeatureBackgroundImage";

import Box from "@mui/material/Box";

export const BackgroundGradient = () => {
  const backgroundImage = useFeatureBackgroundImage();

  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      top={0}
      left={0}
      zIndex={-999999999}
      sx={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: { xs: "none", lg: "block" },
      }}
    />
  );
};
