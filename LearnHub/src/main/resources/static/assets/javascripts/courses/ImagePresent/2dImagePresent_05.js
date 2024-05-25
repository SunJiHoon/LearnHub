
const tableBody = document.getElementById('rgb-input-table');

// Generate input fields for 4x4 RGB values
for (let i = 0; i < 4; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 4; j++) {
        const cell = document.createElement('td');
        cell.innerHTML = `
                    <input type="number" min="0" max="255" value="0" class="r" style="width: 50px;">
                    <input type="number" min="0" max="255" value="0" class="g" style="width: 50px;">
                    <input type="number" min="0" max="255" value="0" class="b" style="width: 50px;">
                `;
        row.appendChild(cell);
    }
    tableBody.appendChild(row);
}

function convertToImage() {
    const rgbMatrix = [];
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
            const r = parseInt(cell.querySelector('.r').value);
            const g = parseInt(cell.querySelector('.g').value);
            const b = parseInt(cell.querySelector('.b').value);
            rowData.push([r, g, b]);
        });
        rgbMatrix.push(rowData);
    });

    const container = document.getElementById('matrix-container');
    container.innerHTML = ''; // Clear previous cells

    rgbMatrix.forEach(row => {
        row.forEach(color => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            container.appendChild(cell);
        });
    });
}
function setInitialValues(matrix) {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, i) => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, j) => {
            const r = cell.querySelector('.r');
            const g = cell.querySelector('.g');
            const b = cell.querySelector('.b');
            r.value = matrix[i][j][0];
            g.value = matrix[i][j][1];
            b.value = matrix[i][j][2];
        });
    });
    convertToImage();
}

// Example initial values
const initialMatrix = [
    [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]],
    [[255, 0, 255], [0, 255, 255], [192, 192, 192], [128, 128, 128]],
    [[64, 64, 64], [128, 0, 0], [0, 128, 0], [0, 0, 128]],
    [[255, 128, 0], [0, 128, 255], [128, 255, 0], [255, 0, 128]]
];

// Set initial values on page load
setInitialValues(initialMatrix);

// convertToImage();