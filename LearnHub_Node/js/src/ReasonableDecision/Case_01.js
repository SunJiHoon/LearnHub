import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
    "/assets/images/TextMaterials/magicBook.jfif",
]; // 전환할 이미지들의 경로

const texts = [
    "바둑 프로그램은 인공지능의 전략적인 능력을 높이기 위한 중요한 연구 분야입니다. 바둑은 패턴 인식과 전략적 사고를 요구하여 인공지능이 최적의 수를 결정하는 과정에서 중요한 테스트 벤치마크 역할을 합니다.",
    "자율 주행 자동차는 센서와 인공지능 알고리즘을 결합하여 주행 경로를 계획하고 주변 환경을 인식합니다. 이를 통해 운전자의 안전성과 편의성을 높일 수 있습니다.",
    "자동 번역 시스템은 언어 처리와 기계 학습 알고리즘을 활용하여 문장을 이해하고 번역합니다. 이를 통해 다국어 소통이 보다 효율적으로 이루어집니다.",
    // "\"이 책은 그저 읽는 것이 아니라, 그 내용을 마법으로 저장할 수 있는 마법력을 지니고 있지.\"\n",
    // "\"지금부터 단어 의미나 이미지들을 마법서에 저장하고, 그것들을 마법처럼 활용하는 법을 배워보자.\"\n",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
