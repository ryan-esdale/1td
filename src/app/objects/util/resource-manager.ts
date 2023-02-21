import { Upgrade_Currencies } from "./upgrade";

export class ResourceManager {

      public lifetimeCurrency: Map<Upgrade_Currencies, number> = new Map();
      public globalCurrency: Map<Upgrade_Currencies, number> = new Map();
      public roundCurrency: Map<Upgrade_Currencies, number> = new Map();


      public convertRoundToGlobal(): void {
            this.roundCurrency.forEach((amount, currency) => {
                  console.log(`Setting global currency (${currency}) to: ${(this.globalCurrency.get(currency) || 0) + amount}`)
                  this.globalCurrency.set(currency, (this.globalCurrency.get(currency) || 0) + amount);
                  this.lifetimeCurrency.set(currency, (this.lifetimeCurrency.get(currency) || 0) + amount);
                  this.roundCurrency.set(currency, 0);
            });
      }
}