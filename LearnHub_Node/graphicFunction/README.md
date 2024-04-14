# LearnHub + Vite

## 의존성

* [Node.js](https://nodejs.org/) (18 이상의 LTS 버전을 권장합니다.)

## 최초 설치

모든 명령은 `/LearnHub_Node/graphicFunction`에서 실행하면 됩니다.

```
npm i
```

## 개발 서버 실행 (localhost:5173)

```
npm run dev
```

루트 폴더에 `html` 파일이 없으므로 `localhost:5173`을 바로 열면 아무것도 보이지 않습니다. **하위 폴더의 HTML**(eg `http://localhost:5173/assets/courses/LossFunction/LossFunction_01/index.html`)을 열어야 내용이 보입니다.

개발 서버가 실행된 상태에서 파일을 수정하면 브라우저 화면에 바로 반영됩니다.

## 배포 미리보기 (localhost:4173)

빌드를 마치고 나면 아래 명령어로 배포된 웹페이지를 미리 볼 수 있습니다.

```
npm run preview
```

## 빌드

```
npm run build
```

`/LearnHub/src/main/resources/static/assets/courses`에 빌드되도록 설정해 두었습니다. 폴더 안에 `html` 파일을 만들면 에셋 폴더에 동일한 경로로 빌드됩니다.
