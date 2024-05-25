export function normal_distribution() {
	let u1, u2;
	do u1 = Math.random(); while(u1 == 0);
	do u2 = Math.random(); while(u2 == 0);
	return Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
}

export function sigmoid(x) {
	return 1/(1 + Math.exp(-x));
}

export function lerp(zero, one, x) {
	return zero + x*(one - zero);
}
