import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "오늘 우리는 이미지 분류를 위한 인공지능의 수학적 방법을 자세히 이해했습니다. ",
    "특히, 컨볼루션 신경망의 구조와 작동 원리에 대해 배웠고, 이미지 데이터가 모델에 의해 어떻게 처리되는지 알게 되었습니다. ",
    "이제 여러분도 직접 이미지 분류 모델을 설계하고 구현할 수 있을 것입니다.",
    
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
