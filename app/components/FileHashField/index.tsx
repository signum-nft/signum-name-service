import { useTranslation } from "next-i18next";
import { useFormContext, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { useRef, useEffect, useState } from "react";
import { multihash } from "is-ipfs";
import { supportedMimeTypes } from "@/app/types/supportedMimeTypes";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import WallpaperIcon from "@mui/icons-material/Wallpaper";

interface Props {
  type: "avatar" | "background";
  isFileHashValid: boolean;
  setIsFileValid: (value: boolean) => void;
}

export const FileHashField = ({
  type,
  isFileHashValid,
  setIsFileValid,
}: Props) => {
  const { t } = useTranslation();

  const [isSearching, setIsSearching] = useState(false);
  const [isFileMimeTypeValid, setIsFileMimeTypeValid] = useState(false);
  const [fileHashFieldError, setFileHashFieldError] = useState("");
  const [fileHashHelperText, setFileHashHelperText] = useState("");
  const [fileSrc, setFileSrc] = useState("");

  const debouncedCheckAccountFn = useRef<any>();

  const { control, watch, setValue } = useFormContext<{
    // Pre-defined form keys for certain type of picture field
    // Avatar
    avatar?: string;
    avatarMimeType?: string;

    // Background
    background?: string;
    backgroundMimeType?: string;
  }>();

  const selectedField = watch(type);

  useEffect(() => {
    return () => {
      debouncedCheckAccountFn.current &&
        debouncedCheckAccountFn.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (!selectedField) return;
    debouncedCheckAccountFn.current(selectedField);
  }, [selectedField]);

  useEffect(() => {
    debouncedCheckAccountFn.current = debounce(async (fileHash: string) => {
      if (!fileHash) return setIsFileValid(false);
      setIsSearching(true);

      try {
        // Client-side hash
        if (!multihash(fileHash)) throw new Error("invalid");

        // Make request for getting the MIME type
        const mimeType = await fetch(`https://ipfs.io/ipfs/${fileHash}`).then(
          (response) => {
            if (response.ok) return response.headers.get("content-type") || "";
          }
        );

        if (!mimeType) throw new Error("invalid");

        // Verify for allowed file types
        if (!supportedMimeTypes.includes(mimeType))
          throw new Error("invalidType");

        const keyTypeToUpdate =
          type === "avatar" ? "avatarMimeType" : "backgroundMimeType";

        setValue(keyTypeToUpdate, mimeType);
        setIsFileValid(true);
        setIsFileMimeTypeValid(true);
        setFileSrc(`https://ipfs.io/ipfs/${fileHash}`);
      } catch (error: any) {
        if (error.message === "invalidType") setIsFileMimeTypeValid(false);
        setIsFileValid(false);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  }, [setIsFileValid]);

  useEffect(() => {
    if (selectedField) {
      if (isFileHashValid) {
        setFileHashFieldError("");
        return setFileHashHelperText(t("validHash") + "✅");
      } else {
        setIsFileValid(false);
        setFileSrc("");
        return setFileHashFieldError(
          t(!isFileMimeTypeValid ? "invalidFileType" : "invalidHash")
        );
      }
    } else {
      setFileHashHelperText("");
      setFileSrc("");
    }
  }, [isFileHashValid, isFileMimeTypeValid, selectedField]);

  return (
    <Stack direction="row" spacing={2}>
      <Controller
        name={type}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            autoComplete="off"
            label={t("enterTheIpfsHashOfPicture")}
            placeholder={t(type)}
            variant="outlined"
            color="secondary"
            helperText={fileHashFieldError || fileHashHelperText}
            error={!!fileHashFieldError}
            sx={{ mb: 2, flex: 1 }}
            InputProps={{
              endAdornment: isSearching ? (
                <InputAdornment position="end">
                  <ProcessingIndicatorChip label={t("processing")} />
                </InputAdornment>
              ) : undefined,
            }}
          />
        )}
      />

      <Avatar
        alt="file preview"
        src={fileSrc}
        variant="rounded"
        sx={{ width: 64, height: 64 }}
      >
        <WallpaperIcon fontSize="large" />
      </Avatar>
    </Stack>
  );
};
