import Matrix, { matrixBase } from "./matrix";
import Vector from "./vector";

import { expect, test } from "vitest";

// TODO
// ATM I don't know enough to write good tests for:
// * frustum
// * orthographic
// * perspective
// * lookAt

// --------- matrixBase helpers

test("matrixBase translate", () => {
  const x = Math.random();
  const y = Math.random();
  const z = Math.random();
  const v = new Vector(x, y, z);

  const matrix = matrixBase.translate(v);
  expect(matrix.x03).toEqual(x);
  expect(matrix.x13).toEqual(y);
  expect(matrix.x23).toEqual(z);
});

test("matrixBase scale", () => {
  const x = Math.random();
  const y = Math.random();
  const z = Math.random();
  const v = new Vector(x, y, z);

  const matrix = matrixBase.scale(v);
  expect(matrix.x00).toEqual(x);
  expect(matrix.x11).toEqual(y);
  expect(matrix.x22).toEqual(z);
});

// --------- Matrix class

// * translate
// * scale
// * rotate
// These methods are consisting of the "baseMatrix" methods
// with the same name and "Matrix.mul"
// Those are covered already, so there is no need to write more tests

// TODO
// Missing tests
// * mulPosition
// * mulPositionW
// * mulDirection
// * mulRay

test("can create a matrix", () => {
  const matrix = new Matrix(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

  expect(matrix).toBeDefined();
  expect(matrix.x00).toBeDefined();
  expect(matrix.x01).toBeDefined();
  expect(matrix.x02).toBeDefined();
  expect(matrix.x03).toBeDefined();
  expect(matrix.x10).toBeDefined();
  expect(matrix.x11).toBeDefined();
  expect(matrix.x12).toBeDefined();
  expect(matrix.x13).toBeDefined();
  expect(matrix.x20).toBeDefined();
  expect(matrix.x21).toBeDefined();
  expect(matrix.x22).toBeDefined();
  expect(matrix.x23).toBeDefined();
  expect(matrix.x30).toBeDefined();
  expect(matrix.x31).toBeDefined();
  expect(matrix.x32).toBeDefined();
  expect(matrix.x33).toBeDefined();
});

test("matrix multiplication", () => {
  const matrix1 = new Matrix(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

  const matrixMultiplied1 = new Matrix(
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4
  );

  const m11 = matrix1.mul(matrix1).toString();
  const m12 = matrixMultiplied1.toString();

  expect(m11).toEqual(m12);

  const matrix2 = new Matrix(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
  const matrix3 = new Matrix(4, 3, 2, 1, 4, 3, 2, 1, 4, 3, 2, 1, 4, 3, 2, 1);

  const matrix2MultipliedByMatrix3 = new Matrix(
    40,
    30,
    20,
    10,
    40,
    30,
    20,
    10,
    40,
    30,
    20,
    10,
    40,
    30,
    20,
    10
  );

  const m21 = matrix2.mul(matrix3).toString();
  const m22 = matrix2MultipliedByMatrix3.toString();

  expect(m21).toEqual(m22);
});

test("matrix transpose", () => {
  const matrix1 = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

  const m11 = matrix1.toString();
  const m12 = matrix1.transpose().toString();

  expect(m11).toEqual(m12);

  const matrix2 = new Matrix(1, 3, 5, 9, 1, 3, 1, 7, 4, 3, 9, 7, 5, 2, 0, 9);

  const transposedMatrix2 = new Matrix(
    1,
    1,
    4,
    5,
    3,
    3,
    3,
    2,
    5,
    1,
    9,
    0,
    9,
    7,
    7,
    9
  );

  const m21 = matrix2.transpose().toString();
  const m22 = transposedMatrix2.toString();

  expect(m21).toEqual(m22);
});

test("matrix determinant", () => {
  const matrix1 = new Matrix(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

  expect(matrix1.determinant()).toEqual(0);

  const matrix2 = new Matrix(1, 3, 5, 9, 1, 3, 1, 7, 4, 3, 9, 7, 5, 2, 0, 9);

  expect(matrix2.determinant()).toEqual(-376);
});

test("matrix inverse", () => {
  const matrix1 = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

  const m11 = matrix1.toString();
  const m12 = matrix1.inverse().toString();

  expect(m11).toEqual(m12);

  const matrix2 = new Matrix(1, 3, 5, 9, 1, 3, 1, 7, 4, 3, 9, 7, 5, 2, 0, 9);

  const inverseMatrix2 = new Matrix(
    -13 / 47,
    2 / 47,
    7 / 47,
    6 / 47,
    -5 / 8,
    7 / 8,
    1 / 4,
    -1 / 4,
    39 / 376,
    -53 / 376,
    13 / 188,
    -9 / 188,
    55 / 188,
    -41 / 188,
    -13 / 94,
    9 / 94
  );

  const m21 = matrix2.inverse().toString();
  const m22 = inverseMatrix2.toString();

  expect(m21).toEqual(m22);
});
