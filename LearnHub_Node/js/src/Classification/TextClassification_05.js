import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/ImagePresent/summonMagic.jfif",
    "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
    // "/assets/images/ImagePresent/summonMagic.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "text 수업",
    "끝",
    // "\"이 방법은 더 정교한 마법 기술로, 물건의 세부적인 속성과 색상까지 저장할 수 있습니다.\"",
    // "\"먼저, 마법서의 페이지에는 물건의 RGB 채널 값을 행렬 형태로 저장합니다.\"",
    // "\"각각의 채널은 물건의 색상을 나타내며," +
    // " 행렬은 그것들을 조합하여 물건의 전체 색상을 나타냅니다.\"",
    // "\"이러한 행렬은 물건의 색상을 완벽하게 재현할 수 있도록 합니다.\"",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
