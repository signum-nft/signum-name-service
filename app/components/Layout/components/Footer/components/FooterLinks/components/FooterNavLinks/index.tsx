import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface FooterLinksProps {
  label: string;
  url?: string;
  newTab?: boolean;
  onClick?: any;
  hideLink?: boolean;
}

interface FooterNavLinksProps {
  title: string;
  links: FooterLinksProps[];
}

export const FooterNavLinks = ({ title, links }: FooterNavLinksProps) => {
  return (
    <Grid
      item
      xs={6}
      md={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: { xs: "center", md: "flex-start" },
        marginBottom: 2,
      }}
    >
      <Typography gutterBottom fontWeight={500}>
        {title}
      </Typography>

      {links.map((link) => {
        const { label, url, newTab, hideLink = false, onClick } = link;
        const textStyling = {
          fontWeight: 300,
          marginBottom: 0.5,
          cursor: "pointer",
          color: "inherit",
        };

        if (hideLink) return null;

        if (onClick)
          return (
            <Typography onClick={onClick} sx={textStyling} key={label}>
              {label}
            </Typography>
          );

        if (url)
          return (
            <Link key={label} href={url} passHref>
              <Typography
                component="a"
                target={newTab ? "_blank" : "_self"}
                sx={textStyling}
                rel="noopener noreferrer"
              >
                {label}
              </Typography>
            </Link>
          );
      })}
    </Grid>
  );
};
