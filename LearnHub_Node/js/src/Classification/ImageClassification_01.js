import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "오늘 우리는 인공지능을 활용하여 이미지를 분류하는 수학적 방법을 탐구할 것입니다.",
    "먼저, 이미지 데이터를 수치화하고 이를 분석하기 위해 사용되는 주요 기법들, 특히 컨볼루션 신경망(CNN)에 대해 알아보겠습니다.",
    " 또한, 이미지 처리 과정에서 중요한 역할을 하는 필터와 활성화 함수의 개념도 함께 살펴볼 것입니다."
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
