import { TechTreeNode, TechTreeNodeName } from "./TechTreeNode"

export class TechTree {

      public nodes: TechTreeNode[];

      constructor() {
            this.nodes = [];

            this.nodes.push(new TechTreeNode(TechTreeNodeName.TEST_NODE, 1, undefined, false, [0, 0]));
            this.nodes.push(new TechTreeNode(TechTreeNodeName.SECONDARY_NODE, 1, TechTreeNodeName.TEST_NODE, false, [100, 100]));
            this.nodes.push(new TechTreeNode(TechTreeNodeName.TERTIARY_NODE, 1, TechTreeNodeName.TEST_NODE, false, [-100, 200]));
            this.nodes.push(new TechTreeNode(TechTreeNodeName.TERTIARY_NODE, 1, TechTreeNodeName.SECONDARY_NODE, false, [300, 175]));
            this.nodes.push(new TechTreeNode(TechTreeNodeName.TERTIARY_NODE, 1, TechTreeNodeName.TEST_NODE, false, [-300, -400]));
            this.nodes.push(new TechTreeNode(TechTreeNodeName.TERTIARY_NODE, 1, TechTreeNodeName.TEST_NODE, false, [200, -150]));
            this.nodes.push(new TechTreeNode(TechTreeNodeName.TERTIARY_NODE, 1, TechTreeNodeName.TEST_NODE, false, [500, 50]));
            this.nodes.push(new TechTreeNode(TechTreeNodeName.TERTIARY_NODE, 1, TechTreeNodeName.TEST_NODE, false, [-500, -50]));
      }

      getPrimaryNodeIndex(): number {
            return this.nodes.findIndex(n => { return n.previousNode == undefined })
      }

      getParentNodePos(node: TechTreeNode): number[] {
            if (!node)
                  return [0, 0];

            const parent = this.nodes.find(n => { return n.name == node.previousNode });
            if (parent)
                  return parent.pos;

            return [0, 0];
      }
}