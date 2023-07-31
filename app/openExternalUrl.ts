import { isClientSide } from "@/app/isClientSide";

export const openExternalUrl = (url: string): void => {
  if (!isClientSide()) {
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
};
