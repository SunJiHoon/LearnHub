# LearnHub

## 개요
초등학교, 중학교 학생을 대상으로 인공지능과 머신러닝에 대해 학습을 도와주는 웹페이지를 제작합니다. 최급 하강법, CNN 등의 기초 원리를 생생한 그래픽을 통해 학습할 수 있도록 돕겠습니다.

도메인은 aihub.putiez.com을 활용하고 있습니다. 이 도메인은 추후 변경될 예정입니다.

## 현재 기술 스택
* [JDK](https://www.oracle.com/java/technologies/java-se-glance.html) 혹은 [OpenJDK](https://openjdk.org/) 20 이상
	* [Spring Boot](https://spring.io/projects/spring-boot)
* [Python](https://www.python.org/)
	* [Flask](https://palletsprojects.com/p/flask/) (예정)
	* [TensorFlow](https://www.tensorflow.org/) (예정)
* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/) 18 이상
	* [Vite](https://vitejs.dev/)
	* [Three.js](https://threejs.org/)

## 개발 환경 구축
아래 에디터 중 원하는 것을 선택해서 개발할 수 있습니다.

* [IntelliJ IDEA](https://www.jetbrains.com/idea/)
	* Ultimate로 개발되고 있지만 Community 역시 사용 가능합니다.
	* [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok) 플러그인도 설치해 주세요.
* [Visual Studio Code](https://code.visualstudio.com/)
	* [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) 플러그인도 설치해 주세요.

실행하기 전에 **[application.properties 설정](#applicationproperties)과 [Vite 빌드](LearnHub_Node/graphicFunction/README.md)를 반드시 마쳐 주세요**.

### application.properties
`/LearnHub/src/main/resources/application.properties` 파일은 보안상의 이유로 Git으로 관리하고 있지 않습니다. 수동으로 파일을 만들고 아래 내용을 입력해 주세요.

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

## 라이선스
[MIT License](LICENSE)
