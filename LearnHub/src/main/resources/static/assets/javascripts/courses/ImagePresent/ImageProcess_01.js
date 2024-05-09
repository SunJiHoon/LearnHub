const images =
    [
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
    ]; // 전환할 이미지들의 경로
const texts = [
    "\"이번 시간에는 마법서에 기록한 이미지에 특별한 처리를 하는 방법을 배울 것입니다.\"",
    "\"마법의 힘을 이용하여 시각적 처리를 하는 법을 배워 봅시다.\"",
    "이를 통해 우리는 더욱 풍부하고 다양한 이미지를 창조하고, 마법의 세계에서 새로운 모험을 떠날 수 있습니다.",
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