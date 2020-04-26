import Vector from "./vector";

test('can create a vector', () => {
  const vector = new Vector(1, 1, 1);

  expect(vector).toBeDefined();
  expect(vector.x).toBeDefined();
  expect(vector.y).toBeDefined();
  expect(vector.z).toBeDefined();
});


test('can create random vector and it is normalized', () => {
  const randomVector = Vector.randomUnitVector();

  expect(randomVector).toBeDefined();
  expect(randomVector.x).toBeLessThan(1);
  expect(randomVector.y).toBeLessThan(1);
  expect(randomVector.z).toBeLessThan(1);
});

test('vector length', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 1, 1);
  const vector3 = new Vector(3, 4, 5);

  expect(vector1.length()).toEqual(0);
  expect(vector2.length()).toEqual(Math.sqrt(3));
  expect(vector3.length()).toEqual(Math.sqrt(9 + 16 + 25));
});

test('distance between vectors', () => {
  const vector1 = new Vector(1, 1, 1);
  const vector2 = new Vector(2, 2, 2);

  expect(vector1.distance(vector1)).toEqual(0);
  expect(vector1.distance(vector2)).toEqual(Math.sqrt(3));

  const vector3 = new Vector(1, 3, 1);
  const vector4 = new Vector(1, 0, 1);

  expect(vector3.distance(vector4)).toEqual(3);
});

test('vector length squared', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 1, 1);
  const vector3 = new Vector(3, 4, 5);

  expect(vector1.lengthSquared()).toEqual(0);
  expect(vector2.lengthSquared()).toEqual(3);
  expect(vector3.lengthSquared()).toEqual(9 + 16 + 25);
});

test('distance squared between vectors', () => {
  const vector1 = new Vector(1, 1, 1);
  const vector2 = new Vector(2, 2, 2);

  expect(vector1.distanceSquared(vector1)).toEqual(0);
  expect(vector1.distanceSquared(vector2)).toEqual(3);

  const vector3 = new Vector(1, 3, 1);
  const vector4 = new Vector(1, 0, 1);

  expect(vector3.distanceSquared(vector4)).toEqual(9);
});

test('vector dot product', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const vector3 = new Vector(1, 5, 7);

  expect(vector1.dot(vector2)).toEqual(0);
  expect(vector2.dot(vector3)).toEqual(32);
});

test('vector cross product', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const vector3 = new Vector(1, 5, 7);

  const cross1 = vector1.cross(vector2);
  expect(cross1.x).toEqual(0);
  expect(cross1.y).toEqual(0);
  expect(cross1.z).toEqual(0);

  const cross2 = vector2.cross(vector3);
  expect(cross2.x).toEqual(-1);
  expect(cross2.y).toEqual(-4);
  expect(cross2.z).toEqual(3);
});


test('normalize vector', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const vector3 = new Vector(1, 5, 7);

  global.console.warn = jest.fn()
  const warnSpy = jest.spyOn(global.console, 'warn');

  const normalized1 = vector1.normalize();
  expect(warnSpy).toHaveBeenCalled();
  expect(normalized1.x).toEqual(0);
  expect(normalized1.y).toEqual(0);
  expect(normalized1.z).toEqual(0);

  const normalized2 = vector2.normalize();
  const d2 = Math.sqrt(14);
  expect(normalized2.x).toEqual(vector2.x / d2);
  expect(normalized2.y).toEqual(vector2.y / d2);
  expect(normalized2.z).toEqual(vector2.z / d2);

  const normalized3 = vector3.normalize();
  const d3 = Math.sqrt(1 + 25 + 49);
  expect(normalized3.x).toEqual(vector3.x / d3);
  expect(normalized3.y).toEqual(vector3.y / d3);
  expect(normalized3.z).toEqual(vector3.z / d3);
});

test('adding vectors', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const vector3 = new Vector(1, 5, 7);

  const result1 = vector1.add(vector2);
  expect(result1.x).toEqual(1);
  expect(result1.y).toEqual(2);
  expect(result1.z).toEqual(3);

  const result2 = vector2.add(vector3);
  expect(result2.x).toEqual(2);
  expect(result2.y).toEqual(7);
  expect(result2.z).toEqual(10);
});

test('subtracting vectors', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const vector3 = new Vector(1, 5, 7);

  const result1 = vector1.sub(vector2);
  expect(result1.x).toEqual(-1);
  expect(result1.y).toEqual(-2);
  expect(result1.z).toEqual(-3);

  const result2 = vector2.sub(vector3);
  expect(result2.x).toEqual(0);
  expect(result2.y).toEqual(-3);
  expect(result2.z).toEqual(-4);
});

test('multiplying vectors', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const vector3 = new Vector(1, 5, 7);

  const result1 = vector1.mul(vector2);
  expect(result1.x).toEqual(0);
  expect(result1.y).toEqual(0);
  expect(result1.z).toEqual(0);

  const result2 = vector2.mul(vector3);
  expect(result2.x).toEqual(1);
  expect(result2.y).toEqual(10);
  expect(result2.z).toEqual(21);
});

test('dividing vectors', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const vector3 = new Vector(1, 5, 7);

  const result1 = vector1.div(vector2);
  expect(result1.x).toEqual(0);
  expect(result1.y).toEqual(0);
  expect(result1.z).toEqual(0);

  const result2 = vector2.div(vector3);
  expect(result2.x).toEqual(1);
  expect(result2.y).toEqual(2 / 5);
  expect(result2.z).toEqual(3 / 7);
});

test('adding scalar', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const n = 5;

  const result1 = vector1.addScalar(n);
  expect(result1.x).toEqual(5);
  expect(result1.y).toEqual(5);
  expect(result1.z).toEqual(5);

  const result2 = vector2.addScalar(n);
  expect(result2.x).toEqual(6);
  expect(result2.y).toEqual(7);
  expect(result2.z).toEqual(8);
});


test('subtracting scalar', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const n = 5;

  const result1 = vector1.subScalar(n);
  expect(result1.x).toEqual(-5);
  expect(result1.y).toEqual(-5);
  expect(result1.z).toEqual(-5);

  const result2 = vector2.subScalar(n);
  expect(result2.x).toEqual(-4);
  expect(result2.y).toEqual(-3);
  expect(result2.z).toEqual(-2);
});

test('multiply by scalar', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const n = 5;

  const result1 = vector1.mulScalar(n);
  expect(result1.x).toEqual(0);
  expect(result1.y).toEqual(0);
  expect(result1.z).toEqual(0);

  const result2 = vector2.mulScalar(n);
  expect(result2.x).toEqual(5);
  expect(result2.y).toEqual(10);
  expect(result2.z).toEqual(15);
});

test('diving by scalar', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 3);
  const n = 5;

  const result1 = vector1.divScalar(n);
  expect(result1.x).toEqual(0);
  expect(result1.y).toEqual(0);
  expect(result1.z).toEqual(0);

  const result2 = vector2.divScalar(n);
  expect(result2.x).toEqual(1 / 5);
  expect(result2.y).toEqual(2 / 5);
  expect(result2.z).toEqual(3 / 5);
});

test('min vector', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 2);
  const vector3 = new Vector(-5, -10, 3);

  const result1 = vector1.min(vector2);
  expect(result1.x).toEqual(0);
  expect(result1.y).toEqual(0);
  expect(result1.z).toEqual(0);

  const result2 = vector2.min(vector3);
  expect(result2.x).toEqual(-5);
  expect(result2.y).toEqual(-10);
  expect(result2.z).toEqual(2);
});

test('max vector', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 2, 2);
  const vector3 = new Vector(-5, -10, 3);

  const result1 = vector1.max(vector2);
  expect(result1.x).toEqual(1);
  expect(result1.y).toEqual(2);
  expect(result1.z).toEqual(2);

  const result2 = vector2.max(vector3);
  expect(result2.x).toEqual(1);
  expect(result2.y).toEqual(2);
  expect(result2.z).toEqual(3);
});

test('min axis', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(5, 2, 3);
  const vector3 = new Vector(3, 2, 1);

  const result1 = vector1.minAxis();
  expect(result1.x).toEqual(1);
  expect(result1.y).toEqual(0);
  expect(result1.z).toEqual(0);

  const result2 = vector2.minAxis();
  expect(result2.x).toEqual(0);
  expect(result2.y).toEqual(1);
  expect(result2.z).toEqual(0);

  const result3 = vector3.minAxis();
  expect(result3.x).toEqual(0);
  expect(result3.y).toEqual(0);
  expect(result3.z).toEqual(1);
});

test('min component', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(5, 2, 3);
  const vector3 = new Vector(3, -10, 1);

  expect(vector1.minComponent()).toEqual(0);
  expect(vector2.minComponent()).toEqual(2);
  expect(vector3.minComponent()).toEqual(-10);
});

test('segment distance', () => {
  const vector1 = new Vector(0, 0, 0);
  const vector2 = new Vector(1, 0, 0);
  const vector3 = new Vector(0, 1, 0);

  expect(vector1.segmentDistance(vector1, vector3)).toEqual(0);
  expect(vector1.segmentDistance(vector2, vector3)).toEqual(Math.sqrt(2) / 2);
});
