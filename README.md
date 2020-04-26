# linea

This is an attempt to port [Michael Fogleman's ln](https://github.com/fogleman/ln), 3d line engine to JavaScript (well, TypeScript).

The name of the port is inspired by the Italian cartoon from the 70s, [La Linea](https://en.wikipedia.org/wiki/La_Linea_(TV_series)).

## Setup

Project was made using node 12. We suggest using [nvm](https://github.com/nvm-sh/nvm). If you have nvm installed, just run `nvm use` in the root dir, to switch to version 12 (you need to install it first).

Then install dependencies

```
npm install
```

## Tests

```
npm test
```

To run tests in watch mode run:

```
npm test -- --watch
```


## Progress

* [x] axis.go
* [ ] box.go
* [x] common.go
* [ ] cone.go
* [ ] csg.go
* [ ] cube.go
* [ ] cylinder.go
* [ ] filter.go
* [ ] function.go
* [ ] hit.go
* [ ] matrix.go
* [ ] mesh.go
* [ ] obj.go
* [ ] path.go
* [ ] plane.go
* [ ] ray.go
* [ ] scene.go
* [ ] shape.go
* [ ] sphere.go
* [ ] stl.go
* [ ] tree.go
* [ ] triangle.go
* [x] util.go
* [x] vector.go
