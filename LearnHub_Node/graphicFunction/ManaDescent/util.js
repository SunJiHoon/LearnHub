import Alea from 'alea';

export function zip(...arrs) {
	return [...Array(Math.min(...arrs.map(arr => arr.length)))].map((_, i) => arrs.map(arr => arr[i]));
}
export function sum(xs) {
	return xs.reduce((acc, x) => acc + x, 0);
}

export function sigmoid(x) {
	return 1/(1 + Math.exp(-x));
}
export function normdist(alea = new Alea()) {
	let u1, u2;
	do u1 = alea();
	while(u1 == 0);
	do u2 = alea();
	while(u2 == 0);
	const
		a = Math.sqrt(-2*Math.log(u1)),
		b = 2*Math.PI*u2;
	return [a*Math.cos(b), a*Math.sin(b)];
}
