import { nanoid } from "nanoid";
import { normal_distribution } from "../../lib/math";
import { drawArrow } from "../../lib/draw";
import { newNoise, wrap, SCALE } from "./GradientDescent_noise_adapter";

import Worker from './GradientDescent_02.worker?worker';

function newGame(width, height) {
	const noise = newNoise();
	return {
		noise,
		map: undefined,
		attempts: [],
		x: Math.random(),
		y: Math.random(),
		result: null,
		particles: [],
	};
}

document.addEventListener('DOMContentLoaded', () => {
	const
		canvas = document.getElementById('mana-descent'),
		ctx = canvas.getContext('2d'),
		confirm = document.getElementById('confirm'),
		restart = document.getElementById('restart');

	let
		worker = new Worker(),
		cancelPreviousPlot = () => {},
		minigame = null,
		rerun = false,
		t = null;
	function plot(width, height, seed) {
		let cancelled = false;
		cancelPreviousPlot();
		cancelPreviousPlot = () => cancelled = false;

		worker.postMessage({ width, height, seed });
		return new Promise(resolve =>
			worker.addEventListener('message', function f(e) {
				try {
					if(cancelled)
						return;

					const
						canv = document.createElement('canvas'),
						ctx = canv.getContext('2d');
					canv.width = width;
					canv.height = height;
					ctx.putImageData(e.data, 0, 0);
					resolve(canv);
				} finally {
					worker.removeEventListener('message', f);
				}
			})
		);
	}
	function aim(cx, cy) {
		if(minigame.result)
			return;
		minigame.x = cx/canvas.width;
		minigame.y = cy/canvas.height;
		queueRedraw();
	}
	function turn() {
		if(minigame.attempts.length == 10) {
			minigame.result = [minigame.x, minigame.y, minigame.noise(minigame.x, minigame.y)()];
			confirm.disabled = true;
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
		plot(canvas.width, canvas.height, nanoid()).then(x => {
			minigame.map = x;
			queueRedraw();
		});
		confirm.textContent = '1개째 터뜨리기';
		confirm.disabled = false;
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
				if(minigame.map)
					ctx.drawImage(minigame.map, 0, 0);
				else {
					ctx.fillStyle = 'black';
					ctx.font = '24px Arial';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'bottom';
					ctx.textBaseline = 'top';
					ctx.fillText('그래프 그리는 중', canvas.width/2, canvas.height/2 - 16);
					ctx.font = '16px Arial';
					ctx.fillText('잠시만 기다려 주세요.', canvas.width/2, canvas.height/2 + 16);
				}
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
	init();
});