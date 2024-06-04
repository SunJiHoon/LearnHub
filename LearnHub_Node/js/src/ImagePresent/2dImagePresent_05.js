import { updateColorMatrix } from "../../lib/image";

const matrix = [
    [[1, 1, 1], [0, 3, 0], [0, 0, 0], [0, 0, 0]],
    [[1, 1, 1], [3, 0, 0], [0, 0, 0], [3, 0, 0]],
    [[1, 1, 1], [3, 0, 0], [3, 0, 0], [3, 0, 0]],
    [[1, 1, 1], [3, 0, 0], [3, 0, 0], [3, 0, 0]]
];

document.addEventListener('DOMContentLoaded', () => {
    const
        inputMatrix = document.getElementById('rgb-input-table'),
        outputMatrix = document.getElementById('output-matrix');

    function updateCallback(y, x, c, v, g) {
        return () => {
            for(let i = 0; i < 4; i++)
                if(v == i)
                    g[i].classList.add('selected');
                else
                    g[i].classList.remove('selected');
            matrix[y][x][c] = v;
            updateOutput();
        };
    }

    // Generate input fields for 4x4 RGB values
    for(let i = 0; i < 4; i++)
        for(let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            for(let k = 0; k < 3; k++) {
                const group = [];
                for(let l = 0; l < 4; l++) {
                    const button = document.createElement('button');
                    button.className = 'intensity';
                    button.classList.add(['red', 'green', 'blue'][k]);
                    if(l < 2)
                        button.classList.add('dark');
                    if(matrix[i][j][k] == l)
                        button.classList.add('selected');
                    button.style.backgroundColor = `rgba(${
                        k == 0 ? 85*l : 0
                    } ${
                        k == 1 ? 85*l : 0
                    } ${
                        k == 2 ? 85*l : 0
                    })`;
                    button.textContent = l;
                    button.addEventListener('click', updateCallback(i, j, k, l, group));
                    cell.append(button);
                    group.push(button);
                }
            }
            inputMatrix.append(cell);
        }

    function updateOutput() {
        const colorMatrix = matrix.map(row =>
            row.map(([r, g, b]) =>
                85*r << 16 | 85*g << 8 | 85*b
            )
        );
        updateColorMatrix(outputMatrix, colorMatrix);
    }

    updateOutput();
});
