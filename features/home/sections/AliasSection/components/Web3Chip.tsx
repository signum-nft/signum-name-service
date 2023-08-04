/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";

import Chip from "@mui/material/Chip";

export const Web3Chip = () => {
  const { t } = useTranslation();

  return (
    <Chip
      label={t("web3Identity")}
      color="success"
      variant="filled"
      sx={{
        px: 1,
        py: 1,
        fontSize: 16,
        borderRadius: 10,
        color: "white",
      }}
      css={css`
        background: #5d26c1;
        animation: rolling 3s ease infinite;
        background: linear-gradient(270deg, #ffb856, #a17fe0, #5d26c1);
        background-size: 600% 600%;

        @-webkit-keyframes rolling {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}
    />
  );
};
