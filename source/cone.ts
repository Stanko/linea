import Vector from "./vector";
import Ray from "./ray";
import Hit, { noHit } from "./hit";
import Box from "./box";
import Path, { Paths } from "./path";
import Shape from "./shape";
import { toRadians } from "./util";

// export enum CubeTypes {
//   Outlines = 0,
//   StripedOuterSides,
// }

class Cone implements Shape {
  radius: number;
  height: number;
  baseCenter: Vector;
  box: Box;

  constructor(baseCenter:Vector, radius:number, height:number) {
    this.baseCenter = baseCenter;
    this.radius = radius;
    this.height = height;
    const min = baseCenter.sub(new Vector(-radius, -radius, 0));
    const max = baseCenter.add(new Vector(radius, radius, height));
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
    // TODO
    // Never got implemented in the original code
    return false;
  }

  // Intersect
  intersect(ray:Ray):Hit {
    const o = ray.origin;
    const d = ray.direction;
    const r = this.radius;
    const h = this.height;

    let k = r / h
    k = k * k

    const a = d.x * d.x + d.y * d.y - k * d.z * d.z;
    const b = 2 * (d.x * o.x + d.y * o.y - k * d.z * (o.z-h));
    const c = o.x * o.x + o.y * o.y - k * (o.z-h) * (o.z-h);
    const q = b * b - 4 * a * c;

    if (q <= 0) {
      return noHit;
    }

    const s = Math.sqrt(q);
    let t0 = (-b + s) / (2 * a);
    let t1 = (-b - s) / (2 * a);
    let tmp;

    if (t0 > t1) {
      tmp = t0;
      t0 = t1;
      t1 = tmp;
    }

    if (t0 > 1e-6) {
      const p = ray.position(t0);

      if (p.z > 0 && p.z < h) {
        return new Hit(this, t0);
      }
    }

    if (t1 > 1e-6) {
      const p = ray.position(t1);

      if (p.z > 0 && p.z < h) {
        return new Hit(this, t1);
      }
    }

    return noHit
  }

  // Paths
  paths():Paths {
    const paths = new Paths();

    for (let a = 0; a < 360; a += 30) {
      const x = this.radius * Math.cos(toRadians(a));
      const y = this.radius * Math.sin(toRadians(a));
      paths.append(new Path([new Vector(x, y, 0), new Vector(0, 0, this.height)]));
    }

    return paths;
  }
}

export default Cone;


// TODO
// Implement "OutlineCone" and below
