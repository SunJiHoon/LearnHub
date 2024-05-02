import Alea from 'alea';
import { nanoid } from 'nanoid';
import { zip, normdist } from './util.js';

function smoothstep([x, ...xs]) {
	return [
		x*x*(3 - 2*x),
		...xs.map(dx => 6*x*(1 - x)*dx)
	];
}
function lerp([zero, ...zeros], [one, ...ones], [x, ...xs]) {
	return [
		x*one + (1 - x)*zero,
		...zip(zeros, ones, xs).map(([dzero, done, dx]) =>
			dx*(one - zero) + x*done + (1 - x)*dzero
		),
	];
}

export function newNoise2d(seed = nanoid()) {
	return (x, y) => {
		const
			xs = [1, 0],
			ys = [0, 1];
		function contrib(gridX, gridY) {
			const
				alea = new Alea([seed, gridX, gridY]),
				[vx, vy] = normdist(alea),
				d = Math.hypot(vx, vy)/Math.SQRT2;
			return [
				(vx*(x - gridX) + vy*(y - gridY))/d,
				...zip(xs, ys).map(([dx, dy]) =>(vx*dx + vy*dy)/d),
			];
		}
		const
			gridX = Math.floor(x),
			gridY = Math.floor(y),
			lerpX = smoothstep([x - gridX, ...xs]),
			lerpY = smoothstep([y - gridY, ...ys]);
		return lerp(
			lerp(
				contrib(gridX, gridY),
				contrib(gridX + 1, gridY),
				lerpX
			),
			lerp(
				contrib(gridX, gridY + 1),
				contrib(gridX + 1, gridY + 1),
				lerpX
			),
			lerpY
		);
	};
}
export function newNoise3d(seed = nanoid()) {
	return (x, y, z) => {
		const
			xs = [1, 0, 0],
			ys = [0, 1, 0],
			zs = [0, 0, 1];
		function contrib(gridX, gridY, gridZ) {
			const
				alea = new Alea([seed, gridX, gridY, gridZ]),
				[vx, vy] = normdist(alea),
				[vz] = normdist(alea),
				d = Math.hypot(vx, vy, vz)*2/Math.sqrt(3);
			return [
				(vx*(x - gridX) + vy*(y - gridY) + vz*(z - gridZ))/d,
				...zip(xs, ys, zs).map(([dx, dy, dz]) =>(vx*dx + vy*dy + vz*dz)/d),
			];
		}
		const
			gridX = Math.floor(x),
			gridY = Math.floor(y),
			gridZ = Math.floor(z),
			lerpX = smoothstep([x - gridX, ...xs]),
			lerpY = smoothstep([y - gridY, ...ys]),
			lerpZ = smoothstep([z - gridZ, ...zs]);
		return lerp(
			lerp(
				lerp(
					contrib(gridX, gridY, gridZ),
					contrib(gridX + 1, gridY, gridZ),
					lerpX
				),
				lerp(
					contrib(gridX, gridY + 1, gridZ),
					contrib(gridX + 1, gridY + 1, gridZ),
					lerpX
				),
				lerpY
			),
			lerp(
				lerp(
					contrib(gridX, gridY, gridZ + 1),
					contrib(gridX + 1, gridY, gridZ + 1),
					lerpX
				),
				lerp(
					contrib(gridX, gridY + 1, gridZ + 1),
					contrib(gridX + 1, gridY + 1, gridZ + 1),
					lerpX
				),
				lerpY
			),
			lerpZ
		);
	};
}
export function newNoise4d(seed = nanoid()) {
	return (x, y, z, w) => {
		const
			xs = [1, 0, 0, 0],
			ys = [0, 1, 0, 0],
			zs = [0, 0, 1, 0],
			ws = [0, 0, 0, 1];
		function contrib(gridX, gridY, gridZ, gridW) {
			const
				alea = new Alea([seed, gridX, gridY, gridZ, gridW]),
				[vx, vy] = normdist(alea),
				[vz, vw] = normdist(alea),
				d = Math.hypot(vx, vy, vz, vw);
			return [
				(vx*(x - gridX) + vy*(y - gridY) + vz*(z - gridZ) + vw*(w - gridW))/d,
				...zip(xs, ys, zs, ws).map(([dx, dy, dz, dw]) =>(vx*dx + vy*dy + vz*dz, vw*dw)/d),
			];
		}
		const
			gridX = Math.floor(x),
			gridY = Math.floor(y),
			gridZ = Math.floor(z),
			gridW = Math.floor(w),
			lerpX = smoothstep([x - gridX, ...xs]),
			lerpY = smoothstep([y - gridY, ...ys]),
			lerpZ = smoothstep([z - gridZ, ...zs]),
			lerpW = smoothstep([w - gridW, ...ws]);
		return lerp(
			lerp(
				lerp(
					lerp(
						contrib(gridX, gridY, gridZ, gridW),
						contrib(gridX + 1, gridY, gridZ, gridW),
						lerpX
					),
					lerp(
						contrib(gridX, gridY + 1, gridZ, gridW),
						contrib(gridX + 1, gridY + 1, gridZ, gridW),
						lerpX
					),
					lerpY
				),
				lerp(
					lerp(
						contrib(gridX, gridY, gridZ + 1, gridW),
						contrib(gridX + 1, gridY, gridZ + 1, gridW),
						lerpX
					),
					lerp(
						contrib(gridX, gridY + 1, gridZ + 1, gridW),
						contrib(gridX + 1, gridY + 1, gridZ + 1, gridW),
						lerpX
					),
					lerpY
				),
				lerpZ
			),
			lerp(
				lerp(
					lerp(
						contrib(gridX, gridY, gridZ, gridW + 1),
						contrib(gridX + 1, gridY, gridZ, gridW + 1),
						lerpX
					),
					lerp(
						contrib(gridX, gridY + 1, gridZ, gridW + 1),
						contrib(gridX + 1, gridY + 1, gridZ, gridW + 1),
						lerpX
					),
					lerpY
				),
				lerp(
					lerp(
						contrib(gridX, gridY, gridZ + 1, gridW + 1),
						contrib(gridX + 1, gridY, gridZ + 1, gridW + 1),
						lerpX
					),
					lerp(
						contrib(gridX, gridY + 1, gridZ + 1, gridW + 1),
						contrib(gridX + 1, gridY + 1, gridZ + 1, gridW + 1),
						lerpX
					),
					lerpY
				),
				lerpZ
			),
			lerpW
		);
	};
}
