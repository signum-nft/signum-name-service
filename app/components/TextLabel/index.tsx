import { FC, ReactNode, ReactElement } from "react";
import Typography from "@mui/material/Typography";

interface Props {
  text: string;
  required?: boolean;
  gutterBottom?: boolean;
  sx?: any;
  children?: ReactNode | ReactElement;
}

export const TextLabel: FC<Props> = ({
  text,
  required = false,
  gutterBottom = false,
  sx,
  children,
}) => (
  <Typography fontWeight={500} gutterBottom={gutterBottom} sx={sx}>
    {text}
    {required && (
      <Typography color="error" component="span">
        &nbsp;*
      </Typography>
    )}
    {children}
  </Typography>
);
