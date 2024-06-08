import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "마법사 여러분, 오늘은 확률과 베이지안 정리라는 마법의 수학적 개념을 탐구해보겠습니다.",
    "확률은 마법 주문의 성공 가능성을 예측하는 데 매우 중요합니다.",
    "특히, 베이지안 정리는 새로운 정보를 통해 우리의 예측을 더욱 정확하게 만드는 강력한 도구입니다.",
    "이번 수업에서는 이론뿐만 아니라, 스팸 메일을 마법적으로 판별하는 방법도 실습해보겠습니다.",
    "질문이 있으면 언제든지 손을 들어 주세요, 궁금한 점을 모두 풀어드리겠습니다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
