var canvas1 = document.getElementById('myCanvas1');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('myCanvas2');
var ctx2 = canvas2.getContext('2d');
var canvas3 = document.getElementById('myCanvas3');
var ctx3 = canvas3.getContext('2d');
var canvas4 = document.getElementById('myCanvas4');
var ctx4 = canvas4.getContext('2d');

function drawGraph(dividor, power1, canvas, ctx) {
    var startX = 0;
    var startY = canvas.height / 2;
    scale = 40

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    for (var x = 0; x < canvas.width; x++) {
        // var y = (power1/10) * Math.sin((x - canvas.width / dividor) / scale) * scale + canvas.height / 2;
        var y = -1 * (power1/10) * Math.sin((x * dividor)) * scale + canvas.height / 2;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

function drawFinalGraph(dividor1, dividor2, dividor3, power1, power2, power3, canvas, ctx) {
    var startX = 0;
    var startY = canvas.height / 2;
    scale = 40

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    for (var x = 0; x < canvas.width; x++) {
        // var y = (power1/10) * Math.sin((x - canvas.width / dividor) / scale) * scale + canvas.height / 2;
        var y = canvas.height / 2;
        y += -1 * (power1/10) * Math.sin((x * dividor1)) * scale;
        y += -1 * (power2/10) * Math.sin((x * dividor2)) * scale;
        y += -1 * (power3/10) * Math.sin((x * dividor3)) * scale;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

// 슬라이더 값 변경 이벤트 처리
var scaleSlider1 = document.getElementById('scaleSlider1');
var scaleSlider2 = document.getElementById('scaleSlider2');
var scaleSlider3 = document.getElementById('scaleSlider3');
// var scaleSlider4 = document.getElementById('scaleSlider4');

scaleSlider1.addEventListener('input', function() {
    var power1 = parseInt(this.value); // 슬라이더 값 가져오기
    drawGraph(0.08, power1, canvas1, ctx1); // 그래프 다시 그리기
    drawFinalGraph(0.08,0.16,0.35, parseInt(scaleSlider1.value), parseInt(scaleSlider2.value), parseInt(scaleSlider3.value), canvas4, ctx4)
});
scaleSlider2.addEventListener('input', function() {
    var power1 = parseInt(this.value); // 슬라이더 값 가져오기
    drawGraph(0.16, power1, canvas2, ctx2); // 그래프 다시 그리기
    drawFinalGraph(0.08,0.16,0.35, parseInt(scaleSlider1.value), parseInt(scaleSlider2.value), parseInt(scaleSlider3.value), canvas4, ctx4)
});
scaleSlider3.addEventListener('input', function() {
    var power1 = parseInt(this.value); // 슬라이더 값 가져오기
    drawGraph(0.32, power1, canvas3, ctx3); // 그래프 다시 그리기
    drawFinalGraph(0.08,0.16,0.35, parseInt(scaleSlider1.value), parseInt(scaleSlider2.value), parseInt(scaleSlider3.value), canvas4, ctx4)
});

// 초기 그래프 그리기
drawGraph(0.08, parseInt(scaleSlider1.value), canvas1, ctx1);
drawGraph(0.16, parseInt(scaleSlider2.value), canvas2, ctx2);
drawGraph(0.32, parseInt(scaleSlider3.value), canvas3, ctx3);
drawFinalGraph(0.08,0.16,0.35, parseInt(scaleSlider1.value), parseInt(scaleSlider2.value), parseInt(scaleSlider3.value), canvas4, ctx4)