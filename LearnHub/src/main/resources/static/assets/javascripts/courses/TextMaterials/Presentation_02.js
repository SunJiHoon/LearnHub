// 문장들을 변수에 저장
var preparedSentence1 = "The dog wants a walk";
var preparedSentence2 = "The cat wants to go home";

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

var cosineSimilarityDiv = document.getElementById("PreparedResult");
cosineSimilarityDiv.textContent = cosineSimilarity(preparedVector1, preparedVector2);


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

// 함수: 두 벡터의 코사인 유사도 계산
function cosineSimilarity(vector1, vector2) {
    var dotProduct = 0;
    var magnitude1 = 0;
    var magnitude2 = 0;
    for (var word in vector1) {
        if (vector2.hasOwnProperty(word)) {
            dotProduct += vector1[word] * vector2[word];
        }
        magnitude1 += vector1[word] ** 2;
    }
    for (var word in vector2) {
        magnitude2 += vector2[word] ** 2;
    }
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);
    return dotProduct / (magnitude1 * magnitude2);
}



















// 함수: 문장을 빈도수 벡터로 변환
function vectorize(sentence) {
    var words = sentence.split(" ");

    var vector = {};
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word !== "") {
            vector[word] = (vector[word] || 0) + 1;
        }
    }
    return vector;
}



// 함수: 입력값 변화에 따라 유사도 계산 및 결과 출력
function calculateSimilarity() {
    var sentence1 = document.getElementById("sentence1").value;
    var sentence2 = document.getElementById("sentence2").value;

    // 문장을 빈도수 벡터로 변환
    var vector1 = vectorize(sentence1);
    var vector2 = vectorize(sentence2);
    console.log(vector1)
    // 두 벡터의 코사인 유사도 계산
    var similarity = cosineSimilarity(vector1, vector2);

    // 결과를 HTML 요소로 출력
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var similarityDiv = document.createElement("div");
    similarityDiv.textContent = "Cosine similarity: " + similarity;
    resultDiv.appendChild(similarityDiv);
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

    var cosineSimilarityDiv = document.getElementById("PreparedResult");
    cosineSimilarityDiv.textContent = cosineSimilarity(preparedVector1, preparedVector2);


}