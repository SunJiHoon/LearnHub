import { drawGraph, drawArrow } from "../../lib/draw";

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
        ctx: ctxL,
        frequency: 16,
    },
    {
        slider: document.getElementById('scaleSlider2'),
        ctx: ctxM,
        frequency: 32,
    },
    {
        slider: document.getElementById('scaleSlider3'),
        ctx: ctxH,
        frequency: 70,
    },
];
function updateLeft(index) {
    const { slider, ctx, frequency } = controls[index];
    ctx.strokeStyle = 'blue';
    drawGraph(
        ctx, x => slider.valueAsNumber*Math.sin(frequency*x),
        0, 1,
        -2.5, 2.5
    );
}
function updateRight() {
    ctxSum.strokeStyle = 'blue';
    drawGraph(
        ctxSum,
        x => controls
            .map(({ slider, frequency }) => slider.valueAsNumber*Math.sin(frequency*x))
            .reduce((acc, x) => acc + x, 0),
        0, 1,
        -2.5, 2.5
    );
}

document.addEventListener('DOMContentLoaded', () => {
    for(let i = 0; i < controls.length; i++) {
        controls[i].slider.addEventListener('input', () => {
            updateLeft(i);
            updateRight();
        });
        updateLeft(i);
    }
    updateRight();
});
