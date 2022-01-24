import { GameService } from "src/app/scene/services/game.service";

export enum Upgrade_Names {
      DMG = "damage",
      RoF = "rate_of_fire",
      TurnRate = "turn_rate",
      EnergyGen = "energy_generation"
}

export interface Upgrade {
      name: Upgrade_Names;
      screenName: string;
      level: number;
      value: number;
      valueInc: number;
      startingCost: number;
      currentCost: number;
      costMulti: number;
}

export class Upgrade_Manager {

      static increase(upgradeName: string) {
            const selected = Upgrade_Manager.Upgrade_List.find(u => u.name == upgradeName);
            if (!selected) {
                  return;
            }
            if (!GameService.gameController.canAffordAndPay(selected.currentCost)) {
                  return;
            }
            selected.level++;
            selected.value += selected.valueInc;
            selected.currentCost *= selected.costMulti;
      }

      static getValue(upgradeName: string) {
            const selected = Upgrade_Manager.Upgrade_List.find(u => u.name == upgradeName);
            return selected?.value || 1;
      }

      public static Default_Upgrade_List: Upgrade[] = [

            {
                  name: Upgrade_Names.DMG,
                  screenName: "Damage",
                  level: 1,
                  value: 1,
                  valueInc: 1,
                  startingCost: 1,
                  currentCost: 1,
                  costMulti: 1.1
            },
            {
                  name: Upgrade_Names.RoF,
                  screenName: "Rate of Fire",
                  level: 1,
                  value: 1,
                  valueInc: 1,
                  startingCost: 1,
                  currentCost: 1,
                  costMulti: 1.1
            },
            {
                  name: Upgrade_Names.TurnRate,
                  screenName: "Turn Speed",
                  level: 1,
                  value: 1,
                  valueInc: 1,
                  startingCost: 1,
                  currentCost: 1,
                  costMulti: 1.5
            },
            {
                  name: Upgrade_Names.EnergyGen,
                  screenName: "Power Generation",
                  level: 1,
                  value: 0.1,
                  valueInc: 0.01,
                  startingCost: 1,
                  currentCost: 1,
                  costMulti: 1.15
            },
      ]

      public static Upgrade_List = Array.from(Upgrade_Manager.Default_Upgrade_List)
}

