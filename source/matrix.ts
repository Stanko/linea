import Vector from "./vector";
import Ray from "./ray";
import Box from "./box";

export const matrixBase = {
  // Identity
  identity: function():Matrix {
    return new Matrix(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  },

  // Translate
  translate: function(v:Vector):Matrix {
    return new Matrix(
      1, 0, 0, v.x,
      0, 1, 0, v.y,
      0, 0, 1, v.z,
      0, 0, 0, 1
    );
  },

  // Scale
  scale: function(v:Vector):Matrix {
    return new Matrix(
      v.x, 0, 0, 0,
      0, v.y, 0, 0,
      0, 0, v.z, 0,
      0, 0, 0, 1
    );
  },

  // Rotate
  rotate: function(vector:Vector, a:number):Matrix {
    const v = vector.normalize();
    const s = Math.sin(a);
    const c = Math.cos(a);
    const m = 1 - c;

    return new Matrix(
      m * v.x * v.x + c, m * v.x * v.y + v.z * s, m * v.z * v.x - v.y * s, 0,
      m * v.x * v.y - v.z * s, m * v.y * v.y + c, m * v.y * v.z + v.x * s, 0,
      m * v.z * v.x + v.y * s, m * v.y * v.z - v.x * s, m * v.z * v.z + c, 0,
      0, 0, 0, 1
    );
  },

  // Frustum
  frustum: function(l:number, r:number, b:number, t:number, n:number, f:number):Matrix {
    const t1 = 2 * n;
    const t2 = r - l;
    const t3 = t - b;
    const t4 = f - n;

    return new Matrix(
      t1 / t2, 0, (r + l) / t2, 0,
      0, t1 / t3, (t + b) / t3, 0,
      0, 0, (-f - n) / t4, (-t1 * f) / t4,
      0, 0, -1, 0
    );
  },

  // Orthographic
  orthographic: function(l:number, r:number, b:number, t:number, n:number, f:number):Matrix {
    return new Matrix(
      2 / (r - l), 0, 0, -(r + l) / (r - l),
      0, 2 / (t - b), 0, -(t + b) / (t - b),
      0, 0, -2 / (f - n), -(f + n) / (f - n),
      0, 0, 0, 1
    );
  },

  // Perspective
  perspective: function(fovy:number, aspect:number, near:number, far:number):Matrix {
    const ymax = near * Math.tan(fovy * Math.PI / 360);
    const xmax = ymax * aspect;

    return matrixBase.frustum(-xmax, xmax, -ymax, ymax, near, far);
  },

  // LookAt
  lookAt: function(eye:Vector, center:Vector, upVector:Vector):Matrix {
    const up = upVector.normalize()
    const f = center.sub(eye).normalize()
    const s = f.cross(up).normalize()
    const u = s.cross(f).normalize()
    const m = new Matrix (
      s.x, u.x, -f.x, eye.x,
      s.y, u.y, -f.y, eye.y,
      s.z, u.z, -f.z, eye.z,
      0, 0, 0, 1,
    )
    return m.inverse()
  }
};

class Matrix {
  x00: number;
  x01: number;
  x02: number;
  x03: number;
  x10: number;
  x11: number;
  x12: number;
  x13: number;
  x20: number;
  x21: number;
  x22: number;
  x23: number;
  x30: number;
  x31: number;
  x32: number;
  x33: number;

  constructor(
    x00: number,
    x01: number,
    x02: number,
    x03: number,
    x10: number,
    x11: number,
    x12: number,
    x13: number,
    x20: number,
    x21: number,
    x22: number,
    x23: number,
    x30: number,
    x31: number,
    x32: number,
    x33: number,
  ) {
    this.x00 = x00;
    this.x01 = x01;
    this.x02 = x02;
    this.x03 = x03;
    this.x10 = x10;
    this.x11 = x11;
    this.x12 = x12;
    this.x13 = x13;
    this.x20 = x20;
    this.x21 = x21;
    this.x22 = x22;
    this.x23 = x23;
    this.x30 = x30;
    this.x31 = x31;
    this.x32 = x32;
    this.x33 = x33;
  }

  // Translate
  translate(v:Vector):Matrix {
    return matrixBase.translate(v).mul(this);
  }

  // Scale
  scale(v:Vector):Matrix {
    return matrixBase.scale(v).mul(this);
  }

  // Rotate
  rotate(v:Vector, a:number):Matrix {
    return matrixBase.rotate(v, a).mul(this);
  }

  // Frustum
  frustum(l:number, r:number, b:number, t:number, n:number, f:number):Matrix {
    return matrixBase.frustum(l, r, b, t, n, f).mul(this);
  }

  // Orthographic
  orthographic(l:number, r:number, b:number, t:number, n:number, f:number):Matrix {
    return matrixBase.orthographic(l, r, b, t, n, f).mul(this);
  }

  // Perspective
  perspective(fovy:number, aspect:number, near:number, far:number):Matrix {
    return matrixBase.perspective(fovy, aspect, near, far).mul(this);
  }

  // Mul
  mul(b:Matrix):Matrix {
    const x00 = this.x00 * b.x00 + this.x01 * b.x10 + this.x02 * b.x20 + this.x03 * b.x30;
    const x10 = this.x10 * b.x00 + this.x11 * b.x10 + this.x12 * b.x20 + this.x13 * b.x30;
    const x20 = this.x20 * b.x00 + this.x21 * b.x10 + this.x22 * b.x20 + this.x23 * b.x30;
    const x30 = this.x30 * b.x00 + this.x31 * b.x10 + this.x32 * b.x20 + this.x33 * b.x30;
    const x01 = this.x00 * b.x01 + this.x01 * b.x11 + this.x02 * b.x21 + this.x03 * b.x31;
    const x11 = this.x10 * b.x01 + this.x11 * b.x11 + this.x12 * b.x21 + this.x13 * b.x31;
    const x21 = this.x20 * b.x01 + this.x21 * b.x11 + this.x22 * b.x21 + this.x23 * b.x31;
    const x31 = this.x30 * b.x01 + this.x31 * b.x11 + this.x32 * b.x21 + this.x33 * b.x31;
    const x02 = this.x00 * b.x02 + this.x01 * b.x12 + this.x02 * b.x22 + this.x03 * b.x32;
    const x12 = this.x10 * b.x02 + this.x11 * b.x12 + this.x12 * b.x22 + this.x13 * b.x32;
    const x22 = this.x20 * b.x02 + this.x21 * b.x12 + this.x22 * b.x22 + this.x23 * b.x32;
    const x32 = this.x30 * b.x02 + this.x31 * b.x12 + this.x32 * b.x22 + this.x33 * b.x32;
    const x03 = this.x00 * b.x03 + this.x01 * b.x13 + this.x02 * b.x23 + this.x03 * b.x33;
    const x13 = this.x10 * b.x03 + this.x11 * b.x13 + this.x12 * b.x23 + this.x13 * b.x33;
    const x23 = this.x20 * b.x03 + this.x21 * b.x13 + this.x22 * b.x23 + this.x23 * b.x33;
    const x33 = this.x30 * b.x03 + this.x31 * b.x13 + this.x32 * b.x23 + this.x33 * b.x33;

    return new Matrix(
      x00, x01, x02, x03,
      x10, x11, x12, x13,
      x20, x21, x22, x23,
      x30, x31, x32, x33,
    );
  }

  // MulPosition
  mulPosition(b:Vector):Vector {
    const x = this.x00 * b.x + this.x01 * b.y + this.x02 * b.z + this.x03;
    const y = this.x10 * b.x + this.x11 * b.y + this.x12 * b.z + this.x13;
    const z = this.x20 * b.x + this.x21 * b.y + this.x22 * b.z + this.x23;

    return new Vector(x, y, z);
  }

  // MulPositionW
  mulPositionW(b:Vector):Vector {
    const x = this.x00 * b.x + this.x01 * b.y + this.x02 * b.z + this.x03;
    const y = this.x10 * b.x + this.x11 * b.y + this.x12 * b.z + this.x13;
    const z = this.x20 * b.x + this.x21 * b.y + this.x22 * b.z + this.x23;
    const w = this.x30 * b.x + this.x31 * b.y + this.x32 * b.z + this.x33;

    return new Vector(x / w, y / w, z / w);
  }

  // MulDirection
  mulDirection(b:Vector):Vector {
    const x = this.x00 * b.x + this.x01 * b.y + this.x02 * b.z;
    const y = this.x10 * b.x + this.x11 * b.y + this.x12 * b.z;
    const z = this.x20 * b.x + this.x21 * b.y + this.x22 * b.z;

    return new Vector(x, y, z).normalize();
  }

  // MulRay
  mulRay(b:Ray):Ray {
    return new Ray(this.mulPosition(b.origin), this.mulDirection(b.direction));
  }

  // MulBox
  mulBox(box:Box):Box {
    // http://dev.theomader.com/transform-bounding-boxes/
    const r = new Vector(this.x00, this.x10, this.x20);
    const u = new Vector(this.x01, this.x11, this.x21);
    const b = new Vector(this.x02, this.x12, this.x22);
    const t = new Vector(this.x03, this.x13, this.x23);

    let xa = r.mulScalar(box.min.x);
    let xb = r.mulScalar(box.max.x);
    let ya = u.mulScalar(box.min.y);
    let yb = u.mulScalar(box.max.y);
    let za = b.mulScalar(box.min.z);
    let zb = b.mulScalar(box.max.z);

    xa = xa.min(xb);
    xb = xa.max(xb);
    ya = ya.min(yb);
    yb = ya.max(yb);
    za = za.min(zb);
    zb = za.max(zb);

    const min = xa.add(ya).add(za).add(t);
    const max = xb.add(yb).add(zb).add(t);

    return new Box(min, max);
  }

  // Transpose
  transpose():Matrix {
    return new Matrix(
      this.x00, this.x10, this.x20, this.x30,
      this.x01, this.x11, this.x21, this.x31,
      this.x02, this.x12, this.x22, this.x32,
      this.x03, this.x13, this.x23, this.x33
    );
  }

  // Determinant
  determinant():number {
    return (
      this.x00 * this.x11 * this.x22 * this.x33 - this.x00 * this.x11 * this.x23 * this.x32 +
      this.x00 * this.x12 * this.x23 * this.x31 - this.x00 * this.x12 * this.x21 * this.x33 +
      this.x00 * this.x13 * this.x21 * this.x32 - this.x00 * this.x13 * this.x22 * this.x31 -
      this.x01 * this.x12 * this.x23 * this.x30 + this.x01 * this.x12 * this.x20 * this.x33 -
      this.x01 * this.x13 * this.x20 * this.x32 + this.x01 * this.x13 * this.x22 * this.x30 -
      this.x01 * this.x10 * this.x22 * this.x33 + this.x01 * this.x10 * this.x23 * this.x32 +
      this.x02 * this.x13 * this.x20 * this.x31 - this.x02 * this.x13 * this.x21 * this.x30 +
      this.x02 * this.x10 * this.x21 * this.x33 - this.x02 * this.x10 * this.x23 * this.x31 +
      this.x02 * this.x11 * this.x23 * this.x30 - this.x02 * this.x11 * this.x20 * this.x33 -
      this.x03 * this.x10 * this.x21 * this.x32 + this.x03 * this.x10 * this.x22 * this.x31 -
      this.x03 * this.x11 * this.x22 * this.x30 + this.x03 * this.x11 * this.x20 * this.x32 -
      this.x03 * this.x12 * this.x20 * this.x31 + this.x03 * this.x12 * this.x21 * this.x30
    );
  }

  // Inverse
  inverse():Matrix {
    const d = this.determinant();

    if (d === 0) {
      console.warn('dividing by zero, determinant is zero');
    }

    const x00 = (this.x12 * this.x23 * this.x31 - this.x13 * this.x22 * this.x31 + this.x13 * this.x21 * this.x32 - this.x11 * this.x23 * this.x32 - this.x12 * this.x21 * this.x33 + this.x11 * this.x22 * this.x33) / d;
    const x01 = (this.x03 * this.x22 * this.x31 - this.x02 * this.x23 * this.x31 - this.x03 * this.x21 * this.x32 + this.x01 * this.x23 * this.x32 + this.x02 * this.x21 * this.x33 - this.x01 * this.x22 * this.x33) / d;
    const x02 = (this.x02 * this.x13 * this.x31 - this.x03 * this.x12 * this.x31 + this.x03 * this.x11 * this.x32 - this.x01 * this.x13 * this.x32 - this.x02 * this.x11 * this.x33 + this.x01 * this.x12 * this.x33) / d;
    const x03 = (this.x03 * this.x12 * this.x21 - this.x02 * this.x13 * this.x21 - this.x03 * this.x11 * this.x22 + this.x01 * this.x13 * this.x22 + this.x02 * this.x11 * this.x23 - this.x01 * this.x12 * this.x23) / d;
    const x10 = (this.x13 * this.x22 * this.x30 - this.x12 * this.x23 * this.x30 - this.x13 * this.x20 * this.x32 + this.x10 * this.x23 * this.x32 + this.x12 * this.x20 * this.x33 - this.x10 * this.x22 * this.x33) / d;
    const x11 = (this.x02 * this.x23 * this.x30 - this.x03 * this.x22 * this.x30 + this.x03 * this.x20 * this.x32 - this.x00 * this.x23 * this.x32 - this.x02 * this.x20 * this.x33 + this.x00 * this.x22 * this.x33) / d;
    const x12 = (this.x03 * this.x12 * this.x30 - this.x02 * this.x13 * this.x30 - this.x03 * this.x10 * this.x32 + this.x00 * this.x13 * this.x32 + this.x02 * this.x10 * this.x33 - this.x00 * this.x12 * this.x33) / d;
    const x13 = (this.x02 * this.x13 * this.x20 - this.x03 * this.x12 * this.x20 + this.x03 * this.x10 * this.x22 - this.x00 * this.x13 * this.x22 - this.x02 * this.x10 * this.x23 + this.x00 * this.x12 * this.x23) / d;
    const x20 = (this.x11 * this.x23 * this.x30 - this.x13 * this.x21 * this.x30 + this.x13 * this.x20 * this.x31 - this.x10 * this.x23 * this.x31 - this.x11 * this.x20 * this.x33 + this.x10 * this.x21 * this.x33) / d;
    const x21 = (this.x03 * this.x21 * this.x30 - this.x01 * this.x23 * this.x30 - this.x03 * this.x20 * this.x31 + this.x00 * this.x23 * this.x31 + this.x01 * this.x20 * this.x33 - this.x00 * this.x21 * this.x33) / d;
    const x22 = (this.x01 * this.x13 * this.x30 - this.x03 * this.x11 * this.x30 + this.x03 * this.x10 * this.x31 - this.x00 * this.x13 * this.x31 - this.x01 * this.x10 * this.x33 + this.x00 * this.x11 * this.x33) / d;
    const x23 = (this.x03 * this.x11 * this.x20 - this.x01 * this.x13 * this.x20 - this.x03 * this.x10 * this.x21 + this.x00 * this.x13 * this.x21 + this.x01 * this.x10 * this.x23 - this.x00 * this.x11 * this.x23) / d;
    const x30 = (this.x12 * this.x21 * this.x30 - this.x11 * this.x22 * this.x30 - this.x12 * this.x20 * this.x31 + this.x10 * this.x22 * this.x31 + this.x11 * this.x20 * this.x32 - this.x10 * this.x21 * this.x32) / d;
    const x31 = (this.x01 * this.x22 * this.x30 - this.x02 * this.x21 * this.x30 + this.x02 * this.x20 * this.x31 - this.x00 * this.x22 * this.x31 - this.x01 * this.x20 * this.x32 + this.x00 * this.x21 * this.x32) / d;
    const x32 = (this.x02 * this.x11 * this.x30 - this.x01 * this.x12 * this.x30 - this.x02 * this.x10 * this.x31 + this.x00 * this.x12 * this.x31 + this.x01 * this.x10 * this.x32 - this.x00 * this.x11 * this.x32) / d;
    const x33 = (this.x01 * this.x12 * this.x20 - this.x02 * this.x11 * this.x20 + this.x02 * this.x10 * this.x21 - this.x00 * this.x12 * this.x21 - this.x01 * this.x10 * this.x22 + this.x00 * this.x11 * this.x22) / d;

    return new Matrix(
      x00, x01, x02, x03,
      x10, x11, x12, x13,
      x20, x21, x22, x23,
      x30, x31, x32, x33,
    );
  }

  // Prints out
  // "
  // 0 0 0 1
  // 0 0 1 0
  // 0 1 0 0
  // 1 0 0 0
  // "
  toString() {
    return `\n${ this.x00 }\t${ this.x01 }\t${ this.x02 }\t${ this.x03 }\n` +
      `${ this.x10 }\t${ this.x11 }\t${ this.x12 }\t${ this.x13 }\n` +
      `${ this.x20 }\t${ this.x21 }\t${ this.x22 }\t${ this.x23 }\n` +
      `${ this.x30 }\t${ this.x31 }\t${ this.x32 }\t${ this.x33 }\n`;
  }
}

export default Matrix;
