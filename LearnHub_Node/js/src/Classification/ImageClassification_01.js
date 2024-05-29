import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "image",
    "수업",
    "시작",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
