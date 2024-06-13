import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "여러분, 오늘 우리는 인공지능을 이용하여 텍스트를 분류하는 수학적 방법을 탐구할 것입니다.",
    "먼저, 텍스트 데이터를 벡터로 변환하는 방법을 배웠었는데, 이를 활용하여 모델에 적용하는 과정을 알아보겠습니다. ",
    "이 과정에서 주로 사용되는 수학적 기법들도 함께 살펴볼 것입니다.",
    // "\"먼저, 마법서의 페이지에는 물건의 RGB 채널 값을 행렬 형태로 저장합니다.\"",
    // "\"각각의 채널은 물건의 색상을 나타내며," +
    // " 행렬은 그것들을 조합하여 물건의 전체 색상을 나타냅니다.\"",
    // "\"이러한 행렬은 물건의 색상을 완벽하게 재현할 수 있도록 합니다.\"",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
