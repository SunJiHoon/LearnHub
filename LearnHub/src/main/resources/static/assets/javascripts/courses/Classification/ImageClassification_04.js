document.addEventListener("DOMContentLoaded", function() {
    // 뇌의 뉴런 모델
    const neuronCanvas = document.getElementById("neuronModelCanvas");
    const neuronCtx = neuronCanvas.getContext("2d");

    neuronCanvas.width = 500;
    neuronCanvas.height = 400;

    // 세포체
    neuronCtx.beginPath();
    neuronCtx.arc(250, 200, 50, 0, 2 * Math.PI);
    neuronCtx.fillStyle = "#ffcc00";
    neuronCtx.fill();
    neuronCtx.stroke();

    // 수상돌기
    const drawDendrite = (x, y) => {
        neuronCtx.beginPath();
        neuronCtx.moveTo(250, 200);
        neuronCtx.lineTo(x, y);
        neuronCtx.stroke();
    };

    drawDendrite(150, 100);
    drawDendrite(150, 150);
    drawDendrite(150, 250);
    drawDendrite(150, 300);

    // 축색돌기
    neuronCtx.beginPath();
    neuronCtx.moveTo(300, 200);
    neuronCtx.lineTo(450, 200);
    neuronCtx.stroke();

    // 축색돌기 가지
    const drawAxonBranch = (x, y) => {
        neuronCtx.beginPath();
        neuronCtx.moveTo(450, 200);
        neuronCtx.lineTo(x, y);
        neuronCtx.stroke();
    };

    drawAxonBranch(500, 150);
    drawAxonBranch(500, 250);

    // 신경망의 구조적 모델
    const networkCanvas = document.getElementById("networkModelCanvas");
    const networkCtx = networkCanvas.getContext("2d");

    networkCanvas.width = 600;
    networkCanvas.height = 400;

    const drawNeuron = (x, y) => {
        networkCtx.beginPath();
        networkCtx.arc(x, y, 20, 0, 2 * Math.PI);
        networkCtx.fillStyle = "#00ccff";
        networkCtx.fill();
        networkCtx.stroke();
    };

    const drawConnection = (x1, y1, x2, y2) => {
        networkCtx.beginPath();
        networkCtx.moveTo(x1, y1);
        networkCtx.lineTo(x2, y2);
        networkCtx.stroke();
    };

    const inputLayerX = 100;
    const hiddenLayerX = 300;
    const outputLayerX = 500;

    const layerYPositions = [100, 200, 300];

    layerYPositions.forEach(y => drawNeuron(inputLayerX, y));
    layerYPositions.forEach(y => drawNeuron(hiddenLayerX, y));
    layerYPositions.forEach(y => drawNeuron(outputLayerX, y));

    layerYPositions.forEach(y1 => {
        layerYPositions.forEach(y2 => {
            drawConnection(inputLayerX + 20, y1, hiddenLayerX - 20, y2);
            drawConnection(hiddenLayerX + 20, y1, outputLayerX - 20, y2);
        });
    });
});
