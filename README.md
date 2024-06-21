# AI Learn Hub

## 개요

본 프로젝트는 고등학생들이 “인공지능 수학”을 쉽게 학습할 수 있는 플랫폼을 개발하는 것을 목표로 하였습니다. 현재 교육 현장에서 인공지능 수학은 많은 학생들에게 어려움을 겪는 과목 중 하나입니다.

2020년 교육부는 “인공지능 수학” 과목 도입을 행정 예고했습니다. 행정 예고를 근거로 교육부는 2021년학년도 신입생부터 고등학교 보통 교과 진로 선택 과목으로 인공지능 수학을 포함했습니다.

그러나 교육현장의 실정은 녹록지 않습니다. “인공지능 수학” 과목은 선생님들의 기피 과목이 되었습니다. 2021년 매일경제에서는 “서울시교육청에 따르면 이번 학기에 '인공지능 기초' 또는 '인공지능 수학' 과목을 선택한 고등학교는 관내 250곳 중 단 1곳뿐인 것으로 나타났다”고 보도했습니다. 또한 인공지능 과목을 가르칠 인력이 여전히 부족하고 학생들도 관심이 적다는 의견도 있었습니다.

2022년 교육과정이 개정되며 인공지능 수학이 진로 선택과목에 포함되어 본격적으로 수업을 진행하게 되었고, 인공지능 수학에 대해 쉽게 배울 수 있는 해결책이 절실한 상태입니다.

이에 따라, 본 프로젝트는 학생들이 인공지능 수학 과목에 흥미를 잃지 않고 효과적으로 학습할 수 있는 방법을 제안하고자 하였습니다.

## 캡스톤디자인(2) 빌드 및 사용 매뉴얼

* 프로젝트명: AI Learn Hub
* 주제: 인공지능 수학 학습 지원 서비스
* Team #7 선지훈, 이상명(19), 이상명(21)

## 빌드 메뉴얼

### 1. 기술 스택

* [Spring Boot](https://spring.io/projects/spring-boot)
* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/)
	* [Vite](https://vitejs.dev/)

### 2. 개발 환경 구축

#### 2.1. 필수 설치 소프트웨어

* [JDK](https://www.oracle.com/java/technologies/java-se-glance.html) 혹은 [OpenJDK](https://openjdk.org/) 20 이상
* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/) 18 이상
	* [Vite](https://vitejs.dev/)

##### 2.1.1. 통합 개발 환경

아래 IDE 중 원하는 것을 선택해서 개발할 수 있습니다.

* [IntelliJ IDEA](https://www.jetbrains.com/idea/) + [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok)
	* Community 버전도 사용이 가능하지만 Ultimate 버전을 권장합니다.
* [Visual Studio Code](https://code.visualstudio.com/) + [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)

#### 2.2. 개발 환경 설정

##### 2.2.1. IntelliJ IDEA 환경 구성

1. IntelliJ IDEA에서 스프링 프로젝트로서 `(프로젝트 루트)/LearnHub`를 엽니다. 
2. 상단 메뉴에서 ‘File’ 을 클릭하고 ‘Settings’ 를 선택합니다.
	![IntelliJ IDEA의 File 메뉴에서 Settings...가 강조되어 있다.](https://github.com/SunJiHoon/LearnHub/assets/46434398/d6601f73-7847-427b-a8de-38faf98f525b)
3. 설정 창이 열리면 왼쪽 메뉴에서 ‘Plugins’ 를 선택합니다.
	![설정 화면에서 Plugins가 강조되어 있다.](https://github.com/SunJiHoon/LearnHub/assets/46434398/f7daad1f-5a78-4def-be8b-9195bccd15bc)
4. 검색창에 ‘Lombok’ 플러그인을 검색 후, ‘Install’ 버튼을 클릭하여 플러그인을 설치합니다.
	![플러그인 관리 화면에서 Lombok을 검색한 결과](https://github.com/SunJiHoon/LearnHub/assets/46434398/c0b399a6-8764-4448-95b0-91693b1485e7)
5. 프로젝트 내에서 `build.gradle`에 쓰인 의존성을 `gradlew`를 통해 설치합니다.
	![프로젝트의 의존성을 설치하는 화면](https://github.com/SunJiHoon/LearnHub/assets/46434398/decce378-ddc3-49fc-be37-1149380eb8d0)
6. [`application.properties` 설정을 마친 뒤](#223-applicationproperties-설정) 실행합니다.

##### 2.2.2. Visual Studio Code 환경 구성

1. Visual Studio Code에서 `(프로젝트 루트)/` 폴더를 엽니다.
2. 좌측의 플러그인 메뉴에서 'Extension Pack for Java' 플러그인을 검색 후, 'Install' 버튼을 클릭하여 플러그인을 설치합니다.
   ![Visual Studio Code의 플러그인 화면에서 Extension Pack for Java를 검색한 결과](https://github.com/SunJiHoon/LearnHub/assets/25813580/29f142cf-1a22-472f-8ece-a8db12e8e368)
3. `(프로젝트 루트)/LearnHub/src/main/java/AIMentor/LearnHub/LearnHubApplication.java`를 열고 플러그인이 Java 프로젝트를 불러올 때까지 기다립니다.
4. [`application.properties` 설정을 마친 뒤](#223-applicationproperties-설정) F5 키를 눌러서 실행합니다.

##### 2.2.3. `application.properties` 설정

`(프로젝트 루트)/LearnHub/src/main/resources` 폴더에 `application.properties` 파일을 생성하고 다음 내용을 사용자의 환경에 맞게 입력합니다.

```properties
# 개발 서버 정보
server.port=50001
# 혹은 원하는 포트 번호 입력

# 데이터베이스 정보
spring.datasource.url=jdbc:mysql://localhost:3306/<데이터베이스 이름>
spring.datasource.username=<사용자명>
spring.datasource.password=<패스워드>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate 설정
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# 메일 전송 테스트용 계정
spring.mail.host=smtp.gmail.com
# 혹은 사용하고 있는 다른 SMTP 서버
spring.mail.port=587
# 혹은 해당 SMTP 서버의 포트 번호
spring.mail.username=<이메일 주소>
spring.mail.password=<패스워드, 혹은 지원할 경우 앱 패스워드>
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# 메일 수신 테스트용 계정
test.email=<이메일 주소>

# asset을 가져올 경로
myCurrentUrl=http://localhost:50001
```

##### 2.2.4. Vite 환경 구성

JavaScript를 관리하기 위한 Vite 프로젝트 환경을 구성합니다.

1. 터미널에서 `(프로젝트 루트)/LearnHub_Node/js` 폴더를 엽니다.
2. `npm i` 명령어를 통해 종속성을 설치합니다.
	![터미널에서 npm i를 입력한 모습](https://github.com/SunJiHoon/LearnHub/assets/46434398/4c71d84d-7377-4e61-a3b8-c5ad233de949)
3. `npm run build` 명령어를 통해 vite로 빌드를 실시합니다. 이후 JavaScript를 수정할 때마다 같은 방법으로 빌드를 실시합니다.
	![터미널에서 npm run build를 입력한 모습](https://github.com/SunJiHoon/LearnHub/assets/46434398/3070ce31-07f9-4275-83d5-3a73e4b9e955)
	* 빌드 결과:
		![위 명령어를 실행한 결과 JavaScript 파일이 생성되었다.](https://github.com/SunJiHoon/LearnHub/assets/46434398/ab18ff05-82e0-481c-81f3-b582ce0f570a)

##### 2.2.5. 실행
스프링 프로젝트에 대한 종속설 설치,  JavaScript 프로젝트에 대한 종속성 설치 및 빌드가 끝났다면, 프로그램을 실행시킬 수 있습니다.

![IntelliJ IDEA에서 실행 버튼이 강조되어 있다.](https://github.com/SunJiHoon/LearnHub/assets/46434398/810e0212-e1ed-42de-8e72-effcc9c4c70f)

## 사용 매뉴얼

### 회원가입 및 로그인

#### 회원가입
1. 초기 화면에서 ‘회원가입’ 버튼을 클릭합니다.
	![서비스의 홈페이지에서 회원가입 버튼이 강조되어 있다.](https://github.com/SunJiHoon/LearnHub/assets/46434398/be4e0b3f-f8e2-4592-9667-94e7a332e539)
2. 필요한 정보를 입력하여 회원가입을 합니다.
	![서비스의 학생 회원가입 화면](https://github.com/SunJiHoon/LearnHub/assets/46434398/038201ce-f396-4841-971a-dded89a286f5)

#### 로그인 
로그인 화면에서 이메일과 비밀번호를 입력하여 로그인합니다.
![서비스의 일반 학생 로그인 화면](https://github.com/SunJiHoon/LearnHub/assets/46434398/0f2fc4f1-cc07-4257-9bce-cf3568251b5b)

### 학습 자료 접근

#### 대시보드

로그인 후, 대시보드에서 다양한 학습 자료와 강의를 선택하여 접근할 수 있습니다.

![서비스의 대시보드 화면](https://github.com/SunJiHoon/LearnHub/assets/46434398/de906fbc-eaa3-490e-9bad-99ec2564ae9a)

#### 학습

1. 각 학습자료에 접근하면 AI 마법학교의 수업이 진행됩니다.
	![서비스의 학습 콘텐츠](https://github.com/SunJiHoon/LearnHub/assets/46434398/f46ba645-8304-4e10-b946-e04e53ade828)
2. 사용자는 마법학교 수업을 수강하며 다음과 같이 학습을 진행합니다.
	* **학습 예제 <인공지능의 발전과정 - 인공지능과 관련된 수학>**
		1. 학습 목표를 제시한 후 학습 할 내용을 소개합니다.
			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/24c98f1c-405f-4c3d-ad5b-d7ae236f571a)
		2. 사용자는 인터랙티브 요소를 직접 조작하며 실습을 진행합니다.
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/dd866b84-a9df-4c4f-b369-e3b78371551d)
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/c002ceb0-0312-4635-9c50-691a36d6ae00)
		3. 이후 연계되는 수학적 개념인 "푸리에 변환"을 제시합니다.
			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/7c342ce3-b9b5-44cc-ad33-21726c91a63e)
		4. 사용자는 파형을 조작하며 “푸리에 변환”을 실습합니다.
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/f1594c6b-143b-41ad-a49a-bca0a39a7380)
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/eaeafab8-004b-4c8b-b65b-9c6af42c7582)
			*기존의 파형(검정색)은 기본 주파수 파동(파란색) 으로 분해됩니다.*
		5. 실습을 진행한 후, 관련 개념을 학습하고 이론적 배경을 이해합니다.
			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/b81fcbd4-7ade-41ff-9d25-ab620fcbc2f4)
	* **학습 예제 <텍스트 자료의 표현과 처리>**
		1. 학습 목표를 제시한 후 학습할 내용 "빈도수 벡터"를 소개합니다.
 			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/75f8d46d-22d2-45ad-8600-e52f30263211)
		2. 실습에 적용될 개념과 공식을 설명합니다.
			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/fcbbd755-ae4c-47f2-ba0f-98f03924e2bb)
		3. 실습과 관련된 예시를 제시합니다.
 			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/58ccf852-b93e-4e36-ae84-c4e7ae22593f)
		4. 사용자가 직접 입력값을 입력하며 실습을 진행한 후, 코사인 유사도 결과를 확인합니다.
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/a2dbb6fc-5aca-44a5-8be0-ccc6c90af82e)
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/2cef3735-f2bf-47a3-85ac-ba60e51905d3)
	* **학습 예제 <Convolutional Neural Network>**
		1. 학습 목표를 제시한 후 학습할 내용을 소개합니다.
			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/295719fc-7366-41b6-b7bf-afc618c26540)
		2. 사용자가 직접 원소 문양을 바꿔가며 마법신경망을 확인합니다.
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/4ef476b1-a7b2-491d-a42b-79e82785e061)
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/297025f0-e167-4c3b-935f-fd60df8600fb)
			![학습 콘텐츠의 인터랙티브 요소](https://github.com/SunJiHoon/LearnHub/assets/46434398/57fe0d74-e941-4046-bb9f-d1641ad9626b)
		3. 실습을 진행한 후, 관련 개념을 학습하고 CNN의 이론적 배경을 이해합니다.
			![학습 콘텐츠 중 일부](https://github.com/SunJiHoon/LearnHub/assets/46434398/4f292914-ccf0-4eb8-8d31-1ab9c9c90903)

각 강의는 생생한 그래픽과 인터랙티브 요소를 포함하고 있어, 기초 원리를 쉽게 이해할 수 있습니다.

## 라이선스
[MIT License](LICENSE)
