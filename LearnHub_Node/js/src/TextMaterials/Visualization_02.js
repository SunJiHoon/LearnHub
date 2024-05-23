import { Chart, BarController, BarElement, CategoryScale, LinearScale, DoughnutController, ArcElement, Tooltip } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';
import debounce from 'debounce';
import { toFrequencyVector, tokenSet, tokenize, updateTokens, updateVectorTable, vectorToRelativeFrequency } from "../../lib/text";

// JS 크기를 줄이기 위해 컴포넌트를 수동으로 로드
// https://github.com/sgratzl/chartjs-chart-wordcloud/issues/4#issuecomment-827304369
Chart.register(
    // 막대 그래프
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    // 원형 그래프
    DoughnutController,
    ArcElement,
    // 단어 구름
    WordCloudController,
    WordElement,
    // 툴팁
    Tooltip,
);

const
    EXAMPLE_TEXT_1 = 'The dog wants a walk , walk is good',
    EXAMPLE_TEXT_2 = 'The dog wants to go home , home is comfortable';

function updateFields(
    text1, text2,
    eTok1, eTok2, eUnion,
    eVec1, eVec2, eRelative1, eRelative2
) {
    const
        tokens1 = tokenize(text1),
        tokens2 = tokenize(text2),
        allTokens = tokenSet(tokens1, tokens2),
        vector1 = toFrequencyVector(allTokens, tokens1),
        vector2 = toFrequencyVector(allTokens, tokens2),
        relative1 = vectorToRelativeFrequency(vector1),
        relative2 = vectorToRelativeFrequency(vector2);
    updateTokens(eTok1, tokens1);
    updateTokens(eTok2, tokens2);
    updateTokens(eUnion, allTokens);
    updateVectorTable(eVec1, vector1);
    updateVectorTable(eVec2, vector2);
    updateVectorTable(eRelative1, relative1);
    updateVectorTable(eRelative2, relative2);
    return [relative1, relative2];
}

document.addEventListener('DOMContentLoaded', () => {
    const
        userInput1 = document.getElementById('user-input-1'),
        userInput2 = document.getElementById('user-input-2'),
        sentence1 = document.getElementById('sentence-1'),
        sentence2 = document.getElementById('sentence-2'),
        union = document.getElementById('union'),
        vector1 = document.getElementById('vector-1'),
        vector2 = document.getElementById('vector-2'),
        relativeVector1 = document.getElementById('relative-vector-1'),
        relativeVector2 = document.getElementById('relative-vector-2'),
        barChart = document.getElementById('bar-chart'),
        doughnutChart = document.getElementById('doughnut-chart'),
        wordCloud1 = document.getElementById('word-cloud-1'),
        wordCloud2 = document.getElementById('word-cloud-2');
    const
        initialTokens1 = tokenize(userInput1.value),
        initialTokens2 = tokenize(userInput2.value),
        initialSet = tokenSet(initialTokens1, initialTokens2),
        initialVector1 = vectorToRelativeFrequency(toFrequencyVector(initialSet, initialTokens1)),
        initialVector2 = vectorToRelativeFrequency(toFrequencyVector(initialSet, initialTokens2));
    const
        barChartObj = createBarChart(
            barChart,
            initialVector1.columns,
            initialVector1.frequency, initialVector2.frequency
        ),
        doughnutChartObj = createDoughnutChart(
            doughnutChart,
            initialVector1.columns,
            initialVector1.frequency, initialVector2.frequency
        ),
        wordCloudObj1 = createWordCloud(
            wordCloud1,
            initialVector1.columns,
            initialVector1.frequency,
            '#246060'
        ),
        wordCloudObj2 = createWordCloud(
            wordCloud2,
            initialVector2.columns,
            initialVector2.frequency,
            '#606024'
        );
    function updatePlayground() {
        const
            text1 = userInput1.value,
            text2 = userInput2.value;
        const [vec1, vec2] = updateFields(
            text1, text2,
            sentence1, sentence2, union,
            vector1, vector2, relativeVector1, relativeVector2
        );
        updateCharts(vec1, vec2);
    }
    // 무거운 함수에 1초 쿨다운 부여
    const updateCharts = debounce((vec1, vec2) => {
        barChartObj.data.labels =
        doughnutChartObj.data.labels =
            vec1.columns;
        barChartObj.data.datasets[0].data =
        doughnutChartObj.data.datasets[0].data =
            vec1.frequency;
        barChartObj.data.datasets[1].data =
        doughnutChartObj.data.datasets[1].data =
            vec2.frequency;
        barChartObj.update();
        doughnutChartObj.update();

        const
            [wcLabels, wcData1] = toWordCloudDataset(vec1.columns, vec1.frequency),
            [, wcData2] = toWordCloudDataset(vec2.columns, vec2.frequency);
        wordCloudObj1.data.labels =
        wordCloudObj2.data.labels =
            wcLabels;
        wordCloudObj1.data.datasets[0].data = wcData1;
        wordCloudObj2.data.datasets[0].data = wcData2;
        wordCloudObj1.update();
        wordCloudObj2.update();
    }, 1000);

    updateFields(
        EXAMPLE_TEXT_1, EXAMPLE_TEXT_2,
        document.getElementById('prepared-sentence-1'),
        document.getElementById('prepared-sentence-2'),
        document.getElementById('prepared-union'),
        document.getElementById('prepared-vector-1'),
        document.getElementById('prepared-vector-2'),
        document.getElementById('prepared-relative-vector-1'),
        document.getElementById('prepared-relative-vector-2'),
    );

    userInput1.addEventListener('input', updatePlayground);
    userInput2.addEventListener('input', updatePlayground);

    updatePlayground();
});

function createBarChart(canvas, labels, data1, data2) {
    const dataset = {
        label: '상대도수',
        borderWidth: 1,
    };
    return new Chart(
        canvas,
        {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        ...dataset,
                        data: data1,
                        backgroundColor: '#48c0c033',
                        borderColor: '#48c0c0',
                    },
                    {
                        ...dataset,
                        data: data2,
                        backgroundColor: '#c0c04833',
                        borderColor: '#c0c048',
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        }
    );
}
function createDoughnutChart(canvas, labels, data1, data2) {
    const dataset = {
        label: '상대도수',
        borderWidth: 1,
    };
    return new Chart(
        canvas,
        {
            type: 'doughnut',
            data: {
                labels,
                datasets: [
                    {
                        ...dataset,
                        data: data1,
                        backgroundColor: [
                            '#48c0c033',
                            '#5cc7c733',
                            '#6fcece33',
                            '#82d4d433',
                            '#95dbdb33',
                        ],
                        borderColor: [
                            '#48c0c0',
                            '#5cc7c7',
                            '#6fcece',
                            '#82d4d4',
                            '#95dbdb',
                        ],
                    },
                    {
                        ...dataset,
                        data: data1,
                        backgroundColor: [
                            '#c0c04833',
                            '#c7c75c33',
                            '#cece6f33',
                            '#d4d48233',
                            '#dbdb9533',
                        ],
                        borderColor: [
                            '#c0c048',
                            '#c7c75c',
                            '#cece6f',
                            '#d4d482',
                            '#dbdb95',
                        ],
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
            },
        }
    );
}
function createWordCloud(canvas, labels, data, color) {
    [labels, data] = toWordCloudDataset(labels, data);
    return new Chart(
        canvas,
        {
            type: 'wordCloud',
            data: {
                labels,
                datasets: [{ data, color }]
            },
            options: {
                fit: true,
                minRotation: 0,
                maxRotation: 0,
                plugins: {
                    tooltip: { enabled: false },
                },
            },
        }
    );
}
// 단어 구름에 단어 1개는 들어가도록 보정
function toWordCloudDataset(labels, data) {
    return labels.length == 0
        ? [[' '], [100]]
        : [labels, data.map(x => 100*x)];
}
