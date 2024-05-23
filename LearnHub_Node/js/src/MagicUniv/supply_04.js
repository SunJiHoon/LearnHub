import { drawArrow } from "../../lib/draw";

const PATTERNS = [
    "/assets/images/MagicUniv/rain.svg",
    "/assets/images/MagicUniv/fire.svg",
    "/assets/images/MagicUniv/leaf.svg",
];
const COLORS = [
    'blue',
    'red',
    'green',
];

document.addEventListener('DOMContentLoaded', () => {
    const
        imageSelect = document.getElementById('image-select'),
        selectedImage = document.getElementById('selected-image'),
        featureLayer = document.getElementById('feature-layer'),
        ctxF = featureLayer.getContext('2d'),
        denseLayer = document.getElementById('dense-layer'),
        ctxD = denseLayer.getContext('2d'),
        results = [
            document.getElementById('result1'),
            document.getElementById('result2'),
            document.getElementById('result3'),
        ];

    function drawArrowOnce(ctx, src, dest, color) {
        const { width, height } = ctx.canvas;
        ctx.lineWidth = 4;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        drawArrow(
            ctx,
            0.1*width, (2*src + 1)/6*height,
            0.9*width, (2*dest + 1)/6*height,
            10
        );
    }
    function redrawFeatureLayer(index) {
        ctxF.clearRect(0, 0, ctxF.canvas.width, ctxF.canvas.height);
        for(let i = 0; i < 3; i++)
            drawArrowOnce(ctxF, 1, i, COLORS[index]);
    }
    function redrawDenseLayer(index) {
        ctxD.clearRect(0, 0, ctxD.canvas.width, ctxD.canvas.height);
        for(let i = 0; i < 3; i++) {
            if(i == index)
                continue;
            for(let j = 0; j < 3; j++)
                drawArrowOnce(ctxD, i, j, '#00000080');
        }
        for(let j = 0; j < 3; j++)
            drawArrowOnce(ctxD, index, j, COLORS[index]);
    }
    function redraw() {
        const index = +imageSelect.value;
        selectedImage.src = PATTERNS[index];
        redrawFeatureLayer(index);
        redrawDenseLayer(index);
        for(let i = 0; i < 3; i++)
            results[i].style.filter = `drop-shadow(0 0 ${index == i ? 8 : 0}px ${COLORS[i]})`;
    }

    imageSelect.addEventListener('input', redraw);
    redraw();
});
