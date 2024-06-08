import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "여러분, 오늘 우리는 데이터의 경향성을 직선과 곡선으로 예측하는 방법을 배웠습니다.",
    "이 지식을 사용하면 데이터의 미래 값을 예측할 수 있는 강력한 도구를 가지게 된 것입니다.",
    "수업을 마치기 전에, 항상 데이터를 신중하게 분석하고, 다양한 모델을 시도해보세요.",
    "질문이 있거나 더 알고 싶은 부분이 있다면 언제든지 찾아오세요.",
    "훌륭한 마법사가 되기 위해 계속해서 노력하세요!",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
