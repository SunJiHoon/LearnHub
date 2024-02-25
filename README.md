# LearnHub

## 개요
초등학교, 중학교 학생을 대상으로 인공지능과 머신러닝에 대해 학습을 도와주는 웹페이지를 제작합니다. 최급하강법, CNN등의 기초 원리를 생생한 그래픽을 통해 학습할 수 있도록 돕겠습니다.
도메인은 aihub.putiez.com을 활용하고 있습니다. 이 도메인은 추후 변경될 예정입니다.

## 개발 환경 설정
- 이 프로젝트는 스프링, 스프링 부트, html, css, javascript를 통해 개발 되었습니다. application.properties는 보안상 깃으로 관리되지 않습니다. 관리자에게 요청해서 받아주십시오.
- IntelliJ Ultimate와 MariaDB를 사용하여 개발되었습니다. IntelliJ 내에서 롬복(Lombok)은 필수적으로 허용되어야합니다.
- IntelliJ Ultimate: 팀원들은 대학생이기에 학생계정으로 받을 것을 추천합니다. 학생이 아닐경우 IntelliJ Community ver도 괜찮습니다. (OpenJDK 20 필요)
- MariaDB: [다운로드 및 설치 (Windows)](https://mariadb.org/download/?t=mariadb&o=true&p=mariadb&r=10.10.6&os=windows&cpu=x86_64&pkg=msi) 또는 [설치 가이드 (Ubuntu 22.04)](https://mariadb.org/download/?t=repo-config&d=22.04+%22jammy%22&v=10.11&r_m=blendbyte)

## 롬복(Lombok) 설정
프로젝트에 롬복을 추가하여 필요한 설정을 수행하세요.

## 설치 가이드
### IntelliJ Ultimate 설치
1. IntelliJ Ultimate를 [다운로드 및 설치](https://www.jetbrains.com/idea/download/)하세요.
2. 빌드시 OpenJDK 20으로 빌드해주세요.


### MariaDB 설치 (Windows)
1. [다운로드 페이지](https://mariadb.org/download/?t=mariadb&o=true&p=mariadb&r=10.10.6&os=windows&cpu=x86_64&pkg=msi)에서 MSI를 다운로드합니다.
2. MSI 파일을 실행하여 MariaDB를 설치합니다.
3. <img src="https://github.com/SunJiHoon/LearnHub/assets/46434398/f6d070ba-52a9-4378-b3cc-fbaa982995be" width="300">

### MariaDB 설치 (Ubuntu 22.04)
1. [설치 가이드 페이지](https://mariadb.org/download/?t=repo-config&d=22.04+%22jammy%22&v=10.11&r_m=blendbyte)를 참조하여 MariaDB를 설치합니다.
2. <img src="https://github.com/SunJiHoon/LearnHub/assets/46434398/949dfa1e-dd47-44c0-b115-98e93f0f945b" width="300">

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
#마리아 디비 사용시
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
#Hibernate 설정 예시
#테이블 생성을 jpa(hibernate로 구현)를 통해 그때그때 반영합니다.
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
```


## 라이선스
이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

