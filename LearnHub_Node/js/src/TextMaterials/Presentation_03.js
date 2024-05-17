import { tokenSet, tokenToOneHot, tokenize, updateOneHotTable } from "../../lib/text";

document.addEventListener('DOMContentLoaded', () => {
    const
        sentence = document.getElementById('sentence'),
        result = document.getElementById('result');
    function updatePlayground() {
        const
            text = sentence.value,
            tokens = tokenize(text),
            set = tokenSet(tokens),
            children = [];
        for(const token of tokens) {
            const
                subtitle = document.createElement('p'),
                table = document.createElement('table'),
                vector = tokenToOneHot(set, token);
            subtitle.className = 'rounded-skyblue';
            subtitle.textContent = token;
            updateOneHotTable(table, vector);
            children.push(subtitle, table);
        }
        result.replaceChildren(...children);
    }

    sentence.addEventListener('input', updatePlayground);
    updatePlayground();
});
