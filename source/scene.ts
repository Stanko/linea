import Vector from "./vector";
import Shape from "./shape";
import Tree from "./tree";
import Hit from "./hit";
import Ray from "./ray";
import { Paths } from "./path";
import Matrix, { matrixBase } from "./matrix";
import ClipFilter from "./filter";

class Scene {
  shapes: Shape[] = [];
  tree: Tree = null;

  constructor() {
  }

  // constructor(shapes: Shape[], tree: Tree) {
  //   this.shapes = shapes;
  //   this.tree = tree;
  // }

  // Compile
  compile() {
    this.shapes.forEach(shape => {
      shape.compile();
    });

    if (!this.tree) {
      this.tree = new Tree(this.shapes);
    }
  }

  // Add
  add(shape:Shape) {
    this.shapes = [
      ...this.shapes,
      shape,
    ];
  }

  // Intersect
  intersect(r:Ray):Hit {
    return this.tree.intersect(r)
  }

  // Visible
  visible(eye:Vector, point:Vector):boolean {
    const v = eye.sub(point);
    const r = new Ray(point, v.normalize());

    const hit = this.intersect(r);

    return hit.t >= v.length();
  }

  // Paths
  paths():Paths {
    const paths = [];

    this.shapes.forEach(shape => {
      paths.push(...shape.paths().paths);
    });

    return new Paths(paths);
  }

  // Render
  render(eye:Vector, center:Vector, up:Vector, width:number, height:number, fovy:number, near:number, far:number, step:number):Paths {
    const aspect = width / height;
    let matrix = matrixBase.lookAt(eye, center, up);
    matrix = matrix.perspective(fovy, aspect, near, far);

    return this.renderWithMatrix(matrix, eye, width, height, step);
  }

  // RenderWithMatrix
  renderWithMatrix(matrix:Matrix, eye:Vector, width:number, height:number, step:number):Paths {
    this.compile();
    let paths = this.paths();

    if (step > 0) {
      paths = paths.chop(step);
    }

    paths = paths.filter(new ClipFilter(matrix, eye, this));

    if (step > 0) {
      paths = paths.simplify(1e-6);
    }

    matrix = matrixBase.translate(new Vector(1, 1, 0)).scale(new Vector(width / 2, height / 2, 0));
    paths = paths.transform(matrix);

    return paths;
  }

}

export default Scene;

