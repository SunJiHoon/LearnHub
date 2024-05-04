// Canvas 요소 가져오기
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// 그래프 그리기
var startX = 0;
var startY = canvas.height / 2;
var scale = 40; // x, y 축의 스케일

ctx.beginPath();
ctx.moveTo(startX, startY);

for (var x = 0; x < canvas.width; x++) {
    var y = Math.sin((x - canvas.width / 2) / scale) * scale + canvas.height / 2;
    ctx.lineTo(x, y);
}

ctx.strokeStyle = 'blue';
ctx.stroke();