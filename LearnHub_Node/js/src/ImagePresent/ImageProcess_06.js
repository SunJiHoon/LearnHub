import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "\"오늘의 수업에서는 이미지 프로세싱의 기초를 깊이 있게 학습하고, 이를 소환마법과 연계하여 창의적으로 활용하는 방법을 탐구했습니다.\"",
    "\"이미지 프로세싱은 마법의 세계에서 놀라운 가능성을 제공하며, 우리는 마법진을 통해 이미지를 수정하고 조작하여 새로운 시각적 경험을 창출할 수 있습니다.\"",
    "\"이를 통해 우리는 더욱 풍부한 창의력과 마법의 능력을 발휘할 수 있게 되었습니다.\"" ,
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
