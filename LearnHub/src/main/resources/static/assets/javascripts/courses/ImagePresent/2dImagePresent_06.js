const images =
    [
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
    ]; // 전환할 이미지들의 경로
const texts = [
    "소환마법을 잘 하게 된 것을 축하하는 우드로이 교수의 모습은 밝고 기쁨 가득하다.",
    "\"소환마법을 잘 다루는 건 참으로 훌륭한 일이야.\"",
    "\"이제 너희는 다양한 존재들과 소통하고, 새로운 모험을 위해 그들을 부르고 지도할 수 있게 되었어.\"\n" +
    "그는 학생들의 성장을 축하하며, RGB 행렬을 통한 소환마법의 능력이 얼마나 중요한지 강조합니다.",
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