import { isClientSide } from "@/app/isClientSide";

export const getSystemTheme = (): "dark" | "light" => {
  if (!isClientSide()) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
