const images =
    [
        "/assets/images/ImagePresent/retrieveColor_blackAndWhite.jpg",
        "/assets/images/ImagePresent/retrieveColor_blackAndWhite.jpg",
        "/assets/images/ImagePresent/retrieveColor_blackAndWhite.jpg",
        "/assets/images/ImagePresent/retrieveColor_blackAndWhite.jpg",

        "/assets/images/ImagePresent/retrieveColor.jpg",
        "/assets/images/ImagePresent/retrieveColor.jpg",
        "/assets/images/ImagePresent/retrieveColor.jpg",
    ]; // 전환할 이미지들의 경로
const texts = [
    "마법학생들은 마법의 지팡이를 들고 각자의 이미지에 접근했다.",
    "행렬값에 색깔을 넣는 마법 주문을 사용하여 이미지에 색채를 되찾으려고 노력했다.",
    "한 명은 하늘색으로, 다른 한 명은 풀색으로 이미지를 덮었다.",
    "마침내, 모든 이미지가 올바른 색깔로 빛났다. ",

    "우드로우 교수님은 만족한 미소를 지으며 강의를 계속했다. ",
    "\"마법은 우리가 주변을 더 아름답게 만들 수 있도록 도와줘요.\"",
    "\"이제 우리는 이미지 자료의 표현과 처리에 대해 더 깊이 이해할 수 있게 되었어요.\""
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