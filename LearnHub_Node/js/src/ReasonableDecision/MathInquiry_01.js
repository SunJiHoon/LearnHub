import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    // "/assets/images/TextMaterials/magicBook.jfif",
    // "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "지금껏 우리가 배운 인공지능 수학 개념을 기반으로, 여러분들께 탐구활동을 제안해 보고 싶습니다.",
    "우리는 인공지능이 수학적 문제를 해결하는 능력을 향상시키는 데 어떤 도움을 줄 수 있는지 탐구해 볼 것입니다.",
    "여러분들은 이를 통해 인공지능의 수학적 능력에 대해 더 깊이 이해하고, 그 응용 가능성을 발견할 수 있을 것입니다.",
    "이번 활동을 통해 우리는 수학과 인공지능의 흥미로운 상호작용에 대해 알아보게 될 것입니다. 함께 해보시겠습니까?",
    // 
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
