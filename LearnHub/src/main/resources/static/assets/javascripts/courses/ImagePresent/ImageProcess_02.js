const initialMatrix = [
    [250, 200, 150, 100],
    [250, 200, 150, 100],
    [250, 200, 150, 100],
    [250, 200, 150, 100]
];

const matrixContainer = document.getElementById('matrix');
const brightnessSlider = document.getElementById('brightness-slider');

// Initialize the matrix display
function initializeMatrix() {
    matrixContainer.innerHTML = '';
    initialMatrix.forEach(row => {
        row.forEach(value => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.value = value;
            cell.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
            cell.textContent = value;
            matrixContainer.appendChild(cell);
        });
    });
}

// Update the matrix display based on the slider value
function updateMatrix(brightness) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const initialValue = cell.dataset.value;
        const newValue = Math.min(255, Math.max(0, initialValue * brightness));
        cell.style.backgroundColor = `rgb(${newValue}, ${newValue}, ${newValue})`;
        cell.textContent = Math.round(newValue);
    });
}

// Initialize the matrix and set up the slider event listener
initializeMatrix();
brightnessSlider.addEventListener('input', (event) => {
    const brightness = event.target.value;
    updateMatrix(brightness);
});
