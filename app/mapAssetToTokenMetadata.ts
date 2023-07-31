import { Asset, Ledger } from "@signumjs/core";
import { TokenMetaData } from "@/app/types/tokenMetaData";

const SmartContractPublicKey =
  "0000000000000000000000000000000000000000000000000000000000000000";

export const mapAssetToTokenMetadata = async (
  t: Asset,
  ledger: Ledger
): Promise<TokenMetaData> => {
  const issuerIsSmartContract = t.publicKey === SmartContractPublicKey;

  let machineCodeHash = "";
  if (issuerIsSmartContract) {
    try {
      const { machineCodeHashId } = await ledger.contract.getContract(
        t.account
      );
      machineCodeHash = machineCodeHashId;
    } catch (e) {
      // ignore any error
    }
  }
  return {
    id: t.asset,
    description: t.description,
    decimals: t.decimals,
    ticker: t.name,
    isMintable: t.mintable,
    issuerId: t.account,
    issuerIsSmartContract,
    machineCodeHash,
  };
};
