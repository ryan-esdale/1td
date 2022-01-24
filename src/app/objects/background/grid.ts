import { Colour } from "../util/colour";
import { Grid_Node } from "./grid_node";
import { Spring } from "./spring";

export class Grid {

      private springs: Spring[] = [];
      private nodes: Grid_Node[] = [];

      private numColumns: number;
      private numRows: number;
      private spacing: number;
      private colour = new Colour(0, 0, 255, 0.5);

      constructor(w: number, h: number, spacing: number) {
            this.numColumns = w / spacing + 1;
            this.numRows = h / spacing + 1;
            this.spacing = spacing;

            let fixedPoints: Grid_Node[] = [];
            let col = 0; let row = 0;
            for (let y = 0; y <= h; y += spacing) {
                  for (let x = 0; x <= w; x += spacing) {
                        this.nodes.push(new Grid_Node(x, y, 2, 10, 1));
                        if (x == 0 || y == 0 || x == w || y == h
                              || x % 3 == 0 && y % 3 == 0) {
                              fixedPoints.push(new Grid_Node(x, y, 2, 10, 0));
                        }
                        // console.log("Added nodes at x: " + x + ", y: " + y);
                        col++;
                  }
                  row++;
                  col = 0;
            }


            for (let y = 0; y < this.numRows; y++) {
                  for (let x = 0; x < this.numColumns; x++) {
                        // console.log("Looking for nodes at x: " + x * spacing + ", y: " + y * spacing);
                        if (x == 0 || y == 0 || x == this.numColumns - 1 || y == this.numRows - 1) {
                              // console.log("00");
                              this.springs.push(new Spring(
                                    //@ts-ignore
                                    fixedPoints.find(n => { return n.x == x * spacing && n.y == y * spacing }),
                                    this.nodes.find(n => { return n.x == x * spacing && n.y == y * spacing }),
                                    0.1, 0.1
                              ));
                        } else
                              if (x % 3 == 0 && y % 3 == 0) {
                                    // console.log("%3");
                                    this.springs.push(new Spring(
                                          //@ts-ignore
                                          fixedPoints.find(n => { return n.x == x * spacing && n.y == y * spacing }),
                                          this.nodes.find(n => { return n.x == x * spacing && n.y == y * spacing }),
                                          0.02, 0.02
                                    ));
                              }

                        if (x > 0) {
                              // console.log("x0");
                              this.springs.push(new Spring(
                                    //@ts-ignore
                                    this.nodes.find(n => { return n.x == (x - 1) * spacing && n.y == y * spacing }),
                                    this.nodes.find(n => { return n.x == x * spacing && n.y == y * spacing }),
                                    0.028, 0.09
                              ));
                        }

                        if (y > 0) {
                              // console.log("y0");
                              this.springs.push(new Spring(
                                    //@ts-ignore
                                    this.nodes.find(n => { return n.x == x * spacing && n.y == (y - 1) * spacing }),
                                    this.nodes.find(n => { return n.x == x * spacing && n.y == y * spacing }),
                                    0.028, 0.09
                              ));
                        }
                  }
            }

            // console.log(this.springs.length)
            // this.nodes.push(...fixedPoints);
      }

      update() {
            this.springs.forEach(s => s.update());
            this.nodes.forEach(n => n.update());
      }

      draw(rC: CanvasRenderingContext2D) {


            // this.springs.forEach(s => {
            //       rC.beginPath()
            //       s.colour.a = (s.targetLength / s.calcLength(s.end1, s.end2));

            //       // rC.beginPath();
            //       rC.strokeStyle = s.colour.toString();
            //       rC.moveTo(s.end1.x, s.end1.y);
            //       rC.lineTo(s.end2.x, s.end2.y);
            //       // s.draw(rC)
            //       rC.closePath()
            //       rC.stroke();
            // });

            // this.nodes.forEach(n => {
            //       n.draw(rC);
            // });


            rC.strokeStyle = this.colour.toString();
            rC.beginPath();
            let col = 0; let row = 0;
            for (let i = 1; i < this.nodes.length; i++) {

                  if (i % this.numColumns == 0) {
                        col = 0;
                        row++
                  }
                  if (this.nodes[i].x < this.nodes[i - 1].x) {
                        continue;
                  }
                  // rC.strokeStyle = "black";
                  rC.moveTo(this.nodes[i - 1].x, this.nodes[i - 1].y);
                  rC.lineTo(this.nodes[i].x, this.nodes[i].y);
                  if (row > 0) {
                        rC.moveTo(this.nodes[i - this.numColumns].x, this.nodes[i - this.numColumns].y);
                        rC.lineTo(this.nodes[i].x, this.nodes[i].y);
                  }
                  col++;
            }
            rC.stroke();
      }

      applyDirectedForce(fX: number, fY: number, x: number, y: number, radius: number) {
            console.log("Applied force");
            this.nodes.forEach(node => {
                  let distance = Math.hypot((node.x - x), (node.y - y));
                  if (distance < radius) {
                        node.applyForce(
                              10 * fX / (10 + distance),
                              10 * fY / (10 + distance));
                  }
            });
      }

      applyImplosiveForce(f: number, x: number, y: number, radius: number) {
            this.nodes.forEach(node => {
                  let distance = Math.hypot((node.x - x), (node.y - y));
                  if (distance < radius) {
                        node.applyForce(
                              100 * f * (x - node.x) / (10000 / distance),
                              100 * f * (y - node.y) / (10000 / distance));
                        node.increaseDamping(0.8);
                  }
            });
      }

      applyExplosiveForce(f: number, x: number, y: number, radius: number, damp?: number) {
            this.nodes.forEach(node => {
                  let distance = Math.hypot((node.x - x), (node.y - y));
                  if (distance < radius) {
                        node.applyForce(
                              -1000 * f * (x - node.x) / (10000 / distance),
                              -1000 * f * (y - node.y) / (10000 / distance));
                        node.increaseDamping(damp || 0.6);
                  }
            });
      }
}