import Vector from "./vector";
import Ray from "./ray";
import Hit, { noHit } from "./hit";
import Box from "./box";
import Path, { Paths } from "./path";
import Shape from "./shape";
import { toRadians, random } from "./util";
import { matrixBase } from "./matrix";

export enum SphereType {
  ParallelsAndMeridians = 0,
  Yarn,
  Dots,
  Funky,
}

class Sphere implements Shape {
  center: Vector;
  radius: number;
  box: Box;
  sphereType: SphereType;

  constructor(center: Vector, radius: number, sphereType = SphereType.ParallelsAndMeridians) {
    const min = new Vector(center.x - radius, center.y - radius, center.z - radius);
    const max = new Vector(center.x + radius, center.y + radius, center.z + radius);
    const box = new Box(min, max);

    this.center = center;
    this.radius = radius;
    this.box = box;
    this.sphereType = sphereType;
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
    return v.sub(this.center).length() <= this.radius + f;
  }

  // Intersect
  intersect(r:Ray):Hit {
    const radius = this.radius
    const to = r.origin.sub(this.center)
    const b = to.dot(r.direction)
    const c = to.dot(to) - radius*radius
    let d = b*b - c

    if (d > 0) {
      d = Math.sqrt(d)
      const t1 = -b - d;

      if (t1 > 1e-2) {
        return new Hit(this, t1);
      }

      const t2 = -b + d;

      if (t2 > 1e-2) {
        return new Hit(this, t2);
      }
    }

    return noHit
  }

  // Paths
  paths():Paths {
    switch (this.sphereType) {
      case SphereType.ParallelsAndMeridians:
        return this.pathsParallelsAndMeridians();
      case SphereType.Dots:
        return this.pathsDots();
      case SphereType.Yarn:
        return this.pathsYarn();
      case SphereType.Funky:
        return this.pathsFunky();
      default:
        return this.pathsParallelsAndMeridians();
    }
  }

  private pathsParallelsAndMeridians():Paths {
    const paths = new Paths();
    const n = 10;
    const o = 10;

    for (let lat = -90 + o; lat <= 90-o; lat += n) {
      const path = new Path();

      for (let lng = 0; lng <= 360; lng++) {
        const v = this.latLngToXYZ(lat, lng, this.radius).add(this.center);
        path.append(v);
      }

      paths.append(path);
    }

    for (let lng = 0; lng <= 360; lng += n) {
      const path = new Path();

      for (let lat = -90 + o; lat <= 90-o; lat++) {
        const v = this.latLngToXYZ(lat, lng, this.radius).add(this.center);
        path.append(v);
      }

      paths.append(path);
    }

    return paths;
  }

  private pathsYarn():Paths {
    const equator = new Path();

    for (let lng = 0; lng <= 360; lng++) {
      const v = this.latLngToXYZ(0, lng, this.radius)
      equator.append(v);
    }

    const paths = new Paths();

    for (let i = 0; i < 100; i++) {
      let m = matrixBase.identity();

      for (let j = 0; j < 3; j++) {
        const v = Vector.randomUnitVector()
        m = m.rotate(v, Math.random() * 2 * Math.PI);
      }

      m = m.translate(this.center);

      paths.append(equator.transform(m));
    }

    return paths
  }

  private pathsDots():Paths {
    const paths = new Paths();

    for (let i = 0; i < this.radius * 20000; i++) {
      let v1 = Vector.randomUnitVector();
      const v2 = v1.mulScalar(this.radius).add(v1.mulScalar(0.005)).add(this.center);
      v1 = v1.mulScalar(this.radius).add(this.center);
      paths.append(new Path([v1, v2]));
    }

    return paths
  }

  private pathsFunky():Paths {
    const paths = new Paths();
    const seen:Vector[] = [];
    const radii:number[] = [];

    for (let i = 0; i < 140; i++) {
      let v:Vector;
      let m:number;

      while (1) {
        v = Vector.randomUnitVector();
        m = Math.random() *0.25 + 0.05;
        let ok = true;

        for (let i = 0; i < seen.length; i++) {
          const other = seen[i];
          const threshold = m + radii[i] + 0.02;

          if (other.sub(v).length() < threshold) {
            ok = false;
            break;
          }
        }
        if (ok) {
          seen.push(v)
          radii.push(m)
          break
        }
      }
      const p = v.cross(Vector.randomUnitVector()).normalize();
      const q = p.cross(v).normalize();
      const n = random(0, 4) + 1;

      for (let k = 0; k < n; k++) {
        const path = new Path();

        for (let j = 0; j <= 360; j += 5) {
          const a = toRadians(j);
          let x = v;
          x = x.add(p.mulScalar(Math.cos(a) * m));
          x = x.add(q.mulScalar(Math.sin(a) * m));
          x = x.normalize();
          x = x.mulScalar(this.radius).add(this.center);
          path.append(x);
        }

        paths.append(path);
        m *= 0.75;
      }
    }

    return paths
  }

  // LatLngToXYZ
  private latLngToXYZ(lat:number, lng:number, radius:number):Vector {
    lat = toRadians(lat);
    lng = toRadians(lng)
    const x = radius * Math.cos(lat) * Math.cos(lng);
    const y = radius * Math.cos(lat) * Math.sin(lng);
    const z = radius * Math.sin(lat);

    return new Vector(x, y, z);
  }
}

export default Sphere;


export class OutlineSphere extends Sphere {
  eye: Vector;
  up: Vector;

  constructor(center: Vector, radius: number, eye:Vector, up:Vector) {
    super(center, radius);

    this.eye = eye;
    this.up = up;
  }

  paths():Paths {
    const path = new Path();

    const center = this.center;
    const radius = this.radius;

    const hyp = center.sub(this.eye).length();
    const opp = radius;
    const theta = Math.asin(opp / hyp);
    const adj = opp / Math.tan(theta);
    const d = Math.cos(theta) * adj;
    const r = Math.sin(theta) * adj;

    const w = center.sub(this.eye).normalize();
    const u = w.cross(this.up).normalize();
    const v = w.cross(u).normalize();
    const c = this.eye.add(w.mulScalar(d));


    for (let i = 0; i <= 360; i++) {
      const a = toRadians(i);
      let p = c;
      p = p.add(u.mulScalar(Math.cos(a) * r));
      p = p.add(v.mulScalar(Math.sin(a) * r));

      path.append(p);
    }

    return new Paths([path]);
  }

}
