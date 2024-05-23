import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "\"여기, 이 마법책을 받아라,\" 우드로우 교수가 말했다. ",
    "\"이 마법책은 텍스트와 이미지를 마법적으로 처리할 수 있는 책이다.\"",
    "\"이 책은 그저 읽는 것이 아니라, 그 내용을 마법으로 저장할 수 있는 마법력을 지니고 있지.\"\n",
    "\"지금부터 단어 의미나 이미지들을 마법서에 저장하고, 그것들을 마법처럼 활용하는 법을 배워보자.\"\n",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
