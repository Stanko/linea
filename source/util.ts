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
