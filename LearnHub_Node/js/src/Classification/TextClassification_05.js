import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "오늘 우리는 텍스트 분류를 위한 인공지능의 수학적 방법을 깊이 있게 이해했습니다.",
    "텍스트 데이터를 벡터화하고, 이를 머신러닝 모델에 적용하는 과정에서의 핵심 개념들을 배웠습니다.",
    "이제 여러분도 직접 텍스트 분류 모델을 설계하고 구현할 수 있을 것입니다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
