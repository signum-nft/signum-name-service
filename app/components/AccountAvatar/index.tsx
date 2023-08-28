import { useEffect, useState, useMemo, useCallback } from "react";
import { useAccount } from "@/app/hooks/useAccount";
import { DescriptorData } from "@signumjs/standards";

// @ts-ignore
import hashicon from "hashicon";
import useSWR from "swr";
import styles from "./AccountAvatar.module.css";

interface Props {
  size?: number;
}

export const AccountAvatar = ({ size = 24 }: Props) => {
  const { accountId, description } = useAccount();

  const [imageSrcUrl, setImageSrcUrl] = useState("");

  const { data: ipfsUrl } = useSWR(
    accountId ? `account/avatar/${accountId}` : null,
    async () => {
      if (!description) return null;

      try {
        const descriptor = DescriptorData.parse(description, false);
        if (descriptor.avatar) {
          return `https://ipfs.io/ipfs/${descriptor.avatar.ipfsCid}`;
        }
      } catch (e: any) {
        return null;
      }
    }
  );

  const accountHashIcon = useMemo(
    () => hashicon(accountId, { size }).toDataURL(),
    [accountId]
  );

  const loadAccountHashIcon = useCallback(() => {
    setImageSrcUrl(accountHashIcon);
  }, [accountHashIcon]);

  useEffect(() => {
    if (!accountId) return;
    loadAccountHashIcon();
  }, [loadAccountHashIcon, accountId]);

  useEffect(() => {
    if (!ipfsUrl) return;
    setImageSrcUrl(ipfsUrl);
  }, [ipfsUrl]);

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
          onError={loadAccountHashIcon}
        />
      </picture>
    </div>
  );
};
