# LearnHub

## 개요
초등학교, 중학교 학생을 대상으로 인공지능과 머신러닝에 대해 학습을 도와주는 웹페이지를 제작합니다. 최급하강법, CNN등의 기초 원리를 생생한 그래픽을 통해 학습할 수 있도록 돕겠습니다.
도메인은 aihub.putiez.com을 활용하고 있습니다. 이 도메인은 추후 변경될 예정입니다.

## 추천드리는 개발 환경 설정
- 이 프로젝트는 스프링, 스프링 부트, html, css, javascript를 통해 개발 되었습니다. application.properties는 보안상 깃으로 관리되지 않습니다. 관리자에게 요청해서 받아주십시오.
- IntelliJ Ultimate 상에서 개발되었습니다. IntelliJ 내에서 롬복(Lombok)은 필수적으로 허용되어야합니다.
- IntelliJ Ultimate: 팀원들은 대학생이기에 학생계정으로 받을 것을 추천합니다. 학생이 아닐경우 IntelliJ Community ver도 괜찮습니다. (OpenJDK 20 필요)

### 롬복(Lombok) 설정
프로젝트에 롬복을 추가하여 필요한 설정을 수행하세요.

### 설치 가이드
#### IntelliJ Ultimate 설치
1. IntelliJ Ultimate를 [다운로드 및 설치](https://www.jetbrains.com/idea/download/)하세요.
2. 빌드시 OpenJDK 20으로 빌드해주세요.

## 개발 스택
1. MySQL
2. Spring Boot
3. Flask
4. Tensorflow

### application.properties
1. /LearnHub/src/main/resources/application.properties 에서 관리합니다.
2. application.properties는 보안 상 깃에 흔적을 남기지 않고 관리됩니다. 필요하다면 관리자에게 요청하십시오.
3. 관리자에게 요청할 수 없다면, application.properties에 spring.datasource.username=유저이름 spring.datasource.password=유저비밀번호 등의 정보, JPA 정보, 실행 포트 정보 등을 기입하십시오.

```
### application.properties 예시
#포트 정보
server.port=포트 정보
#db 이름
spring.datasource.url=jdbc:mariadb://localhost:3306/db 이름
#user이름과 password
spring.datasource.username=user이름
spring.datasource.password=password

#mysql 사용을 가정하면
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
#Hibernate 설정 예시
#테이블 생성을 jpa(hibernate로 구현)를 통해 그때그때 반영합니다.
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=gmail 계정 이메일
spring.mail.password=gmail 계정 앱 비밀번호
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true


test.email=본인의 이메일(테스트용)

```


## 라이선스
이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

