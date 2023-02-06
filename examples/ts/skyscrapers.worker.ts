import Vector from "../../source/vector";
import Scene from "../../source/scene";
import Cube, { CubeType } from "../../source/cube";

function main() {
  const scene = new Scene();
  const n = 9;

  for (let x = -n; x <= n; x++) {
    for (let y = -n; y <= n; y++) {
      const p = Math.random() * 0.25 + 0.2;
      const dx = Math.random() * 0.5 - 0.25;
      const dy = Math.random() * 0.5 - 0.25;
      const fx = x + dx * 0;
      const fy = y + dy * 0;
      const fz = Math.random() * 3 + 1;
      const shape = new Cube(
        new Vector(fx - p, fy - p, 0),
        new Vector(fx + p, fy + p, fz),
        CubeType.StripedOuterSides
      );

      if (x == 2 && y == 1) {
        continue;
      }

      scene.add(shape);
    }
  }
  const eye = new Vector(1.75, 1.25, 6);
  const center = new Vector(0, 0, 0);
  const up = new Vector(0, 0, 1);
  const width = 1024.0;
  const height = 1024.0;
  const paths = scene.render(
    eye,
    center,
    up,
    width,
    height,
    100,
    0.1,
    100,
    0.01
  );

  return paths.toSVG(width, height);
}

self.addEventListener(
  "message",
  function (e) {
    self.postMessage(main());
  },
  false
);
