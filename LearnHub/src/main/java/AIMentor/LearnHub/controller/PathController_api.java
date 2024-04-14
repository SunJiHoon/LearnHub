package AIMentor.LearnHub.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api")
public class PathController_api {
    @Value("${myCurrentUrl}")
    private String path;
    @GetMapping("/requestPath")
    public String getCurrPath() {
        return path;
    }
}
