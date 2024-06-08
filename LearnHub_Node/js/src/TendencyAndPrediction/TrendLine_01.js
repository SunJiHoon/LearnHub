import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "여러분, 오늘은 마법과 인공지능이 만나는 흥미로운 주제를 다루겠습니다.",
    "우리는 데이터의 경향성을 직선과 곡선으로 예측하는 방법을 배울 것입니다.",
    "마치 미래를 예측하는 마법처럼, 우리는 수학과 코드를 사용해 예측을 할 것입니다. ",
    "준비되셨나요? 자, 이제 데이터 속에 숨겨진 마법을 찾아 떠나봅시다!",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
