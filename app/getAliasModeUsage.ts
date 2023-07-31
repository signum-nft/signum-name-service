import { DescriptorData } from "@signumjs/standards";
import { AliasUpdateMode } from "@/app/types/aliasUpdateMode";

export const getAliasModeUsage = (aliasURI: string): AliasUpdateMode => {
  if (!aliasURI) return "freestyle";

  try {
    const descriptorData = DescriptorData.parse(aliasURI).get();

    const formattedDescriptorData = Object.fromEntries(
      Object.entries(descriptorData).filter(([_, v]) => v != null)
    );

    const formattedDescriptorDataLength = Object.values(
      formattedDescriptorData
    ).length;

    // Check for "account shortcut" mode
    if (formattedDescriptorDataLength === 2 && descriptorData.account) {
      return "account";
    }

    // Check for "link redirection" mode
    if (formattedDescriptorDataLength === 2 && descriptorData.homePage) {
      return "link";
    }

    return "standard";
  } catch (error) {
    return "freestyle";
  }
};
