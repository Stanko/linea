import Shape from "./shape";
import { INF } from "./common";

class Hit {
  shape: Shape | null;
  t: number;

  constructor(shape:Shape, t:number) {
    this.shape = shape;
    this.t = t;
  }

  // Ok
  ok():boolean {
    return this.t < INF;
  }

  // Min
  min(b:Hit):Hit {
    if (this.t <= b.t) {
      return this;
    }

    return b;
  }

  // Max
  max(b:Hit):Hit {
    if (this.t > b.t) {
      return this;
    }

    return b;
  }

}

// NoHit
export const noHit = new Hit(null, INF);


export default Hit;
