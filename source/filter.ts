import Vector from "./vector";
import Scene from "./scene";
import Box from "./box";
import Matrix from "./matrix";


const clipBox = new Box(new Vector(-1, -1, -1), new Vector(1, 1, 1));

export type TFilter = {
  vector: Vector;
  ok: boolean;
}

class ClipFilter {
  matrix: Matrix;
  eye: Vector;
  scene: Scene;

  constructor(matrix: Matrix, eye: Vector, scene: Scene) {
    this.matrix = matrix;
    this.eye = eye;
    this.scene = scene;
  }

  // Filter
  filter(v:Vector):TFilter {
    const w = this.matrix.mulPositionW(v);

    if (!this.scene.visible(this.eye, v)) {
      return {
        vector: w,
        ok: false,
      };
    }

    if (!clipBox.contains(w)) {
      return {
        vector: w,
        ok: false,
      };
    }

    return {
      vector: w,
      ok: true,
    };
  }
}

export default ClipFilter;
