import { drawArrow, randomColor } from "../../lib/draw";

const WORD2VEC = [
    { key: '미워', x: -0.8, y: -0.9, color: randomColor() },
    { key: '사랑해', x: 0.8, y: 0.3, color: randomColor() },
    { key: '고마워', x: 0.7, y: 0.8, color: randomColor() },
];

function drawVec1d() {
    const
        canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d');

    const
        midX = canvas.width/2,
        midY = canvas.height/2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, canvas.height);
    ctx.stroke();

    ctx.font = '16px Arial';
    ctx.textBaseline = 'middle';
    for(let i = 0; i < WORD2VEC.length; i++){
        const
            canvX = midX + 100*WORD2VEC[i].x,
            canvY = midY + 16*(i - (WORD2VEC.length - 1)/2);

        ctx.fillStyle = ctx.strokeStyle = WORD2VEC[i].color;
        drawArrow(ctx, midX, canvY, canvX, canvY, 10);

        ctx.fillStyle = 'black';
        const alignRight = WORD2VEC[i].x < 0;
        ctx.textAlign = alignRight ? 'right' : 'left';
        ctx.fillText(`${WORD2VEC[i].key} ${WORD2VEC[i].x}`, canvX + (alignRight ? -4 : 4), canvY);
    }
}

function drawVec2d(w2v, canvas) {
    const ctx = canvas.getContext('2d');

    const
        midX = canvas.width/2,
        midY = canvas.height/2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, canvas.height);
    ctx.moveTo(0, midY);
    ctx.lineTo(canvas.width, midY);
    ctx.stroke();

    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    for(const { key, x, y, color } of w2v) {
        const
            canvX = (x + 1)/2*canvas.width,
            canvY = (1 - y)/2*canvas.height;

        ctx.fillStyle = ctx.strokeStyle = color;
        drawArrow(ctx, midX, midY, canvX, canvY, 10);

        ctx.fillStyle = 'black';
        ctx.fillText(key, canvX, canvY - 24);
        ctx.fillText(`(${x}, ${y})`, canvX, canvY - 8);
    }
}

function generatePlayground() {
    const controls = [
        {
            inputKey: document.getElementById('input1_sentence'),
            sliderX: document.getElementById('input1_x'),
            sliderY: document.getElementById('input1_y'),
            color: randomColor(),
        },
        {
            inputKey: document.getElementById('input2_sentence'),
            sliderX: document.getElementById('input2_x'),
            sliderY: document.getElementById('input2_y'),
            color: randomColor(),
        },
        {
            inputKey: document.getElementById('input3_sentence'),
            sliderX: document.getElementById('input3_x'),
            sliderY: document.getElementById('input3_y'),
            color: randomColor(),
        },
    ];
    const canvas = document.getElementById('myCanvas3');

    function update() {
        const word2vec = controls.map(({ inputKey, sliderX, sliderY, color }) => ({
            key: inputKey.value,
            x: sliderX.valueAsNumber,
            y: sliderY.valueAsNumber,
            color,
        }));
        drawVec2d(word2vec, canvas);
    }
    for(const { inputKey, sliderX, sliderY } of controls) {
        inputKey.addEventListener('input', update);
        sliderX.addEventListener('input', update);
        sliderY.addEventListener('input', update);
    }
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    drawVec1d();
    drawVec2d(WORD2VEC, document.getElementById('myCanvas2'));
    generatePlayground();
});
