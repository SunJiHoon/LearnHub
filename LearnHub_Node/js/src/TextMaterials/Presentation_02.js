import { cosineSimilarity, toFrequencyVector, tokenSet, tokenize, updateVectorTable, updateTokens } from "../../lib/text";

const
    EXAMPLE_TEXT_1 = 'The dog wants a walk',
    EXAMPLE_TEXT_2 = 'The cat wants to go home';

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

    updateFields(
        EXAMPLE_TEXT_1, EXAMPLE_TEXT_2,
        document.getElementById('prepared-sentence-1'),
        document.getElementById('prepared-sentence-2'),
        document.getElementById('prepared-union'),
        document.getElementById('prepared-vector-1'),
        document.getElementById('prepared-vector-2'),
        document.getElementById('prepared-result')
    );

    userInput1.addEventListener('input', updatePlayground);
    userInput2.addEventListener('input', updatePlayground);

    updatePlayground();
});
