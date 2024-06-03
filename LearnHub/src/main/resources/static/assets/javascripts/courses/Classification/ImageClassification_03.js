// script.js
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
let drawing = false;

canvas1.addEventListener('mousedown', () => startDrawing(ctx1));
canvas1.addEventListener('mouseup', () => stopDrawing(ctx1));
canvas1.addEventListener('mousemove', (event) => draw(ctx1, event));

canvas2.addEventListener('mousedown', () => startDrawing(ctx2));
canvas2.addEventListener('mouseup', () => stopDrawing(ctx2));
canvas2.addEventListener('mousemove', (event) => draw(ctx2, event));

document.getElementById('clear1').addEventListener('click', () => clearCanvas(ctx1, canvas1));
document.getElementById('clear2').addEventListener('click', () => clearCanvas(ctx2, canvas2));
document.getElementById('calculate').addEventListener('click', calculateHammingDistance);

function startDrawing(ctx) {
    drawing = true;
    ctx.beginPath();
}

function stopDrawing(ctx) {
    drawing = false;
    ctx.beginPath();
}

function draw(ctx, event) {
    if (!drawing) return;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    const rect = event.target.getBoundingClientRect();
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
}

function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getAlphaMatrix(canvas) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = 15;
    tempCanvas.height = 15;

    tempCtx.drawImage(canvas, 0, 0, 15, 15);
    const imageData = tempCtx.getImageData(0, 0, 15, 15);
    const data = imageData.data;
    const alphaMatrix = [];

    for (let y = 0; y < 15; y++) {
        const alphaRow = [];
        for (let x = 0; x < 15; x++) {
            const index = (y * 15 + x) * 4;
            const a = data[index + 3];
            alphaRow.push(a > 128 ? 1 : 0); // binary representation
        }
        alphaMatrix.push(alphaRow);
    }

    return alphaMatrix;
}

function calculateHammingDistance() {
    const alphaMatrix1 = getAlphaMatrix(canvas1);
    const alphaMatrix2 = getAlphaMatrix(canvas2);

    let hammingDistance = 0;

    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            if (alphaMatrix1[y][x] !== alphaMatrix2[y][x]) {
                hammingDistance++;
            }
        }
    }

    document.getElementById('hammingDistance').textContent = `Hamming Distance: ${hammingDistance}`;
}