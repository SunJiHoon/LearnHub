const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let selectedColor = '#000000'; // 선택한 색상을 저장할 변수 추가

const bigSection = document.getElementById('big_section'); // big_section 요소 선택

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('convert').addEventListener('click', convertToMatrix);

// 색상 선택기의 값이 변경될 때마다 호출되는 이벤트 리스너 추가
document.getElementById('colorPicker').addEventListener('change', function(event) {
    selectedColor = event.target.value; // 선택한 색상을 변수에 저장
});

function startDrawing(event) {
    drawing = true;
    draw(event);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 20; // 선 두께를 증가시킴
    ctx.lineCap = 'round';
    ctx.strokeStyle = selectedColor; // 선택한 색상으로 선 색상 설정

    const rect = canvas.getBoundingClientRect(); // 캔버스의 크기와 위치에 대한 정보 가져오기
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top); // 클릭한 위치에서 캔버스의 좌표를 빼서 상대 좌표로 변환
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top); // 클릭한 위치에서 캔버스의 좌표를 빼서 상대 좌표로 변환
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function convertToMatrix() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = 15;
    tempCanvas.height = 15;

    tempCtx.drawImage(canvas, 0, 0, 15, 15);
    const imageData = tempCtx.getImageData(0, 0, 15, 15);
    const data = imageData.data;
    const matrix = [];
    const alphaMatrix = [];
    const redMatrix = [];
    const greenMatrix = [];
    const blueMatrix = [];

    for (let y = 0; y < 15; y++) {
        const row = [];
        const alphaRow = [];
        const redRow = [];
        const greenRow = [];
        const blueRow = [];
        for (let x = 0; x < 15; x++) {
            const index = (y * 15 + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];
            row.push([r, g, b, a]);
            alphaRow.push(a);
            redRow.push(r);
            greenRow.push(g);
            blueRow.push(b);
        }
        matrix.push(row);
        alphaMatrix.push(alphaRow);
        redMatrix.push(redRow);
        greenMatrix.push(greenRow);
        blueMatrix.push(blueRow);
    }

    displayMatrix(matrix);
    // displayAlphaMatrix(alphaMatrix);
    displayColorMatrix('redMatrix', redMatrix);
    displayColorMatrix('greenMatrix', greenMatrix);
    displayColorMatrix('blueMatrix', blueMatrix);
}

function displayMatrix(matrix) {
    const matrixDiv = document.getElementById('matrix');
    matrixDiv.innerHTML = ''; // 이전 내용을 지움
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            const cell = document.createElement('div');
            const [r, g, b, a] = matrix[y][x];
            cell.className = 'cell';
            cell.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            matrixDiv.appendChild(cell);
        }
    }
}

function displayAlphaMatrix(alphaMatrix) {
    const alphaMatrixDiv = document.getElementById('alphaMatrix');
    alphaMatrixDiv.innerHTML = ''; // 이전 내용을 지움
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            const cell = document.createElement('div');
            const a = alphaMatrix[y][x];
            cell.className = 'cell';
            cell.textContent = a;
            alphaMatrixDiv.appendChild(cell);
        }
    }
}

function displayColorMatrix(id, colorMatrix) {
    const colorMatrixDiv = document.getElementById(id);
    colorMatrixDiv.innerHTML = ''; // 이전 내용을 지움
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            const cell = document.createElement('div');
            const value = colorMatrix[y][x];
            cell.className = 'cell';
            cell.textContent = value;
            colorMatrixDiv.appendChild(cell);
        }
    }
}

convertToMatrix();