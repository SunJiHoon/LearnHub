import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로


const texts = [
    "\"이러한 개념들을 배운 후에는, 수와 수학 기호로 표현된 텍스트 자료를 처리하는 수학 원리를 이해하고, 그 자료를 시각화할 수 있을 겁니다.\"",
    "\"이를 통해 텍스트 데이터를 보다 효과적으로 분석하고 이해할 수 있게 될 것입니다.\"\n",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
