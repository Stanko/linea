class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x:number, y:number, z:number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static randomUnitVector():Vector {
    while (1) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;

      if (x * x + y * y + z * z > 1) {
        continue
      }

      return new Vector(x, y, z).normalize();
    }
  }

  // Length
  length():number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  // Distance
  distance(v:Vector):number {
    return this.sub(v).length();
  }

  // LengthSquared
  lengthSquared():number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  // DistanceSquared
  distanceSquared(v:Vector):number {
    return this.sub(v).lengthSquared();
  }

  // Dot
  dot(v:Vector):number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  // Cross
  cross(v:Vector):Vector {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;

    return new Vector(x, y, z);
  }

  // Normalize
  normalize():Vector {
    const d = this.length();

    if (d === 0) {
      console.warn(`Length is 0, returning zero vector`);

      return new Vector(0, 0, 0);
    }

    return new Vector(this.x / d, this.y / d, this.z / d);
  }

  // Add
  add(v:Vector):Vector {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
  }


  // Sub
  sub(v:Vector):Vector {
    return new Vector(
      this.x - v.x,
      this.y - v.y,
      this.z - v.z,
    );
  }

  // Mul
  mul(v:Vector):Vector {
    return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  // Div
  div(v:Vector):Vector {
    if (v.x === 0 || v.y === 0 || v.z === 0) {
      console.warn(`Dividing by zero, vector: ${ v }`)
    }

    return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
  }

  // AddScalar
  addScalar(n:number):Vector {
    return new Vector(this.x + n, this.y + n, this.z + n);
  }

  // SubScalar
  subScalar(n:number):Vector {
    return new Vector(this.x - n, this.y - n, this.z - n);
  }

  // MulScalar
  mulScalar(n:number):Vector {
    return new Vector(this.x * n, this.y * n, this.z * n);
  }

  // DivScalar
  divScalar(n:number):Vector {
    if (n === 0) {
      console.warn(`Dividing by zero, n: ${ n }`);
    }

    return new Vector(this.x / n, this.y / n, this.z / n);
  }

  // Min
  min(v:Vector):Vector {
    return new Vector(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z));
  }

  // Max
  max(v:Vector):Vector {
    return new Vector(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z));
  }

  // MinAxis
  minAxis():Vector {
    const x = Math.abs(this.x);
    const y = Math.abs(this.y);
    const z = Math.abs(this.z);

    if (x <= y && x <= z) {
      return new Vector(1, 0, 0);
    } else if (y <= x && y <= z) {
      return new Vector(0, 1, 0);
    }

    return new Vector(0, 0, 1);
  }

  // MinComponent
  minComponent():number {
    return Math.min(this.x, this.y, this.z);
  }

  // SegmentDistance
  // Shortest distance and between "this" vector and p1-p2 line
  segmentDistance(p1:Vector, p2:Vector):number {
    const l2 = p1.distanceSquared(p2);

    if (l2 === 0) {
      return this.distance(p1);
    }

    const t = this.sub(p1).dot(p2.sub(p1)) / l2;

    if (t < 0) {
      return this.distance(p1);
    }

    if (t > 1) {
      return this.distance(p2);
    }

    return p1.add(p2.sub(p1).mulScalar(t)).distance(this);
  }

  toString() {
    return `Vector(${ this.x }, ${ this.y }, ${ this.z })`;
  }
}

export default Vector;
