export interface Unlockable {
      name: Unlockable_Names;
      unlocked: boolean;
}

export enum Unlockable_Names {
      TIER0 = 'tier 0',
      TIER1 = 'tier 1',
      MENU_TABS = 'menu tabs'
}

export class Unlock_Progression {

      private static unlocks: Unlockable[] = [
            {
                  name: Unlockable_Names.TIER0,
                  unlocked: true
            },
            {
                  name: Unlockable_Names.TIER1,
                  unlocked: false
            },
            {
                  name: Unlockable_Names.MENU_TABS,
                  unlocked: true
            }
      ];

      static unlocked(u: Unlockable_Names): boolean {
            return Unlock_Progression.unlocks.find((unlock) => unlock.name == u)?.unlocked || false;
      }

      static unlock(u: Unlockable_Names): void {
            const unlock = Unlock_Progression.unlocks.find((unlock) => unlock.name == u);
            if (unlock) {
                  unlock.unlocked = true;
            }
      }
}