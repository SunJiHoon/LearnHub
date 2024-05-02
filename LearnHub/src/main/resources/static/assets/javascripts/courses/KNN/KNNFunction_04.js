const images =
    [
        "/assets/images/KNN/alien_and_alien_mom.jfif",
        "/assets/images/KNN/alien_and_alien_mom.jfif",

        "/assets/images/KNN/adieu_with_alien.jfif",
        "/assets/images/KNN/adieu_with_alien.jfif",
    ]; // 전환할 이미지들의 경로
const texts = [
    "마침내, 외계인의 고향을 찾아내자 우드로우 교수님은 기쁨의 미소를 지으며 말했다. \"우리가 도와줘서 다행이에요.\"",
    "\"감사합니다. 이젠 우리 고향으로 돌아갈 수 있어요.\" 외계인이 말했다.\n",

    "학생들은 외계인의 우주선이 떠나는 것을 지켜보았다.",
    "그리고 마법학교 교수님은 학생들에게 돌아가는 길에 대해 배우고 더 나은 마법의 지식을 얻기 위해 학생들을 격려했다.",
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