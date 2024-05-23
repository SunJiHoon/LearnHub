function add_raw(xs) {
	return xs.reduce((acc, x) => acc + x, 0);
}
function mul_raw(xs) {
	return xs.reduce((acc, x) => acc*x, 1);
}

export function constant(x) {
	return delta => delta ? 0 : x;
}
export function variable(name, value) {
	return delta => delta
		? delta?.[name] ?? 0
		: value;
}
export function scale(k, x) {
	return delta => k*(delta ? x(delta) : x());
}
export function add(...xs) {
	return delta => add_raw(
		xs.map(x => delta ? x(delta) : x())
	)
}
export function mul(...xs) {
	return delta => delta
		? add_raw(
			xs.map((_, i) => mul_raw(
				xs.map((x, j) =>
					i == j
						? x(delta)
						: x()
				)
			))
		)
		: mul_raw(xs.map(x => x()));
}
