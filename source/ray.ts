import Vector from "./vector";

class Ray {
  origin: Vector;
  direction: Vector;

  constructor(origin:Vector, direction:Vector) {
    this.origin = origin;
    this.direction = direction;
  }

  // Position
  position(t:number):Vector {
    return this.origin.add(this.direction.mulScalar(t));
  }
}

export default Ray;
