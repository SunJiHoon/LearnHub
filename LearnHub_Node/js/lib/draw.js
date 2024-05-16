export function drawArrow(ctx, x1, y1, x2, y2, tipSize) {
	const
		dx = x2 - x1,
		dy = y2 - y1,
		theta = Math.atan2(dy, dx),
		// stroke 길이에서 화살표 끝을 제외시키기
		lengthDeduction = tipSize*Math.cos(Math.PI/6),
		length = Math.hypot(dx, dy),
		newLength = length - lengthDeduction,
		TIP_ANGLE = 5/6*Math.PI;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1 + newLength*Math.cos(theta), y1 + newLength*Math.sin(theta));
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x2, y2);
	ctx.lineTo(x2 + tipSize*Math.cos(theta + TIP_ANGLE), y2 + tipSize*Math.sin(theta + TIP_ANGLE));
	ctx.lineTo(x2 + tipSize*Math.cos(theta - TIP_ANGLE), y2 + tipSize*Math.sin(theta - TIP_ANGLE));
	ctx.fill();
}

export function randomColor() {
	return `rgb(${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())})`;
}
