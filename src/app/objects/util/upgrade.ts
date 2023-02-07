import { GameService } from "src/app/scene/services/game.service";
import { Mineral_Harvester } from "../mineral_harvester";
import { Settings } from "./settings";
import { Unlockable_Names } from "./unlock-progression";

export enum Upgrade_Names {
      DMG = "damage",
      RoF = "rate_of_fire",
      TurnRate = "turn_rate",
      EnergyGen = "energy_generation",
      BatteryCapacity = "battery_capacity",
      MineralCapacity = "mineral_capacity",
      MineralHarvester = "mineral_harvester"
}

export enum Upgrade_Currencies {
      ENERGY = "energy",
      MINERAL = "mineral",
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
      tier: Unlockable_Names;
      maxLevel?: number;
      doUpgrade?: Function;
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
            if (selected.maxLevel && selected.level == selected.maxLevel) {
                  return;
            }
            selected.level++;
            // console.log("Value: " + selected.value)
            selected.value += selected.valueInc;
            // console.log("Value: " + selected.value)
            selected.currentCost *= selected.costMulti;

            // console.log(Upgrade_Manager.Default_Upgrade_List)
            // console.log(Upgrade_Manager.Upgrade_List)
            if (selected.doUpgrade) {
                  selected.doUpgrade()
            }
      }

      static getValue(upgradeName: string) {
            const selected = Upgrade_Manager.Upgrade_List.find(u => u.name == upgradeName);
            return selected?.value || 1;
      }

      static resetRoundUpgrades() {

            Upgrade_Manager.Upgrade_List.forEach(u => {
                  if (u.tier == Unlockable_Names.TIER0) {
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
                  value: 0.5,
                  valueInc: 1,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 5,
                  currentCost: 5,
                  costMulti: 1.1,
                  tier: Unlockable_Names.TIER0,
            },
            {
                  name: Upgrade_Names.RoF,
                  screenName: "Rate of Fire",
                  level: 1,
                  value: 5,
                  valueInc: 0.1,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 5,
                  currentCost: 5,
                  costMulti: 1.15,
                  tier: Unlockable_Names.TIER0,
            },
            {
                  name: Upgrade_Names.TurnRate,
                  screenName: "Turn Speed",
                  level: 1,
                  value: 15,
                  valueInc: 0.1,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 10,
                  currentCost: 10,
                  costMulti: 1.15,
                  tier: Unlockable_Names.TIER0,
            },
            {
                  name: Upgrade_Names.EnergyGen,
                  screenName: "Power Gen",
                  level: 1,
                  value: 1,
                  valueInc: 0.01,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 10,
                  currentCost: 10,
                  costMulti: 1.15,
                  tier: Unlockable_Names.TIER0,
            },
            {
                  name: Upgrade_Names.MineralHarvester,
                  screenName: "Mineral Harvester",
                  level: 0,
                  value: 0,
                  valueInc: 1,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 10,
                  currentCost: 10,
                  costMulti: 1,
                  tier: Unlockable_Names.TIER0,
                  maxLevel: 60,
                  doUpgrade: function () {

                        //Rotation angle offset based on max amount, with small offset for aesthetics to make first spawn above centre
                        const angleOffset = (2 * Math.PI / (this.maxLevel || 1))
                        const XOffset = Math.sin(Math.PI + angleOffset * (this.level - 1))
                        const YOffset = Math.cos(Math.PI + angleOffset * (this.level - 1))
                        const radialOffset = 250;
                        const harvester = new Mineral_Harvester(Settings.screenW / 2 - XOffset * radialOffset, Settings.screenH / 2 + YOffset * radialOffset);
                        harvester.spawn();
                  }
            },
            {
                  name: Upgrade_Names.MineralCapacity,
                  screenName: "Mineral Cap",
                  level: 1,
                  value: 10,
                  valueInc: 10,
                  currency: Upgrade_Currencies.ENERGY,
                  startingCost: 10,
                  currentCost: 10,
                  costMulti: 1,
                  tier: Unlockable_Names.TIER0,
                  maxLevel: 10,
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
                  tier: Unlockable_Names.TIER1,
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

