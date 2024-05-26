const initialMatrix = [
    [250, 200, 150, 100],
    [200, 200, 150, 100],
    [150, 150, 150, 100],
    [100, 100, 100, 100]
];
const originalMatrixContainer = document.getElementById('original-matrix');
const resizedMatrixContainer = document.getElementById('resized-matrix');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const resizeButton = document.getElementById('resize');
const formulaContainer = document.getElementById('formula');

// Function to create matrix display
function createMatrixDisplay(matrix, container) {
    container.innerHTML = '';
    const rows = matrix.length;
    const cols = matrix[0].length;
    container.style.gridTemplateColumns = `repeat(${cols}, 50px)`;
    container.style.gridTemplateRows = `repeat(${rows}, 50px)`;

    // matrix.forEach(row => {
    //     row.forEach(value => {
    //         const cell = document.createElement('div');
    //         cell.classList.add('cell');
    //         cell.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
    //         cell.textContent = value;
    //         container.appendChild(cell);
    //     });
    // });

    matrix.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // 조건에 맞는 셀의 배경색을 빨간색으로 설정
            if (rowIndex === rows - 1 && colIndex === cols - 1) {
                cell.style.backgroundColor = 'red';
            } else {
                cell.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
            }
            cell.textContent = value;
            container.appendChild(cell);
        });
    });

}

// Function to resize matrix
function resizeMatrix(matrix, newRows, newCols) {
    const resizedMatrix = Array.from({ length: newRows }, () => Array(newCols).fill(0));

    for (let i = 0; i < newRows; i++) {
        for (let j = 0; j < newCols; j++) {
            const x = Math.floor(i * (matrix.length / newRows));
            const y = Math.floor(j * (matrix[0].length / newCols));
            resizedMatrix[i][j] = matrix[x][y];
        }
    }

    return resizedMatrix;
}

// Function to update formula display
function updateFormula(rows, cols) {
    const w = cols / 4;
    const h = rows / 4;
    formulaContainer.innerHTML = `
        <div>[&nbsp ${w.toFixed(2)} &nbsp 0 &nbsp ] &nbsp&nbsp&nbsp [ &nbsp 4 &nbsp ] &nbsp&nbsp&nbsp [ &nbsp ${cols} &nbsp]</div>
        <div>[&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp] &nbsp* [ &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ]  =  &nbsp[ &nbsp&nbsp&nbsp&nbsp&nbsp ]</div>
        <div>[&nbsp 0 &nbsp ${h.toFixed(2)} &nbsp ] &nbsp&nbsp&nbsp [ &nbsp 4 &nbsp ] &nbsp&nbsp&nbsp  [ &nbsp ${rows} &nbsp]</div>
    `;
}

// Initialize the original matrix display
createMatrixDisplay(initialMatrix, originalMatrixContainer);

// Add event listener to resize button
resizeButton.addEventListener('click', () => {
    const newRows = parseInt(rowsInput.value);
    const newCols = parseInt(colsInput.value);
    const resizedMatrix = resizeMatrix(initialMatrix, newRows, newCols);
    createMatrixDisplay(resizedMatrix, resizedMatrixContainer);
    updateFormula(newRows, newCols);
});

// Initial formula update
updateFormula(rowsInput.value, colsInput.value);
