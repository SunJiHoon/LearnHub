const images =
    [
        "/assets/images/ImagePresent/WoodRou_edu_picture.jpg",
        "/assets/images/ImagePresent/WoodRou_edu_picture.jpg",
        "/assets/images/ImagePresent/WoodRou_edu_picture.jpg",

        "/assets/images/ImagePresent/WoodRou_edu_picture_blackAndWhite.jpg",
        "/assets/images/ImagePresent/WoodRou_edu_picture_blackAndWhite.jpg",
        "/assets/images/ImagePresent/WoodRou_edu_picture_blackAndWhite.jpg",
        "/assets/images/ImagePresent/WoodRou_edu_picture_blackAndWhite.jpg",
        "/assets/images/ImagePresent/WoodRou_edu_picture_blackAndWhite.jpg",

        "/assets/images/ImagePresent/WoodRou_edu_picture_blackAndWhite.jpg",
        "/assets/images/ImagePresent/WoodRou_edu_picture_blackAndWhite.jpg",
    ]; // 전환할 이미지들의 경로
const texts = [
    "마법학교의 강의실 안에서, 우드로우 교수님이 이미지 자료의 표현과 처리에 대해 설명하고 있었다.",
    " \"이미지 자료의 표현은 마법적인 방식으로 이루어져 있어요,\" 우드로우 교수님이 말했다. ",
    "\"마치 마법의 색채와 빛의 반응을 이용하여 이미지를 그리듯이, 우리는 이미지를 행렬로 표현할 수 있어요.\"",

    "그러던 중 갑자기 강의실 안의 모든 색이 사라졌다. 학생들은 놀란 표정으로 주변을 둘러보았다. ",
    "그 순간, 우드로우 교수님이 눈에 띄게 실망한 표정으로 강의를 중단했다.",
    "\"아니요, 또 색깔이 사라졌어요. 이번에는 악마 마법사 마사의 짓이겠군요.\"",
    "학생들은 주변을 살펴보았다. ",
    "강의실 안에는 흑백으로 변한 이미지들이 여기저기 흩어져 있었다. ",

    "우드로우 교수님이 머리를 긁적거리며 말했다. ",
    "\"우리가 해야 할 일은 각자의 이미지에 올바른 색깔을 되찾는 것이에요.\" ",
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