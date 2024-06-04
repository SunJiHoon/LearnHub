function calculateSimilarity() {
    // Get the words from the input fields
    const positiveWords = document.getElementById('positiveWords').value.split(' ').map(word => word.trim());
    const negativeWords = document.getElementById('negativeWords').value.split(' ').map(word => word.trim());
    const userSentence = document.getElementById('userSentence').value.split(' ').map(word => word.trim());

    // Create sets from the words
    const positiveSet = new Set(positiveWords);
    const negativeSet = new Set(negativeWords);
    const userSet = new Set(userSentence);

    // Calculate the intersection and union for positive words
    const positiveIntersection = new Set([...positiveSet].filter(word => userSet.has(word)));
    const positiveUnion = new Set([...positiveSet, ...userSet]);
    const positiveJaccardSimilarity = positiveIntersection.size / positiveUnion.size;

    // Calculate the intersection and union for negative words
    const negativeIntersection = new Set([...negativeSet].filter(word => userSet.has(word)));
    const negativeUnion = new Set([...negativeSet, ...userSet]);
    const negativeJaccardSimilarity = negativeIntersection.size / negativeUnion.size;

    // Calculate the difference
    const similarityDifference = positiveJaccardSimilarity - negativeJaccardSimilarity;

    // Display the result with formulas
    document.getElementById('result').innerText =
        `J(P, X) = n(P ∩ X) / n(P ∪ X) = ${positiveIntersection.size} / ${positiveUnion.size} = ${positiveJaccardSimilarity.toFixed(2)}\n` +
        `J(N, X) = n(N ∩ X) / n(N ∪ X) = ${negativeIntersection.size} / ${negativeUnion.size} = ${negativeJaccardSimilarity.toFixed(2)}\n` +
        `J(P, X) - J(N, X) = ${positiveJaccardSimilarity.toFixed(2)} - ${negativeJaccardSimilarity.toFixed(2)} = ${similarityDifference.toFixed(2)}`;
}
