import Vector from "./vector";
import Shape from "./shape";
import Box from "./box";
import Hit, { noHit } from "./hit";
import Axis from "./axis";
import Ray from "./ray";
import { median } from "./util";

const numberComparator = (a, b) => a - b;

export type TPartitionShapes = {
  left: Shape[];
  right: Shape[];
}

class Node {
	axis:Axis;
	point:number;
	shapes:Shape[]
	left:Node;
  right:Node;

  constructor(shapes:Shape[]) {
    this.axis = Axis.AxisNone;
    this.point = 0;
    this.shapes = shapes;
    this.left = null;
    this.right = null;
  }

  // Intersect
  intersect(r:Ray, tmin:number, tmax:number):Hit {
    let tsplit:number = 0;
    let leftFirst:boolean = false;

    switch (this.axis) {
      case Axis.AxisNone:
        return this.intersectShapes(r);
      case Axis.AxisX:
        tsplit = (this.point - r.origin.x) / r.direction.x
        leftFirst = (r.origin.x < this.point) || (r.origin.x == this.point && r.direction.x <= 0)
        break;
      case Axis.AxisY:
        tsplit = (this.point - r.origin.y) / r.direction.y
        leftFirst = (r.origin.y < this.point) || (r.origin.y == this.point && r.direction.y <= 0)
        break;
      case Axis.AxisZ:
        tsplit = (this.point - r.origin.z) / r.direction.z
        leftFirst = (r.origin.z < this.point) || (r.origin.z == this.point && r.direction.z <= 0)
        break;
    }
    let first:Node = null;
    let second:Node = null;

    if (leftFirst){
      first = this.left
      second = this.right
    } else {
      first = this.right
      second = this.left
    }

    if (tsplit > tmax || tsplit <= 0) {
      return first.intersect(r, tmin, tmax)
    } else if (tsplit < tmin) {
      return second.intersect(r, tmin, tmax)
    } else {
      const h1 = first.intersect(r, tmin, tsplit);

      if (h1.t <= tsplit) {
        return h1;
      }

      const h2 = second.intersect(r, tsplit, Math.min(tmax, h1.t));

      if (h1.t <= h2.t) {
        return h1;
      } else {
        return h2;
      }
    }
  }

  // IntersectShapes
  intersectShapes(r:Ray):Hit {
    let hit = noHit

    this.shapes.forEach(shape => {
      const h = shape.intersect(r);

      if (h.t < hit.t) {
        hit = h
      }
    });

    return hit;
  }

  // PartitionScore
  partitionScore(axis:Axis, point:number):number {
    let leftCount = 0;
    let rightCont = 0;

    this.shapes.forEach(shape => {
      const box = shape.boundingBox();
      const { left, right } = box.partition(axis, point);

      if (left) {
        leftCount++;
      }
      if (right) {
        rightCont++;
      }
    });

    if (leftCount >= rightCont) {
      return leftCount;
    } else {
      return rightCont;
    }
  }

  // Partition
  partition(size:number, axis:Axis, point:number):TPartitionShapes {
    const left:Shape[] = [];
    const right:Shape[] = [];

    this.shapes.forEach(shape => {
      const box = shape.boundingBox();
      const { left: l, right: r } = box.partition(axis, point);

      if (l) {
        left.push(shape)
      }
      if (r) {
        right.push(shape)
      }
    });

    return {
      left,
      right,
    };
  }

  // Split
  split(depth:number) {
    if (this.shapes.length < 8) {
      return;
    }

    let xs:number[] = [];
    let ys:number[] = [];
    let zs:number[] = [];

    this.shapes.forEach(shape => {
      const box = shape.boundingBox();

      xs.push(box.min.x);
      xs.push(box.max.x);
      ys.push(box.min.y);
      ys.push(box.max.y);
      zs.push(box.min.z);
      zs.push(box.max.z);
    });

    xs = xs.sort(numberComparator);
    ys = ys.sort(numberComparator);
    zs = zs.sort(numberComparator);

    let mx:number = median(xs);
    let my:number = median(ys);
    let mz:number = median(zs);

    let best = Math.round(this.shapes.length * 0.85);
    let bestAxis = Axis.AxisNone;
    let bestPoint = 0;

    const sx = this.partitionScore(Axis.AxisX, mx);

    if (sx < best) {
      best = sx;
      bestAxis = Axis.AxisX;
      bestPoint = mx;
    }

    const sy = this.partitionScore(Axis.AxisY, my);

    if (sy < best) {
      best = sy;
      bestAxis = Axis.AxisY;
      bestPoint = my;
    }

    const sz = this.partitionScore(Axis.AxisZ, mz)
    if (sz < best) {
      best = sz;
      bestAxis = Axis.AxisZ;
      bestPoint = mz;
    }

    if (bestAxis == Axis.AxisNone) {
      return;
    }
    const { left, right } = this.partition(best, bestAxis, bestPoint);

    this.axis = bestAxis;
    this.point = bestPoint;
    this.left = new Node(left);
    this.right = new Node(right);
    this.left.split(depth + 1);
    this.right.split(depth + 1);
    this.shapes = null // only needed at leaf nodes
  }

}

class Tree {
  box: Box;
  root: Node;

  constructor(shapes:Shape[]) {
    this.box = Box.boxForShapes(shapes);

    const node = new Node(shapes);
    node.split(0);
    this.root = node;
  }

  // Intersect
  intersect(r:Ray):Hit {
    const { tmin, tmax } = this.box.intersect(r);

    if (tmax < tmin || tmax <= 0) {
      return noHit
    }

    return this.root.intersect(r, tmin, tmax);
  }
}

export default Tree;

