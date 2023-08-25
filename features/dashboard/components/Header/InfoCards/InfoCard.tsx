import { ChildrenProps } from "@/types/ChildrenProps";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";

const FancyIcon = styled(Box)`
  position: absolute;
  top: -48px;
  right: -48px;
  width: 128px;
  height: 128px;
  opacity: 0.075;
  clip-path: inset(32px 32px 0px 0px);
`;

interface Props extends ChildrenProps {
  title: string;
  icon?: typeof SvgIcon;
}

export const InfoCard = ({ children, title, icon: Icon }: Props) => {
  return (
    <Paper elevation={4} sx={{ padding: 2, borderRadius: 2, opacity: 0.9 }}>
      <Box position="relative">
        {Icon && (
          <FancyIcon>
            {<Icon sx={{ width: "100%", height: "100%" }} />}
          </FancyIcon>
        )}
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Divider />
      <Box mt={2}>{children}</Box>
    </Paper>
  );
};
