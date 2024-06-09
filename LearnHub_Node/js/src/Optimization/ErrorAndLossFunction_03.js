import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "강의가 끝난 후, 우드루이 교수는 학생들에게 감사를 전하며 말했다.",
    "\"머신 러닝의 세계를 함께 탐험한 시간이었습니다. 이제 여러분은 마법과 과학을 결합하여 더 나은 미래를 창조할 준비가 되었습니다. 계속해서 배움의 여정을 이어나가세요!\"",
    "학생들은 환호하며 교실을 나왔고, 우드루이 교수는 미소를 지으며 그들의 떠난 뒤를 바라보았다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
