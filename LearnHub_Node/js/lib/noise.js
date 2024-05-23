import Alea from 'alea';
import { nanoid } from 'nanoid';
import { add, constant, mul, scale } from './derivative';

function smoothstep(x) {
	return mul(x, x, add(constant(3), scale(-2, x)));
}
function lerp(zero, one, x)  {
	return add(
		mul(x, one),
		mul(add(constant(1), scale(-1, x)), zero)
	);
}

export function noise2d() {
	const seed = nanoid();
	return (x, y) => {
		const
			gridX = Math.floor(x()),
			gridY = Math.floor(y()),
			lerpX = smoothstep(add(x, constant(-gridX))),
			lerpY = smoothstep(add(y, constant(-gridY)));
		function contribution(gridX, gridY) {
			const
				rng = new Alea([seed, gridX, gridY]),
				theta = 2*Math.PI*rng();
			return add(
				scale(Math.cos(theta), add(x, constant(-gridX))),
				scale(Math.sin(theta), add(y, constant(-gridY)))
			);
		}
		return lerp(
			lerp(
				contribution(gridX, gridY),
				contribution(gridX + 1, gridY),
				lerpX
			),
			lerp(
				contribution(gridX, gridY + 1),
				contribution(gridX + 1, gridY + 1),
				lerpX
			),
			lerpY
		);
	};
}
export function noise2dOctave(octave = 2, multiplier = 1.5) {
	const noises = [...Array(octave)].map((_, i) => {
		const noise = noise2d();
		return (x, y) => {
			const mp = multiplier**i;
			return scale(
				1/mp,
				noise(scale(mp, x), scale(mp, y))
			);
		};
	});
	return (x, y) => add(...noises.map(noise => noise(x, y)));
}
