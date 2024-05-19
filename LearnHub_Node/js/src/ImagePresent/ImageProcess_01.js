import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "\"이번 시간에는 마법서에 기록한 이미지에 특별한 처리를 하는 방법을 배울 것입니다.\"",
    "\"마법의 힘을 이용하여 시각적 처리를 하는 법을 배워 봅시다.\"",
    "이를 통해 우리는 더욱 풍부하고 다양한 이미지를 창조하고, 마법의 세계에서 새로운 모험을 떠날 수 있습니다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
