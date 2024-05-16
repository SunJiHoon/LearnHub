import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/MagicUniv/supply_welcome.jfif",
    "/assets/images/MagicUniv/supply_welcome.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "마법학교의 조교 우드우드가 모두를 환영하는 소리를 내고 강의실에 들어섰다. ",
    "\"여러분, 오늘은 특별한 주제를 준비했습니다. 마법의 세계에서 우드로우 교수님이 선보이신 마법을 함께 살펴보겠습니다.\"",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
