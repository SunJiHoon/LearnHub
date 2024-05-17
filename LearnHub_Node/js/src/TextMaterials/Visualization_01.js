import { generateCutscene } from "../../lib/cutscene";

const images =
    [
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
        "/assets/images/TextMaterials/magicBook.jfif",
    ]; // 전환할 이미지들의 경로


const texts = [
    "\"지난 시간엔 빈도수 벡터, 원 핫 인코딩, 임베딩 백터 개념들을 배웠지?\"",
    "\"이번 시간에는 수와 수학 기호로 표현된 텍스트 자료를 처리하는 수학 원리를 이해하고, 그 자료를 시각화하는 것을 배울거야.\"" ,
    "\"텍스트 데이터를 보다 효과적으로 분석하고 이해할 수 있게 되도록 도와줄게!\"\n"
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
