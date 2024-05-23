import { generateCutscene } from "../../lib/cutscene";

// TODO: 새 이미지 생성
const images = [
    "/assets/images/Optimization/_66ab9cf5-b6b9-4ab3-9a45-2fe899d87eaf.jfif",
    "/assets/images/Optimization/_66ab9cf5-b6b9-4ab3-9a45-2fe899d87eaf.jfif",
    "/assets/images/Optimization/_66ab9cf5-b6b9-4ab3-9a45-2fe899d87eaf.jfif",
    "/assets/images/Optimization/_66ab9cf5-b6b9-4ab3-9a45-2fe899d87eaf.jfif",
    "/assets/images/Optimization/_66ab9cf5-b6b9-4ab3-9a45-2fe899d87eaf.jfif",
    "/assets/images/Optimization/_66ab9cf5-b6b9-4ab3-9a45-2fe899d87eaf.jfif",
    "/assets/images/Optimization/_66ab9cf5-b6b9-4ab3-9a45-2fe899d87eaf.jfif",

    "/assets/images/Optimization/first_image.jpg",
    "/assets/images/Optimization/first_image.jpg",
    "/assets/images/Optimization/first_image.jpg",

    "/assets/images/Optimization/meteor_falling.jfif",
    "/assets/images/Optimization/meteor_falling.jfif",
    "/assets/images/Optimization/meteor_falling.jfif",
    "/assets/images/Optimization/meteor_falling.jfif",
    "/assets/images/Optimization/meteor_falling.jfif",
]; // 전환할 이미지들의 경로
// TODO: 임시 서사
const texts = [
	"\"지금까지 실습 수업을 이렇게 거창하게 한 적은 없었지? 1인당 마법초 캡슐 10개라니...\"",
	"때마침 드상트르 교수가 강의실로 들어온다.",
	"\"자 자, 강의 시작하겠습니다. 실습 수업이라 그런지 분위기가 꽤 다르군요. 1조 맞나요?",
	"많은 학생들이 마법초를 사용해 보았을 텐데, 혹시 오늘 처음 접해본 학생들이 있다면 손을 들어 주세요.\"",
	"두세 명의 학생이 손을 든다.",
	"\"그러면 핵심만 짧게 설명하죠. 마법초는 마나의 밀도에 반응한다는 건 다들 알 거라고 생각합니다.",
	"구체적으로는, 마나가 많은 곳일수록 더 빨갛게 빛나고, 마나가 더 적은 곳으로 움직이려고 하죠.",

	"말로 설명을 듣는 것보다는 눈으로 직접 보는 게 좋겠죠. 거기 자네, 캡슐 하나만 터뜨려볼 수 있나?\"",
	"학생 한 명이 일어나서 마법초 캡슐을 터뜨린다.",
	"전구를 켠 듯 빨갛게 빛나는 마법초 가루가 한 방향으로 흩날린다.",

	"이윽고, 그 학생이 온데간데 없이 사라진다. 술렁이는 강의실.",
	"\"조용! 여러분이 오기 전에 이 강의실에 미리 텔레포트 마법을 걸어 두었습니다.",
	"마나 밀도가 낮은 곳을 찾는 데 3분을 주겠습니다.",
	"밖으로 텔레포트되는 학생들은 감점을 하도록 하겠습니다. 그럼 시작하십시오.\"",
	"1조의 학생들은 각자 마법초 캡슐을 터뜨리면서 강의실의 마나 밀도를 측정하기 시작한다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
