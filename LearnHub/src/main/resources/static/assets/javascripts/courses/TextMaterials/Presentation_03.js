function tokenizeSentence(sentence) {
    // 입력된 문장을 공백을 기준으로 단어로 나누고, 중복된 단어를 제거합니다.
    var words = sentence.split(" ").filter(function(word) {
        return word !== "";
    });
    return words;
}

function vectorize(words) {
    var uniqueWords = Array.from(new Set(words)); // 중복된 단어를 제거하여 유일한 단어 목록을 생성합니다.
    var vector = {};
    uniqueWords.forEach(function(word, index) {
        var oneHotVector = Array(uniqueWords.length).fill(0); // 모든 요소가 0인 배열을 생성합니다.
        oneHotVector[index] = 1; // 해당 단어의 위치에 1을 할당하여 원핫 인코딩을 수행합니다.
        vector[word] = oneHotVector;
    });
    return vector;
}

function displayOneHotEncoding(oneHotVector) {
    var resultDiv = document.getElementById("oneHotEncodingResult");
    resultDiv.innerHTML = ""; // 결과를 초기화합니다.

    // 각 단어와 해당 원핫 인코딩을 표시합니다.
    for (var word in oneHotVector) {
        var p = document.createElement("p");
        p.textContent = word + ": [" + oneHotVector[word].join(", ") + "]";
        resultDiv.appendChild(p);
    }
}

document.getElementById("sentence1").addEventListener("input", function() {
    var sentence = this.value;
    var words = tokenizeSentence(sentence);
    var oneHotVector = vectorize(words);
    displayOneHotEncoding(oneHotVector);
});
var sentence = "고양이 강아지 햄스터"
var words = tokenizeSentence(sentence);
var oneHotVector = vectorize(words);
displayOneHotEncoding(oneHotVector);
