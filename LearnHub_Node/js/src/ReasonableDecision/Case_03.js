import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "오늘 우리가 다룬 주제 중에 특히 바둑 게임에 대해 어떻게 생각하셨나요? ",
    "인공지능이 바둑에서 최적의 수를 결정하는 방식이 정말 흥미롭지 않았나요?",
    "바둑은 전략과 패턴 인식을 요구하는 게임으로, 인공지능이 바둑에서 우리에게 어떻게 최적화된 의사 결정을 보여주는지에 대한 좋은 벤치마크가 될 수 있습니다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
