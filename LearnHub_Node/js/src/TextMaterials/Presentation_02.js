import { cosineSimilarity, toFrequencyVector, tokenSet, tokenize, updateVectorTable, updateTokens } from "../../lib/text";

function updateFields(
    text1, text2,
    eTok1, eTok2, eUnion,
    eVec1, eVec2,
    eSim
) {
    const
        tokens1 = tokenize(text1),
        tokens2 = tokenize(text2),
        allTokens = tokenSet(tokens1, tokens2),
        vector1 = toFrequencyVector(allTokens, tokens1),
        vector2 = toFrequencyVector(allTokens, tokens2),
        similarity = cosineSimilarity(vector1, vector2);
    updateTokens(eTok1, tokens1);
    updateTokens(eTok2, tokens2);
    updateTokens(eUnion, allTokens);
    updateVectorTable(eVec1, vector1);
    updateVectorTable(eVec2, vector2);
    eSim.textContent = Number.isNaN(similarity)
        ? '???'
        : (100*similarity).toFixed(5);
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
        result = document.getElementById('result');
    function updatePlayground() {
        const
            text1 = userInput1.value,
            text2 = userInput2.value;
        updateFields(
            text1, text2,
            sentence1,
            sentence2,
            union,
            vector1,
            vector2,
            result
        );
    }

    userInput1.addEventListener('input', updatePlayground);
    userInput2.addEventListener('input', updatePlayground);

    updatePlayground();
});
