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

      public generateSave(): string {
            let resources = {
                  lifetime: Array.from(this.lifetimeCurrency),
                  round: Array.from(this.roundCurrency),
                  global: Array.from(this.globalCurrency),
            };

            return JSON.stringify(resources);
      }

      public loadFromSave(save: string): boolean {

            const saveObj = JSON.parse(save)
            if (saveObj['round'] && typeof (saveObj['round'] == Array)) {
                  saveObj['round'].forEach((currency: any) => {
                        this.roundCurrency.set(currency[0], currency[1])
                  });
            }
            if (saveObj['global'] && typeof (saveObj['global'] == Array)) {
                  saveObj['global'].forEach((currency: any) => {
                        this.globalCurrency.set(currency[0], currency[1])
                  });
            }
            if (saveObj['lifetime'] && typeof (saveObj['lifetime'] == Array)) {
                  saveObj['lifetime'].forEach((currency: any) => {
                        this.lifetimeCurrency.set(currency[0], currency[1])
                  });
            }


            return false;
      }
}