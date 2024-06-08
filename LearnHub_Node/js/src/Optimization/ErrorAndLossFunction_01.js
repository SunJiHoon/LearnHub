import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "우드루이 교수는 마법대학교에서 마법과 머신 러닝을 융합한 강의를 펼쳤다.",
    "학생들은 지도, 비지도, 강화 학습에 대한 신비로운 개념을 알아가며 신이 난 듯이 감탄했다.", 
    "손실 함수는 마법사의 주문과 같아, 모델의 효과를 측정하여 최적의 전략을 찾는 데 도움을 준다.",
    "우드루이 교수의 강의는 마법적인 지식과 현실 세계를 결합해 새로운 시대를 열어간다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
