export function downsample(canv, width, height) {
	const
		dCanv = document.createElement('canvas'),
		dCtx = dCanv.getContext('2d');
	dCanv.width = width;
	dCanv.height = height;
	dCtx.drawImage(canv, 0, 0, width, height);
	return dCtx;
}

export function imageToMatrix(ctx, fn) {
	const
		width = ctx.canvas.width,
		data = ctx.getImageData(0, 0, width, ctx.canvas.height).data,
		result = [];
	for(let y = 0; y < ctx.canvas.height; y++) {
		const row = [];
		for(let x = 0; x < width; x++)
			row.push(fn(
				data[4*(width*y + x)],
				data[4*(width*y + x) + 1],
				data[4*(width*y + x) + 2],
				data[4*(width*y + x) + 3],
			));
		result.push(row);
	}
	return result;
}
export function toColorMatrix(ctx) {
	return imageToMatrix(ctx, (r, g, b, a) => r << 16 | g << 8 | b);
}
export function toRedMatrix(ctx) {
	return imageToMatrix(ctx, (r, g, b, a) => r);
}
export function toGreenMatrix(ctx) {
	return imageToMatrix(ctx, (r, g, b, a) => g);
}
export function toBlueMatrix(ctx) {
	return imageToMatrix(ctx, (r, g, b, a) => b);
}
export function toAlphaMatrix(ctx) {
	return imageToMatrix(ctx, (r, g, b, a) => a);
}

export function updateMatrix(grid, matrix, fn) {
	grid.style.gridTemplateColumns = `repeat(${matrix[0].length}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${matrix.length}, 1fr)`;
	grid.replaceChildren(...matrix.flatMap(row => row.map(fn)));
}
export function updateIntensityMatrix(grid, matrix) {
	updateMatrix(
		grid, matrix,
		cell => {
			const div = document.createElement('div');
			div.style.backgroundColor = `rgba(${cell} ${cell} ${cell})`;
			return div;
		}
	);
}
export function updateIntensityAndNumberMatrix(grid, matrix) {
	updateMatrix(
		grid, matrix,
		cell => {
			const div = document.createElement('div');
			div.style.backgroundColor = `rgba(${cell} ${cell} ${cell})`;
			if(cell < 128)
				div.style.color = 'white';
			div.textContent = cell;
			return div;
		}
	);
}
export function updateColorMatrix(grid, matrix) {
	updateMatrix(
		grid, matrix,
		cell => {
			const div = document.createElement('div');
			div.style.backgroundColor = `rgba(${cell >> 16 & 0xff} ${cell >> 8 & 0xff} ${cell & 0xff})`;
			return div;
		}
	);
}
export function updateRedMatrix(grid, matrix) {
	updateMatrix(
		grid, matrix,
		cell => {
			const div = document.createElement('div');
			div.style.backgroundColor = `rgba(${cell} 0 0)`;
			return div;
		}
	);
}
export function updateGreenMatrix(grid, matrix) {
	updateMatrix(
		grid, matrix,
		cell => {
			const div = document.createElement('div');
			div.style.backgroundColor = `rgba(0 ${cell} 0)`;
			return div;
		}
	);
}
export function updateBlueMatrix(grid, matrix) {
	updateMatrix(
		grid, matrix,
		cell => {
			const div = document.createElement('div');
			div.style.backgroundColor = `rgba(0 0 ${cell})`;
			return div;
		}
	);
}
export function updateNumberMatrix(grid, matrix) {
	updateMatrix(
		grid, matrix,
		cell => {
			const div = document.createElement('div');
			div.textContent = cell;
			return div;
		}
	);
}
