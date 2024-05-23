import { generateCutscene } from "../../lib/cutscene";

const images = [
    "/assets/images/MagicUniv/enroll_welcome.jfif",
    "/assets/images/MagicUniv/enroll_welcome.jfif",
    "/assets/images/MagicUniv/enroll_welcome.jfif",

    "/assets/images/MagicUniv/enroll_math.jfif",
    "/assets/images/MagicUniv/enroll_math.jfif",
    "/assets/images/MagicUniv/enroll_math.jfif",
    "/assets/images/MagicUniv/enroll_math.jfif",

    "/assets/images/MagicUniv/enroll_welcome.jfif",
    "/assets/images/MagicUniv/enroll_welcome.jfif",
]; // 전환할 이미지들의 경로
const texts = [
    "\"마법학교에 입학한 것을 환영하네! ",
    "자네는 이제 우드로우 교수님의 수업을 듣게 될 걸세. 여기서는 마법의 힘을 이용하여 인공지능 수학을 배울 수 있을 거야.\"",
    "\"우드로우 교수님은 최고의 마법학자이자 수학자로, 그의 강의는 놀라운 지식과 신비한 주문을 배울 수 있는 곳이야. \"",

    "\"인공지능 수학은 마법과 기계의 합작이라고 생각하면 돼.\"" ,
    "우리는 마법의 원리를 이용하여 컴퓨터를 통해 문제를 해결하고 예측하는 법을 배울 거야.\"" ,
    "\"수업에서는 다양한 주제를 다루며, 실제로 마법을 이용하여 데이터를 분석하고 패턴을 찾는 연습을 하게 될 거야. " ,
    "또한 인공지능 알고리즘과 마법적인 방법을 결합하여 문제를 해결하는 능력을 키울 수 있을 거야.\"\n" ,

    "\"우드로우 교수님의 강의를 통해 인공지능 수학의 신비를 탐험하며, 자네는 놀라운 마법의 세계를 열어볼 수 있을 거야.\"",
    "\"지금부터 흥미진진한 여정이 시작되었네!\"",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
