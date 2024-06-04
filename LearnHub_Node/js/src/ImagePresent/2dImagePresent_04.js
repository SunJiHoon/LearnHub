import { downsample, toColorMatrix, updateColorMatrix, updateBlueMatrix, updateGreenMatrix, updateRedMatrix, updateNumberMatrix } from "../../lib/image";

document.addEventListener('DOMContentLoaded', () => {
	const
		canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		colorPicker = document.getElementById('colorPicker'),
		colorPickerLabel = document.getElementById('colorPickerLabel'),
		clearBtn = document.getElementById('clear'),
		convertBtn = document.getElementById('convert'),
		grid = document.getElementById('matrix'),
		gridR = document.getElementById('redMatrix'),
		gridG = document.getElementById('greenMatrix'),
		gridB = document.getElementById('blueMatrix'),
		toggle = document.getElementById('toggle');

	let
		drawing = false,
		color = '#000000',
		numberMatrix = false,
		matrix = [...Array(15)].map(() => Array(15).fill(0xffffff));

	function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	function draw(x1, y1, x2, y2) {
		if(!drawing)
			return;

		ctx.strokeStyle = color;
		ctx.lineWidth = 20; // 선 두께를 증가시킴
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	function updateMatrix() {
		updateColorMatrix(grid, matrix);
		(numberMatrix ? updateNumberMatrix : updateRedMatrix)(
			gridR,
			matrix.map(row => row.map(x => x >> 16 & 0xff))
		);
		(numberMatrix ? updateNumberMatrix : updateGreenMatrix)(
			gridG,
			matrix.map(row => row.map(x => x >> 8 & 0xff))
		);
		(numberMatrix ? updateNumberMatrix : updateBlueMatrix)(
			gridB,
			matrix.map(row => row.map(x => x & 0xff))
		);
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

	colorPicker.addEventListener('input', () => {
		color = colorPickerLabel.style.backgroundColor = colorPicker.value;
	});
	clearBtn.addEventListener('click', clear);
	convertBtn.addEventListener('click', () => {
		matrix = toColorMatrix(downsample(canvas, 15, 15));
		updateMatrix();
	});

	toggle.addEventListener('click', () => {
		numberMatrix = !numberMatrix;
		toggle.textContent = numberMatrix ? '색 보기' : '값 보기';
		updateMatrix();
	});

	clear();
	colorPickerLabel.style.backgroundColor = colorPicker.value;
	updateMatrix();
});
