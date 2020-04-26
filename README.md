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
* [ ] box.go - **WIP**, depends on the missing class `Triangle`
* [x] common.go
* [ ] cone.go
* [ ] csg.go
* [x] cube.go - depends on the missing class `Path`
* [ ] cylinder.go
* [ ] filter.go
* [ ] function.go
* [x] hit.go
* [ ] matrix.go
* [ ] mesh.go
* [ ] obj.go
* [ ] path.go
* [ ] plane.go
* [x] ray.go
* [ ] scene.go
* [x] shape.go - depends on the missing classes `Matrix` and `Path`
* [ ] sphere.go
* [ ] stl.go
* [ ] tree.go
* [ ] triangle.go
* [x] util.go
* [x] vector.go
