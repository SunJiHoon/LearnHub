import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/MagicUniv/supply_welcome.jfif",
    "/assets/images/MagicUniv/supply_welcome.jfif",
    "/assets/images/MagicUniv/supply_welcome.jfif",
    "/assets/images/MagicUniv/supply_welcome.jfif",
    "/assets/images/MagicUniv/supply_welcome.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "\"수업이 너무 어려웠나요?\n\"",
    "\"걱정하지 마세요. 지금까지 말씀드린 부분은 저희가 마법대학교에서 무엇을 학습할 것인지 대해 개요를 간략하게 설명 드린 것입니다.\n\"",
    "\"이후 단원에서 다시 한 번 더 자세히 설명 드릴 것이니 다음 수업을 기대해주세요!\n\"",
    "\"오늘은 너무 수고하셨습니다.\"",
    "\"앞으로도 함께 열정적으로 공부해나가요!\" 조교 우드우드가 마무리하며 학생들에게 미소를 지어 보냈다.\n",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
