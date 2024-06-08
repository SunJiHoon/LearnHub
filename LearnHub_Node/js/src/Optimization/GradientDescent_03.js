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

]; // 전환할 이미지들의 경로
// TODO: 임시 서사
const texts = [
	"여러분, 오늘의 실습은 정말 훌륭했습니다. 각자의 노력과 열정에 박수를 보냅니다. ",
	"마나 밀도를 측정하는 과정에서 여러분은 실제 마법의 작용을 직접 체험하고, 그 결과를 정확하게 산출해냈습니다. ",
	"이렇게 실습을 통해 새로운 경험과 지식을 얻는 것이 마법대학교의 수업의 목표입니다.",
	"여러분의 노력에 감사드리며, 오늘도 고생 많으셨습니다.",
]; // 이미지에 대응하는 텍스트

document.addEventListener('DOMContentLoaded', () => {
	generateCutscene(document.getElementById('talkInterface'), images, texts);
});
