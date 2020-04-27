import Vector from "./vector";
import Shape from "./shape";
import Ray from "./ray";
import Axis from "./axis";
// import Triangle from "./Triangle";

export type TPartition = {
  left: boolean;
  right: boolean;
}

export type TIntersection = {
  tmin: number;
  tmax: number;
}

class Box {
  min: Vector;
  max: Vector;

  constructor(min:Vector, max:Vector) {
    this.min = min;
    this.max = max;
  }

  // BoxForShapes
  static boxForShapes(shapes:Shape[]):Box {
    if (shapes.length === 0) {
      return new Box(new Vector(0, 0, 0), new Vector(0, 0, 0));
    }

    let box:Box = shapes[0].boundingBox();

    for (let i = 1; i < shapes.length; i++) {
      box = box.extend(shapes[i].boundingBox());
    }

    return box;
  }

  // TODO uncomment when Triangle is ported
  // BoxForTriangles
  // static boxForTriangles(shapes:Triangle[]):Box {
  //   return Box.boxForShapes(shapes);
  // }

  // BoxForVectors
  static boxForVectors(vectors:Vector[]):Box {
    if (vectors.length === 0) {
      return new Box(new Vector(0, 0, 0), new Vector(0, 0, 0));
    }

    let minVector = vectors[0];
    let maxVector = vectors[0];

    for (let i = 1; i < vectors.length; i++) {
      minVector = minVector.min(vectors[i]);
      maxVector = maxVector.max(vectors[i]);
    }

    return new Box(minVector, maxVector);
  }

  // Anchor
  anchor(anchor:Vector):Vector {
    return this.min.add(this.size().mul(anchor));
  }

  // Center
  center():Vector {
    return this.anchor(new Vector(0.5, 0.5, 0.5));
  }

  // Size
  size():Vector {
    return this.max.sub(this.min);
  }

  // Contains
  contains(v:Vector):boolean {
    return this.min.x <= v.x && this.max.x >= v.x &&
      this.min.y <= v.y && this.max.y >= v.y &&
      this.min.z <= v.z && this.max.z >= v.z;
  }

  // Extend
  extend(b:Box):Box {
    return new Box(this.min.min(b.min), this.max.max(b.max));
  }

  // Intersect
  intersect(r:Ray):TIntersection {
    let x1 = (this.min.x - r.origin.x) / r.direction.x;
    let y1 = (this.min.y - r.origin.y) / r.direction.y;
    let z1 = (this.min.z - r.origin.z) / r.direction.z;
    let x2 = (this.max.x - r.origin.x) / r.direction.x;
    let y2 = (this.max.y - r.origin.y) / r.direction.y;
    let z2 = (this.max.z - r.origin.z) / r.direction.z;

    let tmp;

    if (x1 > x2) {
      // Swap
      tmp = x1;
      x1 = x2;
      x2 = tmp;
    }
    if (y1 > y2) {
      // Swap
      tmp = y1;
      y1 = y2;
      y2 = tmp;
    }
    if (z1 > z2) {
      // Swap
      tmp = z1;
      z1 = z2;
      z2 = tmp;
    }

    const t1 = Math.max(x1, y1, z1);
    const t2 = Math.min(x2, y2, z2);

    // TODO check the order
    return {
      tmin: t1,
      tmax: t2,
    }
  }

  // Partition
  partition(axis:Axis, point:number):TPartition {
    let left = false;
    let right = false;

    switch (axis) {
      case (Axis.AxisX):
        left = this.min.x <= point;
        right = this.max.x >= point;
        break;
      case (Axis.AxisY):
        left = this.min.y <= point;
        right = this.max.y >= point;
        break;
      case (Axis.AxisZ):
        left = this.min.z <= point;
        right = this.max.z >= point;
        break;
    }
    return {
      left,
      right,
    };
  }
}

export default Box;

