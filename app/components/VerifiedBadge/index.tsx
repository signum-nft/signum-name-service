import { memo } from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "@mui/material/styles";

import Tooltip from "@mui/material/Tooltip";
import SvgIcon from "@mui/material/SvgIcon";

interface Props {
  size?: number;
}

export const VerifiedBadge = memo(({ size = 22 }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Tooltip title={`${t("verified")}`} arrow placement="top">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SvgIcon viewBox="0 0 19.9 19.9" sx={{ width: size, height: size }}>
          <path
            fill={theme.palette.primary.main}
            d="M1.5,5.7v8.5c0,0.3,0.2,0.6,0.5,0.8l7.5,4.3c0.3,0.2,0.6,0.2,0.9,0l7.5-4.3c0.3-0.2,0.5-0.5,0.5-0.8V5.7
	c0-0.3-0.2-0.6-0.5-0.8l-7.5-4.3c-0.3-0.2-0.6-0.2-0.9,0L2,4.9C1.7,5.1,1.5,5.4,1.5,5.7z"
          />
          <path
            fill="#ffffff"
            d="M15.9,6.9c0,0.3-0.1,0.5-0.3,0.6l-6.3,6.2c-0.3,0.4-0.8,0.5-1.1,0.2C8.1,13.9,8,13.8,8,13.7
	c-0.8-0.9-1.7-1.7-2.6-2.6c-0.3-0.3-0.6-0.7-0.2-1.1S6,9.9,6.4,10.2c0.6,0.6,1.3,1.2,1.8,1.8c0.4,0.4,0.6,0.4,1,0
	c1.8-1.8,3.5-3.5,5.3-5.2c0.2-0.2,0.3-0.3,0.5-0.5c0.3-0.2,0.7-0.1,0.9,0.2C15.9,6.7,15.9,6.8,15.9,6.9z"
          />
        </SvgIcon>
      </div>
    </Tooltip>
  );
});

VerifiedBadge.displayName = "VerifiedBadge";
