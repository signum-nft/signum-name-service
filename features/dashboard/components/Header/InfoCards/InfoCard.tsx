import { ChildrenProps } from "@/types/ChildrenProps";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";

const FancyIcon = styled(Box)`
  position: absolute;
  top: -48px;
  right: -48px;
  width: 128px;
  height: 128px;
  opacity: 0.25;
  clip-path: inset(32px 32px 0px 0px);
`;

const FancyPaper = styled(Paper)<{ isDark: boolean }>(({ isDark, theme }) => ({
  backgroundImage: `radial-gradient(100% 100% at 100% 0%, rgb(${
    isDark ? "236,56,188" : "243,177,103"
  }, 0.5) 0%, rgba(255, 255, 255, 0) 100%)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: theme.spacing(2),
  borderRadius: "4px",
  opacity: 0.9,
}));

interface Props extends ChildrenProps {
  title: string;
  icon?: typeof SvgIcon;
  tooltip?: string;
}

export const InfoCard = ({ children, title, icon: Icon, tooltip }: Props) => {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  return (
    <FancyPaper elevation={4} isDark={isDarkMode}>
      <Box position="relative">
        {Icon && (
          <FancyIcon>
            {
              <Icon
                sx={{ width: "100%", height: "100%" }}
                color={`${isDarkMode ? "secondary" : "primary"}`}
              />
            }
          </FancyIcon>
        )}
        {tooltip && (
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" mr={0.25}>
              {title}
            </Typography>
            <Tooltip title={tooltip}>
              <HelpOutlineIcon
                sx={{ opacity: "0.5", width: "20px", height: "20px" }}
              />
            </Tooltip>
          </Stack>
        )}
      </Box>
      <Divider />
      <Box mt={2}>{children}</Box>
    </FancyPaper>
  );
};
