const matrix = [
    [[85, 85, 85], [0, 255, 0], [0, 0, 0], [0, 0, 0]],
    [[85, 85, 85], [255, 0, 0], [0, 0, 0], [255, 0, 0]],
    [[85, 85, 85], [255, 0, 0], [255, 0, 0], [255, 0, 0]],
    [[85, 85, 85], [255, 0, 0], [255, 0, 0], [255, 0, 0]]
];

document.addEventListener('DOMContentLoaded', () => {
    const
        angle = document.getElementById('angle'),
        angleFeedback = document.getElementById('angle-feedback'),
        grid = document.getElementById('grid'),
        pixels = [...Array(16)].map((_, i) => {
            const
                pixel = document.createElement('div'),
                x = i%4,
                y = Math.floor(i/4),
                color = matrix[y][x];
            if(i == 15)
                pixel.classList.add('highlighted');
            pixel.style.color = color[0] + color[1] + color[2] >= 255*3/2
                ? 'black'
                : 'white';
            pixel.style.backgroundColor = `rgba(${
                color[0]
            } ${
                color[1]
            } ${
                color[2]
            })`;
            pixel.textContent = `(${x}, ${y})`;
            return pixel;
        }),
        formulaLhs11 = document.getElementById('formula-lhs-11'),
        formulaLhs12 = document.getElementById('formula-lhs-12'),
        formulaLhs21 = document.getElementById('formula-lhs-21'),
        formulaLhs22 = document.getElementById('formula-lhs-22'),
        formulaRhs1 = document.getElementById('formula-rhs-1'),
        formulaRhs2 = document.getElementById('formula-rhs-2');
    grid.replaceChildren(...pixels);

    function updateMatrix(deg) {
        const
            theta = deg/180*Math.PI,
            cosTheta = Math.cos(theta),
            sinTheta = Math.sin(theta);
        angleFeedback.textContent = deg;

        const
            ORIGIN_X = 4,
            ORIGIN_Y = 4;

        for(let i = 0; i < pixels.length; i++) {
            const
                pixel = pixels[i],
                x = i%4,
                y = Math.floor(i/4),
                x2 = Math.round(cosTheta*x - sinTheta*y),
                y2 = Math.round(sinTheta*x + cosTheta*y);

            pixel.style.gridColumnStart = x2 + ORIGIN_X + 1;
            pixel.style.gridRowStart = y2 + ORIGIN_Y + 1;
        }
    }

    function updateFormula(theta) {
        const
            cosTheta = Math.cos(theta),
            sinTheta = Math.sin(theta);
        formulaLhs11.textContent = cosTheta.toFixed(2);
        formulaLhs12.textContent = (-sinTheta).toFixed(2);
        formulaLhs21.textContent = sinTheta.toFixed(2);
        formulaLhs22.textContent = cosTheta.toFixed(2);
        formulaRhs1.textContent = (3*cosTheta - 3*sinTheta).toFixed(2);
        formulaRhs2.textContent = (3*sinTheta + 3*cosTheta).toFixed(2);
    }

    angle.addEventListener('input', () => {
        const deg = angle.valueAsNumber;
        updateMatrix(deg);
        updateFormula(deg/180*Math.PI);
    });

    const deg = angle.valueAsNumber;
    updateMatrix(deg);
    updateFormula(deg/180*Math.PI);
});
