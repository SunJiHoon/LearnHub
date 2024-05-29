function calculateSimilarity() {
    const positiveWordsInput = document.getElementById('positiveWords').value;
    const negativeWordsInput = document.getElementById('negativeWords').value;
    const userSentence = document.getElementById('userSentence').value;

    // 긍정 단어와 부정 단어를 합집합으로 벡터 생성
    const allWords = [...new Set(positiveWordsInput.split(' ').concat(negativeWordsInput.split(' ')))];
    const positiveWords = positiveWordsInput.split(' ').map(word => word.trim()).filter(word => word);
    const negativeWords = negativeWordsInput.split(' ').map(word => word.trim()).filter(word => word);
    const inputWords = userSentence.split(' ').map(word => word.trim()).filter(word => word);

    const positiveVector = createFrequencyVector(positiveWords, allWords);
    const negativeVector = createFrequencyVector(negativeWords, allWords);
    const inputVector = createFrequencyVector(inputWords, allWords);

    console.log(positiveVector);
    console.log(negativeVector);
    console.log(inputVector);


    const positiveEuclidean = euclideanDistance(positiveVector, inputVector);
    const positiveCosine = cosineSimilarity(positiveVector, inputVector);

    const negativeEuclidean = euclideanDistance(negativeVector, inputVector);
    const negativeCosine = cosineSimilarity(negativeVector, inputVector);

    document.getElementById('results').innerHTML = `
        <p><strong>긍정 단어 집합과의 유클리디안 유사도:</strong> ${positiveEuclidean.toFixed(2)}</p>
        <p><strong>긍정 단어 집합과의 코사인 유사도:</strong> ${positiveCosine.toFixed(2)}</p>
        <p><strong>부정 단어 집합과의 유클리디안 유사도:</strong> ${negativeEuclidean.toFixed(2)}</p>
        <p><strong>부정 단어 집합과의 코사인 유사도:</strong> ${negativeCosine.toFixed(2)}</p>
        <p><strong>입력 벡터:</strong> ${JSON.stringify(inputVector)}</p>
        <p><strong>긍정 단어 집합 벡터:</strong> ${JSON.stringify(positiveVector)}</p>
        <p><strong>부정 단어 집합 벡터:</strong> ${JSON.stringify(negativeVector)}</p>
    `;
}


function createFrequencyVector(words, allWords) {
    const frequencyVector = {};
    allWords.forEach(word => {
        frequencyVector[word] = 0;
    });
    words.forEach(word => {
        frequencyVector[word]++;
    });
    return frequencyVector;
}

function euclideanDistance(vector1, vector2) {
    let sum = 0;
    for (let key in vector1) {
        if (vector2.hasOwnProperty(key)) {
            sum += Math.pow(vector1[key] - vector2[key], 2);
        } else {
            sum += Math.pow(vector1[key], 2);
        }
    }
    for (let key in vector2) {
        if (!vector1.hasOwnProperty(key)) {
            sum += Math.pow(vector2[key], 2);
        }
    }
    return Math.sqrt(sum);
}

function cosineSimilarity(vector1, vector2) {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let key in vector1) {
        if (vector2.hasOwnProperty(key)) {
            dotProduct += vector1[key] * vector2[key];
        }
        magnitude1 += Math.pow(vector1[key], 2);
    }

    for (let key in vector2) {
        magnitude2 += Math.pow(vector2[key], 2);
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    return dotProduct / (magnitude1 * magnitude2);
}
