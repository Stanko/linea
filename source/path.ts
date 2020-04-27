import Vector from "./vector";
import Box from "./box";
import Matrix from "./matrix";
import ClipFilter from "./filter";

class Path {
  points: Vector[];

  constructor(points:Vector[] = []) {
    this.points = points;
  }

  append(...newPoints:Vector[]) {
    this.points = [
      ...this.points,
      ...newPoints,
    ];
  }

  // BoundingBox
  boundingBox():Box {
    const p0 = this.points[0];
    let box = new Box(p0, p0);

    for (let i = 1; i < this.points.length; i++) {
      const p = this.points[i];
      box = box.extend(new Box(p, p));
    }

    return box
  }

  // Transform
  transform(matrix:Matrix):Path {
    const points = this.points.map(p => {
      return matrix.mulPosition(p);
    });

    return new Path(points);
  }

  // Chop
  chop(step:number):Path {
    const result = new Path();

    for (let i = 0; i < this.points.length - 1; i++) {
      const a = this.points[i];
      const b = this.points[i + 1];
      const v = b.sub(a);
      const l = v.length();

      if (i == 0) {
        result.append(a);
      }

      let d = step;
      while (d < l) {
        result.append(a.add(v.mulScalar(d / l)));
        d += step;
      }

      result.append(b);
    }

    return result
  }

  // Filter
  filter(f:ClipFilter):Paths {
    const result = new Paths();
    let path = new Path();

    this.points.forEach(point => {
      const { vector, ok } = f.filter(point);

      // TODO test this original code
      // ok = ok || i % 8 < 4 // show hidden lines

      if (ok) {
        path.append(vector);
      } else {
        if (path.points.length > 1) {
          result.append(path)
        }
        path = new Path();
      }
    });

    if (path.points.length > 1) {
      result.append(path)
    }

    return result
  }

  // Simplify
  simplify(threshold:number):Path {
    if (this.points.length < 3) {
      return new Path([...this.points]);
    }

    const a = this.points[0];
    const b = this.points[this.points.length - 1];
    let index = -1;
    let distance = 0;

    for (let i = 1; i < this.points.length - 1; i++) {
      const d = this.points[i].segmentDistance(a, b);

      if (d > distance) {
        index = i;
        distance = d;
      }
    }

    if (distance > threshold) {
      const r1 = new Path(this.points.slice(0, index + 1)).simplify(threshold);
      const r2 = new Path(this.points.slice(index)).simplify(threshold);

      return new Path([
        ...r1.points.slice(0, r1.points.length - 1),
        ...r2.points,
      ]);
    }

    return new Path([a, b]);
  }

  toString() {
    return this.points.map(p => {
      return p.toString();
    }).join('\n');
  }

  // ToSVG
  toSVG():string {
    const coords = this.points.map(p => {
      return `${ p.x } ${ p.y }`;
    }).join(' ');

    return `<polyline stroke="black" fill="none" points="${ coords }" />`;
  }
}

export default Path;

export class Paths {
  paths: Path[];

  constructor(paths:Path[] = []) {
    this.paths = paths;
  }

  append(...newPathd:Path[]) {
    this.paths = [
      ...this.paths,
      ...newPathd,
    ];
  }

  // BoundingBox
  boundingBox():Box {
    let box = this.paths[0].boundingBox();

    for (let i = 1; i < this.paths.length; i++) {
      const path = this.paths[i];
      box = box.extend(path.boundingBox());
    }

    return box
  }

  // Transform
  transform(matrix:Matrix):Paths {
    const paths = this.paths.map(path => {
      return path.transform(matrix);
    });

    return new Paths(paths);
  }

  // Chop
  chop(step:number):Paths {
    const paths = this.paths.map(path => {
      return path.chop(step);
    });

    return new Paths(paths);
  }

  // Filter
  filter(filter:ClipFilter):Paths {
    const paths = [];

    this.paths.forEach(path => {
      paths.push(...path.filter(filter).paths);
    });

    return new Paths(paths);
  }

  // Simplify
  simplify(threshold:number):Paths {
    const paths = this.paths.map(path => {
      return path.simplify(threshold);
    });

    return new Paths(paths);
  }

  toString() {
    return this.paths.map(path => {
      return `[\n${ path.toString() }\n]`;
    }).join('\n');
  }

  // ToSvg
  toSVG(width:number, height:number):string {
    let svg = `<svg width="${ width }" height="${ height }" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">\n`;
    svg += `<g transform="translate(0, ${ height }) scale(1, -1)">\n`;
    svg += this.paths.map(path => path.toSVG()).join('\n');
    svg += '</g>\n';
    svg += '</svg>';

    return svg;
  }

  // TODO implement
  // * WriteToPNG
  // * WriteToSVG
  // * WriteToTXT
  // I guess we could abstract these methods to be used with node and in browser
}
