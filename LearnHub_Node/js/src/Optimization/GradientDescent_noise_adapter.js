import { add, constant, scale, variable } from "../../lib/derivative";
import { sigmoid } from "../../lib/math";
import { noise2dOctave } from "../../lib/noise";

export const SCALE = 1;

export function newNoise(seed) {
	function f(x) {
		return scale(2*SCALE, add(x, constant(-0.5)));
	}
	const noise = noise2dOctave(seed);
	return (xRaw, yRaw) => {
		const sample = noise(f(variable('x', xRaw)), f(variable('y', yRaw)));
		return (dx, dy) => dx !== undefined
			? sample({ x: dx, y: dy })
			: sample();
	};
}
export function wrap(x) {
	return sigmoid(5*x);
}
