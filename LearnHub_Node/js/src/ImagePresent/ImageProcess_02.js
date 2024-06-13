import { updateIntensityAndNumberMatrix } from "../../lib/image";

const initialMatrix = [...Array(4)].map((_, i) =>
    [...Array(4)].map((_, j) =>
        Math.round((6 - i - j)*255/6)
    )
);

document.addEventListener('DOMContentLoaded', () => {
    const
        matrix = document.getElementById('matrix'),
        brightnessSlider = document.getElementById('brightness-slider'),
        brightnessFeedback = document.getElementById('brightness-feedback');

    // Update the matrix display based on the slider value
    function updateMatrix(brightness) {
        const intensity = initialMatrix.map(row =>
            row.map(x => Math.max(0, Math.min(255, x + brightness)))
        );
        updateIntensityAndNumberMatrix(matrix, intensity);
    }

    brightnessSlider.addEventListener('input', (event) => {
        const brightness = event.target.valueAsNumber;
        brightnessFeedback.textContent = brightness >= 0 ? `+${brightness}` : `${brightness}`;
        updateMatrix(brightness);
    });

    updateMatrix(0);
});
