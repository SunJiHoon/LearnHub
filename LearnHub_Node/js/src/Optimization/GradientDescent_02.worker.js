import { newNoise, wrap } from './GradientDescent_noise_adapter';

async function plot(width, height, noise, cancel) {
	const data = new ImageData(width, height);
	for(let y = 0; y < height; y++)
		for(let x = 0; x < width; x++) {
			if(cancel.value)
				throw undefined;
			const z = Math.floor(256*wrap(noise(x/width, y/height)()));
			data.data[4*(width*y + x)] = z;
			data.data[4*(width*y + x) + 1] = 0;
			data.data[4*(width*y + x) + 2] = 255 - z;
			data.data[4*(width*y + x) + 3] = 255;
			// 강제 휴식
			await undefined;
		}
	return data;
}

let cancelPrevious = () => {};

addEventListener('message', e => {
	// 이전 작업 중단
	let cancel = { value: false };
	cancelPrevious();
	cancelPrevious = () => cancel.value = true;

	const { width, height, seed } = e.data;
	plot(width, height, newNoise(seed), cancel).then(data =>
		postMessage(data, [ data.data.buffer ])
	);
});
