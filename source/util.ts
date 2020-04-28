// Radians
export function toRadians (degrees:number): number {
	return degrees * Math.PI / 180;
}

// Degrees
export function toDegrees (radians:number): number {
	return radians * 180 / Math.PI;
}

// Median
export function median(items:number[]): number {
	const n = items.length;

	if (n == 0) {
		return 0;
	} else if (n % 2 === 1) {
		return items[n / 2 - 1];
	} else {
		const a = items[n / 2 - 1];
		const b = items[n / 2];
		return (a + b) / 2;
	}
}

// ParseFloats
export function parseFloats(numberAsStrings:string[]):number[] {
  return numberAsStrings.map(n => parseFloat(n));
}

export function random(min:number, max:number, returnInt:boolean = false) {
  if (returnInt) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return Math.random() * (max - min) + min;
}
