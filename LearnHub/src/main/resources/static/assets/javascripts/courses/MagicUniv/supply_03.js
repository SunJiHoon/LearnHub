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


// // X축에 대한 문장 출력
// for (var i = 0; i < emotions.length; i++) {
//     var x = (i + 1) * (graphWidth / (emotions.length + 1)) + 20;
//     var y = canvas.height - 10;
//     ctx.fillText(emotions[i].sentence, x, y);
// }

// // Y축에 대한 감정 값 출력
// for (var i = -1; i <= 1; i += 0.1) {
//     var x = 10;
//     var y = graphHeight - (i * graphHeight / 2) + 20;
//     ctx.fillText(i.toFixed(1), 5, y);
// }

// 각 문장의 감정 값에 따라 선 그리기
// ctx.beginPath();
// ctx.moveTo((1) * (graphWidth / (emotions.length + 1)) + 20, graphHeight - (emotions[0].value * graphHeight / 2) + 20);
// for (var i = 1; i < emotions.length; i++) {
//     var x = (i + 1) * (graphWidth / (emotions.length + 1)) + 20;
//     // var y = graphHeight - (emotions[i].value * graphHeight / 2) + 20;
//     ctx.lineTo(x, y);
// }
