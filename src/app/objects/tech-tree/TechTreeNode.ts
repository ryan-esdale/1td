export enum TechTreeNodeName {
      TEST_NODE = "Test Node",
      SECONDARY_NODE = "Second Test Node",
      TERTIARY_NODE = "Third Test Node",
}

export class TechTreeNode {

      public name: TechTreeNodeName;
      public cost: number;
      public previousNode: TechTreeNodeName | undefined;
      public completed: boolean;
      public pos: number[]

      constructor(
            name: TechTreeNodeName,
            cost: number,
            previousNode: TechTreeNodeName | undefined,
            completed: boolean,
            pos: number[]
      ) {

            this.name = name;
            this.cost = cost;
            this.previousNode = previousNode;
            this.completed = completed;
            this.pos = pos;
      }
}