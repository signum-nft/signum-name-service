import * as React from "react";
import Typography from "@mui/material/Typography";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useAppSelector } from "@/states/hooks";
import { selectBreadcrumbs } from "@/app/states/appState";

export const Breadcrumbs = () => {
  const breadcrumbs = useAppSelector(selectBreadcrumbs);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ href, label, icon: Icon }, index) =>
        index < breadcrumbs.length - 1 ? (
          <NextLink key={`bc-${href}`} passHref={true} href={href}>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
              href={href}
            >
              <Icon sx={{ mr: 0.5 }} fontSize="inherit" />
              {label}
            </Link>
          </NextLink>
        ) : (
          <Typography
            key={`bc-${href}`}
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <Icon sx={{ mr: 0.5 }} fontSize="inherit" />
            {label}
          </Typography>
        )
      )}
    </MUIBreadcrumbs>
  );
};
