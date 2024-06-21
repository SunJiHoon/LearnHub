# LearnHub

## 개요
 본 프로젝트는 고등학생들이 “인공지능 수학”을 쉽게 학습할 수 있는 플랫폼을 개발하는 것을 목표로 하였습니다. 현재 교육 현장에서 인공지능 수학은 많은 학생들에게 어려움을 겪는 과목 중 하나입니다.
 
 2020년 교육부는 “인공지능 수학” 과목 도입을 행정 예고했습니다. 행정 예고를 근거로 교육부는 2021년학년도 신입생부터 고등학교 보통 교과 진로 선택 과목으로 인공지능 수학을 포함했습니다.
 
 그러나 교육현장의 실정은 녹록지 않습니다. “인공지능 수학” 과목은 선생님들의 기피 과목이 되었습니다. 2021년 매일경제에서는 “서울시교육청에 따르면 이번 학기에 '인공지능 기초' 또는 '인공지능 수학' 과목을 선택한 고등학교는 관내 250곳 중 단 1곳뿐인 것으로 나타났다”고 보도했습니다. 또한 인공지능 과목을 가르칠 인력이 여전히 부족하고 학생들도 관심이 적다는 의견도 있었습니다.
 
 2022년 교육과정이 개정되며 인공지능 수학이 진로 선택과목에 포함되어 본격적으로 수업을 진행하게 되었고, 인공지능 수학에 대해 쉽게 배울 수 있는 해결책이 절실한 상태입니다.
 
 이에 따라, 본 프로젝트는 학생들이 인공지능 수학 과목에 흥미를 잃지 않고 효과적으로 학습할 수 있는 방법을 제안하고자 하였습니다.


## 캡스톤디자인(2) 빌드 및 사용 Manual
프로젝트 명: AI Learn Hub
주제: 인공지능 수학 학습 지원 서비스
Team #7 
선지훈, 19이상명, 21이상명

## 빌드 메뉴얼
### 1. 기술 스택
JDK 혹은 OpenJDK 20 이상
Spring Boot
MySQL
Node.js 18 이상
Vite
Three.js
* [JDK](https://www.oracle.com/java/technologies/java-se-glance.html) 혹은 [OpenJDK](https://openjdk.org/) 20 이상
	* [Spring Boot](https://spring.io/projects/spring-boot)
* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/) 18 이상
	* [Vite](https://vitejs.dev/)


### 2. 개발 환경 구축
#### 개발 환경 구축
아래 에디터 중 원하는 것을 선택해서 개발할 수 있습니다.

* [IntelliJ IDEA](https://www.jetbrains.com/idea/)
	* Ultimate로 개발되고 있지만 Community 역시 사용 가능합니다.
	* [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok) 플러그인도 설치해 주세요.
* [Visual Studio Code](https://code.visualstudio.com/)
	* [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) 플러그인도 설치해 주세요.

#### 2.1 필수 설치 소프트웨어
Java Development Kit (JDK) 20 이상
다음 중 하나의 환경을 선택해서 설치
IntelliJ IDEA (Ultimate 권장, Community 버전 가능) + Lombok 플러그인
Visual Studio Code + Extension Pack for Java 플러그인
Node.js 18 이상
MySQL

#### 2.2 개발 환경 설정
##### 2.2.1 IntelliJ IDEA 환경 구성
IntelliJ IDEA를 열고, Lombok 플러그인을 설치합니다.
Intellij IDEA에서 스프링 프로젝트로서 LearnHub/LearnHub를 엽니다. 
상단 메뉴에서 ‘File’ 을 클릭하고 ‘Settings’ 를 선택합니다.

설정 창이 열리면 왼쪽 메뉴에서 ‘Plugins’ 를 선택합니다.



검색창에 ‘Lombok’ 플러그인을 검색 후, ‘Install’ 버튼을 클릭하여 플러그인을 설치합니다.

프로젝트 내에서 build.gradle에 쓰인 의존성을 gradlew를 통해 설치합니다.

LearnHub/LearnHub/src/main/resources 폴더에 application.properties 파일을 생성하고 다음 내용을 사용자의 환경에 맞게 입력합니다.

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



##### 2.2.2 Vite 환경 구성
JavaScript를 관리하기 위한 Vite 프로젝트 환경을 구성합니다.
터미널에서 LearnHub/LearnHub_Node/js 폴더를 엽니다.
npm i 명령어를 통해 종속성을 설치합니다.

npm run build 명령어를 통해 vite로 빌드를 실시합니다. 이후 JavaScript를 수정할 때마다 같은 방법으로 빌드를 실시합니다.

(build 결과)


##### 2.2.3 실행
스프링 프로젝트에 대한 종속설 설치,  JavaScript 프로젝트에 대한 종속성 설치 및 빌드가 끝났다면, 프로그램을 실행시킬 수 있습니다.
	

실행하기 전에 **[application.properties 설정](#applicationproperties)과 [Vite 빌드](LearnHub_Node/js/README.md)를 반드시 마쳐 주세요**.


## 라이선스
[MIT License](LICENSE)
