const images =
    [
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
    ]; // 전환할 이미지들의 경로


const texts = [
    "\"여기, 이 마법책을 받아라,\" 우드로우 교수가 말했다. ",
    "\"이 마법책은 텍스트와 이미지를 마법적으로 처리할 수 있는 책이다.\"",
    "\"이 책은 그저 읽는 것이 아니라, 그 내용을 마법으로 저장할 수 있는 마법력을 지니고 있지.\"\n",
    "\"지금부터 단어 의미나 이미지들을 마법서에 저장하고, 그것들을 마법처럼 활용하는 법을 배워보자.\"\n",
]; // 이미지에 대응하는 텍스트

let currentImageIndex = 0;
const canvas = document.getElementById('imageCanvas');
const dialogueBox = document.getElementById('dialogueBox');

const ctx = canvas.getContext('2d');

function changeImage() {
    if (currentImageIndex < images.length - 1){
        currentImageIndex += 1
        drawImage();
        addDialogue(texts[currentImageIndex], 'assistant');
    }
    // currentImageIndex = (currentImageIndex + 1) % images.length;
}

function drawImage() {
    const img = new Image();
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // // 텍스트 출력
        // ctx.fillStyle = 'white';
        // ctx.font = '24px Arial';
        // ctx.fillText(texts[currentImageIndex], 20, 30);
    };
    img.src = images[currentImageIndex];
}
function addDialogue(message, speaker) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (speaker === 'user') {
        messageElement.classList.add('user');
    } else if (speaker === 'assistant') {
        messageElement.classList.add('assistant');
    }
    messageElement.textContent = message+"\n";
    messageElement.setAttribute('style', 'color: black;');
    dialogueBox.appendChild(messageElement);
    dialogueBox.scrollTop = dialogueBox.scrollHeight;
}

// 초기 이미지 그리기
drawImage();
addDialogue(texts[currentImageIndex], 'assistant');