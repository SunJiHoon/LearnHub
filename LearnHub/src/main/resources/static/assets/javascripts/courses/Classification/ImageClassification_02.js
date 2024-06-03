function getValuesFromTable(tableId) {
    const table = document.getElementById(tableId);
    const values = [];
    const selects = table.getElementsByTagName('select');

    for (let i = 0; i < selects.length; i++) {
        values.push(parseInt(selects[i].value, 10));
    }

    return values;
}

function calculateHammingDistance() {
    const s1 = getValuesFromTable('s1');
    const s2 = getValuesFromTable('s2');

    if (!s1 || !s2) {
        return;
    }

    let hammingDistance = 0;
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) {
            hammingDistance++;
        }
    }

    document.getElementById('result').innerText = '해밍 거리: ' + hammingDistance;
}
