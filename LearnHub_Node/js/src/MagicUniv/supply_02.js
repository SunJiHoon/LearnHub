function drawGraph(canvas, ctx, sines) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기
    ctx.beginPath();

    for(let x = 0; x <= canvas.width; x++) {
        let fx = 0;
        for(const [frequency, amplitude] of sines)
            fx += amplitude*Math.sin(x*frequency);
        if(x == 0)
            ctx.moveTo(x, canvas.height/2 - 4*fx);
        else
            ctx.lineTo(x, canvas.height/2 - 4*fx);
    }

    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

const
    canvL = document.getElementById('myCanvas1'),
    ctxL = canvL.getContext('2d'),
    canvM = document.getElementById('myCanvas2'),
    ctxM = canvM.getContext('2d'),
    canvH = document.getElementById('myCanvas3'),
    ctxH = canvH.getContext('2d'),
    canvSum = document.getElementById('myCanvas4'),
    ctxSum = canvSum.getContext('2d');
const controls = [
    {
        slider: document.getElementById('scaleSlider1'),
        canv: canvL,
        ctx: ctxL,
        frequency: 0.08,
    },
    {
        slider: document.getElementById('scaleSlider2'),
        canv: canvM,
        ctx: ctxM,
        frequency: 0.16,
    },
    {
        slider: document.getElementById('scaleSlider3'),
        canv: canvH,
        ctx: ctxH,
        frequency: 0.35,
    },
];
function updateLeft(index) {
    const { slider, canv, ctx, frequency } = controls[index];
    drawGraph(canv, ctx, [
        [frequency, slider.valueAsNumber],
    ]);
}
function updateRight() {
    drawGraph(canvSum, ctxSum, controls.map(({ slider, frequency }) => [
        frequency,
        slider.valueAsNumber,
    ]));
}

document.addEventListener('DOMContentLoaded', () => {
    for(let i = 0; i < controls.length; i++) {
        controls[i].slider.addEventListener('input', () => {
            updateLeft(i);
            updateRight();
        });
        updateLeft(0);
        updateLeft(1);
        updateLeft(2);
    }
    updateRight();
});
