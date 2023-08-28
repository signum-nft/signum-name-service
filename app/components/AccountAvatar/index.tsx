import { useState, useCallback, useLayoutEffect } from "react";
import { useAccount } from "@/app/hooks/useAccount";
import { DescriptorData } from "@signumjs/standards";

// @ts-ignore
import hashicon from "hashicon";
import styles from "./AccountAvatar.module.css";

interface Props {
  size?: number;
}

export const AccountAvatar = ({ size = 24 }: Props) => {
  const { accountId, description } = useAccount();

  const [imageSrcUrl, setImageSrcUrl] = useState("");

  const mountHashIcon = useCallback(() => {
    const accountHashIcon = hashicon(accountId, { size }).toDataURL();
    setImageSrcUrl(accountHashIcon);
  }, [accountId, size]);

  useLayoutEffect(() => {
    try {
      const descriptor = DescriptorData.parse(description, false);
      if (descriptor.avatar) {
        setImageSrcUrl(`https://ipfs.io/ipfs/${descriptor.avatar.ipfsCid}`);
      } else {
        mountHashIcon();
      }
    } catch (e: any) {
      mountHashIcon();
    }
  }, [description, mountHashIcon]);

  return (
    <div
      className={styles.avatarContainer}
      style={{ height: size, width: size }}
    >
      <picture>
        <img
          className={styles.avatarImage}
          style={{ height: size, width: size }}
          src={imageSrcUrl}
          alt="account-avatar"
          onError={mountHashIcon}
        />
      </picture>
    </div>
  );
};
