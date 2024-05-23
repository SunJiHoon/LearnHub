# 🆕 LearnHub + Vite

LearnHub 콘텐츠에서 사용하는 자바스크립트를 생성하는 서브프로젝트입니다. `/LearnHub_Node/graphicFunction`을 대체할 예정입니다.

## 의존성

* [Node.js](https://nodejs.org/) (18 이상의 LTS 버전을 권장합니다.)

## 최초 설치

모든 명령은 `/LearnHub_Node/js`에서 실행하면 됩니다.

```
npm i
```

## 빌드

```
npm run build
```

`/LearnHub/src/main/resources/static/assets/javascripts/courses`에 빌드되도록 설정해 두었습니다. 만들지 않은 `assets` 폴더가 같이 생기는데, 공용으로 사용하는 폴더이므로 지우지 말아 주세요.

원래 Vite는 HTML 진입점과 개발 서버와 함께 사용하도록 설계된 도구이지만, Spring 기반의 서버에 연동하기 위하여 `js` 파일만 사용하도록 설정해 두었습니다.

## 개발 방법

### `js` 파일을 사용하는 HTML 문서에서

**`/assets/javascripts/courses` 디렉토리 안의 스크립트 파일을 가리키는 `<script>` 태그에 반드시 `type="module"` 어트리뷰트를 추가해 주세요.** 생성되는 스크립트 파일이 [ES Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)이므로 해당 어트리뷰트를 추가해야 정상적으로 작동합니다.

### 폴더 구조

* `/src` 폴더 안에 원하는 폴더 구조대로 `js` 파일을 만들면 Spring 측의 리소스 폴더에 그대로 반영됩니다.
* `/lib` 폴더 안에는 여러 페이지에서 재사용하는(`export`) 코드를 작성합니다.

### 코드 재사용

함수 선언 앞에 `export` 키워드를 추가해 다른 스크립트 파일에서 사용할 수 있습니다.

```js
// ./lib/example.js
export function foo() {
	// ...
}
```

해당 함수를 사용하려면 `import`문을 사용하면 됩니다.

```js
// ./src/Example/example.js
import { foo } from '../../lib/example'; // `.js`는 생략해도 됩니다.

foo();
```

### npm 패키지 설치

다음 명령어로 npm에 등록된 패키지를 설치할 수 있습니다.

```
npm i package-name
```

설치하고 나면 똑같이 `import`문을 통해 불러올 수 있습니다.

```js
import { test } from 'package-name'; // 설치할 때 사용한 패키지 이름을 그대로 입력합니다.
```

### DOM 조작

**DOM을 조작하는 코드는 아래 코드로 감쌀 것을 권장합니다.** `DOMContentLoaded` 이벤트는 HTML에서 DOM을 완전히 구성했을 때 발생하는 이벤트로, 이 이벤트 밖에서 DOM을 조작하려고 하면 오류가 발생할 수 있습니다.

```js
document.addEventListener('DOMContentLoaded', () => {
	// ...
});
```