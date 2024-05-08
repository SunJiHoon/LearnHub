// 문장들을 변수에 저장
var preparedSentence1 = "The dog wants a walk , walk is good";
var preparedSentence2 = "The dog wants to go home , home is comfortable";

// 문장을 단어 단위로 나누기
var words1 = preparedSentence1.split(" ");
var words2 = preparedSentence2.split(" ");

// 두 문장의 모든 단어를 하나의 배열로 합침
var allWords = words1.concat(words2);

// 합집합을 구함 (중복된 단어 제거)
var union = Array.from(new Set(allWords));


// 문장의 단어를 동적으로 HTML로 생성하여 문서에 추가
var sentence1Div = document.getElementById("PreparedSentence1");
words1.forEach(function(word) {
    var wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    wordSpan.classList.add("word");
    sentence1Div.appendChild(wordSpan);
});

var sentence2Div = document.getElementById("PreparedSentence2");
words2.forEach(function(word) {
    var wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    wordSpan.classList.add("word");
    sentence2Div.appendChild(wordSpan);
});

// 합집합을 HTML로 생성하여 문서에 추가
var unionDiv = document.getElementById("union");
union.forEach(function(word) {
    var wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    wordSpan.classList.add("word");

    // 단어가 첫 번째 문장에 포함되어 있는지 확인
    if (words1.includes(word)) {
        wordSpan.classList.add("word-sentence1");
    }
    // 단어가 두 번째 문장에 포함되어 있는지 확인
    if (words2.includes(word)) {
        wordSpan.classList.add("word-sentence2");
    }

    unionDiv.appendChild(wordSpan);
});


// 문장을 빈도수 벡터로 변환
var preparedVector1 = makePreparedVector(words1, union);
var preparedVector2 = makePreparedVector(words2, union);
// 결과를 HTML로 출력
var vectorizedSentence1Div = document.getElementById("VectorizedSentence1");
var vectorizedSentence2Div = document.getElementById("VectorizedSentence2");
vectorizedSentence1Div.textContent = JSON.stringify(preparedVector1);
vectorizedSentence2Div.textContent = JSON.stringify(preparedVector2);



var relativePreparedVector1 = makeRelativePreparedVector(words1, union);
var relativePreparedVector2 = makeRelativePreparedVector(words2, union);
// 각 상대도수를 반올림하여 소수점 둘째 자리까지 표시
for (const word in relativePreparedVector1) {
    relativePreparedVector1[word] = Math.round(relativePreparedVector1[word] * 100) / 100;
}
for (const word in relativePreparedVector2) {
    relativePreparedVector2[word] = Math.round(relativePreparedVector2[word] * 100) / 100;
}

// 결과를 HTML로 출력
var relativeVectorizedSentence1Div = document.getElementById("RelativeVectorizedSentence1");
var relativeVectorizedSentence2Div = document.getElementById("RelativeVectorizedSentence2");
relativeVectorizedSentence1Div.textContent = JSON.stringify(relativePreparedVector1);
relativeVectorizedSentence2Div.textContent = JSON.stringify(relativePreparedVector2);

















function makePreparedVector(smallWords, bigWords){
    var preparedVector = {};
    for(var i =0;i<bigWords.length;i++){
        var word = bigWords[i];
        preparedVector[word] = 0;//(preparedVector[word] || 0) + 1;

    }
    for(var i = 0;i<smallWords.length;i++){
        var word = smallWords[i];
        preparedVector[word] += 1;
    }
    return preparedVector;
}

function makeRelativePreparedVector(smallWords, bigWords){
    var preparedVector = {};
    for(var i =0;i<bigWords.length;i++){
        var word = bigWords[i];
        preparedVector[word] = 0;//(preparedVector[word] || 0) + 1;

    }
    for(var i = 0;i<smallWords.length;i++){
        var word = smallWords[i];
        preparedVector[word] += 1;
    }
    var sum = 0
    for (const word in preparedVector) {
        sum += preparedVector[word];
    }
    for (const word in preparedVector) {
        preparedVector[word] = preparedVector[word] / sum;
    }

    return preparedVector;
}



function tokenizeSentence(){

    var sentence1 = document.getElementById("sentence1").value;
    var sentence2 = document.getElementById("sentence2").value;


    ////
    var words1 = sentence1.split(" ").filter(function(word) {
        return word !== "";
    });
    var words2 = sentence2.split(" ").filter(function(word) {
        return word !== "";
    });
    // var words2 = sentence2.split(" ");

// 두 문장의 모든 단어를 하나의 배열로 합침
    var allWords = words1.concat(words2);

// 합집합을 구함 (중복된 단어 제거)
    var union = Array.from(new Set(allWords));

// 문장의 단어를 동적으로 HTML로 생성하여 문서에 추가
    var sentence1Div = document.getElementById("tokenized_sentence1");
    while (sentence1Div.firstChild) {
        sentence1Div.removeChild(sentence1Div.firstChild);
    }
    words1.forEach(function(word) {
        var wordSpan = document.createElement("span");
        wordSpan.textContent = word;
        wordSpan.classList.add("word");
        sentence1Div.appendChild(wordSpan);
    });


    var sentence2Div = document.getElementById("tokenized_sentence2");
    while (sentence2Div.firstChild) {
        sentence2Div.removeChild(sentence2Div.firstChild);
    }
    words2.forEach(function(word) {
        var wordSpan = document.createElement("span");
        wordSpan.textContent = word;
        wordSpan.classList.add("word");
        sentence2Div.appendChild(wordSpan);
    });


// 합집합을 HTML로 생성하여 문서에 추가
    var unionDiv = document.getElementById("unioned_sentence");
    while (unionDiv.firstChild) {
        unionDiv.removeChild(unionDiv.firstChild);
    }
    union.forEach(function(word) {
        var wordSpan = document.createElement("span");
        wordSpan.textContent = word;
        wordSpan.classList.add("word");

        // 단어가 첫 번째 문장에 포함되어 있는지 확인
        if (words1.includes(word)) {
            wordSpan.classList.add("word-sentence1");
        }
        // 단어가 두 번째 문장에 포함되어 있는지 확인
        if (words2.includes(word)) {
            wordSpan.classList.add("word-sentence2");
        }

        unionDiv.appendChild(wordSpan);
    });
}

// 초기 라벨과 데이터 설정
let labels1 = Object.keys(relativePreparedVector1);
let data1 = Object.values(relativePreparedVector1);
let labels2 = Object.keys(relativePreparedVector2);
let data2 = Object.values(relativePreparedVector2);

// 차트 생성 함수
function createChart(id, label, data) {
    const ctx = document.getElementById(id).getContext('2d');
    const config = {
        type: 'bar',
        // type: 'doughnut', // 원형 그래프로 설정

        data: {
            labels: label,
            datasets: [{
                label: 'Relative Frequency',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const myChart = new Chart(ctx, config);

    return myChart;
}

// 차트 생성 함수
function createDoughnutChart(id, label, data) {
    const ctx = document.getElementById(id).getContext('2d');
    const config = {
        // type: 'bar',
        type: 'doughnut', // 원형 그래프로 설정

        data: {
            labels: label,
            datasets: [{
                label: 'Relative Frequency',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const myChart = new Chart(ctx, config);

    return myChart;
}

// 초기 차트 생성
let myChart1 = createChart("myChart1", labels1, data1);
let myChart2 = createChart("myChart2", labels2, data2);
// 초기 차트 생성
let myDoughnutChart1 = createDoughnutChart("myDoughnutChart1", labels1, data1);
let myDoughnutChart2 = createDoughnutChart("myDoughnutChart2", labels2, data2);

// 라벨과 데이터 업데이트 함수
function updateChart(myChart, newLabels, newData) {
    myChart.data.labels = newLabels;
    myChart.data.datasets[0].data = newData;
    myChart.update();
}
function vetorization(){
    var sentence1 = document.getElementById("sentence1").value;
    var sentence2 = document.getElementById("sentence2").value;

    ////
    var words1 = sentence1.split(" ").filter(function(word) {
        return word !== "";
    });
    var words2 = sentence2.split(" ").filter(function(word) {
        return word !== "";
    });
    // var words2 = sentence2.split(" ");

// 두 문장의 모든 단어를 하나의 배열로 합침
    var allWords = words1.concat(words2);
// 합집합을 구함 (중복된 단어 제거)
    var union = Array.from(new Set(allWords));
    // console.log(words1);
    // console.log(words2);
    // console.log(union);


    var preparedVector1 = makePreparedVector(words1, union);
    var preparedVector2 = makePreparedVector(words2, union);
    // console.log(preparedVector1);
    // console.log(preparedVector2);

// 결과를 HTML로 출력
    var vectorizedSentence1Div = document.getElementById("VectorizedUserSentence1");
    var vectorizedSentence2Div = document.getElementById("VectorizedUserSentence2");
    vectorizedSentence1Div.textContent = JSON.stringify(preparedVector1);
    vectorizedSentence2Div.textContent = JSON.stringify(preparedVector2);

    var relativePreparedUserVector1 = makeRelativePreparedVector(words1, union);
    var relativePreparedUserVector2 = makeRelativePreparedVector(words2, union);
// 각 상대도수를 반올림하여 소수점 둘째 자리까지 표시
    for (const word in relativePreparedUserVector1) {
        relativePreparedUserVector1[word] = Math.round(relativePreparedUserVector1[word] * 100) / 100;
    }
    for (const word in relativePreparedUserVector2) {
        relativePreparedUserVector2[word] = Math.round(relativePreparedUserVector2[word] * 100) / 100;
    }

// 결과를 HTML로 출력
    var relativeVectorizedUserSentence1Div = document.getElementById("RelativeVectorizedUserSentence1");
    var relativeVectorizedUserSentence2Div = document.getElementById("RelativeVectorizedUserSentence2");
    relativeVectorizedUserSentence1Div.textContent = JSON.stringify(relativePreparedUserVector1);
    relativeVectorizedUserSentence2Div.textContent = JSON.stringify(relativePreparedUserVector2);



    const labels1 = Object.keys(relativePreparedUserVector1);
    const data1 = Object.values(relativePreparedUserVector1);
    const labels2 = Object.keys(relativePreparedUserVector2);
    const data2 = Object.values(relativePreparedUserVector2);

    updateChart(myChart1, labels1, data1);
    updateChart(myChart2, labels2, data2);

    updateChart(myDoughnutChart1, labels1, data1);
    updateChart(myDoughnutChart2, labels2, data2);
}