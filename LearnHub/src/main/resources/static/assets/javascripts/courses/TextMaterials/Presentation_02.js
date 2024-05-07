// 문장들을 변수에 저장
var sentence1 = "The dog wants a walk.";
var sentence2 = "The cat wants to go home.";

// 문장을 단어 단위로 나누기
var words1 = sentence1.split(" ");
var words2 = sentence2.split(" ");

// 두 문장의 모든 단어를 하나의 배열로 합침
var allWords = words1.concat(words2);

// 합집합을 구함 (중복된 단어 제거)
var union = Array.from(new Set(allWords));


// 문장의 단어를 동적으로 HTML로 생성하여 문서에 추가
var sentence1Div = document.getElementById("sentence1");
words1.forEach(function(word) {
    var wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    wordSpan.classList.add("word");
    sentence1Div.appendChild(wordSpan);
});

var sentence2Div = document.getElementById("sentence2");
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
