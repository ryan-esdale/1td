import { GameService } from "src/app/scene/services/game.service";

export enum Upgrade_Names {
      DMG = "damage",
      RoF = "rate_of_fire",
      TurnRate = "turn_rate",
      EnergyGen = "energy_generation",
      BatteryCapacity = "battery_capacity",
}

export enum Upgrade_Currencies {
      ENERGY = "energy",
      BATTERY = "battery"
}
// export enum Upgrade_Tiers {
//       ROUND = "round",
//       META = "meta",
// }

export interface Upgrade {
      name: Upgrade_Names;
      screenName: string;
      level: number;
      value: number;
      valueInc: number;
      currency: Upgrade_Currencies;
      startingCost: number;
      currentCost: number;
      costMulti: number;
      tier?: number;
}

export class Upgrade_Manager {

      static increase(upgradeName: string) {
            // console.log(new Date().getTime())
            // console.log(Upgrade_Manager.Default_Upgrade_List)
            // console.log(new Date().getTime())
            // console.log(Upgrade_Manager.Upgrade_List)
            // console.log(new Date().getTime())
            // console.log("DOING MATH TO APPLY UPGRADE")

            const selected = Upgrade_Manager.Upgrade_List.find(u => u.name == upgradeName);
            if (!selected) {
                  return;
            }
            if (!GameService.gameController.canAffordAndPay(selected.currency, selected.currentCost)) {
                  return;
            }
            selected.level++;
            // console.log("Value: " + selected.value)
            selected.value += selected.valueInc;
            // console.log("Value: " + selected.value)
            selected.currentCost *= selected.costMulti;

            // console.log(Upgrade_Manager.Default_Upgrade_List)
            // console.log(Upgrade_Manager.Upgrade_List)
      }

      static getValue(upgradeName: string) {
            const selected = Upgrade_Manager.Upgrade_List.find(u => u.name == upgradeName);
            return selected?.value || 1;
      }

      static resetRoundUpgrades() {

            Upgrade_Manager.Upgrade_List.forEach(u => {
                  if (u.tier == 0) {
                        const defaultVersion = Upgrade_Manager.Default_Upgrade_List.find(d => d.name == u.name);
                        if (defaultVersion) {
                              // u = Object.create(defaultVersion);
                              u.level = defaultVersion.level
                              u.value = defaultVersion.value
                              u.valueInc = defaultVersion.valueInc
                              u.startingCost = defaultVersion.startingCost
                              u.currentCost = defaultVersion.currentCost
                              u.costMulti = defaultVersion.costMulti
                        }
                  }
            });
            console.log(Upgrade_Manager.Upgrade_List);
      }

      public static Default_Upgrade_List: Upgrade[] = [

            {
                  name: Upgrade_Names.DMG,
                  screenName: "Damage",
                  level: 1,
                  value: 1,
                  valueInc: 1,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 5,
                  currentCost: 5,
                  costMulti: 1.1,
                  tier: 0,
            },
            {
                  name: Upgrade_Names.RoF,
                  screenName: "Rate of Fire",
                  level: 1,
                  value: 0.5,
                  valueInc: 0.1,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 5,
                  currentCost: 5,
                  costMulti: 1.15,
                  tier: 0,
            },
            {
                  name: Upgrade_Names.TurnRate,
                  screenName: "Turn Speed",
                  level: 1,
                  value: 1.5,
                  valueInc: 0.1,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 10,
                  currentCost: 10,
                  costMulti: 1.15,
                  tier: 0,
            },
            {
                  name: Upgrade_Names.EnergyGen,
                  screenName: "Power Gen",
                  level: 1,
                  value: 0.01,
                  valueInc: 0.01,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 10,
                  currentCost: 10,
                  costMulti: 1.15,
                  tier: 0,
            },
            {
                  name: Upgrade_Names.BatteryCapacity,
                  screenName: "Battery Cap",
                  level: 1,
                  value: 1,
                  valueInc: 1,
                  currency: Upgrade_Currencies.BATTERY,
                  startingCost: 1,
                  currentCost: 1,
                  costMulti: 1,
                  tier: 1
            }
      ]

      // public static Upgrade_List: Upgrade[] = Object.assign([], Upgrade_Manager.Default_Upgrade_List);
      public static Upgrade_List: Upgrade[] = [];

      public static init() {
            Upgrade_Manager.Default_Upgrade_List.forEach(u => {
                  Upgrade_Manager.Upgrade_List.push(Object.create(u));
            })
      }
}

