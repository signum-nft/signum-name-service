import * as React from "react";
import Typography from "@mui/material/Typography";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import LanguageIcon from "@mui/icons-material/Language";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import SvgIcon from "@mui/material/SvgIcon";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

interface Item {
  label: string;
  href: string;
  icon: typeof SvgIcon;
}

export const Breadcrumbs = () => {
  const { route } = useRouter();
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fragments = location.pathname.split("/");
    console.log("route", fragments);
    const newItems: Item[] = [
      {
        label: t("home"),
        href: "/",
        icon: HomeIcon,
      },
    ];

    if (fragments[1]) {
      newItems.push({
        label: t("dashboard"),
        href: "/dashboard",
        icon: TableChartIcon,
      });
    }
    if (fragments[1] === "domain" && fragments[2]) {
      newItems.push({
        label: fragments[2],
        href: "#",
        icon: LanguageIcon,
      });
    }

    setItems(newItems);
  }, [route]); // use route as trigger

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {items.map(({ href, label, icon: Icon }, index) =>
        index < items.length - 1 ? (
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
