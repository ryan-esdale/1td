export abstract class Util {
      constructor() {
      }

      static aimAngle(a: number[], b: number[]) {

            let angle = Math.atan((a[1] - b[1]) / (a[0] - b[0]));
            let offset = 0;
            if (a[0] >= b[0])
                  offset += Math.PI;
            return angle + offset;
      }
}