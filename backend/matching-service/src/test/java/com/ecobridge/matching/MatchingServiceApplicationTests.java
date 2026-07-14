package com.ecobridge.matching;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
    "security.jwt.secret=1234567890123456789012345678901234567890123456789012345678901234"
})
class MatchingServiceApplicationTests {
    @Test
    void contextLoads() {
        // Test will pass once the context configuration properties are resolved
    }
}