import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "오늘 수업을 잘 마무리했습니다, 마법사 여러분.",
    "확률과 베이지안 정리는 마법뿐만 아니라 일상에서도 매우 유용한 도구입니다.",
    "복습을 통해 오늘 배운 내용을 확실히 다지시길 바랍니다.",
    "다음 시간에는 더 흥미로운 마법 이론을 다룰 예정이니 기대해 주세요.",
    "질문이나 도움이 필요하면 언제든지 찾아오세요.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
