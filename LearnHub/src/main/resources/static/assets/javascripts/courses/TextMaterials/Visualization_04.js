const images =
    [
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
    ]; // 전환할 이미지들의 경로


const texts = [
    "\"지금까지 우리는 상대도수와 임베딩 벡터에 대해 함께 배워왔습니다. 상대도수와 임베딩 벡터에 대해 잘 이해하고 있는지 확인해보도록 하죠.\"\n",
    "\"먼저, 상대도수에 대해 말씀드리겠습니다. 상대도수는 단어의 등장 빈도를 전체 단어 수로 나눈 값으로, 특정 단어가 전체 텍스트에서 얼마나 자주 등장하는지를 상대적으로 나타냅니다.\"\n",
    "\"그리고 다음으로, 임베딩 벡터에 대해 이야기해보죠. 임베딩 벡터는 단어를 고차원 공간에 벡터로 매핑하여 단어의 의미와 유사성을 보존하는 것입니다. 이러한 개념을 잘 이해하고 계신가요?\"\n",
    "\"이 두 가지 개념에 대해 잘 이해하고 있다면, 텍스트를 마법적으로 처리하는 데 필요한 핵심 기술을 마스터한 것입니다. 지금까지 잘 따라와 주셔서 감사합니다.\"\n",
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