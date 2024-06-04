import { updateColorMatrix } from "../../lib/image";

const matrix = [
    [[85, 85, 85], [0, 255, 0], [0, 0, 0], [0, 0, 0]],
    [[85, 85, 85], [255, 0, 0], [0, 0, 0], [255, 0, 0]],
    [[85, 85, 85], [255, 0, 0], [255, 0, 0], [255, 0, 0]],
    [[85, 85, 85], [255, 0, 0], [255, 0, 0], [255, 0, 0]]
];

document.addEventListener('DOMContentLoaded', () => {
    const
        matrixBefore = document.getElementById('original-matrix'),
        matrixAfter = document.getElementById('resized-matrix'),
        rowsInput = document.getElementById('rows'),
        colsInput = document.getElementById('cols'),
        resizeButton = document.getElementById('resize'),
        formulaLhs1 = document.getElementById('formula-lhs-1'),
        formulaLhs2 = document.getElementById('formula-lhs-2'),
        formulaRhs1 = document.getElementById('formula-rhs-1'),
        formulaRhs2 = document.getElementById('formula-rhs-2');

    function resizeMatrix(matrix, newRows, newCols) {
        const result = [];
        for(let i = 0; i < newRows; i++) {
            const row = [];
            for(let j = 0; j < newCols; j++) {
                const
                    x = Math.floor(i*matrix.length/newRows),
                    y = Math.floor(j*matrix[0].length/newCols);
                row.push(matrix[x][y]);
            }
            result.push(row);
        }
        return result;
    }

    function updateMatrix(grid, matrix) {
        updateColorMatrix(grid, matrix.map(row =>
            row.map(([r, g, b]) => (r & 0xff) << 16 | (g & 0xff) << 8 | b & 0xff)
        ));
    }

    function updateFormula(rows, cols) {
        const
            w = cols/matrix[0].length,
            h = rows/matrix.length;
        formulaLhs1.textContent = w.toFixed(2);
        formulaRhs1.textContent = h.toFixed(2);
        formulaLhs2.textContent = cols;
        formulaRhs2.textContent = rows;
    }

    resizeButton.addEventListener('click', () => {
        const
            newRows = rowsInput.valueAsNumber,
            newCols = colsInput.valueAsNumber,
            newMatrix = resizeMatrix(matrix, newRows, newCols);
        updateMatrix(matrixAfter, newMatrix);
        updateFormula(newRows, newCols);
    });

    updateMatrix(matrixBefore, matrix);
    updateFormula(rowsInput.value, colsInput.value);
});
