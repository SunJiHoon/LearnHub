import { downsample, toRedMatrix, updateIntensityMatrix, updateNumberMatrix } from "../../lib/image";

document.addEventListener('DOMContentLoaded', () => {
	const
		canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		clearBtn = document.getElementById('clear'),
		convertBtn = document.getElementById('convert'),
		grid = document.getElementById('matrix'),
		toggle = document.getElementById('toggle');

	let
		drawing = false,
		numberMatrix = false,
		matrix = [...Array(15)].map(() => Array(15).fill(255));

	function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	function draw(x1, y1, x2, y2) {
		if(!drawing)
			return;

		ctx.strokeStyle = 'black';
		ctx.lineWidth = 20; // 선 두께를 증가시킴
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	function updateMatrix() {
		numberMatrix
			? updateNumberMatrix(grid, matrix)
			: updateIntensityMatrix(grid, matrix);
	}

	canvas.addEventListener('mousedown', e => {
		drawing = true;

		const
			{ left, top } = canvas.getBoundingClientRect(),
			x = e.clientX - left,
			y = e.clientY - top;
		draw(x, y, x, y);
	});
	canvas.addEventListener('mousemove', e => {
		const
			{ left, top } = canvas.getBoundingClientRect(),
			x = e.clientX - left,
			y = e.clientY - top;
		draw(x - e.movementX, y - e.movementY, x, y);
	});
	canvas.addEventListener('mouseup', () => {
		drawing = false;
	});

	clearBtn.addEventListener('click', clear);
	convertBtn.addEventListener('click', () => {
		matrix = toRedMatrix(downsample(canvas, 15, 15));
		updateMatrix();
	});

	toggle.addEventListener('click', () => {
		numberMatrix = !numberMatrix;
		toggle.textContent = numberMatrix ? '색 보기' : '값 보기';
		updateMatrix();
	});

	clear();
	updateMatrix();
});
