import Skeleton from "@mui/material/Skeleton";

interface Props {
  height: number | string;
  removeBorderRadius?: boolean;
}

export const LoadingIndicator = ({ height, removeBorderRadius }: Props) => (
  <Skeleton
    variant="rectangular"
    width="100%"
    height={height}
    sx={{ borderRadius: removeBorderRadius ? 0 : 2 }}
  />
);
