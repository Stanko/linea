import Vector from "./vector";
import Shape from "./shape";
import Triangle from "./Triangle";

class Box {
  min: Vector;
  max: Vector;

  constructor(min:Vector, max:Vector) {
    this.min = min;
    this.min = max;
  }

  extend(box:Box):Box {
    return box;
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

   // BoxForTriangles
   static boxForTriangles(shapes:Triangle[]):Box {
    return Box.boxForShapes(shapes);
  }

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

  // TODO missing everything below "BoxForVectors" method in box.go
}

export default Box;

