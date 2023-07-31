/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactElement } from "react";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

interface Props {
  title: string;
  description?: string;
  icon: ReactElement;
  url: string;
  newTab?: boolean;
}

export const SubMenuLink = ({
  title,
  description,
  icon,
  url,
  newTab,
}: Props) => {
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <Link href={url} passHref>
      <Box
        component="a"
        target={newTab ? "_blank" : "_self"}
        role="none"
        display="flex"
        flexDirection="row"
        alignItems="center"
        p={2}
        py={3}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          cursor: "pointer",
          transition: "all .2s ease 0s",
        }}
        css={css`
          :hover {
            background: ${isDarkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.01)"};
          }

          :last-child {
            border-bottom: none;
          }
        `}
      >
        <Box mr={2}>
          <Avatar
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              color: "white",
            }}
            variant="rounded"
          >
            {icon}
          </Avatar>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography fontWeight={500} color="textPrimary">
            {title}
          </Typography>

          {description && (
            <Typography fontWeight={500} variant="body2" color="textSecondary">
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Link>
  );
};
