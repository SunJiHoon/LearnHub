window.onload = function() {
    // 데이터 셋
    const dataLinear = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 7 },
        { x: 5, y: 11 }
    ];

    const dataQuadratic = [
        { x: 1, y: 6 },
        { x: 2, y: 11 },
        { x: 3, y: 18 },
        { x: 4, y: 27 },
        { x: 5, y: 38 }
    ];

    // Linear regression (직선)
    const linearRegression = (data) => {
        const n = data.length;
        const sumX = data.reduce((sum, point) => sum + point.x, 0);
        const sumY = data.reduce((sum, point) => sum + point.y, 0);
        const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
        const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return { slope, intercept };
    };

    const { slope, intercept } = linearRegression(dataLinear);
    const linearTrendline = dataLinear.map(point => ({
        x: point.x,
        y: slope * point.x + intercept
    }));

    // Linear Chart
    const ctxLinear = document.getElementById('linear-chart').getContext('2d');
    new Chart(ctxLinear, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '데이터 포인트',
                    data: dataLinear,
                    backgroundColor: 'rgba(255, 99, 132, 1)'
                },
                {
                    label: '추세선',
                    data: linearTrendline,
                    type: 'line',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'x'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'y'
                    }
                }
            }
        }
    });

    // Quadratic regression (곡선)
    const quadraticRegression = (data) => {
        const n = data.length;
        const sumX = data.reduce((sum, point) => sum + point.x, 0);
        const sumY = data.reduce((sum, point) => sum + point.y, 0);
        const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);
        const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
        const sumXXX = data.reduce((sum, point) => sum + point.x * point.x * point.x, 0);
        const sumXXXX = data.reduce((sum, point) => sum + point.x * point.x * point.x * point.x, 0);
        const sumXYY = data.reduce((sum, point) => sum + point.x * point.x * point.y, 0);

        const matrix = [
            [n, sumX, sumXX],
            [sumX, sumXX, sumXXX],
            [sumXX, sumXXX, sumXXXX]
        ];

        const vector = [sumY, sumXY, sumXYY];

        const solve = (matrix, vector) => {
            const [a, b, c] = numeric.solve(matrix, vector);
            return { a, b, c };
        };

        return solve(matrix, vector);
    };

    const { a, b, c } = quadraticRegression(dataQuadratic);
    const quadraticTrendline = [];
    for (let x = 0; x <= 6; x += 0.1) {
        quadraticTrendline.push({ x, y: a * x * x + b * x + c });
    }

    // Quadratic Chart
    const ctxQuadratic = document.getElementById('quadratic-chart').getContext('2d');
    new Chart(ctxQuadratic, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '데이터 포인트',
                    data: dataQuadratic,
                    backgroundColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: '추세선',
                    data: quadraticTrendline,
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'x'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'y'
                    }
                }
            }
        }
    });
};
