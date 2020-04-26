import Vector from "./vector";
import Ray from "./ray";
import Hit, { noHit } from "./hit";
import Box from "./box";
import Matrix from "./matrix";
import { Paths } from "./path";

interface Shape {
	compile: () => any;
	boundingBox: () => Box;
	contains: (Vector, float64) => boolean;
	intersect: (Ray) => Hit;
	paths: () => Paths;
}

export default Shape;

export class EmptyShape implements Shape {
  compile() {
  }

  boundingBox():Box {
    return new Box(new Vector(0, 0, 0), new Vector(0, 0, 0));
  }

  contains(v:Vector, f:number):boolean {
    return false;
  }

  intersect(r:Ray):Hit {
    return noHit;
  }

  paths():Paths {
    return null;
  }
}

export class TransformedShape implements Shape {
  shape: Shape;
  matrix: Matrix;
  inverse: Matrix;

  constructor(shape:Shape, matrix:Matrix) {
    this.shape = shape;
    this.matrix = matrix;
    this.inverse = matrix.inverse();
  }

  // TODO
  // Check if this is the right way to do it (I think it is)
  compile() {
    return this.shape.compile();
  }

  boundingBox():Box {
    return this.matrix.mulBox(this.shape.boundingBox());
  }

  contains(v:Vector, f:number):boolean {
    return this.shape.contains(this.inverse.mulPosition(v), f);
  }

  intersect(r:Ray):Hit {
    return this.shape.intersect(this.inverse.mulRay(r));
  }

  paths():Paths {
    return this.shape.paths().transform(this.matrix);
  }
}
