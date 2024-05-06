document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    // 각 문장과 해당하는 감정 값
    var emotions = [
        { sentence: "미워", value: -0.8 },
        { sentence: "사랑해", value: 0.8 },
        { sentence: "고마워", value: 0.7 }
    ];

    // 그래프의 가로 및 세로 크기
    // var graphWidth = canvas.width - 40;
    // var graphHeight = canvas.height - 40;

    var midX = canvas.width / 2;
    var midY = canvas.height / 2;


    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();


    for(var i=0; i < emotions.length; i++){

        ctx.beginPath();
        ctx.moveTo(midX, midY + 10 * i);
        // console.log(emotions[i].value);
        var x = midX + emotions[i].value * 100;
        ctx.lineTo(x, midY + 10 * i);
        ctx.font = "14px Arial"; // 글자 크기 변경
        ctx.fillText(emotions[i].sentence, x, midY + 10 * i);
        ctx.fillText(emotions[i].value, x - 30, midY + 10 * i);


        if (emotions[i].value >=0){
            //화살표 그리기
            ctx.moveTo(x, midY + 10 * i);
            ctx.lineTo(x - 5, midY + 5 + 10 * i);
            ctx.lineTo(x - 5, midY - 5 + 10 * i);
            ctx.closePath();
        }
        else{
            //화살표 그리기
            ctx.moveTo(x, midY + 10 * i);
            ctx.lineTo(x + 5, midY + 5 + 10 * i);
            ctx.lineTo(x + 5, midY - 5 + 10 * i);
            ctx.closePath();
        }

        // ctx.strokeStyle = "blue";
        // 랜덤한 색상 선택
        var randomColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        // ctx.fillStyle = randomColor;
        // ctx.fill();
        ctx.strokeStyle = randomColor;
        ctx.stroke();

    }
});

///////////////////////////////////////////////////////////////////////////
var canvas2 = document.getElementById('myCanvas2');
var ctx = canvas2.getContext('2d');

// 좌표 설정
var points = [
    { sentence: "미워", x: -0.8, y: -0.9 },
    { sentence: "사랑해", x: 0.8, y: 0.3 },
    { sentence: "고마워", x: 0.7, y: 0.8 }
];

function drawPoints() {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);

    ctx.beginPath();
    ctx.moveTo(canvas2.width / 2, 0);
    ctx.lineTo(canvas2.width / 2, canvas2.height);
    ctx.moveTo(0, canvas2.height / 2);
    ctx.lineTo(canvas2.width, canvas2.height / 2);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    points.forEach(function(point) {
        drawPoint(point.x, point.y, 'blue');
        drawSentence(point.sentence, point.x, point.y);
        drawArrow(point.x, point.y); // 화살표 그리기
    });
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc((x + 1) * canvas2.width / 2, (1 - y) * canvas2.height / 2, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawSentence(sentence, x, y) {
    ctx.fillStyle = 'black';
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(sentence, (x + 1) * canvas2.width / 2, (1 - y) * canvas2.height / 2 - 10);
    ctx.fillText(" (" + x + ", " + y + ")", (x + 1) * canvas2.width / 2, (1 - y) * canvas2.height / 2 - 0);
}

function drawArrow(x, y) {
    var endX = (x + 1) * canvas2.width / 2;
    var endY =  (1 - y) * canvas2.height / 2;
    var startX = canvas2.width / 2;
    var startY = canvas2.height / 2;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
}

drawPoints();


////////////////////////////////////////
//canvas3
var canvas3 = document.getElementById('myCanvas3');
var ctx3 = canvas3.getContext('2d');

// 좌표 설정
var points3 = [
    { inputSequence : 1, sentence: "미워", x: -0.8, y: -0.9 },
    { inputSequence : 2, sentence: "고마워", x: 0.8, y: 0.3 },
    { inputSequence : 3, sentence: "사랑해", x: 0.7, y: 0.8 }
];

function drawPoints3() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    ctx3.beginPath();
    ctx3.moveTo(canvas3.width / 2, 0);
    ctx3.lineTo(canvas3.width / 2, canvas3.height);
    ctx3.moveTo(0, canvas3.height / 2);
    ctx3.lineTo(canvas3.width, canvas3.height / 2);
    ctx3.strokeStyle = 'black';
    ctx3.stroke();

    points3.forEach(function(point) {
        drawPoint3(point.x, point.y, 'blue');
        drawSentence3(point.inputSequence, point.sentence, point.x, point.y);
        drawArrow3(point.x, point.y); // 화살표 그리기
    });
}

function drawPoint3(x, y, color) {
    ctx3.beginPath();
    ctx3.arc((x + 1) * canvas3.width / 2, (1 - y) * canvas3.height / 2, 5, 0, 2 * Math.PI);
    ctx3.fillStyle = color;
    ctx3.fill();
}

function drawSentence3(inputSequence, sentence, x, y) {
    ctx3.fillStyle = 'black';
    ctx3.font = "14px Arial";
    ctx3.textAlign = "center";
    ctx3.fillText("입력" + inputSequence, (x + 1) * canvas3.width / 2, (1 - y) * canvas3.height / 2 - 25);
    ctx3.fillText(sentence, (x + 1) * canvas3.width / 2, (1 - y) * canvas3.height / 2 - 10);
    ctx3.fillText(" (" + x + ", " + y + ")", (x + 1) * canvas3.width / 2, (1 - y) * canvas3.height / 2 - 0);
}

function drawArrow3(x, y) {
    var endX = (x + 1) * canvas3.width / 2;
    var endY =  (1 - y) * canvas3.height / 2;
    var startX = canvas3.width / 2;
    var startY = canvas3.height / 2;

    ctx3.beginPath();
    ctx3.moveTo(startX, startY);
    ctx3.lineTo(endX, endY);
    ctx3.stroke();
    ctx3.closePath();
}

// 슬라이더 변경 이벤트 처리
var input1_x = document.getElementById('input1_x');
var input2_x = document.getElementById('input2_x');
var input3_x = document.getElementById('input3_x');

// 슬라이더 변경 이벤트 처리
var input1_y = document.getElementById('input1_y');
var input2_y = document.getElementById('input2_y');
var input3_y = document.getElementById('input3_y');

input1_x.addEventListener('input', function() {
    points3[0].x = parseFloat(this.value);
    console.log(points3)
    drawPoints3();
});

input2_x.addEventListener('input', function() {
    points3[1].x = parseFloat(this.value);
    drawPoints3();
});

input3_x.addEventListener('input', function() {
    points3[2].x = parseFloat(this.value);
    drawPoints3();
});

input1_y.addEventListener('input', function() {
    points3[0].y = parseFloat(this.value);
    // console.log(points3)
    drawPoints3();
});

input2_y.addEventListener('input', function() {
    points3[1].y = parseFloat(this.value);
    drawPoints3();
});

input3_y.addEventListener('input', function() {
    points3[2].y = parseFloat(this.value);
    drawPoints3();
});

var input1_sentence = document.getElementById('input1_sentence');
var input2_sentence = document.getElementById('input2_sentence');
var input3_sentence = document.getElementById('input3_sentence');
input1_sentence.addEventListener('input', function() {
    points3[0].sentence = this.value;
    drawPoints3();
});
input2_sentence.addEventListener('input', function() {
    points3[1].sentence = this.value;
    drawPoints3();
});
input3_sentence.addEventListener('input', function() {
    points3[2].sentence = this.value;
    drawPoints3();
});



drawPoints3();