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
        py: 3,
        fontSize: 22,
        borderRadius: 10,
        color: "white",
      }}
      css={css`
        background: #5d26c1;

        @media screen and (min-width: 860px) {
          -webkit-animation: AnimationName 3s ease infinite;
          -moz-animation: AnimationName 3s ease infinite;
          -o-animation: AnimationName 3s ease infinite;
          animation: glance 3s ease infinite;
          background: linear-gradient(270deg, #0b5d34, #a17fe0, #5d26c1);
          background-size: 600% 600%;
        }

        @-webkit-keyframes AnimationName {
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
        @-moz-keyframes AnimationName {
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
        @-o-keyframes AnimationName {
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
        @keyframes AnimationName {
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
