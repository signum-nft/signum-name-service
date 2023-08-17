import { SRC44DescriptorType } from "@signumjs/standards";

export type EditAlias = {
  type: "" | SRC44DescriptorType;
  name: string;
  description: string;

  canInsertAvatar: boolean;
  avatar: string;
  avatarMimeType: string;

  canInsertHomePage: boolean;
  homePage: string;

  canInsertSocialNetwork: boolean;
  socialNetworks: { url: string }[];

  canInsertReceiverAddress: boolean;
  receiverAddress: string;

  canInsertSendRule: boolean;
  sendRule: string;

  customContent: string;
};

export type SellAlias = {
  price: string;
  receiverAddress: string;
};

export type TransferAlias = { receiverAddress: string };
