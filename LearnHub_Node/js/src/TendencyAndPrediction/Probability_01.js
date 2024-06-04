import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    // "/assets/images/TextMaterials/magicBook.jfif",
    // "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "확률을 이용한 예측 시작",
    "시작",
    // "\"이 책은 그저 읽는 것이 아니라, 그 내용을 마법으로 저장할 수 있는 마법력을 지니고 있지.\"\n",
    // "\"지금부터 단어 의미나 이미지들을 마법서에 저장하고, 그것들을 마법처럼 활용하는 법을 배워보자.\"\n",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
