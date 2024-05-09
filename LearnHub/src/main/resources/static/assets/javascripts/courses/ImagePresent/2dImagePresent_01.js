const images =
    [
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
        "/assets/images/ImagePresent/summonMagic.jfif",
    ]; // 전환할 이미지들의 경로
const texts = [
    "RGB 채널과 행렬에 관한 수업이 진행되고 있다.",
    "수업 중 우드루이 교수가 말씀하셨다.",
    "\"이 방법은 더 정교한 마법 기술로, 물건의 세부적인 속성과 색상까지 저장할 수 있습니다.\"",
    "\"먼저, 마법서의 페이지에는 물건의 RGB 채널 값을 행렬 형태로 저장합니다.\"",
    "\"각각의 채널은 물건의 색상을 나타내며," +
    " 행렬은 그것들을 조합하여 물건의 전체 색상을 나타냅니다.\"",
    "\"이러한 행렬은 물건의 색상을 완벽하게 재현할 수 있도록 합니다.\"",
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