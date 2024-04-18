import Alea from 'alea';
import { newNoise2d, newNoise3d, newNoise4d } from './noise.js';
import { zip, sum, sigmoid, normdist } from './util.js';

const
	OCTAVE_MP = 1.25,
	OCTAVE = 1,
	OCTAVE_BASE = 2,
	BORDER_SIZE = 32,
	MAP_SIZE = 400,
	WINDOW_SIZE = 32;

const alea = new Alea();

function drawArrow(ctx, x, y, w, h) {
	const
		angle = Math.atan2(h, w),
		tipSize = Math.min(10, Math.hypot(w, h)/3);
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + w, y + h);
	ctx.moveTo(x + w - tipSize*Math.cos(angle + Math.PI/6), y + h - tipSize*Math.sin(angle + Math.PI/6));
	ctx.lineTo(x + w, y + h);
	ctx.lineTo(x + w - tipSize*Math.cos(angle - Math.PI/6), y + h - tipSize*Math.sin(angle - Math.PI/6));
	ctx.stroke();
}
function rawToGauge(x) {
	return sigmoid(8*x);
}
function gaugeToColor(x, alpha = 1) {
	return `rgba(${255*x} 0 ${255*(1 - x)} / ${alpha})`;
}

function zipSum(arrs) {
	return zip(...arrs).map(sum);
}
function noiseMap2d() {
	const noises = [...Array(OCTAVE)].map(x => newNoise2d());
	return (x, y) => zipSum(noises.map((f, i) => {
		const mp = OCTAVE_BASE*OCTAVE_MP**i;
		return f(mp*(x - 0.5), mp*(y - 0.5)).map(x => x/mp);
	}));
}
function noiseMap3d() {
	const noises = [...Array(OCTAVE)].map(x => newNoise3d());
	return (x, y, z) => zipSum(noises.map((f, i) => {
		const mp = OCTAVE_BASE*OCTAVE_MP**i;
		return f(mp*(x - 0.5), mp*(y - 0.5), mp*(z - 0.5)).map(x => x/mp);
	}));
}
function noiseMap4d() {
	const noises = [...Array(OCTAVE)].map(x => newNoise4d());
	return (x, y, z, w) => zipSum(noises.map((f, i) => {
		const mp = OCTAVE_BASE*OCTAVE_MP**i;
		return f(mp*(x - 0.5), mp*(y - 0.5), mp*(z - 0.5), mp*(w - 0.5)).map(x => x/mp);
	}));
}

document.addEventListener('DOMContentLoaded', () => {
	const
		button2d = document.getElementById('2d'),
		button3d = document.getElementById('3d'),
		button4d = document.getElementById('4d'),
		buttonConfirm = document.getElementById('confirm'),
		buttonRestart = document.getElementById('restart'),
		promptDim = document.getElementById('prompt-dim'),
		hint2d = document.getElementById('hint-2d'),
		hint3d = document.getElementById('hint-3d'),
		hint4d = document.getElementById('hint-4d'),
		canv = document.getElementById('canvas'),
		ctx = canv.getContext('2d'),
		sliders = [
			document.getElementById('axis-x'),
			document.getElementById('axis-y'),
			document.getElementById('axis-z'),
			document.getElementById('axis-w'),
		],
		status = document.getElementById('status'),
		sliderHeight = sliders[0].getBoundingClientRect().height;

	function toMapCoord(x, y) {
		return [BORDER_SIZE + MAP_SIZE*x, BORDER_SIZE + MAP_SIZE*y];
	}
	function toWindowCoord(dim, x, y = 0.5) {
		return [
			BORDER_SIZE + MAP_SIZE*x,
			BORDER_SIZE + (game.state.dim == 2 ? MAP_SIZE : 0) + dim*(WINDOW_SIZE + sliderHeight) + y*WINDOW_SIZE,
		];
	}

	let game;
	function init(dim) {
		game = {
			state: {
				dim,
				noise: dim == 2
					? noiseMap2d()
				: dim == 3
					? noiseMap3d()
					: noiseMap4d(),
				history: [],
			},
			index: null,
			particles: [],
			turns: [],
			result: undefined,
		};

		promptDim.textContent = dim;
		hint2d.style.display = dim == 2 ? '' : 'none';
		hint3d.style.display = dim == 3 ? '' : 'none';
		hint4d.style.display = dim == 4 ? '' : 'none';

		canv.width = MAP_SIZE + 2*BORDER_SIZE;
		canv.height = (dim == 2 ? MAP_SIZE : 0) + (WINDOW_SIZE + sliderHeight)*dim + 2*BORDER_SIZE;
		for(const [i, slider] of sliders.entries()) {
			const [x, y] = toWindowCoord(i, 0, 1);
			slider.style.display = dim >= i + 1 ? '' : 'none';
			slider.style.left = `${x}px`;
			slider.style.top = `${y}px`;
			slider.value = Math.random();
			slider.disabled = false;
		}

		while(status.firstChild)
			status.lastChild.remove();
		for(let i = 0; i < 10; i++) {
			const turn = document.createElement('div');
			turn.className = 'turn';
			status.append(turn);
			game.turns.push(turn);
		}
		buttonConfirm.textContent = '측정';
		buttonConfirm.disabled = false;
	}
	function measure() {
		function spawn(n, x, y, ax, ay, gauge) {
			for(let i = 0; i < n; i++) {
				const
					[dvx, dvy] = normdist(alea),
					[dax, day] = normdist(alea);
				game.particles.push({
					life: 180,
					time: 0,
					x, y,
					vx: dvx/256,
					vy: dvy/256,
					ax: ax + dax/2048,
					ay: ay + day/2048,
					gauge,
				});
			}
		}
		const
			turnNumber = game.state.history.length,
			pos = sliders.map(x => x.valueAsNumber),
			[value, ...deriv] = game.state.noise(...pos),
			gauge = rawToGauge(value);
		game.state.history.push({ pos, value, deriv });
		if(game.state.dim == 2) {
			const [x, y] = toMapCoord(pos[0], pos[1]);
			spawn(
				16,
				x, y,
				-deriv[0]/48, -deriv[1]/48,
				gauge
			);
		}
		for(let i = 0; i < game.state.dim; i++) {
			const [x, y] = toWindowCoord(i, pos[i]);
			spawn(
				8,
				x, y,
				-deriv[i]/48, 0,
				gauge
			);
		}

		const turn = game.turns[turnNumber];
		turn.classList.add('taken');
		turn.style.color = gaugeToColor(gauge);
		turn.addEventListener('mouseenter', () => game.index = turnNumber);
		turn.addEventListener('mouseleave', () => game.index = null);
		if(turnNumber == 9)
			buttonConfirm.textContent = '확정';
	}
	function confirm() {
		for(const slider of sliders)
			slider.disabled = true;
		buttonConfirm.disabled = true;

		game.result = [];
		for(let i = 0; i < game.state.dim; i++) {
			const
				slice = [],
				coord = sliders.map(x => x.valueAsNumber);
			for(let j = 0; j < MAP_SIZE; j++) {
				coord[i] = j/MAP_SIZE;
				slice.push(game.state.noise(...coord)[0]);
			}
			const
				min = slice.reduce((acc, x) => Math.min(acc, x), Infinity),
				max = slice.reduce((acc, x) => Math.max(acc, x), -Infinity);
			game.result.push({ slice, min, max });
		}
	}
	function updateCanvas() {
		const newParticles = [];
		for(const x of game.particles) {
			if(++x.time == x.life)
				continue;
			x.x += x.vx;
			x.y += x.vy;
			x.vx += x.ax;
			x.vy += x.ay;
			newParticles.push(x);
		}
		game.particles = newParticles;

		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.lineWidth = 2;

		// result
		if(game.result !== undefined) {
			if(game.state.dim == 2) {
				const
					x = sliders[0].valueAsNumber,
					y = sliders[1].valueAsNumber;

				const gradientX = ctx.createLinearGradient(
					...toMapCoord(0, y),
					...toMapCoord(1, y)
				);
				for(const [j, z] of game.result[0].slice.entries())
					gradientX.addColorStop(j/MAP_SIZE, gaugeToColor(rawToGauge(z)));
				ctx.strokeStyle = gradientX;
				ctx.beginPath();
				ctx.moveTo(...toMapCoord(0, y));
				ctx.lineTo(...toMapCoord(1, y));
				ctx.stroke();

				const gradientY = ctx.createLinearGradient(
					...toMapCoord(x, 0),
					...toMapCoord(x, 1)
				);
				for(const [j, z] of game.result[1].slice.entries())
					gradientY.addColorStop(j/MAP_SIZE, gaugeToColor(rawToGauge(z)));
				ctx.strokeStyle = gradientY;
				ctx.beginPath();
				ctx.moveTo(...toMapCoord(x, 0));
				ctx.lineTo(...toMapCoord(x, 1));
				ctx.stroke();
			}
			for(const [i, { slice, min, max }] of game.result.entries()) {
				const gradient = ctx.createLinearGradient(
					...toWindowCoord(i, 0, 1),
					...toWindowCoord(i, 0, 0)
				);
				for(let i = 0; i <= WINDOW_SIZE; i++) {
					const ratio = i/WINDOW_SIZE;
					gradient.addColorStop(ratio, gaugeToColor(rawToGauge(min + ratio*(max - min))));
				}
				ctx.strokeStyle = gradient;
				ctx.beginPath();
				for(const [j, x] of slice.entries()) {
					const coord = toWindowCoord(
						i,
						j/MAP_SIZE, 1 - (x - min)/(max - min)
					);
					if(j == 0)
						ctx.moveTo(...coord);
					else
						ctx.lineTo(...coord);
				}
				ctx.stroke();
			}
		}

		// position marker
		ctx.strokeStyle = 'black';
		if(game.state.dim == 2) {
			const [x, y] = toMapCoord(sliders[0].valueAsNumber, sliders[1].valueAsNumber);
			ctx.beginPath();
			ctx.arc(
				x, y,
				8,
				0, 2*Math.PI
			);
			ctx.stroke();
		}
		for(let i = 0; i < game.state.dim; i++) {
			const [x, y] = toWindowCoord(i, sliders[i].valueAsNumber);
			ctx.beginPath();
			ctx.moveTo(x, y - 4);
			ctx.lineTo(x, y + 4);
			ctx.stroke();
		}

		// arrow
		if(game.state.history.length > 0) {
			const
				turnNumber = game.index ?? game.state.history.length - 1,
				entry = game.state.history[turnNumber];
			ctx.strokeStyle = gaugeToColor(sigmoid(8*entry.value));
			if(game.state.dim == 2) {
				const [x, y] = toMapCoord(entry.pos[0], entry.pos[1]);
				drawArrow(ctx,
					x, y,
					-64*entry.deriv[0],
					-64*entry.deriv[1]
				);
			}
			for(let i = 0; i < game.state.dim; i++) {
				const [x, y] = toWindowCoord(i, entry.pos[i]);
				drawArrow(ctx,
					x, y,
					-64*entry.deriv[i], 0
				);
			}
		}

		// particles
		for(const x of game.particles) {
			ctx.fillStyle = gaugeToColor(x.gauge, 1 - x.time/x.life);
			ctx.fillRect(Math.round(x.x) - 1, Math.round(x.y) - 1, 3, 3);
		}

		requestAnimationFrame(updateCanvas);
	}

	button2d.addEventListener('click', () => init(2));
	button3d.addEventListener('click', () => init(3));
	button4d.addEventListener('click', () => init(4));
	buttonConfirm.addEventListener('click', () => game.state.history.length == 10
		? confirm()
		: measure()
	);
	buttonRestart.addEventListener('click', () => init(game.state.dim));

	init(2);
	updateCanvas();
});
