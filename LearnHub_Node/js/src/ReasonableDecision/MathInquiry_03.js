import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "오늘 실습하느라 수고 많으셨어요! 여러분의 열정적인 참여로 인공지능 수학에 대한 이해를 높일 수 있었습니다.",
    "앞으로도 계속해서 인공지능 수학 학습을 응원하고 함께 노력해 나가겠습니다.",
    "함께 공부하며 더 많은 지식을 습득하고 발전해 나가는 모습을 기대합니다!",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
