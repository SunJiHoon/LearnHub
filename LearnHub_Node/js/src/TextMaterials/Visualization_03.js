function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', () => {
    const
        draggable1 = document.getElementById('draggable1'),
        draggable2 = document.getElementById('draggable2'),
        dropzone1 = document.getElementById('dropzone1'),
        dropzone2 = document.getElementById('dropzone2');
    const chickenImg = document.getElementById('chickenImg');

    function drop(event) {
        event.preventDefault();

        const
            data = event.dataTransfer.getData('text'),
            draggedElement = document.getElementById(data),
            newSrc = draggedElement.id === 'draggable1'
                ? '/assets/images/TextMaterials/chick.jpg'
                : '/assets/images/TextMaterials/chicken_food.jpg';
        chickenImg.src = newSrc;

        // dropzone2에 있는 모든 자식 요소를 dropzone1로 이동
        for(const child of dropzone2.children)
            if(child.id == 'draggable1' || child.id == 'draggable2')
                dropzone1.append(child);
        dropzone2.append(draggedElement);
    }

    draggable1.addEventListener('dragstart', dragStart);
    draggable2.addEventListener('dragstart', dragStart);

    dropzone1.appendChild(draggable1);
    dropzone1.appendChild(draggable2);

    // dropzone1.addEventListener('dragover', dragOver);
    // dropzone1.addEventListener('drop', drop);

    dropzone2.addEventListener('dragover', dragOver);
    dropzone2.addEventListener('drop', drop);
});