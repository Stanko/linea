import Vector from "../source/vector";
import Scene from "../source/scene";
import Cube from "../source/cube";

function main() {
  // create a scene and add a single cube
  const scene = new Scene();
  const cube = new Cube(new Vector(-1, -1, -1), new Vector(1, 1, 1));
  scene.add(cube);

	// define camera parameters
	const eye = new Vector(4, 3, 2); // camera position
	const center = new Vector(0, 0, 0); // camera looks at
	const up = new Vector(0, 0, 1); // up direction

	// define rendering parameters
	const width = 1024.0; // rendered width
	const height = 1024.0; // rendered height
	const fovY = 50.0; // vertical field of view, degrees
	const zNear = 0.1; // near z plane
	const zFar = 10.0; // far z plane
	const step = 0.01; // how finely to chop the paths for visibility testing

	// compute 2D paths that depict the 3D scene
  const paths = scene.render(eye, center, up, width, height, fovY, zNear, zFar, step);

	// render the paths in an image
	// paths.writeToPNG("out.png", width, height);

	// save the paths as an svg
  // paths.writeToSVG("out.svg", width, height);

  console.log(paths.toSVG(1000, 1000));
}

main();
