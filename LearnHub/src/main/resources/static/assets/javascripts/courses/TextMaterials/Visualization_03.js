function toggleParagraph() {
    var content = document.getElementById("content");
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}



const draggable1 = document.getElementById('draggable1');
const draggable2 = document.getElementById('draggable2');
const dropzone1 = document.getElementById('dropzone1');
const dropzone2 = document.getElementById('dropzone2');
// 이미지 요소 선택
const chickenImg = document.getElementById('chickenImg');


draggable1.addEventListener('dragstart', dragStart);
draggable2.addEventListener('dragstart', dragStart);

dropzone1.appendChild(draggable1);
dropzone1.appendChild(draggable2);


// dropzone1.addEventListener('dragover', dragOver);
// dropzone1.addEventListener('drop', drop);

dropzone2.addEventListener('dragover', dragOver);
dropzone2.addEventListener('drop', drop);

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    if( draggedElement.id === "draggable1"){
        // 새로운 이미지 경로 설정
        let newSrc = '/assets/images/TextMaterials/chick.jpg';
        chickenImg.src = newSrc;
    }
    else{
        let newSrc = '/assets/images/TextMaterials/chicken_food.jpg';
        chickenImg.src = newSrc;
    }
    // event.target.appendChild(draggedElement);
    // dropzone2에 있는 모든 자식 요소를 dropzone1로 이동
    while (dropzone2.lastChild) {
        const lastChild = dropzone2.lastChild;
        if (lastChild.id === "draggable1" || lastChild.id === "draggable2") {
            dropzone1.appendChild(lastChild);
        } else {
            break; // 드래그 가능한 요소가 아닌 경우 종료
        }
    }

    dropzone2.appendChild(draggedElement);

}
