import { add, constant, scale, variable } from "../../lib/derivative";
import { sigmoid, normal_distribution } from "../../lib/math";
import { noise2dOctave } from "../../lib/noise";
import { drawArrow } from "../../lib/draw";

const SCALE = 1;

function newGame(width, height) {
	const noise = newNoise();
	return {
		noise,
		map: plot(width, height, noise),
		attempts: [],
		x: Math.random(),
		y: Math.random(),
		result: null,
		particles: [],
	};
}
function newNoise() {
	function f(x) {
		return scale(2*SCALE, add(x, constant(-0.5)));
	}
	const noise = noise2dOctave();
	return (xRaw, yRaw) => {
		const sample = noise(f(variable('x', xRaw)), f(variable('y', yRaw)));
		return (dx, dy) => dx !== undefined
			? sample({ x: dx, y: dy })
			: sample();
	};
}
function plot(width, height, noise) {
	const
		canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		data = ctx.createImageData(width, height);
	canvas.width = width;
	canvas.height = height;
	for(let y = 0; y < height; y++)
		for(let x = 0; x < width; x++) {
			const z = Math.floor(256*wrap(noise(x/width, y/height)()));
			data.data[4*(width*y + x)] = z;
			data.data[4*(width*y + x) + 1] = 0;
			data.data[4*(width*y + x) + 2] = 255 - z;
			data.data[4*(width*y + x) + 3] = 255;
		}
	ctx.putImageData(data, 0, 0);
	return canvas;
}
function wrap(x) {
	return sigmoid(5*x);
}

document.addEventListener('DOMContentLoaded', () => {
	const
		canvas = document.getElementById('mana-descent'),
		ctx = canvas.getContext('2d'),
		confirm = document.getElementById('confirm'),
		restart = document.getElementById('restart');

	let
		minigame = null,
		rerun = false,
		t = null;
	function aim(cx, cy) {
		if(minigame.result)
			return;
		minigame.x = cx/canvas.width;
		minigame.y = cy/canvas.height;
		queueRedraw();
	}
	function turn() {
		if(minigame.result)
			return;
		if(minigame.attempts.length == 10) {
			minigame.result = [minigame.x, minigame.y, minigame.noise(minigame.x, minigame.y)()];
			return;
		}

		const
			sample = minigame.noise(minigame.x, minigame.y),
			z = sample(),
			dzdx = sample(1, 0),
			dzdy = sample(0, 1);
		minigame.attempts.push([minigame.x, minigame.y, z, dzdx, dzdy]);
		for(let i = 0; i < 16; i++) {
			minigame.particles.push({
				life: 3 + normal_distribution()/3,
				time: 0,
				x: minigame.x,
				y: minigame.y,
				vy: normal_distribution()/400,
				vx: normal_distribution()/400,
				ax: (-dzdx + normal_distribution()*2/3)/200,
				ay: (-dzdy + normal_distribution()*2/3)/200,
				z,
			});
		}

		confirm.textContent = minigame.attempts.length == 10
			? '여기로 결정'
			: `${minigame.attempts.length + 1}개째 터뜨리기`;
		queueRedraw();
	}
	function init() {
		minigame = newGame(canvas.width, canvas.height);
		confirm.textContent = '1개째 터뜨리기';
		queueRedraw();
	}
	function queueRedraw() {
		rerun = true;
	}

	requestAnimationFrame(function run(nt) {
		const dt = t === null
			? 0
			: (nt - t)/1000;
		t = nt;

		if(rerun) {
			rerun = minigame.particles.length != 0;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if(minigame.result) {
				ctx.globalAlpha = 0.3;
				ctx.drawImage(minigame.map, 0, 0);
				ctx.globalAlpha = 1;
			}

			minigame.particles = minigame.particles.filter(x => (x.time += dt) < x.life);
			for(const particle of minigame.particles) {
				const z = Math.floor(256*wrap(particle.z));
				particle.x += dt*(particle.vx += dt*particle.ax);
				particle.y += dt*(particle.vy += dt*particle.ay);
				ctx.fillStyle = `rgba(${z}, 0, ${255 - z}, ${1 - particle.time/particle.life})`;
				ctx.fillRect(
					Math.round(canvas.width*particle.x) - 2,
					Math.round(canvas.height*particle.y) - 2,
					4, 4
				);
			}

			ctx.lineWidth = 2;
			for(let i = 0; i < minigame.attempts.length; i++) {
				const
					[x, y, rawZ, dzdx, dzdy] = minigame.attempts[i],
					z = Math.floor(256*wrap(rawZ)),
					cx = canvas.width*x,
					cy = canvas.height*y;
				ctx.globalAlpha = minigame.result || i == minigame.attempts.length - 1
					? 1
					: 0.5;
				ctx.fillStyle =
				ctx.strokeStyle =
					`rgba(${z}, 0, ${255 - z})`;
				drawArrow(
					ctx,
					cx, cy, cx - 10/SCALE*dzdx, cy - 10/SCALE*dzdy,
					10
				);
			}
			ctx.globalAlpha = 1;

			ctx.strokeStyle = 'black';
			ctx.beginPath();
			ctx.arc(canvas.width*minigame.x, canvas.height*minigame.y, 8, 0, 2*Math.PI);
			ctx.stroke();
		}

		requestAnimationFrame(run);
	});

	canvas.addEventListener('mousedown', e => {
		if(!(e.buttons & 1))
			return;
		const { left, top } = e.target.getBoundingClientRect();
		aim(e.clientX - left, e.clientY - top);
	});
	canvas.addEventListener('mousemove', e => {
		if(!(e.buttons & 1))
			return;
		const { left, top } = e.target.getBoundingClientRect();
		aim(e.clientX - left, e.clientY - top);
	});
	confirm.addEventListener('click', turn);
	restart.addEventListener('click', init);
	setTimeout(init, 0);
});