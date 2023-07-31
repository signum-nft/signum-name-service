import { useMemo } from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { identiheart } from "@/app/utils/identiheart";
import { useAppContext } from "@/app/hooks/useAppContext";

import HelpIcon from "@mui/icons-material/Help";

interface Props extends AvatarProps {
  tokenId: string;
}

export const TokenAvatar = ({ tokenId, variant, sx }: Props) => {
  const { TokenTrtId } = useAppContext();

  const tokenIdenticon = useMemo(() => {
    if (!tokenId) return "";
    if (tokenId === "0") return "";
    return identiheart({ digest: tokenId }).toDataURL();
  }, [tokenId]);

  const isTrt = tokenId === TokenTrtId;

  const src = isTrt ? "/assets/img/trt_logo.png" : tokenIdenticon;

  if (!tokenIdenticon) return null;

  return (
    <Avatar src={src} variant={variant} sx={{ background: "white", ...sx }}>
      <HelpIcon fontSize="small" />
    </Avatar>
  );
};
