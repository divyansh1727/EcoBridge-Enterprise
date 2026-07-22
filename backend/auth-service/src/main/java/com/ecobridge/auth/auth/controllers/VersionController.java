package com.ecobridge.auth.auth.controllers; // use YOUR controller package

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VersionController {

    @GetMapping("/build-check")
    public String buildCheck() {
        return "AUTH BUILD JULY22";
    }
}