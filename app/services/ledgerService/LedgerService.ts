import { Ledger, LedgerClientFactory } from "@signumjs/core";
import { GenericExtensionWallet } from "@signumjs/wallets";
import { WalletDecorator } from "./WalletDecorator";
import { LedgerServiceContext } from "./LedgerServiceContext";
import { NodeService } from "./nodeService";
import { AccountService } from "./accountService";
import { TransactionService } from "./transactionService";
import { AliasService } from "./aliasService";

export class LedgerService {
  private readonly ledger: Ledger;
  private readonly nodeService: NodeService;

  private readonly accountService: AccountService;
  private readonly transactionService: TransactionService;
  private readonly aliasService: AliasService;

  constructor(
    private nodeHost: string,
    private wallet: GenericExtensionWallet
  ) {
    console.debug("Creating Ledger Service instance...");

    this.ledger = LedgerClientFactory.createClient({
      nodeHost,
    });

    const context: LedgerServiceContext = {
      ledger: this.ledger,
      wallet: new WalletDecorator(wallet),
    };

    this.nodeService = new NodeService(context);
    this.accountService = new AccountService(context);
    this.transactionService = new TransactionService(context);
    this.aliasService = new AliasService(context);
  }

  get ledgerInstance() {
    return this.ledger;
  }
  get host() {
    return this.nodeHost;
  }

  get node(): NodeService {
    return this.nodeService;
  }

  get account(): AccountService {
    return this.accountService;
  }

  get transaction(): TransactionService {
    return this.transactionService;
  }

  get alias(): AliasService {
    return this.aliasService;
  }
}
