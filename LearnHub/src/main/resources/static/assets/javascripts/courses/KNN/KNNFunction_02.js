const images =
    [
        "/assets/images/KNN/meteor_falling.jfif",
        "/assets/images/KNN/meteor_falling.jfif",

        "/assets/images/KNN/meteor_alien_baby.jfif",
        
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
        "/assets/images/KNN/surprise_students.jfif",
    ]; // 전환할 이미지들의 경로
const texts = [
    "마법기 532년 9월 9일",
    "(마법학교로 운석이 떨어진다.)",
    
    "(운석에서 기어나오는 아기 외계인)",

    "마법학교 교수님 우드로우는 운석이 떨어진 장면을 목격하고 깜짝 놀랐다.",
    "\"어떻게 이런 일이 벌어졌을까요? 이런 일은 처음이네요!\" 우드로우 교수님이 말했다.",
    "그때 운석이 부서지고 외계인이 나타나자, 학생들도 모두 놀란 표정으로 주변을 둘러보았다.",
    "\"와, 우리 외계인을 만났어요!\" 한 학생이 소리쳤다.",
    "우드로우 교수님은 외계인과 대화를 시도했다.",
    " \"안녕하세요, 우리는 마법학교의 학생들과 교수님입니다. 당신을 도와드릴 수 있을까요?\"",
    "\"네, 저희 가족과 고향을 찾고 싶습니다. 저와 같은 종족을 찾고자 여행을 다니고 있습니다.",
    "\"태어날 때부터 고아였습니다. 저는 제가 무슨 종족인지도 모르는 상태입니다.\" 외계인이 말했다.",
    "\"알겠어요, 우리가 도와드리겠습니다.\" 우드로우 교수님이 말했다.",
    "마법학교의 학생들은 외계인의 고향을 찾기 위해 준비한다. ",
    "그들은 마법의 주문과 KNN 알고리즘을 사용하여 우주의 신비한 힘을 이용할 생각이다..",
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