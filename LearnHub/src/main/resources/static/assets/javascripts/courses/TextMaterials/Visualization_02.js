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

}