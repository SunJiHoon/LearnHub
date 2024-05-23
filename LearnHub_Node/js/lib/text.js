export function tokenize(str) {
	return str.split(/\s/g).filter(x => x);
}

export function tokenSet(...arrs) {
	const result = new Set();
	for(const tokens of arrs)
		for(const token of tokens)
			result.add(token);
	return result;
}

function buildColumnMap(columns) {
	const result = new Map();
	let i = 0;
	for(const x of columns)
		result.set(x, i++);
	return result;
}

export function toFrequencyVector(columnsIter, tokens) {
	const
		columns = [...columnsIter],
		columnMap = buildColumnMap(columns),
		frequency = columns.map(() => 0);
	for(const token of tokens)
		frequency[columnMap.get(token)]++;
	return { columns, frequency };
}

export function tokenToOneHot(columnsIter, token) {
	const
		columns = [...columnsIter],
		frequency = columns.map(() => 0),
		index = columns.findIndex(x => x === token);
	if(index != -1)
		frequency[index]++;
	return { columns, frequency };
}

export function vectorToRelativeFrequency(vec) {
	const
		{ columns, frequency } = vec,
		denomRaw = frequency.reduce((acc, x) => acc + x, 0),
		denom = Number.isNaN(denomRaw) ? 1 : denomRaw;
	return {
		columns,
		frequency: frequency.map(x => x/denom),
	};
}

export function cosineSimilarity(vec1, vec2) {
	const
		freq1 = vec1.frequency,
		freq2 = vec2.frequency;
	return freq1
		.map((x, i) => x*freq2[i])
		.reduce((acc, x) => acc + x, 0)
		/Math.hypot(...freq1)
		/Math.hypot(...freq2);
}

export function updateTokens(elem, tokens) {
	let
		current = elem.firstElementChild,
		count = 0;
	const newElementFragment = new DocumentFragment();
	for(const token of tokens) {
		if(current === null) {
			const
				outer = document.createElement('div'),
				inner = document.createElement('div'),
				animDurationOuter = 5*Math.random() + 3,
				animDurationInner = 5*Math.random() + 3;
			outer.className = 'token-outer';
			outer.style.animation = `${animDurationOuter}s ease-in-out ${-Math.random()*animDurationOuter}s infinite alternate none running float-y`;
			inner.className = 'token-inner';
			inner.style.animation = `${animDurationInner}s ease-in-out ${-Math.random()*animDurationInner}s infinite alternate none running float-theta`;
			outer.append(inner);
			newElementFragment.append(outer);
			current = outer;
		}
		current.firstElementChild.textContent = token;
		count++;
		current = current.nextElementSibling;
	}
	for(let i = elem.childElementCount; i > count; i--)
		elem.lastElementChild.remove();
	elem.append(newElementFragment);
}

export function updateVectorTable(table, vector) {
	const
		head = document.createElement('tr'),
		body = document.createElement('tr');
	for(const column of vector.columns) {
		const td = document.createElement('th');
		td.textContent = column;
		head.append(td);
	}
	for(const data of vector.frequency) {
		const td = document.createElement('td');
		td.textContent = data.toFixed(2);
		body.append(td);
	}
	table.replaceChildren(head, body);
}

export function updateOneHotTable(table, vector) {
	const
		head = document.createElement('tr'),
		body = document.createElement('tr');
	for(const column of vector.columns) {
		const td = document.createElement('th');
		td.textContent = column;
		head.append(td);
	}
	for(const data of vector.frequency) {
		const td = document.createElement('td');
		td.textContent = data ? '🔥' : '';
		body.append(td);
	}
	table.replaceChildren(head, body);
}
