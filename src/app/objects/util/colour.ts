export class Colour {
      r: number;
      g: number;
      b: number;
      a: number;

      static fromColour(colour: Colour): Colour {
            return new this(colour.r, colour.g, colour.b, colour.a);
      }

      constructor(r: number, g: number, b: number, a: number) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
      }
      toString(): string {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
      }
}