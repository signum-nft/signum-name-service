import { useTranslation } from "next-i18next";
import { Descriptor, DescriptorData } from "@signumjs/standards";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { TextLabel } from "@/app/components/TextLabel";
import { mapValidationError } from "@/app/mapValidationError";
import { AccountAddressField } from "@/app/components/AccountAddressField";
import { FileHashField } from "@/app/components/FileHashField";
import { useAlias } from "@/app/hooks/useAlias";
import { EditAlias } from "../../../../validation/types";
import { WizardSubmitter } from "../../WizardSubmitter";
import { AccountTypeMap, AccountTypesList } from "../../types";
import { SocialNetworkField } from "./components/SocialNetworkField";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  id: string;
  onCancel: () => void;
}

export const StandardContentForm = ({ id, onCancel }: Props) => {
  const { t } = useTranslation();
  const { alias } = useAlias(id);

  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isAvatarFileValid, setIsAvatarFileValid] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState<Descriptor>();

  const {
    control,
    watch,
    resetField,
    formState: { errors },
    reset,
    setValue,
  } = useFormContext<EditAlias>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialNetworks",
  });

  const addSocialNetworkField = () => append({ url: "" });

  const receiverAddress = watch("receiverAddress");
  const canInsertAvatar = watch("canInsertAvatar");
  const avatar = watch("avatar");
  const canInsertHomePage = watch("canInsertHomePage");
  const canInsertSocialNetwork = watch("canInsertSocialNetwork");
  const canInsertReceiverAddress = watch("canInsertReceiverAddress");
  const canInsertSendRule = watch("canInsertSendRule");
  const sendRule = watch("sendRule");

  useEffect(() => {
    if (!alias) return;

    try {
      const aliasDescription = DescriptorData.parse(alias.aliasURI);
      if (!aliasDescription) throw new Error("Invalid standard content");

      setDefaultFormValues(aliasDescription.get());
    } catch (error) {
      return;
    }
  }, []);

  useEffect(() => {
    if (!defaultFormValues) return;

    const {
      type,
      name,
      description,
      homePage,
      socialMediaLinks,
      avatar,
      account,
      sendRule,
    } = defaultFormValues;

    const isSocialMediaLinksAvailable = !!(
      socialMediaLinks && !!socialMediaLinks.length
    );

    const isAvatarAvailable = !!avatar;

    const isSendRuleAvailable = !!sendRule;

    reset({
      // @ts-ignore
      type: type || "",
      name: name || "",
      description: description || "",
      canInsertHomePage: !!homePage,
      homePage: homePage || "",
      canInsertAvatar: isAvatarAvailable,
      avatar: isAvatarAvailable ? avatar.ipfsCid : "",
      avatarMimeType: isAvatarAvailable ? avatar.mimeType : "",
      canInsertReceiverAddress: !!account,
      receiverAddress: account || "",
      canInsertSendRule: isSendRuleAvailable,
      sendRule: isSendRuleAvailable ? sendRule.source : "",
      customContent: "",
      canInsertSocialNetwork: isSocialMediaLinksAvailable,
      socialNetworks: isSocialMediaLinksAvailable
        ? socialMediaLinks.map((socialMediaLink) => ({ url: socialMediaLink }))
        : [],
    });
  }, [defaultFormValues]);

  // Every time a certain field is enabled or disabled, reset field
  useEffect(() => {
    if (!canInsertSendRule) setValue("sendRule", "");
    if (!canInsertReceiverAddress) setValue("receiverAddress", "");
    if (!canInsertSocialNetwork) resetField("socialNetworks");
    if (!canInsertHomePage) setValue("homePage", "");

    if (!canInsertAvatar) {
      setValue("avatar", "");
      setValue("avatarMimeType", "");
    }
  }, [
    canInsertReceiverAddress,
    canInsertSendRule,
    canInsertSocialNetwork,
    canInsertHomePage,
    canInsertAvatar,
    setValue,
    resetField,
  ]);

  let nameFieldError = "";
  let descriptionFieldError = "";
  let receiverAddressFieldError = "";
  let avatarFieldError = "";
  let homePageFieldError = "";
  let socialNetworksFieldsErrorDetected = false;
  let sendRuleFieldError = "";

  if (errors.name?.message) {
    nameFieldError = t(
      mapValidationError(errors.name.message),
      mapValidationError(errors.name.message, true)
    );
  }

  if (errors.description?.message) {
    descriptionFieldError = t(
      mapValidationError(errors.description.message),
      mapValidationError(errors.description.message, true)
    );
  }

  if (errors.receiverAddress?.message) {
    receiverAddressFieldError = "invalidAddress";
  }

  if (!isAddressValid && receiverAddress && !errors.receiverAddress) {
    receiverAddressFieldError = "invalidAddress";
  }

  if (!isAvatarFileValid && canInsertAvatar && avatar) {
    avatarFieldError = "invalidFile";
  }

  if (errors.homePage?.message) {
    homePageFieldError = t(
      mapValidationError(errors.homePage.message),
      mapValidationError(errors.homePage.message, true)
    );
  }

  if (errors.socialNetworks) {
    socialNetworksFieldsErrorDetected = true;
  }

  if (errors.sendRule?.message) {
    sendRuleFieldError = t(
      mapValidationError(errors.sendRule.message),
      mapValidationError(errors.sendRule.message, true)
    );
  }

  // Custom validation for `Send Rule`
  const isValidRegexField = useMemo(() => {
    if (!sendRule) return false;

    try {
      new RegExp(sendRule);
      return true;
    } catch (e) {
      return false;
    }
  }, [sendRule]);

  if (sendRule && !isValidRegexField) {
    sendRuleFieldError = t("invalidRegexTerm");
  }

  const allowSubmit =
    !nameFieldError &&
    !descriptionFieldError &&
    !receiverAddressFieldError &&
    !avatarFieldError &&
    !homePageFieldError &&
    !socialNetworksFieldsErrorDetected &&
    !sendRuleFieldError;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextLabel text={t("selectTheType")} gutterBottom />

        <FormControl fullWidth color="secondary">
          <InputLabel>{t("pickOne")}</InputLabel>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth defaultValue="" label={t("pickOne")}>
                {AccountTypesList.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(`${AccountTypeMap.get(type)}`)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          <FormHelperText>{t("selectAccountTypeHelper")}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item>
        <TextLabel text={t("name")} gutterBottom />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              autoComplete="off"
              placeholder={t("name")}
              variant="outlined"
              color="secondary"
              helperText={nameFieldError}
              error={!!nameFieldError}
            />
          )}
        />
      </Grid>

      <Grid item>
        <TextLabel text={t("description")} gutterBottom />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoComplete="off"
              fullWidth
              multiline
              minRows={3}
              maxRows={10}
              placeholder={t("description")}
              helperText={descriptionFieldError}
              error={!!descriptionFieldError}
              variant="outlined"
              color="secondary"
              inputProps={{
                maxLength: 384,
              }}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Stack direction="column" spacing={1}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {t("homePage")}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {t("enterHomePageTip")}
              </Typography>
            </Box>

            <Box>
              <Controller
                name="canInsertHomePage"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    color="secondary"
                    value={canInsertHomePage}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              />
            </Box>
          </Box>

          <Collapse in={canInsertHomePage}>
            <Controller
              name="homePage"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  autoComplete="off"
                  placeholder={t("homePage")}
                  variant="outlined"
                  color="secondary"
                  helperText={homePageFieldError}
                  error={!!homePageFieldError}
                />
              )}
            />
          </Collapse>
        </Stack>
      </Grid>

      <Grid item>
        <Stack direction="column" spacing={1}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {t("socialNetwork_other")}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {t("enterSocialNetworkTip")}
              </Typography>
            </Box>

            <Box>
              <Controller
                name="canInsertSocialNetwork"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    color="secondary"
                    value={canInsertSocialNetwork}
                  />
                )}
              />
            </Box>
          </Box>

          <Collapse in={canInsertSocialNetwork}>
            {fields.map((field, index) => (
              <SocialNetworkField
                key={field.id}
                fieldIndex={index}
                remove={() => remove(index)}
              />
            ))}

            {fields.length < 3 && (
              <Button
                variant="contained"
                color="primary"
                sx={{ color: "white" }}
                fullWidth
                onClick={addSocialNetworkField}
                startIcon={<AddCircleIcon />}
              >
                {t("addSocialNetwork")}
              </Button>
            )}
          </Collapse>
        </Stack>
      </Grid>

      <Grid item>
        <Stack direction="column" spacing={1}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {`${t("avatar")} (${t("advanced")})`}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {t("enterAvatarFieldTip")}
              </Typography>
            </Box>

            <Box>
              <Controller
                name="canInsertAvatar"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    color="secondary"
                    value={canInsertAvatar}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              />
            </Box>
          </Box>

          <Collapse in={canInsertAvatar}>
            <FileHashField
              type="avatar"
              isFileHashValid={isAvatarFileValid}
              setIsFileValid={setIsAvatarFileValid}
            />
          </Collapse>
        </Stack>
      </Grid>

      <Grid item>
        <Stack direction="column" spacing={1}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {`${t("addressOrAccountId")} (${t("advanced")})`}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {t("addressOrAccountIdTip")}
              </Typography>
            </Box>

            <Box>
              <Controller
                name="canInsertReceiverAddress"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    color="secondary"
                    value={canInsertReceiverAddress}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              />
            </Box>
          </Box>

          <Collapse in={canInsertReceiverAddress}>
            <AccountAddressField
              isAddressValid={isAddressValid}
              setIsAccountValid={setIsAddressValid}
              allowSelfAddress
            />
          </Collapse>
        </Stack>
      </Grid>

      <Grid item>
        <Stack direction="column" spacing={1}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {`${t("sendRule")} (${t("advanced")})`}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                {t("sendRuleTip")}
              </Typography>
            </Box>

            <Box>
              <Controller
                name="canInsertSendRule"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    color="secondary"
                    value={canInsertSendRule}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              />
            </Box>
          </Box>

          <Collapse in={canInsertSendRule}>
            <Controller
              name="sendRule"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  autoComplete="off"
                  placeholder={t("sendRule")}
                  variant="outlined"
                  color="secondary"
                  helperText={
                    sendRuleFieldError || `${t("example")} /^[0-9a-fA-F]{64}$/`
                  }
                  error={!!sendRuleFieldError}
                />
              )}
            />
          </Collapse>
        </Stack>
      </Grid>

      <Grid item>
        <WizardSubmitter allowSubmit={!!allowSubmit} onCancel={onCancel} />
      </Grid>
    </Grid>
  );
};
