import * as React from "react";
import Typography from "@mui/material/Typography";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useAppSelector } from "@/states/hooks";
import { BreadCrumbIcon, selectBreadcrumbs } from "@/app/states/appState";
import DasboardIcon from "@mui/icons-material/TableChart";
import HomeIcon from "@mui/icons-material/Home";
import DomainIcon from "@mui/icons-material/Language";

function getBreadcrumbIcon(icon: BreadCrumbIcon) {
  switch (icon) {
    case "dashboard":
      return <DasboardIcon />;
    case "subdomain":
      return <DomainIcon />;
    case "home":
      return <HomeIcon />;
    default:
      return null;
  }
}

export const Breadcrumbs = () => {
  const breadcrumbs = useAppSelector(selectBreadcrumbs);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ href, label, icon }, index) =>
        index < breadcrumbs.length - 1 ? (
          <NextLink key={`bc-${href}`} passHref={true} href={href}>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
              href={href}
            >
              {getBreadcrumbIcon(icon)}
              &nbsp;
              {label}
            </Link>
          </NextLink>
        ) : (
          <Typography
            key={`bc-${href}`}
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            {getBreadcrumbIcon(icon)}
            &nbsp;
            {label}
          </Typography>
        )
      )}
    </MUIBreadcrumbs>
  );
};
