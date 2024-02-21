package AIMentor.LearnHub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class LearnHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(LearnHubApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:50001", "https://mbti.putiez.com",
								"http://m.tongtongtripmap.com:8080", "https://m.tongtongtripmap.com:443"
								, "http://m.tongtongtripmap.com", "https://m.tongtongtripmap.com")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTION")
						.allowCredentials(true).allowedHeaders("*");//;;

				////.allowedHeaders("*");;
			}
		};
	}
}
