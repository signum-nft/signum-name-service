import {
  SendEncryptedMessageArgs,
  GenericExtensionWallet,
} from "@signumjs/wallets";
import { Address } from "@signumjs/core";

export class WalletDecorator {
  constructor(private wallet: GenericExtensionWallet) {}

  get connectedAccount(): Address | null {
    if (this.wallet.connection) {
      return Address.create(this.wallet.connection.publicKey);
    }
    return null;
  }

  async confirm(unsignedTransaction: string) {
    try {
      window.dispatchEvent(new Event("wallet-sign-start"));
      return await this.wallet.confirm(unsignedTransaction);
    } catch (e: any) {
      throw e;
    } finally {
      window.dispatchEvent(new Event("wallet-sign-end"));
    }
  }

  async sendEncrypted(args: SendEncryptedMessageArgs) {
    try {
      window.dispatchEvent(new Event("wallet-sign-start"));
      return await this.wallet.sendEncryptedMessage(args);
    } catch (e: any) {
      throw e;
    } finally {
      window.dispatchEvent(new Event("wallet-sign-end"));
    }
  }
}
