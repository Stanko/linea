import Vector from "./vector";
import Ray from "./ray";
import Hit, { noHit } from "./hit";
import Box from "./box";
import Path, { Paths } from "./path";
import Shape from "./shape";

class Cube implements Shape {
  min: Vector;
  max: Vector;
  box: Box;

  constructor(min:Vector, max:Vector) {
    this.min = min;
    this.max = max;
    this.box = new Box(min, max);
  }

  // Compile
  // TODO
  // This method was never implemented in the original go version
  // I guess it was there to fulfill shape interface
  compile() {}

  // BoundingBox
  boundingBox() {
    return this.box;
  }

  // Contains
  contains(v:Vector, f:number):boolean {
    if (v.x < this.min.x - f || v.x > this.max.x + f) {
      return false
    }

    if (v.y < this.min.y - f || v.y > this.max.y + f) {
      return false
    }

    if (v.z < this.min.z - f || v.z > this.max.z + f) {
      return false
    }

    return true
  }

  // Intersect
  intersect(r:Ray):Hit {
    let n1 = this.min.sub(r.origin).div(r.direction);
    let f1 = this.max.sub(r.origin).div(r.direction);

    const n = n1.min(f1);
    const f = n1.max(f1);

    const t0 = Math.max(n.x, n.y, n.z);
    const t1 = Math.min(f.x, f.y, f.z);

    if (t0 < 1e-3 && t1 > 1e-3) {
      return new Hit(this, t1);
    }

    if (t0 >= 1e-3 && t0 < t1) {
      return new Hit(this, t0);
    }

    return noHit
  }

  // Paths
  paths():Paths {
    const x1 = this.min.x;
    const y1 = this.min.y;
    const z1 = this.min.z;
    const x2 = this.max.x;
    const y2 = this.max.y;
    const z2 = this.max.z;

    const paths:Paths = new Paths([
      new Path([new Vector(x1, y1, z1), new Vector(x1, y1, z2)]),
      new Path([new Vector(x1, y1, z1), new Vector(x1, y2, z1)]),
      new Path([new Vector(x1, y1, z1), new Vector(x2, y1, z1)]),
      new Path([new Vector(x1, y1, z2), new Vector(x1, y2, z2)]),
      new Path([new Vector(x1, y1, z2), new Vector(x2, y1, z2)]),
      new Path([new Vector(x1, y2, z1), new Vector(x1, y2, z2)]),
      new Path([new Vector(x1, y2, z1), new Vector(x2, y2, z1)]),
      new Path([new Vector(x1, y2, z2), new Vector(x2, y2, z2)]),
      new Path([new Vector(x2, y1, z1), new Vector(x2, y1, z2)]),
      new Path([new Vector(x2, y1, z1), new Vector(x2, y2, z1)]),
      new Path([new Vector(x2, y1, z2), new Vector(x2, y2, z2)]),
      new Path([new Vector(x2, y2, z1), new Vector(x2, y2, z2)]),
    ]);
    return paths;

    // TODO this is the original unused code
    // Check what is it's purpose
    /*
    paths = paths[:0]
    for i := 0; i <= 10; i++ {
      p := float64(i) / 10
      var x, y float64
      x = x1 + (x2-x1)*p
      y = y1 + (y2-y1)*p
      paths = append(paths, path{{x, y1, z1}, {x, y1, z2}})
      paths = append(paths, path{{x, y2, z1}, {x, y2, z2}})
      paths = append(paths, path{{x1, y, z1}, {x1, y, z2}})
      paths = append(paths, path{{x2, y, z1}, {x2, y, z2}})
    }
    return paths
    */
  }
}

export default Cube;
